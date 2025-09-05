import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
export default function CreateAccount(){
    return(
        <>
            <View className="flex-1 justify-center items-center">
                <Stack.Screen
                    options={{
                        animation: "slide_from_bottom",
                    }}
                />
                <Text> hi</Text>
            </View>
        </>
    );
}