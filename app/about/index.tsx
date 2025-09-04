import { Button } from "@/components/ui/Button";
import { View, Text } from "react-native";
import { Link } from "expo-router";
export default function About(){
    return(
        <View className="flex-1 justify-center items-center">
            <Link href="/">
                <Button className="">hi</Button> 
            </Link>
        </View>
    );
}