import React, { useEffect, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import usePrinter from '../hooks/usePrinter';
import PrinterIcon from './printerIcon';
type Props = {
  setSelectedPrinterId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isConnect?: boolean;
};
export default function Printer({ setSelectedPrinterId, isConnect }: Props) {
  const { searchPrinter, printerList, connectPrinterEvent, printString } =
    usePrinter();
  const [printerName, setPrinterName] = useState<string>();
  useEffect(() => {
    searchPrinter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (printerName && setSelectedPrinterId) {
      setSelectedPrinterId(printerName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printerName]);

  return (
    <View>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Select printer</Text>
      {printerList.map((el) => (
        <TouchableHighlight
          key={el.name}
          onPress={() => {
            setPrinterName(el.name);
            if (isConnect) {
              connectPrinterEvent(el.name).then((res) => {
                if (res) printString('Printer connected', el.name);
              });
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <PrinterIcon />
            <Text>{el.name}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}
