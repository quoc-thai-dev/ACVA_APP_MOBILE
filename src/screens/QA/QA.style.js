import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    position:'absolute',
    top:0,
    left:0,
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 0,
    margin:0,
  },
});

export default styles;
