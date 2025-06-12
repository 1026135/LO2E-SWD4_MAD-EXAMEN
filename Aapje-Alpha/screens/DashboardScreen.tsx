import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <View style={styles.content}>
        <Text>Welcome to the Dashboard!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
});

