// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Vul beide velden in');
      return;
    }
    console.log('Inloggen met:', username, password);
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aapje Alpha Controle App</Text>

      <TextInput
        style={styles.input}
        placeholder="Gebruikers naam"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8F5', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, marginBottom: 32, fontWeight: 'bold', color: '#1B5E20' },
  input: { width: '100%', borderColor: '#A5D6A7', borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 16, backgroundColor: '#fff' },
  button: { backgroundColor: '#388E3C', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 32, elevation: 3 },
  buttonText: { color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});
