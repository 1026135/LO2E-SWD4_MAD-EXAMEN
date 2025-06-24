import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { loginStyles } from '../styles/stylesLight';

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
        <View style={loginStyles.container}>
            <Text style={loginStyles.title}>Log in</Text>
            <TextInput
                placeholder="Gebruikersnaam"
                value={username}
                onChangeText={setUsername}
                style={loginStyles.input}
            />
            <Button title="Inloggen" onPress={handleLogin} />
        </View>
    );
}
