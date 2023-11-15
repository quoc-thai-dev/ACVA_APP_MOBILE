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
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import examApi from '../api/examApi';
import styles from './QRCode.style';
import {BlurView} from '@react-native-community/blur';

import {COLORS, images} from '../constants';
import {useTranslation} from 'react-i18next';
const QRCode = ({navigation}) => {
  const {t} = useTranslation();
  const [scannedData, setScannedData] = useState(null);
  const isScanningRef = useRef(false);
  const [scanResult, setScanResult] = useState(null);
  const [scaleValue] = useState(new Animated.Value(1));

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

  useEffect(() => {
    pulseAnimation();
  }, []);

  const onAlert = message => {
    // Alert.alert(t('notification'), message, [
    //   {
    //     text: t('continue'),
    //     onPress: () => {
    //       Linking.openURL('https://google.com.vn').catch(err =>
    //         console.error(t('occured'), err),
    //       );
    //     },
    //   },
    // ]);
    Alert.alert(
      t('notification'),
      message,
      [{text: t('continue'), onPress: openLink}, {text: t('no')}],
      {cancelable: true},
    );
  };
  const openLink = () => {
    Linking.openURL('https://google.com.vn').catch(err =>
      console.error(t('occured'), err),
    );
  };
  const handleBarCodeScanned = async ({type, data}) => {
    if (!isScanningRef.current) {
      isScanningRef.current = true;
      setScannedData(data);

      // Additional logic or actions after the first scan
      onAlert('Vào link <' + data + '> không tml?');
      // Reset the flag after some time, allowing for a new scan
      setTimeout(() => {
        isScanningRef.current = false;
      }, 3000); // Adjust the timeout value as needed
    }
    // const isLinkAttendance = data.substr(0, data.indexOf('='));
    // const isLink = data.substr(0, 4);
    // if (
    //   isLinkAttendance === 'http://localhost/attendance?code' ||
    //   isLinkAttendance === 'http://acva.vn/attendance?code'
    // ) {
    //   const code = data.substr(data.indexOf('=') + 1, data.length);
    //   await examApi
    //     .setAttendance({code})
    //     .then(res => res && onAlert(res.message))
    //     .catch(error => error && onAlert(error.message));
    // } else if (isLink === 'http') {
    //   Linking.openURL(data).catch(err => console.error(t('occured'), err));
    // } else {
    //   onAlert(data);
    // }
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
      <BlurView
        style={styles.blurContainer}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.frame, {transform: [{scale: scaleValue}]}]}
        />
      </View>
      {scanResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Data: {scanResult}</Text>
        </View>
      )}
    </View>
  );
};

export default QRCode;
