import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Button, Platform, PermissionsAndroid, Alert } from 'react-native';
import { BleManager, Device, State } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { bluetoothStyles } from '../styles/stylesLight';
import GlassButton from '../components/GlassButton';

const manager = new BleManager();

interface Props {
  username: string;
}

export default function BluetoothControlScreen({ username }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.BLUETOOTH_SCAN'] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.BLUETOOTH_CONNECT'] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.ACCESS_FINE_LOCATION'] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert(
            'Permissies nodig',
            'Bluetooth permissies zijn nodig om te scannen en verbinden'
          );
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permissie nodig',
            'Locatie permissie is nodig voor Bluetooth'
          );
        }
      }
    }
  };

  const startScan = async () => {
    const state = await manager.state();
    if (state !== State.PoweredOn) {
      Alert.alert('Bluetooth uit', 'Zet Bluetooth aan om te kunnen scannen');
      return;
    }

    setDevices([]);
    setScanning(true);
    setConnectedDevice(null);

    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('❌ Scan-fout:', error);
        setScanning(false);
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
          scanTimeoutRef.current = null;
        }
        return;
      }

      if (device?.name?.includes('HMSoft')) {
        console.log(`HMSoft gevonden: ${device.name}`);
        manager.stopDeviceScan();
        setScanning(false);
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
          scanTimeoutRef.current = null;
        }

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

      if (device && device.name) {
        setDevices((prev) => {
          if (!prev.find((d) => d.id === device.id)) {
            return [...prev, device];
          }
          return prev;
        });
      }
    });

    scanTimeoutRef.current = setTimeout(() => {
      if (scanning) {
        manager.stopDeviceScan();
        setScanning(false);
        scanTimeoutRef.current = null;
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

            const response = await fetch('https://to.internus.info/api/monkeyalpha', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user: username, command: Number(value) }),
            });

            if (!response.ok) {
              Alert.alert('Fout', `Server gaf fout: ${response.status}`);
              return;
            }

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
      Alert.alert('Fout', 'Er is een fout opgetreden bij het verzenden van het commando');
    }
  };


  const renderButton = (label: string) => (
    <View style={bluetoothStyles.buttonWrapper} key={label}>
      <Button title={label} onPress={() => sendCommand(label)} />
    </View>
  );

  useEffect(() => {
    const prepare = async () => {
      await requestPermissions();

      const state = await manager.state();
      if (state !== State.PoweredOn) {
        Alert.alert('Bluetooth uit', 'Zet Bluetooth aan om te kunnen scannen');
      }
    };

    prepare();

    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      manager.destroy();
    };
  }, []);

  return (
    <View style={bluetoothStyles.container}>
      <Button
        title={scanning ? 'Scannen...' : 'Scan naar HMSoft'}
        onPress={startScan}
        disabled={scanning}
      />

      <FlatList
        data={devices}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={({ item }) => (
          <Text style={bluetoothStyles.device}>
            {item.name} ({item.id})
          </Text>
        )}
        style={{ marginTop: 20, maxHeight: 200, width: '100%' }}
      />

      {connectedDevice && (
        <View style={bluetoothStyles.commandBox}>
          <Text style={bluetoothStyles.keypadLabel}>Kies een commando:</Text>

          <View style={bluetoothStyles.row}>
            {['1', '2', '3'].map(renderButton)}
          </View>
          <View style={bluetoothStyles.row}>
            {['4', '5', '6'].map(renderButton)}
          </View>
          <View style={bluetoothStyles.row}>
            {['7', '8', '9'].map(renderButton)}
          </View>
          <View style={bluetoothStyles.row}>
            <View style={{ flex: 1 }} />
            {renderButton('0')}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      )}
    </View>
  );
}
