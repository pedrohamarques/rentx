import React from 'react';
import { StatusBar } from 'react-native';
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';


import { Routes } from './src/routes';

import theme from './src/styles/theme';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    // return <AppLoading />
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

