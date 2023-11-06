import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // padding: 10,
    alignSelf: 'center',
    width: Dimensions.get('screen').width,
  },

  txtTitlesContainer: {
    flexDirection: 'row',
    gap: 9,
    margin: 6,
    alignItems: 'center',
  },

  txtTitles: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },

  userInfo: {
    width: Dimensions.get('screen').width - 15,
    alignSelf: 'center',
  },

  userContent: {
    width: Dimensions.get('screen').width - 15,
    alignSelf: 'center',
  },
  txtInputGroupContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  txtInputGroup: {
    width: '49%',
  },
  examInfoContainer: {
    width: Dimensions.get('screen').width - 15,
    alignSelf: 'center',
  },
  txtTitle: {
    width: Dimensions.get('screen').width - 15,
    alignSelf: 'center',
  },
  txtInputNoData: {
    color: 'gray',
  },
  nodataContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 9,
    marginTop: 9,
    marginBottom: 12,
  },
});

export default styles;
