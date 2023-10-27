import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
        position: 'absolute',
        marginTop: -30,
        //borderWidth: 1,
        width: '100%',
        resizeMode:'cover',
        height: 205,
    },

    imageLogo:{
        marginTop:170 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeader:{
        position: 'absolute',
        marginTop: 45,
        marginLeft: 50,
        //margin: 35,
    },
    textTitle:{
        fontSize: SIZES.xLarge,
        fontWeight: 'bold'
    },
    textWelcome:{
        marginTop: 6,
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
     
})

export default styles

