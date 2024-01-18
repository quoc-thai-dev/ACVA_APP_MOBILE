import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Appearance,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Avatar, Button, List, Modal, Portal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderAuth} from '../../Components';
import {images} from '../../constants';
import {COLORS, SIZES} from '../../constants/index';
import actions from '../../redux/actions';
import styles from './Profile.style.js';
import {changeUserData} from '../../redux/actions/auth';
const extractName = name => {
  if (name + '' == '' || name + '' == 'null' || name + '' == 'undefined') {
    return '';
  }
  const words = name.split(' ');
  if (words.length >= 2) {
    const lastWord = words[words.length - 1];
    const secondLastWord = words[words.length - 2];

    const result = secondLastWord + '+' + lastWord;
    return result;
  } else {
    return name;
  }
};
const Profile = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const containerStyle = {
    padding: 20,
    borderRadius: 30,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
  };
  const theme = Appearance.getColorScheme();
  const userData = useSelector(state => state.auth.userData);
  const menuItems = [
    [t('account_info'), 'account-outline', 'chevron-right'],
    [t('change_password'), 'account-lock-open-outline', 'chevron-right'],
    [t('notification'), 'bell-outline', 'chevron-right'],
    [t('languages'), 'flag-outline'],
    [t('version'), 'cog-outline', DeviceInfo.getVersion()],
    [t('logout'), 'logout'],
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const languages = [
    {
      label: t('vi'),
      code: 'vi',
      flag: require('../../assets/images/flags/vi.png'),
    },
    {
      label: t('en'),
      code: 'en',
      flag: require('../../assets/images/flags/en.png'),
    },
    {
      label: t('ko'),
      code: 'ko',
      flag: require('../../assets/images/flags/ko.png'),
    },
  ];

  const handleLanguageSelection = languageCode => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    hideModal();
  };
  const [isLoading, setLoading] = useState(false);
  const onLogoutAlert = () => {
    Alert.alert(
      t('notification'),
      t('logout_msg'),
      [
        {text: t('no'), style: 'cancel'},
        {text: t('logout'), style: 'destructive', onPress: logout},
      ],
      {cancelable: true},
    );
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actions.logout());
  };

  const SelectAction = index => {
    switch (index) {
      case 0:
        navigation.navigate('UserInfo');
        break;
      case 1:
        navigation.navigate('ChangePassword');
        break;
      case 2:
        navigation.navigate('Notification');
        break;
      case 3:
        showModal();
        break;
      case 5:
        onLogoutAlert();
        break;
      default:
        break;
    }
  };
  let avatar = '';
  if (userData.user?.image46) {
    avatar = (
      <Avatar.Image
        size={75}
        source={{
          uri: 'http://acva.vn/quiz/' + userData.user?.image46,
        }}
        style={{margin: 0}}
      />
    );
  } else {
    avatar = (
      <Avatar.Image
        size={75}
        source={{
          uri:
            'https://ui-avatars.com/api/?background=00d1b2&color=fff&name=' +
            extractName(userData.user?.full_name),
        }}
        style={{margin: 0}}
      />
    );
  }
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View>
            <List.Section>
              <List.Subheader
                style={{
                  color: 'black',
                  fontSize: SIZES.medium,
                  fontWeight: 'bold',
                }}>
                {t('choose_language')}
              </List.Subheader>
              {languages.map(language => (
                <List.Item
                  key={language.code}
                  title={() => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 32, height: 32, marginRight: 30}}
                        source={language.flag}
                      />
                      <Text style={{color: 'black'}}>{language.label}</Text>
                    </View>
                  )}
                  onPress={() => handleLanguageSelection(language.code)}
                  right={props => (
                    <List.Icon
                      {...props}
                      icon={
                        selectedLanguage === language.code ? 'check' : 'square'
                      }
                      color={
                        selectedLanguage === language.code
                          ? COLORS.primary
                          : '#ccc'
                      }
                    />
                  )}
                />
              ))}
            </List.Section>
            <Button mode="contained" onPress={handleConfirm}>
              {t('confirm')}
            </Button>
          </View>
        </Modal>
      </Portal>
      <HeaderAuth
        urlBackground={images.acva_header}
        // urlLogo={images.acva_logo}
        // titleHeader={t('register')}
        // iconHeader={'user'}
        // textWelcome={t('welcome')}
      />
      <ScrollView style={styles.container}>
        {/* <ImageBackground source={require('../../assets/images/ACVA/ACVA_Header.png')} resizeMode="contain" style={{flex:1,justifyContent:'center'}}/> */}
        <View style={styles.blockAvatar}>
          <Text style={styles.title}>{t('setting')}</Text>
          {avatar}
          <Text style={styles.name}>{userData.user?.full_name}</Text>
          {/* <Button onPress={handleChangeName}>Change Name</Button> */}
        </View>
        {/* </ImageBackground> */}
        <ScrollView
          style={styles.blockList}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <List.Item
              style={{
                alignSelf: 'center',
                // width: Dimensions.get('screen').width - 30,
                width: (Dimensions.get('screen').width * 90) / 100,
                backgroundColor: 'white',
                borderRadius: 16,
                marginBottom: 10,
                height: 50,
                // Add shadow based on the platform
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: {width: 1, height: 3},
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                  },
                  android: {
                    elevation: 2,
                  },
                }),
              }}
              key={index}
              onPress={() => SelectAction(index)}
              title={item[0]}
              titleStyle={
                index == 5
                  ? {
                      color: COLORS.primary,
                      fontWeight: 'bold',
                      fontSize: SIZES.medium - 2,
                    }
                  : {color: 'black', fontSize: SIZES.medium - 2}
              }
              left={props => (
                <List.Icon
                  {...props}
                  color={index == 5 ? COLORS.primary : 'black'}
                  icon={item[1]}
                />
              )}
              right={props =>
                index == 4 ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      fontSize: SIZES.small,
                      lineHeight: 20,
                    }}>
                    {item[2]}
                  </Text>
                ) : index == 3 ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {i18n.language == 'vi' ? (
                      <Image
                        source={require('../../assets/images/flags/vi.png')}
                        style={{width: 32, height: 21}}
                      />
                    ) : i18n.language == 'en' ? (
                      <Image
                        source={require('../../assets/images/flags/en.png')}
                        style={{width: 32, height: 21}}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/flags/ko.png')}
                        style={{width: 32, height: 21}}
                      />
                    )}
                  </View>
                ) : (
                  <List.Icon {...props} color="black" icon={item[2]} />
                )
              }
            />
          ))}
        </ScrollView>
        {/* <View style={{height: 75}}></View> */}
      </ScrollView>
    </>
  );
};
export default Profile;
