import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { View, Text } from "react-native";
import { Link, Stack } from "expo-router";
export default function About(){

    return(
        <View className="bg-primary flex-1 justify-center gap-20 items-center">
            <Stack.Screen
                options={{
                    animation: "slide_from_bottom",
                    animationDuration: 300, 
                }}
            />
            <Text className="text-5xl font-semibold">Sign In!</Text>
            <View className="gap-6 px-20 object-contain w-screen items-center">
                <TextArea
                    className="text-2xl"
                    autoComplete="email"
                    keyboardType="email-address"
                    title="Email Address"
                />
                <TextArea
                    className="text-2xl"
                    autoComplete="current-password"
                    Password={true}
                    title="Password"
                />
                <Button className="w-full">Submit</Button> 
            </View>
        </View>
    );
}