import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Header from '../components/Header';
import { bluetoothManager } from '../services/BluetoothManager';
import { Device } from 'react-native-ble-plx';

export default function DashboardScreen() {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const connectToRobot = () => {
    bluetoothManager.scanForDevices(async (device) => {
      try {
        const connected = await bluetoothManager.connectToDevice(device);
        setConnectedDevice(connected);
        Alert.alert('Verbonden met robot: ' + connected.name);
      } catch (error) {
        Alert.alert('Verbindingsfout', String(error));
      }
    });
  };

  const sendCommand = (command: string) => {
    if (!connectedDevice) {
      Alert.alert('Eerst verbinden met de robot.');
      return;
    }

    // Vervang deze UUIDs met die van jouw robot (vraag leverancier indien onbekend)
    const SERVICE_UUID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    const CHARACTERISTIC_UUID = 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy';

    bluetoothManager.sendCommand(connectedDevice, SERVICE_UUID, CHARACTERISTIC_UUID, command);
  };

  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <View style={styles.content}>
        <Text style={styles.status}>
          {connectedDevice
            ? `Verbonden met: ${connectedDevice.name}`
            : 'Nog niet verbonden met robot'}
        </Text>
        <Button title="Verbind met Aapje Alpha" onPress={connectToRobot} />
        <View style={styles.spacing} />
        <Button title="Stuur Commando 5 (Vooruit)" onPress={() => sendCommand('5')} disabled={!connectedDevice} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  spacing: { height: 20 },
  status: { marginBottom: 10, fontSize: 16 },
});
