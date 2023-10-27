import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
import React, {createRef, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Appearance,
  ScrollView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {TextInputMask} from 'react-native-masked-text';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AppLoader from '../../Components/AppLoader';
import universityApi from '../../api/universityApi';
import usersApi from '../../api/usersApi';
import {COLORS} from '../../constants/theme';
import {showError, showSuccess} from '../../utils/helperFunction';
import {setItem} from '../../utils/untils';

const UserInfo = () => {
  const {t} = useTranslation();
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const refDate = createRef();
  const refPhone = createRef();
  const userData = useSelector(state => state.auth.userData.user);
  const token = useSelector(state => state.auth.userData.token);
  const [formData, setFormData] = useState(userData);
  const [uni, setUni] = useState([]);
  const [selected, setSelected] = useState(userData.universities_id);
  const [slGender, setSelectGender] = useState(parseInt(userData.gender));
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [birthday, setBirthday] = useState('');
  const theme = Appearance.getColorScheme();
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //     base64: true,
  //   });

  //   if (!result.canceled && !result.cancelled) {
  //     updateAvatar(result.assets[0].base64);
  //   }
  // };
  const updateAvatar = async b64 => {
    let data = {
      id: userData.id,
      image_extension: 'jpg',
      image_base64: b64,
    };
    await usersApi
      .changeAvatar(data)
      .then(res => {
        setImage(res.data.avatar_path);
        showSuccess(t('change_avatar_success'));
        setItem('avatarUrl', 'http://acva.vn/quiz/' + res.data.avatar_path);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => console.log(error));
  };
  const getAvatar = async () => {
    try {
      const storeAvatar = await AsyncStorage.getItem('avatarUrl');
      if (storeAvatar) {
        setImage(storeAvatar.replace(/['"]+/g, ''));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setUp();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const getDataUniversity = async () => {
    await universityApi
      .getAll()
      .then(res => {
        if (res.status == 200) {
          let uniSelect = res.data.map(u => {
            return {key: u.id, value: u.name};
          });
          setUni(uniSelect);
        }
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getUserInfo = async () => {
    usersApi
      .getUserById(userData.id)
      .then(res => {
        setFormData(res.data);
        setImage(res.data.image46);
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const setUp = async () => {
    await getAvatar();
    await getDataUniversity();
    await getUserInfo();
  };
  const handleInputChange = (f, v) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [f]: v,
    }));
  };
  // function formatDate(input) {
  //   if (input == '') return;
  //   var datePart = input.match(/\d+/g),
  //     year = datePart[0], // get only two digits
  //     month = datePart[1],
  //     day = datePart[2];
  //   return day + '/' + month + '/' + year;
  // }
  function formatDate(input) {
    if (input == '' || input == null) return;
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + month + year;
  }
  function formatDateSubmit(input) {
    if (input == '' || input == null) return;
    var datePart = input.match(/\d+/g),
      year = datePart[2], // get only two digits
      month = datePart[1],
      day = datePart[0];
    return year + '-' + month + '-' + day;
  }
  const saveProfile = async () => {
    let data = {
      id: userData.id,
      fullname: formData.full_name,
      birthday: formatDateSubmit(birthday),
      gender: slGender,
      address: formData.address,
      phone: formData.phone,
      uni_id: selected,
      email2: formData.email2,
    };
    //console.log(data);
    await usersApi
      .updateUserInfo(data)
      .then(res => {
        showSuccess(res.message);
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const genderData = [
    {key: 0, value: t('male')},
    {key: 1, value: t('female')},
  ];
  const genders = [
    {
      value: 0,
      label: t('male'),
    },
    {
      value: 1,
      label: t('female'),
    },
  ];
  return (
    <>
      {/* <HideKeyBoard> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null} // Android doesn't need 'padding' behavior
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} // Adjust as needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled" // Allows tapping outside the keyboard to dismiss it
          contentContainerStyle={[
            styles.container,
            {backgroundColor: 'white'},
          ]}>
          {image != '' ? (
            <Avatar.Image
              size={100}
              source={{
                uri: 'http://acva.vn/quiz/' + image,
              }}
              style={{margin: 10}}
            />
          ) : (
            <Avatar.Image
              size={100}
              source={{
                uri:
                  'https://ui-avatars.com/api/?name=' +
                  formData.user.full_name.split(' ').pop() +
                  '&length=1',
              }}
              style={{margin: 0}}
            />
          )}
          <Button
            // icon="camera"
            mode="contained"
            // onPress={pickImage}
            >
            {t('upload_avatar')}
          </Button>
          <SelectList
            placeholder={t('choose_university')}
            setSelected={setSelected}
            data={uni}
            defaultOption={{
              key: formData.universities_id,
              value: formData.uni_name,
            }}
            save="key"
            onSelect={() => handleInputChange('universities', selected)}
            inputStyles={{color: 'black', width: '95%'}}
            dropdownStyles={''}
            dropdownTextStyles={{color: 'black'}}
            boxStyles={{marginVertical: 20, width: '100%'}}
          />
          <TextInput
            style={{...styles.inputStyle,placeHolderTextColor:'red'}}
            mode="outlined"
            value={formData.email}
            editable={false}
            textColor='gray'
            label={t('email')}
            outlineColor="#E9EAEC"
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            
          />
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            value={formData.email2}
            onChangeText={v => handleInputChange('email2', v)}
            label={t('backup_email')}
            outlineColor="#E9EAEC"
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            ref={refDate}
            contentStyle={{color:'black'}}
          />
          <TextInput
            style={styles.inputStyle}
            value={formData.full_name}
            onChangeText={v => handleInputChange('full_name', v)}
            mode="outlined"
            label={t('full_name')}
            outlineColor="#E9EAEC"
            theme={styles.themeInput}
            outlineStyle={{borderRadius: 10}}
            contentStyle={{color:'black'}}

          />
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            label={t('birthday')}
            outlineColor="#E9EAEC"
            value={formatDate(formData.birthday)}
            render={props => (
              <TextInputMask
                {...props}
                type={'datetime'}
                value={formatDate(formData.birthday)}
                options={{
                  format: 'DD/MM/YYYY',
                  // format: 'YYYY-MM-DD',
                }}
                onChangeText={text => {
                  props.onChangeText?.(text);
                  setBirthday(text);
                  //   handleInputChange('birthday', text);
                }}
              />
            )}
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            contentStyle={{color:'black'}}
          />
          <SelectList
            placeholder={t('choose_gender')}
            searchPlaceholder={t('search')}
            setSelected={setSelectGender}
            data={genderData}
            defaultOption={{
              key: userData.gender,
              value: userData.gender == '1' ? t('female') : t('male'),
            }}
            save="key"
            onSelect={() => handleInputChange('gender', slGender)}
            inputStyles={{color: 'black', width: '95%'}}
            dropdownTextStyles={{color: 'black'}}
            boxStyles={
                {marginBottom: 20, width: '100%'}
            }
          />
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            label={t('address')}
            value={formData.address}
            onChangeText={v => handleInputChange('address', v)}
            outlineColor="#E9EAEC"
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            contentStyle={{color:'black'}}
          />
          <TextInput
            style={{...styles.inputStyle}}
            mode="outlined"
            label={t('tel')}
            value={formData.phone}
            onChangeText={v => handleInputChange('phone', v)}
            outlineColor="#E9EAEC"
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            contentStyle={{color:'black'}}
            ref={refPhone}
            render={props => (
              <TextInputMask
                {...props}
                value={formData.phone}
                type={'only-numbers'}
                ref={refPhone}
                onChangeText={text => {
                  props.onChangeText?.(text);
                  handleInputChange('phone', text);
                }}
              />
            )}
          />
          <Button
            style={styles.saveButton}
            mode="contained"
            onPress={saveProfile}>
            {t('save')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </HideKeyBoard> */}
      {loading ? <AppLoader /> : ''}
    </>
  );
};
const styles = StyleSheet.create({
  themeInput: {
    colors: {
      placeholder: COLORS.tertiary,
      text: COLORS.tertiary,
      primary: COLORS.tertiary,
      underlineColor: COLORS.tertiary,
      background: 'white',
      onSurfaceVariant: 'black'
    },
  },
  themeDark: {
    colors: {
      placeholder: 'black',
      text: 'black',
      primary: 'black',
      underlineColor: 'black',
      background: 'white',
    },
  },
  inputStyle: {
    width: '100%',
    marginBottom: 30,
    color:'black'
  },
  saveButton: {
    width: '100%',
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
export default UserInfo;
