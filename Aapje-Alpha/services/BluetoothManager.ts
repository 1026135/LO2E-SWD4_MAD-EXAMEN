// services/BluetoothManager.ts
import { BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';

class BluetoothManager {
  manager: BleManager;

  constructor() {
    this.manager = new BleManager();
  }

  async requestPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return (
        granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  }

  async scanForDevices(onDeviceFound: (device: Device) => void) {
    const permissionGranted = await this.requestPermissions();
    if (!permissionGranted) {
      console.log('Bluetooth-permissie geweigerd');
      return;
    }

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scanfout:', error);
        return;
      }

      if (device?.name?.includes('Aapje') || device?.localName?.includes('Aapje')) {
        console.log('Gevonden apparaat:', device.name);
        this.manager.stopDeviceScan();
        onDeviceFound(device);
      }
    });
  }

  async connectToDevice(device: Device): Promise<Device> {
    const connectedDevice = await device.connect();
    console.log('Verbonden met:', connectedDevice.name);

    await connectedDevice.discoverAllServicesAndCharacteristics();
    return connectedDevice;
  }

  async sendCommand(device: Device, serviceUUID: string, characteristicUUID: string, command: string) {
    const base64Command = Buffer.from(command, 'utf8').toString('base64');
    await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, base64Command);
    console.log('Commando verzonden:', command);
  }
}

export const bluetoothManager = new BluetoothManager();
