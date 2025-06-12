import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function BluetoothManager() {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanForDevices();
        subscription.remove();
      }
    }, true);

    return () => manager.destroy();
  }, []);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  }

  function scanForDevices() {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error);
        return;
      }

      if (device?.name && !devices.find((d) => d.id === device.id)) {
        setDevices((prev) => [...prev, device]);
      }
    });

    // Stop na 10 seconden
    setTimeout(() => manager.stopDeviceScan(), 10000);
  }

  return (
    <View>
      <Text>Gevonden apparaten:</Text>
      {devices.map((device) => (
        <Text key={device.id}>{device.name || 'Naamloos apparaat'}</Text>
      ))}
      <Button title="Opnieuw scannen" onPress={scanForDevices} />
    </View>
  );
}

