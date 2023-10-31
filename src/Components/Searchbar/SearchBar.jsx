import Feather from 'react-native-vector-icons/Feather';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View, Appearance} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../constants';
const SearchBar = props => {
  const {t} = useTranslation();
  const [search, setSearch] = useState(null);
  const inputSearch = useRef(null);
  const searchData = str => {
    props.callback(str);
  };
  const theme = Appearance.getColorScheme();
  return (
    <View style={styles.searchSection}>
      <Feather
        style={styles.searchIcon}
        name={true ? 'search' : 'search-outline'}
        size={24}
        color={COLORS.primary}
        // color={props.color}
      />
      <TextInput
        style={styles.input}
        ref={inputSearch}
        onChangeText={text => searchData(text)}
        placeholder={t('search_question')}
        placeholderTextColor={COLORS.gray}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    position: 'relative',
    marginVertical: 10,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    left: 35,
    opacity: 0.5,
  },
  input: {
    fontFamily: 'Roboto',
    height: 50,
    paddingHorizontal: 20,
    paddingLeft: 45,
    backgroundColor: 'white',
    color: '#424242',
    borderRadius: 15,
    borderColor: '#e9e9e9',
    borderWidth: 1,
  },
  inputDark: {
    fontFamily: 'Roboto',
    height: 50,
    paddingHorizontal: 20,
    paddingLeft: 45,
    backgroundColor: '#1c1c1c',
    color: '#424242',
    borderRadius: 15,
    borderColor: '#e9e9e9',
    borderWidth: 1,
  },
});
export default SearchBar;
