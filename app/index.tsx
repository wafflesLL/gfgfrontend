import { Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function Home() {
    console.log('Home screen rendered');
    return(
        <View className="bg-primary fg-foreground flex items-center justify-center flex-1">
            <Text className="text-7xl text-center">Glasses For Good</Text>
            <Image
                source={require('../assets/logo.webp')}
                style={{ width: 200, height: 200 }}
                contentFit="cover"
            />
        </View>
    );
}