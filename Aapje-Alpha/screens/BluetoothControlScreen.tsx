import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const manager = new BleManager();

interface Props {
  username: string;
}

export default function BluetoothControlScreen({ username }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

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
        console.log(`✅ HMSoft gevonden: ${device.name}`);
        manager.stopDeviceScan();
        setScanning(false);

        try {
          const connected = await device.connect();
          await connected.discoverAllServicesAndCharacteristics();
          setConnectedDevice(connected);
          Alert.alert('Verbonden', `Met ${device.name}`);
        } catch (err) {
          console.log('❌ Verbindingsfout:', err);
          Alert.alert('Fout', 'Kan niet verbinden met HMSoft');
        }
      }

      if (device && device.name && !devices.find((d) => d.id === device.id)) {
        setDevices((prev) => [...prev, device]);
      }
    });

    setTimeout(() => {
      if (scanning) {
        manager.stopDeviceScan();
        setScanning(false);
      }
    }, 10000);
  };

  const sendCommand = async (value: string) => {
    if (!connectedDevice) return;
    try {
      const services = await connectedDevice.services();
      for (const service of services) {
        if (service.uuid.toUpperCase().includes('FFE0')) {
          const characteristics = await service.characteristics();
          for (const char of characteristics) {
            if (
              char.uuid.toUpperCase().includes('FFE1') &&
              char.isWritableWithResponse
            ) {
              const base64Command = Buffer.from(value, 'utf-8').toString('base64');
              await char.writeWithResponse(base64Command);
              Alert.alert('Verzonden', `Commando "${value}" verzonden door ${username}`);
              console.log(`[LOG] ${new Date().toISOString()} | ${username} sent: "${value}"`);
              return;
            }
          }
        }
      }
      Alert.alert('Niet gevonden', 'Geen juiste characteristic (FFE1) gevonden');
    } catch (err) {
      console.log('❌ Fout bij verzenden:', err);
    }
  };

  const renderButton = (label: string) => (
    <View style={styles.buttonWrapper} key={label}>
      <Button title={label} onPress={() => sendCommand(label)} />
    </View>
  );

  useEffect(() => {
    requestPermissions();
    return () => manager.destroy();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={scanning ? 'Scannen...' : 'Scan naar HMSoft'}
        onPress={startScan}
        disabled={scanning}
      />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.device}>{item.name} ({item.id})</Text>
        )}
        style={{ marginTop: 20, maxHeight: 200, width: '100%' }}
      />

      {connectedDevice && (
        <View style={styles.commandBox}>
          <Text style={styles.keypadLabel}>Kies een commando:</Text>

          <View style={styles.row}>
            {['1', '2', '3'].map(renderButton)}
          </View>
          <View style={styles.row}>
            {['4', '5', '6'].map(renderButton)}
          </View>
          <View style={styles.row}>
            {['7', '8', '9'].map(renderButton)}
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }} />
            {renderButton('0')}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  device: {
    padding: 6,
    fontSize: 16,
  },
  commandBox: {
    marginTop: 30,
    width: '100%',
  },
  keypadLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
