import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './ButtonWithLoader.style';

const ButtonWithLoader = ({text, onPress, isLoading}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
        {!!isLoading ? (
          <ActivityIndicator size={'large'} color={'#fff'} />
        ) : (
          <Text style={styles.textStyle}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonWithLoader;
