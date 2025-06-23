import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Start' | 'Login'>('Start');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginScreen />;
      case 'Start':
      default:
        return <StartScreen onConnected={() => setCurrentScreen('Login')} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
