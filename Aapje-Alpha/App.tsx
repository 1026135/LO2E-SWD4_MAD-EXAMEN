import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import BluetoothControlScreen from './screens/BluetoothControlScreen';
import StatistiekenScreen from './screens/StatistiekenScreen';
import LogboekScreen from './screens/LogboekScreen';
import InstellingenScreen from './screens/InstellingenScreen';

import { appStyles } from './styles/stylesLight';

type Screen = 'home' | 'statistieken' | 'logboek' | 'instellingen';

const screenTitles: Record<Screen, string> = {
  home: 'Dashboard',
  statistieken: 'Statistieken',
  logboek: 'Logboek',
  instellingen: 'Instellingen',
};

export default function App() {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');

  const logout = () => {
    setUsername('');
    setScreen('home');
    setMenuOpen(false);
  };

  if (!username) {
    return <LoginScreen onLogin={setUsername} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <BluetoothControlScreen username={username} />;
      case 'statistieken':
        return <StatistiekenScreen />;
      case 'logboek':
        return <LogboekScreen />;
      case 'instellingen':
        return <InstellingenScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top bar */}
      <View style={appStyles.topBar}>
        <View style={appStyles.titleContainer}>
          <Text style={appStyles.screenTitle}>{screenTitles[screen]}</Text>
          <Text style={appStyles.username}>Ingelogd als {username}</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={appStyles.menuButton}>
          <Text style={appStyles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
      {menuOpen && (
        <View style={appStyles.sideMenu}>
          <Button title="🏠 Home" onPress={() => { setScreen('home'); setMenuOpen(false); }} />
          <Button title="📊 Statistieken" onPress={() => { setScreen('statistieken'); setMenuOpen(false); }} />
          <Button title="📜 Logboek" onPress={() => { setScreen('logboek'); setMenuOpen(false); }} />
          <Button title="⚙️ Instellingen" onPress={() => { setScreen('instellingen'); setMenuOpen(false); }} />
          <Button title="🚪 Uitloggen" onPress={logout} color="red" />
        </View>
      )}

      {/* Main content */}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </View>
  );
}
