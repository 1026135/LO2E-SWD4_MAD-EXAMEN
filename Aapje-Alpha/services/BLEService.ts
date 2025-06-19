// services/BLEService.ts
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

class BLEService {
  manager = new BleManager();
  device: Device | null = null;

  async connectTo(device: Device) {
    const connected = await device.connect();
    await connected.discoverAllServicesAndCharacteristics();
    this.device = connected;
    return connected;
  }

  async send(value: string) {
    if (!this.device) return;

    const services = await this.device.services();
    for (const service of services) {
      if (service.uuid.toUpperCase().includes('FFE0')) {
        const characteristics = await service.characteristics();
        for (const char of characteristics) {
          if (char.uuid.toUpperCase().includes('FFE1') && char.isWritableWithResponse) {
            const base64 = Buffer.from(value, 'utf-8').toString('base64');
            await char.writeWithResponse(base64);
            return;
          }
        }
      }
    }
    throw new Error('FFE1 characteristic not found');
  }

  destroy() {
    this.manager.destroy();
    this.device = null;
  }
}

export default new BLEService();