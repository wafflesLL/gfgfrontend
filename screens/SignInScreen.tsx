import { TextArea } from "../components/ui/TextArea";
import { Text, TouchableWithoutFeedback, View, Keyboard} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from '../components/ui/Button';
import { useState } from "react";
import { useAuth } from '../components/ui/AuthContext';
import Svg, { Path } from "react-native-svg";
import { Link } from "@react-navigation/native";
import NavBar from "../components/ui/NavBar";

export default function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, authState } = useAuth();

    const login = async () => {
        const result = await onLogin!(username, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };

    return(
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="bg-background flex justify-center items-center h-screen">
                    <Svg width="393" height="172" viewBox="0 0 393 172" fill="none">
                        <Path d="M394 149.5C301.515 54.824 66.5 231 0 149.5C3.8147e-05 101.35 0 51.7348 0 1.94973e-05C85.5 -2.43717e-05 284.573 1.94973e-05 393 1.94973e-05C393 78.5 393 87.1499 393 149.5Z" fill="#D9A362"/>
                    </Svg>
                    <NavBar/>
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1 gap-2 py-2">
                            <Text className="w-screen text-center font-semibold text-5xl">Sign In</Text>
                            <View className="flex-1 items-center gap-4 px-8">
                                <TextArea
                                    onChange={(text: string) => setUsername(text)}
                                    className="text-xl"
                                    value={username}
                                    title="Username"
                                    autoFocus={true}
                                />
                                <TextArea
                                    onChange={(text: string) => setPassword(text)}
                                    className="text-xl"
                                    value={password}
                                    title="Password"
                                    Password={true}
                                />
                                <Button onPress={login} className="w-[50%]">
                                    <Text className="text-center text-background text-xl font-bold">Sign In</Text>
                                </Button>
                                <Link screen="ResetPassword" params={{}} className="text-xl">
                                    Forgot Password? 
                                </Link>
                            </View>
                        </SafeAreaView>
                    </SafeAreaProvider>
                    <Svg width="393" height="191" viewBox="0 0 393 191" fill="none">
                        <Path d="M0 3.05176e-05C165 1.91331e-05 79.5 156 393 6.10352e-05C393 48.1498 393 139.265 393 191C307.5 191 108.427 191 0 191C0 112.5 0 62.35 0 3.05176e-05Z" fill="#D9A362"/>
                    </Svg>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}
