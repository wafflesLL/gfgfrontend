import { TextArea } from "../components/ui/TextArea";
import { Text, TouchableWithoutFeedback, View, Keyboard} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import NavBar from "../components/ui/NavBar";
import Svg, { Path } from 'react-native-svg';
import {useState} from 'react';
import { useAuth } from '../components/ui/AuthContext';
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { onRegister, authState } = useAuth();
    const navigation = useNavigation();

    const register = async () => {
        const result = await onRegister!(username, email, password);
        if (result && result.msg) {
            alert(result.msg);
            return;
        }
        navigation.navigate("VerifyEmail" as never);
    }

    return(
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="flex justify-center items-center h-screen">
                    <Svg width="393" height="172" viewBox="0 0 393 172" fill="none">
                        <Path d="M393 149.5C301.515 54.824 66.5 231 0 149.5C3.8147e-05 101.35 0 51.7348 0 1.94973e-05C85.5 -2.43717e-05 284.573 1.94973e-05 393 1.94973e-05C393 78.5 393 87.1499 393 149.5Z" fill="#D9A362"/>
                    </Svg>
                    <NavBar/>
                    <SafeAreaProvider className="w-screen">
                        <SafeAreaView className="py-2 gap-2">
                            <Text className="text-5xl font-semibold">Create Account</Text>
                            <View className="gap-4 items-center">
                                <TextArea
                                    onChange={(text: string) => setUsername(text)}
                                    className="text-xl"
                                    value={username}
                                    title="Username"
                                    autoFocus={true}
                                />
                                <TextArea
                                    onChange={(text: string) => setEmail(text)}
                                    className="text-xl"
                                    value={email}
                                    title="Email Address"
                                />
                                <TextArea
                                    onChange={(text: string) => setPassword(text)}
                                    className="text-xl"
                                    value={password}
                                    title="Password"
                                    Password={true}
                                />
                                <Checkbox/>
                                <Button onPress={register}
                                className="w-[60%]">
                                    <Text className="text-center text-background text-xl font-bold">Create Account</Text>
                                </Button>
                            </View>
                        </SafeAreaView>
                    </SafeAreaProvider>
                    <Svg width="393" height="191" viewBox="0 0 393 191" fill="none"> 
                        <Path d="M0 6.10352e-05C165 4.57764e-05 344.5 148.5 393 6.10352e-05C393 48.1498 393 139.265 393 191C307.5 191 108.427 191 0 191C0 112.5 0 62.35 0 6.10352e-05Z" fill="#D9A362"/>
                    </Svg>
                </View>
            </TouchableWithoutFeedback> 
        </>
    );
}
