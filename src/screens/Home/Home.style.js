import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {SIZES, COLORS, SHADOWS} from '../../constants';

const styles = StyleSheet.create({
  bodyContainer: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 10,
    marginBottom: 75,
  },

  testScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textTestSchedule: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },

  textShowAll: {
    fontSize: SIZES.medium,
    color: '#3491DB',
  },

  statusText: color => {
    return {
      alignSelf: 'flex-start',
      color: color,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 3,
      paddingBottom: 3,
      fontSize: SIZES.small,
      borderRadius: 10,
    };
  },

  textExamCode: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  line: {
    borderWidth: 2,
    borderColor: '#EF4444',
    width: 36,
  },
  headerCard: {
    flexDirection: 'column',
    gap: 6,
  },

  textLeft: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 12,
  },
  textRight: {
    color: '#8A8A8A',
  },

  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  cardContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 12,
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

  imgList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 360,
  },

  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
