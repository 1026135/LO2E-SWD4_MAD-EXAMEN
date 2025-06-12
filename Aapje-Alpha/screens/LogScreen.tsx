import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function LogsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Logs" />
      <View style={styles.content}>
        <Text>Log history will appear here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
});
