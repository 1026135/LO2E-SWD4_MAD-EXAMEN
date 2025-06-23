// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // You can add validation here if you want
    if (name.trim() && password.trim()) {
      // For now, just call onLoginSuccess on submit
      onLoginSuccess();
    } else {
      alert('Vul naam en wachtwoord in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Naam</Text>
      <TextInput
        style={styles.input}
        placeholder="Naam"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Wachtwoord</Text>
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Inloggen" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
});

