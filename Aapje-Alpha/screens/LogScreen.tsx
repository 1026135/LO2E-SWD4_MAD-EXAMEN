// screens/LogsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LogsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logs</Text>
      <Text>Hier zie je je logs.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
