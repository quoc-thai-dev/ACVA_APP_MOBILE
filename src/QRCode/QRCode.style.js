import { StyleSheet, Text, View,Dimensions, } from 'react-native'
import React from 'react'
// import Constants from 'expo-constants';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({

  close: { 
    position: 'absolute', 
    // top: Constants.statusBarHeight + 20, left: 20, width: 40, height: 40, zIndex:100
  },

  bottomAction: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    position: 'absolute',
    width: deviceWidth,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  bottomButtonAction: { 
    alignItems: 'center', 
    width: deviceWidth / 2 
  },

  bottomTextAction: { 
    color: 'white', 
    fontSize: 13, 
    lineHeight: 22,  
    marginTop: 4 
  },

  // layout
  main: { 
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    width: deviceHeight,
    height: deviceHeight / 2,
  },

  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 1,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },

  // edge
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  lineAnim: { 
    height: 2, 
    backgroundColor: '#fff' 
  },

  
  noAccessContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },

  noAccessIcon:{
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default styles

