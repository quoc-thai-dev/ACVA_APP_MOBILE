import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {COLORS,SIZES} from '../../constants/theme'

const styles = StyleSheet.create({
    containerContent:{
        flexDirection: 'column',
        gap: 12,
        padding: 20,
        // height: '68%'
    },
    titleText:{
        fontSize: SIZES.large,
        fontWeight: '600',
    },
    textContainer:{
        flexDirection: 'column',
        gap: 10,
        alignItems:'center',
        justifyContent: 'center',

    },
    textContent:{
        textAlign: 'center',
        width: '100%',
        fontSize: SIZES.xSmall,
        padding: 3
    }
  

})

export default styles

