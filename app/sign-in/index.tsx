import { TextArea } from "@/components/ui/TextArea";
import { Text, View, Button} from "react-native"
import { useForm, Controller } from "react-hook-form"

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
        <View className="bg-primary flex-1 items-center justify-center gap-4 px-10">
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextArea 
                    title="Email Address"
                    className="text-xl"
                />
                )}
                name="email"
            />
            {errors.email && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextArea 
                    Password={true}
                    title="Password"
                    className="text-xl"
                
                />

                )}
                name="password"
            />
            {errors.password && <Text>This is required.</Text>}
            

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}