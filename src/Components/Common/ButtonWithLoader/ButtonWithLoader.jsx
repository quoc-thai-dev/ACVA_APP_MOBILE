import {View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {getStyles} from './ButtonWithLoader.style';
import { useTranslation } from 'react-i18next';

const ButtonWithLoader = ({text, onPress, isLoading, style}) => {
  const [t]= useTranslation();
  const styles=StyleSheet.create(getStyles(isLoading));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={onPress}
        style={{...styles.btnStyle, ...style}}>
        {!!isLoading ? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <ActivityIndicator size={'medium'} color={'#fff'} />
            <Text style={{...styles.textStyle,marginLeft:20}}>{t('processing')}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.textStyle}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonWithLoader;
