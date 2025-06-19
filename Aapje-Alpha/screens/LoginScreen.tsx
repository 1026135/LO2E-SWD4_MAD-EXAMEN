// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigation.replace('Dashboard', { username })
    } else {
      Alert.alert('Fout', 'Onjuiste inloggegevens');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Gebruikersnaam" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Wachtwoord" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Inloggen" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 6 },
});

// navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Actielogboek from '../screens/Actielogboek';
import Statistieken from '../screens/Statistieken';
import Instellingen from '../screens/Instellingen';
import { View, Button } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Actielogboek" component={Actielogboek} />
      <Drawer.Screen name="Statistieken-overzicht" component={Statistieken} />
      <Drawer.Screen name="Instellingen" component={Instellingen} />
      <Drawer.Screen
        name="Logout"
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Bevestig uitloggen" onPress={() => navigation.replace('Login')} />
          </View>
        )}
      />
    </Drawer.Navigator>
  );
}