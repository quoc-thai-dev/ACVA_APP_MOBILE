import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './SocialIcon.style'
import { SHADOWS } from '../../constants'


const SocialIcon = ({source}) => {
  return (
    <View  style={[styles.container, SHADOWS.small]}>
        <Image source={source}/>
    </View>
  )
}

export default SocialIcon