import RNPrinter from './module';

const searchWifi = async (printerName: string): Promise<any> =>
  await RNPrinter.wifiSearch(printerName);

const connectWifi = (password: string, printerName: string, ssid: any) =>
  RNPrinter.connectWifi(password, printerName, ssid);

export { searchWifi, connectWifi };
