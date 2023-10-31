import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputStyle: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    borderRadius: 9,
    paddingHorizontal: 16,
    position: 'relative',
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
    backgroundColor: 'white',
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  iconRight: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

export default styles;
