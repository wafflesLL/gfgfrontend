import { View, Text} from "react-native";
import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ComponentProps<"button">{
    variant?: ButtonVariant;
    className?: string;
    size?: string;
    children?: React.ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-secondary border border-foregroun py-4 px-8 border-[5px] rounded-[20px] flex-2 items-center justify-center",
    secondary: "",
    danger: "",
    ghost: "",
};

const textVariants: Record<ButtonVariant, string> = {
    primary: "text-foreground font-bold",
    secondary: "",
    danger: "",
    ghost: "",
};

function Button({
    className,
    variant = "primary",
    size,
    children,
}: ButtonProps){
    const variantClass = buttonVariants[variant] || buttonVariants.primary;
    const variantTextClass = textVariants[variant] || textVariants.primary;
    return (
        <View className={`${variantClass} ${className} p-[${size}]items-center justify-center`}>
            {React.Children.map(children, (child: React.ReactNode) =>
                typeof child === "string" || typeof child === "number"
                    ? <Text className={`${variantTextClass} ${className} text-center leading-tight`}>{child}</Text>
                    : child 
            )}
        </View>
    );
}


export { Button, ButtonProps };