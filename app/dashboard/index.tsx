import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { loadRefreshToken } from "@/lib/keychain";

export default function Dashboard(){
    const creds = loadRefreshToken();
    return(
        <SafeAreaProvider>
            <Stack.Screen
                options={{
                    animation: "slide_from_bottom"
                }}
            />
            <SafeAreaView className="flex-1 flex-col items-center justify-center">
                <Text className="text-xl">Dashboard</Text>
                <Text className="text-xl">{creds}</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
