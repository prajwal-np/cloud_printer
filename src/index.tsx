// import {
//   // requireNativeComponent,
//   UIManager,
//   Platform,
//   // type ViewStyle,
// } from 'react-native';
// import Printer from './components/printer';
// import * as WifiComponent from './components/wifi';
// const LINKING_ERROR =
//   `The package 'react-native-seldio_kitchen_printer' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// // type SeldioKitchenPrinterProps = {
// //   color: string;
// //   style: ViewStyle;
// // };

// const ComponentName = 'SeldioKitchenPrinterView';

// export const SeldioKitchenPrinterView =
//   UIManager.getViewManagerConfig(ComponentName) != null
//     ? Printer
//     : () => {
//         throw new Error(LINKING_ERROR);
//       };

// export const Wifi = WifiComponent;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  type ViewStyle,
} from 'react-native';
import Button from './ui/Button';
import Wifi from './components/wifi';
import Printer from './components/printer';
import BackIcon from './components/backIcon';
import RNPrinter from './libs/module';
type Props = {
  containerStyle?: ViewStyle;
};
function CloudPrinter({ containerStyle }: Props): JSX.Element {
  const [currentView, setCurrentView] = useState('');
  return (
    <SafeAreaView>
      {!currentView && (
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 100,
            },
            containerStyle || {},
          ]}
        >
          <Button onPress={() => setCurrentView('wifi')} title="Add wifi" />
          <Button
            onPress={() => setCurrentView('printer')}
            title="Add printer"
          />
        </View>
      )}
      {!!currentView && (
        <View style={{ gap: 100, padding: '2%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
            <Pressable onPress={() => setCurrentView('')}>
              <BackIcon />
            </Pressable>
            <Text style={{ fontSize: 30 }}>
              {currentView === 'wifi' ? 'Configure wifi' : 'Configure printer'}
            </Text>
          </View>
          {currentView === 'wifi' && <Wifi />}
          {currentView === 'printer' && <Printer isConnect={true} />}
        </View>
      )}
    </SafeAreaView>
  );
}
export const ReactPrinter = RNPrinter;
export default CloudPrinter;
