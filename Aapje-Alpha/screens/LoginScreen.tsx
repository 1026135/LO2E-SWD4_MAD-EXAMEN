// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigation.replace('Dashboard');
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
