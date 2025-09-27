import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function Dashboard(){
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 flex-col items-center justify-center">
                <Text className="text-xl">Dashboard</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
