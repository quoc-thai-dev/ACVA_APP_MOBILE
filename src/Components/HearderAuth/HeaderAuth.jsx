import { View, Text, Image, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import styles from './HeaderAuth.style';
// import {Ionicons, AntDesign} from '@expo/vector-icons';

const { width } = Dimensions.get("window");

const HeaderAuth = ({urlBackground, urlLogo, titleHeader, iconHeader, textWelcome }) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={urlBackground} resizeMode='cover'>
        <SafeAreaView style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>{titleHeader}</Text>
            {/* <AntDesign name={iconHeader}  size={24} color="black" /> */}
          </View>
          <Text style={styles.textWelcome}>{textWelcome}</Text>
        </SafeAreaView>
      </ImageBackground>
      
      <View style={styles.imageLogo}>
        <Image source={urlLogo} resizeMode='cover'/>
      </View>
    </View>
  )
}

export default HeaderAuth