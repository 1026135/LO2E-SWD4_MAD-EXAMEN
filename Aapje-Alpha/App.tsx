// App.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import BluetoothControlScreen from './screens/BluetoothControlScreen';
import LogboekScreen from './screens/LogboekScreen';
import StatistiekenScreen from './screens/StatistiekenScreen';

export default function App() {
  const [username, setUsername] = useState('');
  const [screen, setScreen] = useState<'home' | 'logboek' | 'statistieken' | 'instellingen'>('home');
  const [refreshKey, setRefreshKey] = useState(0);

  const logout = () => {
    setUsername('');
    setScreen('home');
  };

  const refreshLogs = () => setRefreshKey(prev => prev + 1);

  if (!username) return <LoginScreen onLogin={setUsername} />;

  const renderContent = () => {
    switch (screen) {
      case 'logboek':
        return <LogboekScreen refreshKey={refreshKey} />;
      case 'statistieken':
        return <StatistiekenScreen />;
      case 'instellingen':
        return <Text style={styles.page}>Instellingen (placeholder)</Text>;
      default:
        return <BluetoothControlScreen username={username} refreshLogs={refreshLogs} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Button title="Home" onPress={() => setScreen('home')} />
        <Button title="Logboek" onPress={() => setScreen('logboek')} />
        <Button title="Statistieken" onPress={() => setScreen('statistieken')} />
        <Button title="Instellingen" onPress={() => setScreen('instellingen')} />
        <Button title="Logout" onPress={logout} />
      </View>
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  content: { flex: 1, padding: 10 },
  page: { fontSize: 20, padding: 20 },
});
