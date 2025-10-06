import { TextArea } from "../components/ui/TextArea";
import { Text, TouchableWithoutFeedback, View, Keyboard} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from '../components/ui/Button';
import NavBar from "../components/ui/NavBar";

export default function CreateAccount(){
    return(
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="flex justify-center items-center h-screen">
                    <NavBar/>
                    <SafeAreaProvider className="">
                        <SafeAreaView className="">
                            <Text>create account</Text>
                        </SafeAreaView>
                    </SafeAreaProvider>
                    </View>
            </TouchableWithoutFeedback> 
        </>
    );
}
