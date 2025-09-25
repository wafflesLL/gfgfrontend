import { TextArea } from "@/components/ui/TextArea";
import { Text, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SignInData, SignInSchema } from "@/lib/types";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Stack, useRouter } from 'expo-router';
import { apiFetchJSON } from "@/lib/server";
import { useState } from "react";
import { saveRefreshToken } from "@/lib/keychain";

export default function SignIn(){
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInData>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    interface FormData {
        username: string;
        password: string;
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await apiFetchJSON("/auth/token/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            })
            .then(response => response.json())
            .catch(error => {
                setErrorMessage("Network error. Please try again.");
                console.error('Sign in fetch failed:', error);
            });
            if (!response.access){
                setErrorMessage("Sign in failed. Please check your credentials.")
            }else{
                saveRefreshToken(response.refresh);
                router.replace("/dashboard");
            }
            console.log(response);
        }catch (error) {
            setErrorMessage("Sign in failed. Please try again.")
            console.error('Failed to Sign In', error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <SafeAreaProvider>
            <Stack.Screen
                options={{
                    animation: "slide_from_bottom"
                }}
            />
            <SafeAreaView className="flex-1 bg-primary gap-8 py-8">
                <Text className="w-screen text-center font-semibold text-5xl">Sign In</Text>
                <View className="flex-1 items-center gap-4 px-10">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                        <TextArea 
                            title="Username"
                            className="text-xl"
                            value={value}
                            autoFocus={true}
                            onChange={onChange}
                        />
                        )}
                        name="username"
                    />
                    {errors.username && <Text className="text-warning">Enter a valid email.</Text>}

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                        <TextArea 
                            Password={true}
                            title="Password"
                            className="text-xl"
                            onChange={onChange}
                            value={value}
                        />

                        )}
                        name="password"
                    />
                    {errors.password && <Text className="text-warning">Password is required.</Text>}

                    <Button onPress={handleSubmit(onSubmit)}>
                        <Text className="text-2xl font-semibold">Submit</Text>
                        {}
                    </Button>
                    {errorMessage !== "" && (
                        <Text className="text-warning text-center mt-2">{errorMessage}</Text>
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
