import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Game } from '../screens/Game';
import { PostAd } from '../screens/PostAd';

const { Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Game" component={Game} />
        <Screen name="PostAd" component={PostAd} />
    </Navigator>
  );
}