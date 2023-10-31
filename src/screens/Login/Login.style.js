import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../../constants';

const styles = StyleSheet.create({
  container: {},
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.3 )',
    zIndex: 1,
  },
  bodyLogin: {
    padding: 12,
  },
  textForgot: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 18,
    marginRight: 3,
  },
  textStyle: {
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#0082EF',
    fontSize: 12,
  },
  footerLogin: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 21,
    paddingTop: 18,
  },
  social_icon: {
    flexDirection: 'row',
    padding: 18,
    gap: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textRegister: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#0082EF',
  },
  modalContainer: {
    width: 300,
    height: 330,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 9,
    padding: 10,
  },
  headerModal: {
    alignSelf: 'flex-end',
  },
  textInputModal: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    margin: 12,
    padding: 6,
    // marginTop: 18,
  },
  textTitle: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  btnSend: {
    marginTop: 10,
    width: '90%',
    height: '80%',
  },
});

export default styles;
