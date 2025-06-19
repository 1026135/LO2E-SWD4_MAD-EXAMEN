// screens/StartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, PermissionsAndroid, Platform } from 'react-native';
import { Device } from 'react-native-ble-plx';
import BLEService from '../services/BLEService';

export default function StartScreen({ navigation }: any) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);

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

    BLEService.manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log(error);
        setScanning(false);
        return;
      }

      if (device?.name?.includes('HMSoft')) {
        BLEService.manager.stopDeviceScan();
        setScanning(false);
        try {
          await BLEService.connectTo(device);
          Alert.alert('Verbonden', `Met ${device.name}`);
          setTimeout(() => {
            navigation.replace('Login');
          }, 10000);
        } catch {
          Alert.alert('Fout', 'Kan niet verbinden');
        }
      }

      if (device && device.name && !devices.find(d => d.id === device.id)) {
        setDevices(prev => [...prev, device]);
      }
    });

    setTimeout(() => {
      BLEService.manager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  useEffect(() => {
    requestPermissions();
    return () => BLEService.destroy();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: 'center' }}>
      <Button title={scanning ? 'Scannen...' : 'Scan naar HMSoft'} onPress={startScan} disabled={scanning} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}