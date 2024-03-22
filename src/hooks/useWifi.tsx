import { useEffect, useState } from 'react';
import { NativeEventEmitter } from 'react-native';
import RNPrinter from '../libs/module';
import { searchWifi, connectWifi } from '../libs/wifi';
import type { TRouter } from '../libs/type';

export default function useWifi() {
  const [wifiList, setWifiList] = useState<TRouter[]>([]);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(RNPrinter.nativeModule);
    let eventListener = eventEmitter.addListener('wifi_list', (event) => {
      setWifiList((prev) => prev.concat(JSON.parse(event)));
    });
    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchWifiEvent = async (printerName: string) =>
    await searchWifi(printerName);

  const connectWifiEvent = (password: string, printerName: string, ssid: any) =>
    connectWifi(password, printerName, ssid);

  return {
    wifiList,
    searchWifiEvent,
    connectWifiEvent,
  };
}
