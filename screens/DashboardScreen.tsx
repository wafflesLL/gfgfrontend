import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Button } from "../components/ui/Button";
import { useAuth } from '../components/ui/AuthContext';

export default function Dashboard(){
    const { onLogout } = useAuth();

    const logout = async () => {
        await onLogout!();
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 flex-col items-center justify-center">
                <Text className="text-xl">Dashboard</Text>
                <Button onPress={logout}>Log Out</Button>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
