import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';
import { Link } from 'expo-router';

export default function Home() {
    console.log('Home screen rendered');
    return(
        <View className=" bg-primary fg-foreground flex items-center justify-center flex-1">
            <View className="mx-20 gap-4">
                <Text className="text-7xl text-center font-semibold">Glasses For Good</Text>
                <Image
                    source={require('../assets/logo.webp')}
                    style={{ width: 300, height: 300 }}
                    contentFit="cover"
                />
                <Link href="/about">
                    <Button className="text-3xl w-screen">Sign In</Button>
                </Link>
                <Link href="/about">
                    <Button className="text-3xl w-screen">Create Account</Button>
                </Link>
            </View>
        </View>
    );
}