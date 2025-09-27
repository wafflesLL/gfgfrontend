import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { GFG_API_URL } from '@env';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: ( username: string, email: string, password: string ) => Promise<any>;
    onLogin?: ( email: string, password: string ) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = GFG_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState , setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token)

            if (token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            } else {
                setAuthState({
                    token: null,
                    authenticated: false
                })
            }
        }
        loadToken();
    }, [])

    const register = async (username: string, email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/api/auth/register/`, { username, email, password })
        } catch (e){
            return { error: true, msg: (e as any).response.data.msg }
        }
    }
    
    const login = async (username: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth/token/`, { username, password });

            console.log('Login result:', result.data);

            setAuthState({
                token: result.data.access,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.access); 

            return result;
        } catch (e){
            return { error: true, msg: (e as any).response.data.msg }
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false 
        });
    };

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>   
}
