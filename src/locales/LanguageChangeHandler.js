import {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';
import api from '../api/axiosClient';
import {COLORS, SIZES} from '../constants';
import {Modal, Portal, List, Button, Text} from 'react-native-paper';
function LanguageChangeHandler() {
  const [t, i18n] = useTranslation();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

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
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const languages = [
    {
      label: t('vi'),
      code: 'vi',
      flag: require('../assets/images/flags/vi.png'),
    },
    {
      label: t('en'),
      code: 'en',
      flag: require('../assets/images/flags/en.png'),
    },
    {
      label: t('ko'),
      code: 'ko',
      flag: require('../assets/images/flags/ko.png'),
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
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
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
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          top: Platform.OS=="ios"?40:20,
          right: 30,
          zIndex: 999,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => showModal()}>
          {i18n.language == 'vi' ? (
            <Image
              source={languages[0].flag}
              resizeMode="cover"
              style={styles.image}></Image>
          ) : i18n.language == 'en' ? (
            <Image
              source={languages[1].flag}
              resizeMode="cover"
              style={styles.image}></Image>
          ) : (
            <Image
              source={languages[2].flag}
              resizeMode="cover"
              style={styles.image}></Image>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 48, // Set the width of your image
    height: 48, // Set the height of your image
    // Add any other styles you need
  },
  containerStyle: {
    padding: 20,
    borderRadius: 30,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
  },
});

export default LanguageChangeHandler;
