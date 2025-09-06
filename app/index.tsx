import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';
import { Link, Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Home() {
    console.log('Home screen rendered');
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary py-8">
                <View className=" bg-primary fg-foreground flex items-center flex-1">
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                    />
                    <View className="mx-20 items-center gap-4">
                        <Text className="text-5xl text-center font-semibold leading-tight">Glasses For Good</Text>
                        <View className="my-4">
                            <Image
                                source={require('../assets/logo.webp')}
                                style={{ width: 200, height: 200 }}
                                contentFit="cover"
                            />
                        </View>
                        <Link href="/sign-in">
                            <Button className="text-3xl w-screen">Sign In</Button>
                        </Link>
                        <Link href="/create-account">
                            <Button className="text-3xl w-screen">Create Account</Button>
                        </Link>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}