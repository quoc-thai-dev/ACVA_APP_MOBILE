import React from 'react';
import {View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const AppLoader=()=>{
    return (
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
            <LottieView source={require('../assets/animation_lkgoezjw.json')} autoPlay loop/>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,1)',
        zIndex:1,
    }
});
export default AppLoader;