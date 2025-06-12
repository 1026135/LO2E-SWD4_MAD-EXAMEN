import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { bluetoothManager } from '../services/BluetoothManager';
import { logAction } from '../services/api';

export default function DashboardScreen() {
  const [device, setDevice] = useState(null);

  const connect = async () => {
    try {
      const foundDevice = await bluetoothManager.scanForDevicesOnce();
      const connectedDevice = await bluetoothManager.connectToDevice(foundDevice);
      setDevice(connectedDevice);
      Alert.alert('Verbonden met: ' + connectedDevice.name);
    } catch (e) {
      Alert.alert('Fout bij verbinden:', e.message || e.toString());
    }
  };

  const sendCommand = async () => {
    if (!device) {
      Alert.alert('Verbind eerst met de robot.');
      return;
    }

    try {
      const SERVICE_UUID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
      const CHARACTERISTIC_UUID = 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy';

      await bluetoothManager.sendCommand(device, SERVICE_UUID, CHARACTERISTIC_UUID, '5');

      // Log naar API sturen
      const userId = 'demo-gebruiker'; // later vervangen door echte user-id
      await logAction(userId, 5);

      Alert.alert('Commando 5 verzonden en gelogd!');
    } catch (e) {
      Alert.alert('Fout bij verzenden of loggen:', e.message || e.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {device ? 'Verbonden met: ' + device.name : 'Nog niet verbonden'}
      </Text>
      <Button title="Verbind met robot" onPress={connect} />
      <View style={{ height: 20 }} />
      <Button title="Stuur Commando 5" onPress={sendCommand} disabled={!device} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  status: { marginBottom: 10, fontSize: 16, textAlign: 'center' },
});
