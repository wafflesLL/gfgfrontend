import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../components/ui/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    const { authState } = useAuth();
    return(
        <NavigationContainer>
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <>
                        <Stack.Screen
                            name="Dashboard"
                            component={DashboardScreen}
                            options={{ headerShown:false }}
                        />                    
                    </>

                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown:false }}
                        />                    
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{ headerShown:false }}
                        />                    
                        <Stack.Screen
                            name="CreateAccount"
                            component={CreateAccountScreen}
                            options={{ headerShown:false }}
                        />                    
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}