import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:60
      },
      youtubePlayer: {
        alignSelf: 'stretch',
        height: 300, // Set the height of the player as per your requirement
      },
      card:{
        width:'47%',
        marginBottom:20,
        backgroundColor:'white'
      }
})

export default styles