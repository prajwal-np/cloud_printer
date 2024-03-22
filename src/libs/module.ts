import { type NativeModule, NativeModules } from 'react-native';

const RNPrinter: {
  searchPrinter: () => Promise<boolean>;
  wifiSearch: (_printerName: string) => void;
  connectWifi: (_password: string, _printerName: string, ssid: any) => void;
  connectPrinter: (printerName: string) => void;
  print: (_text: string, printerName: string) => void;
  nativeModule?: NativeModule | undefined;
} = NativeModules.Printer;

export default RNPrinter;
