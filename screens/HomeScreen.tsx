import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '../components/ui/Button';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary py-8">
                <View className=" bg-primary fg-foreground flex items-center flex-1">
                    <View className={`w-[70vw] items-center gap-4`}>
                        <Text className="text-5xl text-center font-semibold leading-tight">Glasses For Good</Text>
                        <View className="my-4">
                            <Image
                                source={require('@/assets/logo.webp')}
                                style={{ width: 200, height: 200 }}
                                contentFit="cover"
                            />
                        </View>
                        <Button
                            href="SignIn"
                            className="w-full"
                        >
                            <Text className="text-3xl font-semibold">Sign In</Text>
                        </Button>
                        <Button
                            href="CreateAccount"
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