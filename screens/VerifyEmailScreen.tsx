import { View, Text } from 'react-native';
import NavBar from '../components/ui/NavBar';
import { Button } from '../components/ui/Button';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from 'react-native-svg';

export default function VerifyEmail(){
    return (

        <>
            <View className="flex justify-center items-center h-screen">
                <Svg width="393" height="172" viewBox="0 0 393 172" fill="none">
                    <Path d="M393 149.5C301.515 54.824 66.5 231 0 149.5C3.8147e-05 101.35 0 51.7348 0 1.94973e-05C85.5 -2.43717e-05 284.573 1.94973e-05 393 1.94973e-05C393 78.5 393 87.1499 393 149.5Z" fill="#D9A362"/>
                </Svg>
                <NavBar/>    
                <SafeAreaProvider>
                    <SafeAreaView className="items-center py-6 gap-8">
                        <Text className="text-5xl font-semibold">Check Your Email</Text>
                        <View className="gap-4 w-[80%]">
                            <Text className="text-xl font-semibold text-center">
                                We will send a link to your inbox to confirm your identity.
                            </Text>
                            <Text className="text-xl font-semibold text-center">
                                After that is submitted, you can sign in.
                            </Text>
                        </View>
                        <Button href="SignIn" className="w-[60%]">
                            <Text className="text-xl text-background font-bold text-center">Go to Sign In</Text>
                        </Button>
                    </SafeAreaView>
                </SafeAreaProvider>
                <Svg width="393" height="191" viewBox="0 0 393 191" fill="none"> 
                    <Path d="M0 6.10352e-05C165 4.57764e-05 344.5 148.5 393 6.10352e-05C393 48.1498 393 139.265 393 191C307.5 191 108.427 191 0 191C0 112.5 0 62.35 0 6.10352e-05Z" fill="#D9A362"/>
                </Svg>
            </View>
        </>
    );
}