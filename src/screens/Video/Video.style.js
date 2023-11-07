import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 60,
  },
  youtubePlayer: {
    alignSelf: 'stretch',
    height: 300, // Set the height of the player as per your requirement
  },
  card: {
    width: Dimensions.get('screen').width / 2 - 15,
    marginBottom: 10,
    backgroundColor: 'white',
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
});

export default styles;
