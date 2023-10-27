import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

import styles from './TextInputCustom.style';

const defaultFn = (event) => {};
const TextInputCustom = ({
    value,
    placeHolder,
    secureTextEntry,
    onChangeText = defaultFn,
    onBlur = defaultFn,
    onFocus = defaultFn,
    iconRight,
    iconRightOnPress,
    props,
}) => {

  const [state, setState] = useState({
      hidePassword: true,
      isClick: false,
      focus: false,
  });

  const {hidePassword, isClick, focus} = state;

  const updateState = (data) => setState({...state, ...data}) 
  return (
    <View style={styles.container}>
        <TextInput
            value = {value}
            placeholder= {placeHolder}
            style= {styles.inputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={'gray'}
            secureTextEntry = { iconRight && iconRight.hide ? hidePassword : secureTextEntry }
            onFocus={(event)=> {
              updateState({focus: !focus});
              onFocus(event);
            }}
            onBlur={()=> {
                updateState({focus: !focus});
                onBlur();
            }}

            {...props}
        />

        {iconRight ? 
         <View style={styles.iconRight}>
           <Pressable onPress={iconRight.hide ? () => updateState({hidePassword: !hidePassword, isClick: !isClick}) : iconRightOnPress}>
                { iconRightOnPress ? iconRight.icon : (isClick ? iconRight.icon : iconRight.icon2) }
            </Pressable> 
        </View>
        : false}
    </View>
  )
}

export default TextInputCustom