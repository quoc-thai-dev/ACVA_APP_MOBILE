import {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';
import api from '../api/axiosClient';
import {COLORS} from '../constants';
function LanguageChangeHandler() {
  const {i18n} = useTranslation();
  useEffect(() => {
    handleLanguageChange();
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  const handleLanguageChange = () => {
    api.interceptors.request.use(config => {
      config.headers['Accept-Language'] = i18n.language;
      return config;
    });
  };
  const changeLang = (lang = 'vi') => {
    i18n.changeLanguage(lang);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(i18n.language);
  const [items, setItems] = useState([
    {
      label: i18n.t('vi'),
      value: 'vi',
      icon: () => (
        <Image
          source={require('../assets/images/flags/vi.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
    {
      label: i18n.t('en'),
      value: 'en',
      icon: () => (
        <Image
          source={require('../assets/images/flags/en.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
    {
      label: i18n.t('ko'),
      value: 'ko',
      icon: () => (
        <Image
          source={require('../assets/images/flags/ko.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
  ]);
  return (
    <View style={{position: 'absolute', top: 40, right: 20, zIndex: 999}}>
      <DropDownPicker
        style={{
          width: 55,
          alignSelf: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#bdc3c7',
          overflow: 'hidden',
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        mode="SIMPLE"
        labelStyle={{textAlign: 'center', display: 'none'}}
        listItemContainerStyle={{textAlign: 'center'}}
        listItemLabelStyle={{display: 'none'}}
        containerStyle={{width: 55, alignSelf: 'center', zIndex: 10}}
        selectedItemLabelStyle={{
          color: COLORS.primary,
          fontWeight: 'bold',
          backgroundColor: 'red',
        }}
        dropDownContainerStyle={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#bdc3c7',
        }}
        arrowIconContainerStyle={{display: 'none'}}
        selectedItemContainerStyle={{backgroundColor: COLORS.primary}}
        placeholder={i18n.t('languages')}
        tickIconStyle={{backgroundColor: COLORS.primary, borderRadius: 5}}
        placeholderStyle={{textAlign: 'center', display: 'none'}}
        onSelectItem={item => changeLang(item.value)}
      />
    </View>
  );
}

export default LanguageChangeHandler;
