import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function Dashboard(){
    return(
        <SafeAreaProvider>
            <Stack.Screen
                options={{
                    animation: "slide_from_bottom"
                }}
            />
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text className="text-xl">Dashboard</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
