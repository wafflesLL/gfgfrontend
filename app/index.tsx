import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch } from '@/lib/server';
import { useState, useEffect } from 'react';
import { ApiResponse } from '@/lib/types';

export default function Home() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiFetch("/test");
                const result = await response.json();
                setData(result as ApiResponse);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            }
        }

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        );
    }else{
        console.log(data);
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary py-8">
                <View className=" bg-primary fg-foreground flex items-center flex-1">
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                    />
                    <View className={`w-[70vw] items-center gap-4`}>
                        <Text className="text-5xl text-center font-semibold leading-tight">Glasses For Good</Text>
                        <View className="my-4">
                            <Image
                                source={require('../assets/logo.webp')}
                                style={{ width: 200, height: 200 }}
                                contentFit="cover"
                            />
                        </View>
                        <Button
                            href="/sign-in"
                            className="w-full"
                        >
                            <Text className="text-3xl font-semibold">Sign In</Text>
                        </Button>
                        <Button
                            href="/create-account"
                            className="w-full"
                        >
                            <Text className="text-3xl font-semibold">Create Account</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}