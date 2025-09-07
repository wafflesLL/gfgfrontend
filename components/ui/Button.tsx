import { View, TouchableOpacityProps, TouchableOpacity, Text} from "react-native";
import { Link } from "expo-router";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends TouchableOpacityProps {
    variant?: ButtonVariant;
    className?: string;
    size?: string;
    href?: string;
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
    href,
    ...props
}: ButtonProps) {
    const variantClass = buttonVariants[variant] || buttonVariants.primary;

    const output = (
        <TouchableOpacity className={`${variantClass} ${className} p-[${size}]`} {...props}>
            {typeof props.children === 'string' ? (
                <Text className="text-center">{props.children}</Text>
            ) : (
                props.children
            )}
        </TouchableOpacity>
    );

    if(!href){
        return output;
    }else{
        return(
            <Link href={href ?? "/"} asChild>
                {output}
            </Link>
        );
    }
}


export { Button, ButtonProps };