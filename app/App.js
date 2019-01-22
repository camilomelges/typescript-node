/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import { PermissionsAndroid } from 'react-native';
import InstalledApps from 'react-native-installed-packages';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const apiLevel = DeviceInfo.getAPILevel();
const appName = DeviceInfo.getApplicationName();
const batteryLevel = DeviceInfo.getBatteryLevel().then(batteryLevel => {
  return batteryLevel;
});
const brand = DeviceInfo.getBrand();
const carrier = DeviceInfo.getCarrier(); 
const deviceCountry = DeviceInfo.getDeviceCountry();
const deviceName = DeviceInfo.getDeviceName();
const firstInstallTime = DeviceInfo.getFirstInstallTime();

// const ip = DeviceInfo.getIPAddress().then(ip => {return ip;});
// const mac = DeviceInfo.getMACAddress().then(mac => {return mac;});
// const phoneNumber = DeviceInfo.getPhoneNumber();

// const phoneNumber = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.READ_PHONE_STATE);
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return DeviceInfo.getPhoneNumber();
//     } else {
//       return granted;
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

// const ip = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(android.permission.ACCESS_WIFI_STATE,DeviceInfo.getIPAddress().then(ip => {return ip;}));
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return granted;
//     } else {
//       return granted;
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

// const mac = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(android.permission.ACCESS_WIFI_STATE,DeviceInfo.getMACAddress().then(mac => {return mac;}));
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return granted;
//     } else {
//       return granted;
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      apps: []
    };
  }
  
  componentDidMount() {
    this.loadApps();
  }

  loadApps = async () => {
    await RNAndroidInstalledApps.getApps()
    .then(response => {
      const apps = response;  
      console.log('OLAAAAAAAAAAAAAAAAAAAAAAAAAAR')
      console.log(response);
      this.setState({ apps });
    })
    .catch(error => {
      console.warn(error);
    });
  }

  renderItem = ({ item }) => (
    <View style={[styles.appsContainer, styles.padding10, styles.borderAll]}>
      <Text style={[styles.appInfo]}>{item.appName}</Text>
      <Text style={[styles.appInfo]}>{item.lastUpdateTime}</Text>
      <Text style={[styles.appInfo]}>{item.firstInstallTime}</Text>
      <Text style={[styles.appInfo]}>{item.versionCode}</Text>
    </View>
  );
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appInfo}>{instructions}</Text>
        <Text style={styles.appInfo}>Nome do aplicativo {appName}</Text>
        <Text style={styles.appInfo}>Android {apiLevel}</Text>
        <Text style={styles.appInfo}>Bateria: {batteryLevel._55}%</Text>
        <Text style={styles.appInfo}>Marca: {brand}</Text>
        <Text style={styles.appInfo}>Operadora: {carrier}</Text>
        <Text style={styles.appInfo}>País: {deviceCountry}</Text>
        <Text style={[styles.appInfo, styles.borderBottom]}>Nome do aparelho: {deviceName}</Text>
        <FlatList 
          data={this.state.apps}
          keyExtractor={(item, index) => item.key}
          renderItem={this.renderItem}
        />
        {/* <Text style={styles.instructions}>{app}</Text> */}
        {/* <Text style={styles.instructions}>IP: {ip}</Text>
        <Text style={styles.instructions}>MAC: {mac}</Text>
        <Text style={styles.instructions}>Número do telefone: {phoneNumber}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d4c50',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  appsContainer: {
    textAlign: 'left',
    backgroundColor: '#4d4c50',
  },
  appInfo: {
    textAlign: 'left',
    color: '#fff',
    margin: 3,
  },
  borderBottom: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  padding10: {
    padding: 10
  },
  borderAll: {
    borderColor: '#fff',
    borderWidth: 1,
  }
});
