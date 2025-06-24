import React, { useState } from 'react';
import {
  View, Text, Button, TouchableOpacity, StyleSheet
} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import BluetoothControlScreen from './screens/BluetoothControlScreen';
import StatistiekenScreen from './screens/StatistiekenScreen';
import LogboekScreen from './screens/LogboekScreen';
import InstellingenScreen from './screens/InstellingenScreen';

type Screen = 'home' | 'statistieken' | 'logboek' | 'instellingen';

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
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.username}>Ingelogd als {username}</Text>
      </View>

      {/* Side Menu */}
      {menuOpen && (
        <View style={styles.sideMenu}>
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

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  menuButton: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 24,
  },
  username: {
    fontSize: 16,
  },
  sideMenu: {
    backgroundColor: '#fff',
    padding: 10,
    elevation: 4,
    zIndex: 1,
  },
});
