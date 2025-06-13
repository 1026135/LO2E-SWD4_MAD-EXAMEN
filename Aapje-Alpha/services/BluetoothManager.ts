import { BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';

class BluetoothManager {
  private manager: BleManager;
  private scanning: boolean;

  constructor() {
    this.manager = new BleManager();
    this.scanning = false;
  }

  async requestPermissions(): Promise<void> {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  }

  startScan(
    onDeviceFound: (device: Device) => void,
    onError?: (error: Error) => void
  ): void {
    if (this.scanning) return;

    this.scanning = true;
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        this.scanning = false;
        if (onError) onError(error);
        return;
      }

      if (device && device.name) {
        onDeviceFound(device);
      }
    });

    setTimeout(() => {
      this.stopScan();
    }, 10000);
  }

  stopScan(): void {
    this.manager.stopDeviceScan();
    this.scanning = false;
  }

  async connectToDevice(device: Device): Promise<Device | null> {
    try {
      const connectedDevice = await this.manager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      return connectedDevice;
    } catch (error) {
      console.error('Connection error:', error);
      return null;
    }
  }

  destroy(): void {
    this.manager.destroy();
  }
}

const bluetoothManager = new BluetoothManager();
export default bluetoothManager;
