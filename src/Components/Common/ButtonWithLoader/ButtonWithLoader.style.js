import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {COLORS} from '../../../constants/theme'


const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle:{
        height: 48,
        width: '100%',
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
    },
    textStyle:{
        fontSize:16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff'
    },

})

export default styles;
