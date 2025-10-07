import { useMemo, useRef, createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store'
import { GFG_API_URL } from '@env';

interface AuthProps {
    authState?: { accessToken: string | null; authenticated: boolean | null };
    onRegister?: ( username: string, email: string, password: string ) => Promise<any>;
    onLogin?: ( email: string, password: string ) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const REFRESH_TOKEN_KEY = 'refresh-jwt';
export const API_URL = GFG_API_URL;
const AuthContext = createContext<AuthProps>({});

//JWT decoder for the expiry
function decodeJwt<T = any>(token: string): T | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = parts[1];
        let base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if necessary
        base64Payload += '='.repeat((4 - base64Payload.length % 4) % 4);
        const decodedString = atob(base64Payload);
        return JSON.parse(decodedString);
    } catch {
        return null;
    }
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: any) => {
    const [authState , setAuthState] = useState<{
        accessToken: string | null;
        authenticated: boolean | null;
    }>({
        accessToken: null,
        authenticated: false, 
    });

    //prevents multiple parallel refreshses
    const isRefreshingRef = useRef(false);
    const refreshPromiseRef = useRef<Promise<string | null> | null >(null);

    // attach the auth header when we have the token
    useEffect(() => {
        if (authState.accessToken) {
            axios.defaults.baseURL = API_URL;
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState.accessToken}`;
        } else {
            delete axios.defaults.headers.common['Authorization']; 
        }
    }, [authState.accessToken])

    //refresh helper
    const refreshAccessToken = async (): Promise<string | null> => {
        if (isRefreshingRef.current && refreshPromiseRef.current){
            return refreshPromiseRef.current;
        }

        isRefreshingRef.current = true;
        refreshPromiseRef.current = (async () => {
            const storedRefresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY); 
            if (!storedRefresh){
                isRefreshingRef.current = false;
                refreshPromiseRef.current = null;
                return null;
            }

            try {
                const resp = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh: storedRefresh}) 
                const newAccess: string = resp.data.access;
                const newRefresh: string | undefined = resp.data.refresh;

                if (newRefresh) {
                    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefresh);
                }

                setAuthState({ accessToken: newAccess, authenticated: true});
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
                return newAccess;
            }catch (e) {
                await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY); 
                setAuthState({
                    accessToken: null,
                    authenticated: false 
                });
                return null;
            }finally {
                isRefreshingRef.current = false;
                refreshPromiseRef.current = null;
            }
        })();

        return refreshPromiseRef.current;
    };

    //refreshes the token when its about to expire
    useEffect(() => {
        const reqId = axios.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const token = authState.accessToken;
                if (token) {
                    const payload: any = decodeJwt(token);
                    const now = Math.floor(Date.now() / 1000);

                    if (payload?.exp && payload.exp - now < 10){
                        const newAccess = await refreshAccessToken();
                        if (newAccess) {
                            config.headers = config.headers || {};
                            config.headers.Authorization = `Bearer ${newAccess}`;
                        }
                    }
                }
                return config;
            },
            (error) => Promise.reject(error) 
        );

        const respId = axios.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<any>) => {
                const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean};
                const status = error.response?.status;

                const code = (error.response?.data as any)?.code || (error.response?.data as any)?.detail;
                const tokenLikelyExpired = 
                    status === 401 &&
                    !original?._retry &&
                    (code == 'token not valid' || typeof code === 'string' && code.toLowerCase().includes('token'));

                if (tokenLikelyExpired) {
                    original._retry = true;
                    const newAccess = await refreshAccessToken();
                    if (newAccess) {
                        original.headers = original.headers || {};
                        original.headers.Authorization = `Bearer ${newAccess}`;
                        return axios(original);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(reqId);
            axios.interceptors.response.eject(respId);
        };
    }, [authState.accessToken]);

    //This useEffect takes the refresh token we already had and sees if it is still valid
    useEffect(() => {
        (async () => {
            const hasRefresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            if (hasRefresh) {
                const newAccess = await refreshAccessToken();
                if (!newAccess) {
                    setAuthState({
                        accessToken: null,
                        authenticated: false,
                    })
                }
            }else {
                setAuthState({
                    accessToken: null,
                    authenticated: false,
                })
            }
        })();
    }, [])


    //API methods
    const register = async (username: string, email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/api/auth/register/`, { username, email, password })
        } catch (e: any){
            const errorData = e?.response?.data;
            let msg = 'Registration Failed';
            if (errorData) {
                if (typeof errorData === 'string') {
                    msg = errorData;
                } else if (typeof errorData === 'object') {
                    msg = Object.values(errorData).flat().join(' ');
                }
            }
            return { error: true, msg };
        }
    }
    
    const login = async (username: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth/token/`, { username, password });
            const access: string = result.data.access;
            const refresh: string = result.data.refresh;
            if (!access || !refresh) throw new Error('Server did not return access/refresh tokens');

            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh); 

            setAuthState({
                accessToken: access,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access}`;

            return result;
        } catch (e: any){
            return { error: true, msg: e?.response?.data?.msg ?? 'Login failed' };
        }
    };

    const logout = async () => {
        try{
            const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            if (refresh) {
                await axios.post(`${API_URL}/api/auth/token/blacklist/`, { refresh });
            }
        } catch {
        } finally {
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

            delete axios.defaults.headers.common['Authorization'];

            setAuthState({
                accessToken: null,
                authenticated: false 
            });
        }
    };

    const value = useMemo(
        () => ({
            authState,
            onRegister: register,
            onLogin: login,
            onLogout: logout
        }),
        [authState]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>   
}