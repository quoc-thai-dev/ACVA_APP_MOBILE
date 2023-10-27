import {View, Text, Image, ScrollView, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import HeaderAuth from '../../Components/HearderAuth/HeaderAuth';
import {COLORS, images} from '../../constants';
import ButtonWithLoader from '../../Components/Common/ButtonWithLoader/ButtonWithLoader';
import styles from './Start.style';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';
const Start = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: t('vi'),
      value: 'vi',
      icon: () => (
        <Image
          source={require('../../assets/images/flags/vi.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
    {
      label: t('en'),
      value: 'en',
      icon: () => (
        <Image
          source={require('../../assets/images/flags/en.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
    {
      label: t('ko'),
      value: 'kr',
      icon: () => (
        <Image
          source={require('../../assets/images/flags/ko.png')}
          style={{width: 32, height: 32}}
        />
      ),
    },
  ]);
  return (
    <>
      <HeaderAuth
        urlBackground={images.acva_header}
        urlLogo={images.acva_logo}
      />
      <View>
        {/* <DropDownPicker
          style={{width: 180,alignSelf:'center',borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden'}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          mode='SIMPLE'
          labelStyle={{textAlign:'center'}}
          listItemContainerStyle={{textAlign:'center'}}
          containerStyle={{width:180,alignSelf:'center', zIndex:10}}
          selectedItemLabelStyle={{color:COLORS.primary, fontWeight:'bold'}}
          dropDownContainerStyle={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7',}}
          placeholder={t('languages')}
          tickIconStyle={{backgroundColor:COLORS.primary,borderRadius:5}}
          placeholderStyle={{textAlign:'center'}}
          onSelectItem={(item)=>changeLanguage(item.value)}
        /> */}
        <ScrollView style={styles.containerContent}>
          {/* <Button onPress={() => changeLanguage('en')} title="English" />
          <Button onPress={() => changeLanguage('vi')} title="VietNam" /> */}
          <View style={styles.textContainer}>
            <View style={{height: ''}}>
              <Image source={images.acva_get_start} />
            </View>
            <Text style={styles.titleText}>{t('discover')}</Text>
            <View style={styles.textContent}>
              <Text style={{textAlign: 'center'}}>{t('introduce_begin')}</Text>
            </View>
          </View>

          <ButtonWithLoader
            text={t('start')}
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Start;
