import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const HideKeyBoard =({children})=>{
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}
export default HideKeyBoard;