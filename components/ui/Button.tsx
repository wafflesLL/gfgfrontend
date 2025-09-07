import { View, TouchableOpacityProps, TouchableOpacity} from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends TouchableOpacityProps{
    variant?: ButtonVariant;
    className?: string;
    size?: string;
}

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-secondary border border-foregroun py-4 px-8 border-[5px] rounded-[20px] flex-2 items-center justify-center",
    secondary: "",
    danger: "",
    ghost: "",
};

function Button({
    className,
    variant = "primary",
    size,
    ...props
}: ButtonProps){
    const variantClass = buttonVariants[variant] || buttonVariants.primary;
    return (
        <View className={`${variantClass} ${className} p-[${size}]items-center justify-center`}>
            <TouchableOpacity {...props}/>
       </View>
    );
}


export { Button, ButtonProps };