/*
// screens/Dashboard.tsx
import React from 'react';
import { View, Text } from 'react-native';
export default function Dashboard() {
  return <View><Text>📊 Dashboard</Text></View>;
}
*/

// screens/Dashboard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BLEService from '../services/BLEService';

const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

export default function Dashboard({ route }: any) {
  const [username] = useState(route.params?.username || 'onbekend');

  const sendNumber = async (num: string) => {
    try {
      await BLEService.send(num);

      // log to backend
      await fetch('http://YOUR_SERVER_IP:3000/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, number: num }),
      });

      Alert.alert('Verzonden', `Nummer ${num} is verzonden naar Arduino`);
    } catch (err) {
      console.error('Fout:', err);
      Alert.alert('Fout', 'Kon nummer niet verzenden of loggen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stuur een getal naar Aapje Alpha</Text>
      <View style={styles.grid}>
        {numbers.map(num => (
          <TouchableOpacity key={num} style={styles.button} onPress={() => sendNumber(num)}>
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center' },
  button: { backgroundColor: '#2196F3', padding: 20, margin: 10, borderRadius: 8, width: 60, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 },
});