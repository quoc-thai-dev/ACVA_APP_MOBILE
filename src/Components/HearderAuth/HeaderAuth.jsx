import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import styles from './HeaderAuth.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LanguageChangeHandler from '../../locales/LanguageChangeHandler';
import { useRoute } from '@react-navigation/native';
const {width} = Dimensions.get('window');
const HeaderAuth = ({
  urlBackground,
  urlLogo,
  titleHeader,
  iconHeader,
  textWelcome,
}) => {
  const route = useRoute();
  const changeLanguage = route.name=="Login"? <LanguageChangeHandler />:null;
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={urlBackground}
        resizeMode="cover">
        <SafeAreaView style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>{titleHeader}</Text>
            <AntDesign name={iconHeader} size={24} color="black" />
          </View>
          <Text style={styles.textWelcome}>{textWelcome}</Text>
        </SafeAreaView>
      </ImageBackground>
      {
      changeLanguage
      }

      <View style={styles.imageLogo}>
        {urlLogo ? (
          <Image
            source={require('../../assets/ACVA.png')}
            style={{width: '90%', height: 150}}
            resizeMode="contain"
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default HeaderAuth;
