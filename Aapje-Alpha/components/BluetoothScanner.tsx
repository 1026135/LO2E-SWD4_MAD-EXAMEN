// components/BluetoothScanner.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { bleManager } from '../services/BluetoothManager';
import { Device } from 'react-native-ble-plx';

export default function BluetoothScanner() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const init = async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) startScan();
    };

    init();

    return () => {
      bleManager.stopDeviceScan();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = Platform.Version;

      const permissions =
        apiLevel >= 31
          ? [
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]
          : [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

      const results = await PermissionsAndroid.requestMultiple(permissions);
      const allGranted = Object.values(results).every((r) => r === PermissionsAndroid.RESULTS.GRANTED);

      if (!allGranted) {
        console.warn('Not all permissions granted');
      }

      return allGranted;
    }

    return true; // iOS - handled by BLE lib
  };

  const startScan = () => {
    if (scanning) return;

    setDevices([]);
    setScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        setScanning(false);
        return;
      }

      if (device) {
        setDevices((prevDevices) => {
          if (prevDevices.find((d) => d.id === device.id)) {
            return prevDevices;
          }
          return [...prevDevices, device];
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    bleManager.stopDeviceScan();
    setScanning(false);
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('Connected to', connectedDevice.id);
      alert(`Connected to device: ${device.name ?? device.id}`);
    } catch (e) {
      console.error('Connection error:', e);
      alert('Failed to connect: ' + e);
    }
  };

  const renderItem = ({ item }: { item: Device }) => (
    <TouchableOpacity style={styles.deviceItem} onPress={() => connectToDevice(item)}>
      <Text style={styles.deviceName}>{item.name ?? 'Unnamed device'}</Text>
      <Text style={styles.deviceId}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{scanning ? 'Scanning for devices...' : 'Scan stopped'}</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No devices found yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  statusText: { fontSize: 16, marginBottom: 10 },
  deviceItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  deviceName: { fontWeight: 'bold', fontSize: 16 },
  deviceId: { fontSize: 12, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
});
