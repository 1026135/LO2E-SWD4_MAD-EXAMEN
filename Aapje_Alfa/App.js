import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

const SERVICE_UUID = '00001234-0000-1000-8000-00805f9b34fb'; // Replace with your service UUID
const CHARACTERISTIC_UUID = '00005678-0000-1000-8000-00805f9b34fb'; // Replace with your characteristic UUID

const BluetoothSender = () => {
  const [manager] = useState(new BleManager());
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      }
    };

    const connectToDevice = async () => {
      manager.startDeviceScan(null, null, async (error, scannedDevice) => {
        if (error) {
          console.warn(error);
          return;
        }

        if (scannedDevice?.name === 'MyBLEDevice') {
          manager.stopDeviceScan();
          try {
            const connectedDevice = await scannedDevice.connect();
            await connectedDevice.discoverAllServicesAndCharacteristics();
            setDevice(connectedDevice);
            console.log('Connected to', connectedDevice.name);
          } catch (err) {
            console.error('Connection error:', err);
          }
        }
      });
    };

    requestPermissions().then(connectToDevice);

    return () => {
      manager.destroy();
    };
  }, [manager]);

  const sendNumber = async (number) => {
    if (!device) {
      console.warn('No connected device');
      return;
    }

    const encoded = base64.encode(number.toString()); // Send as base64-encoded string
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encoded
      );
      console.log(`Sent number ${number}`);
    } catch (err) {
      console.error('Write error:', err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Bluetooth Number Sender</Text>
      <Button title="Send 42" onPress={() => sendNumber(42)} />
    </View>
  );
};

export default BluetoothSender;

