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
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import examApi from '../api/examApi';
import styles from './QRCode.style';

import {COLORS, images} from '../constants';
import {useTranslation} from 'react-i18next';
const QRCode = ({navigation}) => {
  const {t} = useTranslation();
  const [hasPermission, setHasPermission] = useState();
  const [scanned, setScanned] = useState(false);
  const [screen, setScreen] = useState('scan');
  const [sizeQrCode, setSizeQrCode] = useState({width: 0, height: 0});

  const lineAnim = useRef(new Animated.Value(0)).current;

  const onLineLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setSizeQrCode({width: width, height: height});
  };

  // const askForCameraPermisstion = () => {
  //   (async () => {
  //     const {status} = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // };

  // const handleAnimationLine = () => {
  //   lineAnim.setValue(0);
  //   Animated.timing(lineAnim, {
  //     toValue: 1,
  //     duration: 8000,
  //     useNativeDriver: false,
  //   }).start(() => handleAnimationLine());
  // };

  //Request camerapermission
  useEffect(() => {
    askForCameraPermisstion();
  }, []);

  useEffect(() => {
    // handleAnimationLine();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something - for example: reset states, ask for camera permission
      setScanned(false);
      setHasPermission(false);
      askForCameraPermisstion();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const transformLine = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeQrCode?.height],
  });

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

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);

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
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>{t('camera_permission')}</Text>
      </View>
    );
  }

  setTimeout(() => {
    if (hasPermission === false) {
      return (
        <View style={styles.noAccessContainer}>
          <View style={styles.noAccessIcon}>
            <MaterialCommunityIcons name="camera-off" size={60} color="black" />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
            <View>
              <Text style={{width: 150, textAlign: 'center'}}>
                {t('no_camera_access')}
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
          </View>
          <Button
            title="Allow Cammera"
            color={COLORS.secondary}
            onPress={() => {
              askForCameraPermisstion();
            }}
          />
        </View>
      );
    }
  }, 3000);

  return (
    <View style={styles.main}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* {
        screen === 'scan' && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[styles.container]}>
            <View style={styles.layerTop}></View>
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} onLayout={onLineLayout}>
                <EdgeQRCode position="topRight" />
                <EdgeQRCode position="topLeft" />
                <Animated.View
                  style={[
                    {
                      transform: [{translateY: transformLine}],
                    },
                    styles.lineAnim,
                  ]}
                />
                <EdgeQRCode position="bottomRight" />
                <EdgeQRCode position="bottomLeft" />
              </View>
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </BarCodeScanner>
        )
        // ||(screen === 'data' && <View style={{ backgroundColor: 'white' }}>{children}</View>)
      } */}

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          alignItems: 'center',
          marginTop: 150,
          marginRight: 15,
        }}>
        <Image style={{}} source={images.acva_logo} />
      </View>
    </View>
  );
};

const EdgeQRCode = ({position}) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = '#FFF';
  const edgeBorderWidth = 4;
  const edgeRadius = 0;

  const defaultStyle = {
    width: edgeWidth,
    height: edgeHeight,
    borderColor: edgeColor,
  };
  const edgeBorderStyle = {
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: edgeRadius,
      right: edgeRadius,
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: edgeRadius,
      left: edgeRadius,
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: edgeRadius,
      right: edgeRadius,
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: edgeRadius,
      left: edgeRadius,
    },
  };
  return (
    <View
      style={[
        defaultStyle,
        styles[position + 'Edge'],
        edgeBorderStyle[position],
      ]}
    />
  );
};

export default QRCode;
