import { useEffect, useState } from 'react';
import { NativeEventEmitter } from 'react-native';
import RNPrinter from '../libs/module';
import { search, connectPrinter, print } from '../libs/printer';
import type { TPrinter } from '../libs/type';

export default function usePrinter() {
  const [printerList, setPrinterList] = useState<TPrinter[]>([]);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(RNPrinter.nativeModule);
    let eventListener = eventEmitter.addListener('printer_list', (event) => {
      setPrinterList((prev) =>
        prev.concat({
          name: event,
        })
      );
    });
    return () => {
      eventListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchPrinter = async () => await search();

  const connectPrinterEvent = (printerName: string) =>
    connectPrinter(printerName);

  const printString = (text: string, printerName: string) =>
    print(text, printerName);

  return {
    printerList,
    searchPrinter,
    connectPrinterEvent,
    printString,
  };
}
