import {useNavigation } from "@react-navigation/native";
import {TouchableOpacityProps, TouchableOpacity, Text, GestureResponderEvent} from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends TouchableOpacityProps {
    variant?: ButtonVariant;
    className?: string;
    size?: string;
    href?: string;
}

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-foreground py-4 px-4 rounded-[20px] flex-2 items-center justify-center",
    secondary: "",
    danger: "",
    ghost: "",
};

function Button({
    className,
    variant = "primary",
    size,
    href,
    ...props
}: ButtonProps) {
    const navigation = useNavigation();
    const variantClass = buttonVariants[variant] || buttonVariants.primary;

    const handlePress = (event: GestureResponderEvent) => {
        if (href) {
            navigation.navigate(href as never);
        }
        if (props.onPress){
            props.onPress(event);
        }
    }
    return(
        <TouchableOpacity className={`${variantClass} ${className} p-[${size}]`} onPress={handlePress} {...props}>
            {typeof props.children === 'string' ? (
                <Text className="text-center text-background text-xl font-bold">{props.children}</Text>
            ) : (
                props.children
            )}
        </TouchableOpacity>
    )
}


export { Button, ButtonProps };