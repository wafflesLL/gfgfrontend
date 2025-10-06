import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '../components/ui/Button';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import NavBar from '../components/ui/NavBar';

export default function Welcome() {
    return(
        <>
            <View className='h-screen bg-background'>
                <SafeAreaProvider className='bg-background flex-1 justify-center items-center relative'>
                    <View className = 'absolute top-0'>
                        <Svg width="393" height="191" viewBox="0 0 393 191" fill="none">
                            <Path d="M393 149.5C301.515 54.824 108.427 191 0 191C3.8147e-05 142.85 0 51.7348 0 0C85.5 -4.3869e-05 284.573 0 393 0C393 78.5 393 87.1498 393 149.5Z" fill="#D9A362"/>
                        </Svg>
                    </View>
                    <View className="flex-1 justify-center items-center w-full absolute top-[13%]">
                        <Image
                            source={require('../assets/logo-colored.webp')}
                            style={{ width: 200, height: 200 }}
                            contentFit="cover"
                        />
                    </View>
                    <SafeAreaView className="py-8 w-full items-center absolute top-[40%]">
                        <View className="gap-4">
                            <Text className="text-5xl font-semibold text-center">Glasses For Good</Text>
                            <Text className="text-xl text-center font-semibold">building custom glasses since 2025</Text>
                        </View>
                        <View className="flex flex-row w-screen items-center justify-between px-2 py-20">
                            <Button className="w-[48%]" href="SignIn">Sign In</Button>
                            <Button className="w-[48%]" href="CreateAccount">Create Account</Button>
                        </View>
                    </SafeAreaView>
                    <View className='absolute bottom-0'>
                        <Svg width="393" height="191" viewBox="0 0 393 191" fill="none">
                            <Path d="M0 41.5001C91.4849 136.176 284.573 6.10352e-05 393 6.10352e-05C393 48.1499 393 139.265 393 191C307.5 191 108.427 191 0 191C0 112.5 0 103.85 0 41.5001Z" fill="#D9A362"/>
                        </Svg>
                    </View>
                </SafeAreaProvider>
            </View>
        </>
    );
}