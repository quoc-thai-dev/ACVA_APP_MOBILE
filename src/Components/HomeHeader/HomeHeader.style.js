import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  homeContainer: {
    width: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    height: 300,
  },
  headerTopContainer: {
    height: Platform.OS === 'ios' ? 150 : 100,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerTopAvatar: {
    backgroundColor: '#fff',
    height: 42,
    width: 42,
    borderRadius: 25,
    marginBottom: 100,
  },
  textTitle: {
    color: '#fff',
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  textHeaderWelcome: {
    position: 'absolute',
    top: 140,
    left: 50,
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  headerInfoContainer: {
    position: 'absolute',
    top: 190,
    left: 50,
  },

  infoItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  textItem: {
    fontSize: SIZES.medium,
    color: '#999495',
  },

  testScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 3,
  },

  textTestSchedule: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },

  textShowAll: {
    fontSize: SIZES.medium,
    color: '#3491DB',
  },

  editInfoContainer: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 45,
    paddingBottom: 75,
  },
});

export default styles;
