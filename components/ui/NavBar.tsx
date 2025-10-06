import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import Svg, { Path } from 'react-native-svg';

interface NavBarProps {
    className?: string;
}

function ChevronLeft({ size = 24, color = "#000000FF", strokeWidth = 5}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M15 20L7 12L15 4"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default function NavBar({
    className=""
}: NavBarProps){
    const navigation = useNavigation();

    if (!navigation.canGoBack()){
        return null;
    }

    return(
        <>
            <View className={`${className} flex left-[5%] absolute top-[8%]`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} 
                    className="flex flex-row  items-center p-2 border rounded-full border-[5px] bg-primary"
                >
                    <ChevronLeft/>
                </TouchableOpacity> 
            </View>
        </>
    );
}