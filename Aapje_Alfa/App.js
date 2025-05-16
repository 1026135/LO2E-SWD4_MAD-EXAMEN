import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';

const BluetoothComponent = () => {
  const manager = new BleManager();

  useEffect(() => {
    const startScan = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        const allGranted = Object.values(granted).every(p => p === PermissionsAndroid.RESULTS.GRANTED);
        if (!allGranted) {
          console.warn('Required permissions not granted');
          return;
        }
      }

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log('Scan error:', error);
          return;
        }

        if (device?.name) {
          console.log(`Discovered device: ${device.name} [${device.id}]`);

          // Example: connect to device
          if (device.name === 'MyBLEDevice') {
            manager.stopDeviceScan();

            device.connect()
              .then(d => d.discoverAllServicesAndCharacteristics())
              .then(d => {
                console.log('Connected to', d.name);
                // Read/write characteristics here
              })
              .catch(err => {
                console.error('Connection error:', err);
              });
          }
        }
      });
    };

    startScan();

    return () => {
      manager.destroy();
    };
  }, []);

  return null;
};

export default BluetoothComponent;

