import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes'; 

import { 
  useFonts ,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { Subscription } from 'expo-modules-core';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import * as Notifications from 'expo-notifications';
import './src/services/notificationConfigs';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <>
      <Background>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        { fontsLoaded ? <Routes /> : <Loading /> }

      </Background>


    </>
  );
}