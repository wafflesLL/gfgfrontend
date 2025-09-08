import { TextArea } from "@/components/ui/TextArea";
import { Text, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SignInData, SignInSchema } from "@/lib/types";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Stack } from 'expo-router';
import { useEffect } from "react";
import { apiFetchJSON } from "@/lib/server";

export default function About(){
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInData>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    interface FormData {
        email: string;
        password: string;
    }

    const onSubmit = async (data: FormData) => {
        try {
            const response = await apiFetchJSON("/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            .then(response => response.json())
            .catch(error => {
                console.error('Sign In fetch failed:', error);
            });
            console.log(response);
        }catch (error) {
            console.error('Failed to Sign In', error);
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
                            title="Email Address"
                            className="text-xl"
                            value={value}
                            onChange={onChange}
                        />
                        )}
                        name="email"
                    />
                    {errors.email && <Text className="text-warning">Enter a valid email.</Text>}

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
                    </Button>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function onEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
