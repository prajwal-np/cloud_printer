import React, { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { useEffect } from 'react';
import useWifi from '../hooks/useWifi';
import Printer from './printer';
import ModalComponent from './modal';
import type { TRouter } from '../libs/type';
import WifiIcon from './wifiIcon';
import LockIcon from './lockIcon';

export default function Wifi() {
  const { searchWifiEvent, wifiList, connectWifiEvent } = useWifi();

  const [printerId, setPrinterId] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [selectedWifi, setSelectedWifi] = useState<TRouter>();
  useEffect(() => {
    if (printerId) {
      searchWifiEvent(printerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printerId]);
  return (
    <>
      <Printer setSelectedPrinterId={setPrinterId} />
      {!!wifiList.length && !!printerId && (
        <View>
          <ModalComponent
            password={password}
            setPassword={setPassword}
            closeEvent={() => {
              connectWifiEvent('', printerId, selectedWifi?.ssid);
            }}
            text={`Enter password for ${selectedWifi?.name}`}
            isVisible={!!selectedWifi}
          />
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Wifi list </Text>
          {wifiList.map((el) => (
            <TouchableHighlight
              key={el.name}
              onPress={() => {
                if (el.hasPass) {
                  setSelectedWifi(el);
                } else {
                  connectWifiEvent('', printerId, el.name);
                }
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <WifiIcon />
                  <Text>{el.name}</Text>
                </View>
                {el.hasPass ? <LockIcon /> : <></>}
              </View>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </>
  );
}
