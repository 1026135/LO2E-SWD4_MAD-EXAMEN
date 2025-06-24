import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username.trim());
    } else {
      Alert.alert('Fout', 'Gebruikersnaam is verplicht');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        placeholder="Gebruikersnaam"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Inloggen" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 50, paddingHorizontal: 20, alignItems: 'center',
  },
  title: {
    fontSize: 20, marginBottom: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#aaa', borderRadius: 6, padding: 10,
    width: '100%', marginBottom: 10,
  },
});
