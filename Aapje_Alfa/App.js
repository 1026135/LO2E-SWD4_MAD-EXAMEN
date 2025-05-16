import React, { useEffect, useState } from 'react';
import { Button, View, Text, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

const manager = new BleManager();

export default function App() {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const scanAndConnect = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        ]);
      }

      manager.startDeviceScan(null, null, async (error, scannedDevice) => {
        if (error) {
          console.error(error);
          return;
        }

        if (scannedDevice?.name === 'MyBLEDevice') {
          manager.stopDeviceScan();
          try {
            const connectedDevice = await scannedDevice.connect();
            await connectedDevice.discoverAllServicesAndCharacteristics();
            setDevice(connectedDevice);
            console.log('Connected to:', connectedDevice.name);
          } catch (err) {
            console.error('Connection error:', err);
          }
        }
      });
    };

    scanAndConnect();

    return () => {
      manager.destroy();
    };
  }, []);

  const sendNumber = async (num) => {
    if (!device) return;

    const serviceUUID = 'YOUR_SERVICE_UUID';
    const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';
    const value = base64.encode(String(num)); // Convert to base64

    try {
      await device.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        value
      );
      console.log('Sent:', num);
    } catch (error) {
      console.error('Write failed:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{device ? `Connected to ${device.name}` : 'Scanning...'}</Text>
      <Button title="Send Number 42" onPress={() => sendNumber(42)} />
    </View>
  );
}
