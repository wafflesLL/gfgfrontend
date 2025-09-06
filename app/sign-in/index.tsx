import { TextArea } from "@/components/ui/TextArea";
import { Text, View, Button} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function About(){
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
        email: "",
        password: "",
        },
    })
    interface FormData {
        email: string;
        password: string;
    }

    const onSubmit = (data: FormData) => console.log(data);
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary gap-8">
                <Text className="w-screen text-center font-semibold text-5xl">Sign In</Text>
                <View className="flex-1 items-center gap-4 px-10">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                        <TextArea 
                            title="Email Address"
                            className="text-xl"
                            value={value}
                            onChange={onChange}
                        />
                        )}
                        name="email"
                    />
                    {errors.email && <Text className="text-warning">This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                        <TextArea 
                            Password={true}
                            title="Password"
                            className="text-xl"
                            onChange={onChange}
                            value={value}
                        />

                        )}
                        name="password"
                    />
                    {errors.password && <Text className="text-warning">This is required.</Text>}

                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}