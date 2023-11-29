// import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Button,
  Image,
  Linking,
  StatusBar,
  Text,
  View,
  Easing,
  PermissionsAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import examApi from '../api/examApi';
import styles from './QRCode.style';

import {COLORS, images} from '../constants';
import {useTranslation} from 'react-i18next';
const QRCode = ({navigation}) => {
  const {t} = useTranslation();
  const [scannedData, setScannedData] = useState(null);
  const isScanningRef = useRef(false);
  const [scanResult, setScanResult] = useState(null);
  const [scaleValue] = useState(new Animated.Value(1));
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => pulseAnimation());
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          setHasPermission(true);
        } else {
          console.log('Camera permission denied');
          setHasPermission(false);
        }
      } catch (error) {
        console.error('Error requesting camera permission: ', error);
      }
    } else if (Platform.OS === 'ios') {
      // iOS doesn't require explicit permission request for camera
      // However, you need to add the following key to your Info.plist file
      // <key>NSCameraUsageDescription</key>
      // <string>We need access to your camera to take photos</string>
      console.log('Camera permission granted (iOS)');
    }
  };
  useEffect(() => {
    requestCameraPermission();
    pulseAnimation();
  }, []);

  const onAlert = message => {
    Alert.alert(t('notification'), message, [
      {
        text: t('continue'),
        onPress: () => {
          setScanned(false);
        },
      },
    ]);
  };
  const openLink = () => {
    Linking.openURL('https://google.com.vn').catch(err =>
      console.error(t('occured'), err),
    );
  };
  const handleBarCodeScanned = async ({type, data}) => {
    if (!isScanningRef.current) {
      isScanningRef.current = true;
      const isLinkAttendance = data.substr(0, data.indexOf('='));
      const isLink = data.substr(0, 4);
      if (
        isLinkAttendance === 'http://localhost/attendance?code' ||
        isLinkAttendance === 'http://acva.vn/attendance?code'
      ) {
        const code = data.substr(data.indexOf('=') + 1, data.length);
        await examApi
          .setAttendance({code})
          .then(res => res && onAlert(res.message))
          .catch(error => error && onAlert(error.message));
      } else if (isLink === 'http') {
        Linking.openURL(data).catch(err => console.error(t('occured'), err));
      } else {
        onAlert(data);
      }
      setTimeout(() => {
        isScanningRef.current = false;
      }, 3000); // Adjust the timeout value as needed
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeScanned}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}></RNCamera>
      {true ? (
        <View style={styles.overlay}>
          <Image
            source={require('../assets/ACVA.png')}
            style={{width: 200, height: 90, marginBottom: 20}}
          />
          <Animated.View
            style={[styles.frame, {transform: [{scale: scaleValue}]}]}
          />
        </View>
      ) : (
        <></>
      )}

      {scanResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Data: {scanResult}</Text>
        </View>
      )}
    </View>
  );
};

export default QRCode;
