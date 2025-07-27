import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { useUserStore } from '../store/user';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const user = useUserStore((state) => state.user);
  const needsOnboarding = user && !user.approved;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      {!user && [
        <Stack.Screen key="Login" name="Login" component={LoginScreen} />,
        <Stack.Screen key="Register" name="Register" component={RegisterScreen} />
      ]}
      {user && needsOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      {user && user.approved && (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      )}
    </Stack.Navigator>
  );
} 