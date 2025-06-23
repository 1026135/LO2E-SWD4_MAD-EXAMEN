import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Button, TextInput, StyleSheet, Platform, PermissionsAndroid, Alert,
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const manager = new BleManager();

type Props = {
  onConnected: () => void;
};

export default function StartScreen({ onConnected }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [command, setCommand] = useState('');

  useEffect(() => {
    requestPermissions();
    return () => manager.destroy();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }
  };

  const startScan = async () => {
    setDevices([]);
    setScanning(true);
    setConnectedDevice(null);

    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('❌ Scan-fout:', error);
        setScanning(false);
        return;
      }

      if (device?.name?.includes('HMSoft')) {
        manager.stopDeviceScan();
        setScanning(false);

        try {
          const connected = await device.connect();
          await connected.discoverAllServicesAndCharacteristics();
          setConnectedDevice(connected);
          Alert.alert('Verbonden', `Met ${device.name}`);
          onConnected(); // 👈 move to Login screen
        } catch (err) {
          console.log('❌ Verbindingsfout:', err);
          Alert.alert('Fout', 'Kan niet verbinden met HMSoft');
        }
      }

      if (device && device.name && !devices.find(d => d.id === device.id)) {
        setDevices(prev => [...prev, device]);
      }
    });

    setTimeout(() => {
      if (scanning) {
        manager.stopDeviceScan();
        setScanning(false);
      }
    }, 10000);
  };

  return (
  <View style={styles.container}>
    <Button
      title={scanning ? 'Scannen...' : 'Scan naar HMSoft'}
      onPress={startScan}
      disabled={scanning}
    />
    <Button
      title="Sla scan over, ga naar Login"
      onPress={() => onConnected()}
      color="gray"
      style={{ marginTop: 10 }}
    />

    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text style={styles.device}>{item.name} ({item.id})</Text>}
      style={{ marginTop: 20, maxHeight: 200, width: '100%' }}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 50, paddingHorizontal: 20, alignItems: 'center',
  },
  device: {
    padding: 6, fontSize: 16,
  },
});
