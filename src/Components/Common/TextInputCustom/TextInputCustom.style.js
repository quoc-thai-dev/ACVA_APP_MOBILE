import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const styles = StyleSheet.create({
    container:{
        marginBottom: 12,
    },
    inputStyle:{
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        color: '#333',
        borderRadius: 9,
        paddingHorizontal: 16,
    },
    textLabel:{
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },

    iconRight:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent:'center',
        paddingRight: 6,
    }

})

export default styles;
