/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { LogLevel, OneSignal } from 'react-native-onesignal';
// OneSignal Initialization
// OneSignal.setAppId("76a1b2da-bc39-496b-914a-1f97dc52d7af");
// OneSignal.setAppId('43e8a7f1-aaa7-4fef-8eaa-8f39011fef01');

// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize("ONESIGNAL_APP_ID");

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event);
});
AppRegistry.registerComponent(appName, () => App);
