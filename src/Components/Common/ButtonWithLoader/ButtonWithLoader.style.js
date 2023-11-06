import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    height: 48,
    width: '100%',
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // Add shadow based on the platform
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 5,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  textStyle: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
