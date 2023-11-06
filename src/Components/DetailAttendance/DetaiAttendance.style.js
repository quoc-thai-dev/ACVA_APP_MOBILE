import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOWS} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 6,
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: '#F5F5F5', //'#F98866' '#FFB8B1' '#9ebbba'
    ...SHADOWS.medium,
  },
  inner: {
    flex: 1,
    //height: '100%',
    // width: '90%',
  },
  titleContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 9,
    gap: 3,
  },

  textTitle: {
    color: COLORS.secondary,
    fontWeight: '600',
  },

  contentContainer: {
    flex: 1,
    //borderWidth: 1,
    flexDirection: 'row',
    //position: 'relative',
  },

  labelContentInner: {
    width: '40%',
    //borderWidth: 1,
    borderColor: 'red',
    paddingTop: 6,
    paddingBottom: 6,
    gap: 3,
    marginLeft: 75,
  },

  textInfoInner: {
    flex: 1,
    borderColor: 'green',
    //borderWidth: 1,
    gap: 3,
    paddingLeft: 10,
    paddingTop: 6,
  },

  labelTextContent: {
    fontWeight: '700',
    color: 'gray',
  },

  textInfo: {
    fontWeight: '600',
    fontStyle: 'italic',
  },

  statusContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',

    //borderWidth: 5,
    //borderColor: '#fff',
  },

  statusRight: {
    flex: 1,
    width: '50%',
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },

  statusLeft: {
    width: '50%',
  },

  statusInner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  textattendance: {
    padding: 2,
    maxWidth: 100,
    borderRadius: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  iconAttendance: {
    padding: 7,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default styles;
