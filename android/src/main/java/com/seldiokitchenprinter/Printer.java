package com.seldiokitchenprinter;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.HashMap;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import com.sunmi.cloudprinter.bean.Router;
  import com.sunmi.externalprinterlibrary2.ConnectCallback;
import com.sunmi.externalprinterlibrary2.ResultCallback;
  import com.sunmi.externalprinterlibrary2.SearchCallback;
  import com.sunmi.externalprinterlibrary2.SearchMethod;
  import com.sunmi.externalprinterlibrary2.SetWifiCallback;
  import com.sunmi.externalprinterlibrary2.SunmiPrinterManager;
  import com.sunmi.externalprinterlibrary2.WifiResult;
  import com.sunmi.externalprinterlibrary2.exceptions.SearchException;
  import com.sunmi.externalprinterlibrary2.printer.CloudPrinter;
  import com.sunmi.externalprinterlibrary2.style.CloudPrinterStatus;
public class Printer extends ReactContextBaseJavaModule implements  SearchCallback {
  ReactApplicationContext mContext;
  private final ArrayList<CloudPrinter> cp = new ArrayList<>();
  final ArrayList<Router> routers = new ArrayList<>();
  private final HashMap<String, CloudPrinter> printerMap = new HashMap<>();

  private final HashMap<String, Router> routerMap = new HashMap<>();

  Printer(ReactApplicationContext context){
    super(context);
    this.mContext = context;
    SharedPreferences sharedPreferences =mContext.getSharedPreferences("cloud_printer", Context.MODE_PRIVATE);
    String printerName = sharedPreferences.getString("printer_name","");
    if(!printerName.isEmpty()){
      CloudPrinter printer = getCloudPrinter(printerName);
      if(printer!=null) {
        connect(printer);
      }
    }
  }

  @NonNull
  @Override
  public String getName() {
    return "Printer";
  }

  private void sendEvent(@Nullable String params) {
    this.mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("printer_list", params.toString());
  }

  @ReactMethod()
  public void searchPrinter(Promise promise) {
    try {
      BluetoothManager bm = (BluetoothManager)mContext.getSystemService(Context.BLUETOOTH_SERVICE);
      if(bm.getAdapter().isEnabled()) {
        try {
          SunmiPrinterManager.getInstance().searchCloudPrinter(this.mContext, SearchMethod.BT, this);
        } catch (SearchException e) {
          e.printStackTrace();
        }
      } else {
        SunmiPrinterManager.getInstance().searchCloudPrinter(this.mContext, SearchMethod.LAN, this);
      }
      promise.resolve(true);
    } catch (Exception e) {
      e.printStackTrace();
      promise.reject(e);
    }
  }

  @Override
  public void onFound(CloudPrinter cloudPrinter) {
    try{
      cp.add(cloudPrinter);
      printerMap.put(cloudPrinter.getCloudPrinterInfo().name, cloudPrinter);
      sendEvent(cloudPrinter.getCloudPrinterInfo().name);
    } catch (Exception e){
      Toast.makeText(mContext,"onFound error:"+ e.toString(), Toast.LENGTH_LONG).show();
    }
  }

  public CloudPrinter getCloudPrinter(String printerName){
    return printerMap.get(printerName);
  }

  @ReactMethod()
  public void print(String text, String printerName) {
    if(printerMap.size() == 0){
      Toast.makeText(mContext, "No printer connected", Toast.LENGTH_SHORT).show();
      return ;
    }
    CloudPrinter printer = getCloudPrinter(printerName);
    if(printer!=null) {
      printer.printText(text);
      printer.commitTransBuffer(new ResultCallback() {
        @Override
        public void onComplete() {
          runOnUiThread(() -> {
            Toast.makeText(mContext, "Printed", Toast.LENGTH_LONG).show();
          });
        }

        @Override
        public void onFailed(CloudPrinterStatus cloudPrinterStatus) {
          runOnUiThread(() -> {
            Toast.makeText(mContext, "Printing failed" + cloudPrinterStatus.name(), Toast.LENGTH_LONG).show();
          });
        }
      });
    }
  }

