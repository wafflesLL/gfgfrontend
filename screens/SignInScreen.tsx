import { TextArea } from "../components/ui/TextArea";
import { Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from '../components/ui/Button';
import { useState } from "react";
import { useAuth } from '../components/ui/AuthContext';

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
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary gap-8 py-8">
                <Text className="w-screen text-center font-semibold text-5xl">Sign In</Text>
                <View className="flex-1 items-center gap-4 px-10">
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
                    <Button onPress={login}>
                        <Text className="text-2xl font-bold">Sign In</Text>
                    </Button>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
