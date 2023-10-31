import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './TextInputWithLabel.style';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const TextInputWithLabel = ({
  label,
  editable,
  placeholder,
  onChangeText = () => {},
  value,
  status,
  style,
  onFocus,
  onBlur,
  ref,
  secureTextEntry,
  iconRight,
  numberOfLines,
  props,
}) => {
  const [state, setState] = useState({
    focus: false,
    hide: true,
    isClick: false,
  });

  const {focus, hide, isClick} = state;

  const updateState = data => setState({...state, ...data});

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.labelContainer}>
        <Text style={{fontWeight: 'bold'}}>{label}</Text>
      </View>
      <View
        style={
          style
            ? [style, styles.inputContainer(focus)]
            : styles.inputContainer(focus)
        }>
        <TextInput
          numberOfLines={numberOfLines}
          ellipsizeMode="tail"
          editable={editable}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={
            status
              ? status !== '0'
                ? styles.textInputpresent
                : styles.textInputabsent
              : {color: '#333'}
          }
          onFocus={() => {
            onFocus;
            updateState({focus: !focus});
          }}
          onBlur={() => {
            onBlur;
            updateState({focus: !focus});
          }}
          placeholderTextColor={'#e5e2e2'}
          secureTextEntry={
            iconRight
              ? iconRight.hide === true
                ? hide
                : false
              : secureTextEntry
          }
          {...props}
        />
      </View>
      {status ? (
        <View style={styles.icon}>
          <SimpleLineIcons
            name={status === '1' ? 'user-following' : 'user-unfollow'}
            size={24}
            color={status === '1' ? 'green' : '#f54257'}
          />
        </View>
      ) : (
        false
      )}

      {iconRight ? (
        <View style={styles.icon}>
          <Pressable
            onPress={
              iconRight.hide === true
                ? () => updateState({hide: !hide, isClick: !isClick})
                : () => {}
            }>
            {isClick ? iconRight.icon : iconRight.icon2}
          </Pressable>
        </View>
      ) : (
        false
      )}
    </View>
  );
};

export default TextInputWithLabel;