  @ReactMethod()
  public void connectPrinter(String printerName, Promise promise){
    CloudPrinter printer = getCloudPrinter(printerName);
    if(printer!=null) {
      connect(printer);
      promise.resolve(true);
      return;
    }
    Toast.makeText(mContext, "No printers found", Toast.LENGTH_SHORT).show();
  }
  public void connect(CloudPrinter cloudPrinter) {
    cloudPrinter.connect(mContext, new ConnectCallback() {
      @Override
      public void onConnect() {
        try{
          runOnUiThread(() -> {
            Toast.makeText(mContext,"Printer connected:"+ cloudPrinter.getCloudPrinterInfo().name, Toast.LENGTH_LONG).show();
          });
          SharedPreferences sharedPreferences = mContext.getSharedPreferences("cloud_printer", Context.MODE_PRIVATE);
          SharedPreferences.Editor editor = sharedPreferences.edit();
          editor.putString("printer_name", cloudPrinter.getCloudPrinterInfo().name);
          editor.apply();
        } catch(Exception e){
          Toast.makeText(mContext,"Printer connect error:"+ e.toString(), Toast.LENGTH_LONG).show();
        }
      }
      @Override
      public void onFailed(String s) {
        runOnUiThread(() -> {
          Toast.makeText(mContext, s, Toast.LENGTH_LONG).show();
        });
      }
      @Override
      public void onDisConnect() {
        Toast.makeText(mContext,"Printer Disconnected:", Toast.LENGTH_SHORT).show();
      }
    });
  }



  @ReactMethod()
  public void wifiSearch(String printerName) {
    CloudPrinter printer = getCloudPrinter(printerName);
    Toast.makeText(mContext, "Wifi searching.....", Toast.LENGTH_LONG).show();
    if(printer!=null) {
      try{
        SunmiPrinterManager.getInstance().searchPrinterWifiList(this.mContext, printer, new WifiResult() {
          @Override
          public void onRouterFound(Router ro) {
            try{
              Toast.makeText(mContext, "Wifi found", Toast.LENGTH_LONG).show();
              routers.add(ro);
              routerMap.put(ro.getName(),ro);

              WritableMap map = Arguments.createMap();
              map.putString("name", ro.getName());
              map.putBoolean("hasPass", ro.isHasPwd());
              mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("wifi_list", map.toString());
            } catch(Exception e){
              Toast.makeText(mContext, e.toString(), Toast.LENGTH_LONG).show();
            }
          }
          @Override
          public void onFinish() {
            Toast.makeText(mContext, "Wifi search finished", Toast.LENGTH_LONG).show();
          }

          @Override
          public void onFailed() {
            Toast.makeText(mContext, "Wifi search failed", Toast.LENGTH_LONG).show();
          }
        });
      } catch(Exception e){
        Toast.makeText(mContext, "Wifi search failed"+e.toString(), Toast.LENGTH_LONG).show();
      }
    } else {
      Toast.makeText(mContext,"no cloud printer found", Toast.LENGTH_LONG).show();
    }
  }

  @ReactMethod()
  public void connectWifi(String password, String printerName, String wifiName){
    CloudPrinter printer = getCloudPrinter(printerName);
    Router ro = routerMap.get(wifiName);
    if(printer!=null && ro!=null) {
      SunmiPrinterManager.getInstance().setPrinterWifi(mContext,printer,ro.getEssid(),password,new SetWifiCallback(){
        @Override
        public void onSetWifiSuccess() {
          Toast.makeText(mContext, "Wifi set success", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onConnectWifiSuccess() {
          Toast.makeText(mContext, "Wifi connect success", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onConnectWifiFailed() {
          Toast.makeText(mContext, "Wifi connection failed", Toast.LENGTH_SHORT).show();
        }
      });
      return;
    }
  }
}
