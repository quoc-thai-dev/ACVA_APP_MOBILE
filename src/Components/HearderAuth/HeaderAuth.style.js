import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    position: 'absolute',
    marginTop: -30,
    width: '100%',
    resizeMode: 'cover',
    height: 205,
  },

  imageLogo: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerHeader: {
    position: 'absolute',
    marginTop: 45,
    marginLeft: 50,
  },
  textTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
  },
  textWelcome: {
    marginTop: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
});

export default styles;
