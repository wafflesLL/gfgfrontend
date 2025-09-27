import { TextArea } from "../components/ui/TextArea";
import { Text, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CreateAccountData, CreateAccountSchema } from "../lib/types";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/Button';
import { apiFetchJSON } from "../lib/server";
import { useState } from "react";

export default function CreateAccount(){
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAccountData>({
        resolver: zodResolver(CreateAccountSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })
    interface FormData {
        username: string;
        email: string;
        password: string;
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await apiFetchJSON("/api/auth/register/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
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
        }finally {
            setLoading(false);
        }

    };
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary gap-8 py-8">
                <Text className="w-screen text-center font-semibold text-5xl">Create Account</Text>
                <View className="flex-1 items-center gap-4 px-10">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                        <TextArea 
                            keyboardType="email-address"
                            title="Email"
                            className="text-xl"
                            value={value}
                            autoFocus={true}
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
                            title="Username"
                            className="text-xl"
                            value={value}
                            onChange={onChange}
                        />
                        )}
                        name="username"
                    />
                    {errors.username && <Text className="text-warning">Enter a valid username.</Text>}

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

                    <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
                        <Text className="text-2xl font-semibold">
                            {loading ? "Creating Account..." : "Submit"}
                        </Text>
                    </Button>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
