import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
import React, {createRef, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import {Avatar, Button, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import AppLoader from '../../Components/AppLoader';
import universityApi from '../../api/universityApi';
import usersApi from '../../api/usersApi';
import {SHADOWS} from '../../constants';
import {COLORS} from '../../constants/theme';
import {showError, showSuccess} from '../../utils/helperFunction';
import {setItem} from '../../utils/untils';
import {TextInputWithLabel} from '../../Components';
import TextInputCustom from '../../Components/Common/TextInputCustom/TextInputCustom';
const UserInfo = () => {
  const {t, i18n} = useTranslation();
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  // const refDate = createRef();
  const refPhone = createRef();
  const userData = useSelector(state => state.auth.userData.user);
  const token = useSelector(state => state.auth.userData.token);
  const [formData, setFormData] = useState(userData);
  const [uni, setUni] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [birthday, setBirthday] = useState(formatDate(formData.birthday));
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
  // const [universities, setUniversities] = useState([]);
  const [unvOpen, setUnvOpen] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);

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
            return {value: u.id, label: u.name};
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
    // if (f === 'universities') {
    //   setSelected(v);
    // }
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
    return day + '-' + month + '-' + year;
  }
  // function formatDateSubmit(input) {
  //   if (input == '' || input == null) return;
  //   var datePart = input.match(/\d+/g),
  //     year = datePart[2], // get only two digits
  //     month = datePart[1],
  //     day = datePart[0];
  //   return year + '-' + month + '-' + day;
  // }
  function createDate(input) {
    if (input == '' || input == null) return;
    var dateParts = input.split('-');

    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
  }
  const saveProfile = async () => {
    let data = {
      id: userData.id,
      fullname: formData.full_name,
      birthday: formData.birthday,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      uni_id: formData.universities_id,
      email2: formData.email2,
    };
    // console.log(data);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const chooseDate = date => {
    const dateFormat = new Date(date);
    const newCurrentdate = `${dateFormat.getFullYear()}-${String(
      dateFormat.getMonth() + 1,
    ).padStart(2, '0')}-${String(dateFormat.getDate()).padStart(2, '0')}`;
    // const newCurrentdate = `${String(dateFormat.getDate()).padStart(
    //   2,
    //   '0',
    // )}-${String(dateFormat.getMonth() + 1).padStart(
    //   2,
    //   '0',
    // )}-${dateFormat.getFullYear()}`;
    setFormData(prevFormData => ({
      ...prevFormData,
      birthday: newCurrentdate,
    }));
    // alert(newCurrentdate);
    // setBirthday(newCurrentdate);
  };
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 480,
      maxWidth: 480,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageBase64 = response.base64 || response.assets?.[0]?.base64;
        setSelectedImage(imageBase64);
        updateAvatar(imageBase64);
      }
    });
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null} // Android doesn't need 'padding' behavior
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} // Adjust as needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled" // Allows tapping outside the keyboard to dismiss it
          showsVerticalScrollIndicator={false}
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
            style={{marginVertical: 10}}
            // icon="camera"
            mode="contained"
            onPress={openImagePicker}>
            {t('upload_avatar')}
          </Button>
          <DropDownPicker
            loading={loading}
            open={unvOpen}
            setOpen={setUnvOpen}
            items={uni}
            placeholder={t('select_school')}
            searchPlaceholder={t('type_school')}
            schema={{
              label: 'label',
              value: 'value',
            }}
            labelProps={{
              numberOfLines: 1,
            }}
            value={formData.universities_id}
            onSelectItem={data =>
              handleInputChange('universities_id', data.value)
            }
            listMode="SCROLLVIEW"
            disableBorderRadius={false}
            searchable={true}
            maxHeight={300}
            autoScroll={true}
            scrollViewProps={{
              showsHorizontalScrollIndicator: false,
              showsVerticalScrollIndicator: false,
            }}
            ListEmptyComponent={({
              listMessageContainerStyle,
              listMessageTextStyle,
              ActivityIndicatorComponent,
              loading,
              message,
            }) => (
              <View style={{...listMessageContainerStyle, zIndex: 0}}>
                {loading ? (
                  <ActivityIndicatorComponent />
                ) : (
                  <Text
                    style={[listMessageTextStyle, styles.dropBoxMessageEmpty]}>
                    {t('no_school')}
                  </Text>
                )}
              </View>
            )}
            ArrowDownIconComponent={() => (
              <AntDesign name="caretdown" size={12} color="#333" />
            )}
            ArrowUpIconComponent={() => (
              <AntDesign name="caretup" size={12} color="#333" />
            )}
            TickIconComponent={({style}) => (
              <AntDesign
                style={style}
                name="checkcircle"
                size={16}
                color="#ee463b"
              />
            )}
            style={styles.unvDropdownPicker}
            dropDownContainerStyle={styles.unvDropDownContainerStyle}
            searchContainerStyle={styles.unvsearchContainerStyle}
            searchTextInputStyle={styles.unvsearchTextInputStyle}
            listItemContainerStyle={styles.unvListItemContainerStyle}
            tickIconContainerStyle={styles.unvTickIconContainerStyle}
            selectedItemLabelStyle={styles.unvSelectedItemLabelStyle}
            placeholderStyle={styles.placeholderStyle}
          />
          <TextInput
            style={{...styles.inputStyle, marginTop: 20}}
            mode="outlined"
            value={formData.email}
            editable={false}
            textColor="gray"
            label={t('email')}
            autoCapitalize="none"
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
            autoCapitalize="none"
            // ref={refDate}
            contentStyle={{color: 'black'}}
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
            contentStyle={{color: 'black'}}
          />
          <TextInput
            style={styles.inputStyle}
            value={formatDate(formData.birthday)}
            mode="outlined"
            label={t('birthday')}
            outlineColor="#E9EAEC"
            theme={styles.themeInput}
            outlineStyle={{borderRadius: 10}}
            contentStyle={{color: 'black'}}
            editable={false}
            onPressIn={() => setOpen(true)}
          />
          <View style={styles.inputGroup}>
            <DatePicker
              modal
              open={open}
              date={createDate(formData.birthday)}
              mode="date"
              locale={i18n.language}
              confirmText={t('confirm')}
              cancelText={t('cancel')}
              title={t('birthday')}
              onConfirm={date => {
                setOpen(false);
                chooseDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <DropDownPicker
            open={genderOpen}
            setOpen={setGenderOpen}
            placeholder={t('gender')}
            items={genders}
            value={formData.gender}
            schema={{
              label: 'label',
              value: 'value',
            }}
            onSelectItem={data => handleInputChange('gender', data.value)}
            disableBorderRadius={false}
            dropDownDirection="BOTTOM"
            ArrowDownIconComponent={() => (
              <AntDesign name="caretdown" size={12} color="#333" />
            )}
            ArrowUpIconComponent={() => (
              <AntDesign name="caretup" size={12} color="#333" />
            )}
            TickIconComponent={({style}) => (
              <AntDesign
                style={style}
                name="checkcircle"
                size={16}
                color="#ee463b"
              />
            )}
            style={styles.genderDropDownPicker}
            dropDownContainerStyle={styles.genderDropDownContainerStyle}
            listItemContainerStyle={styles.genderListItemContainerStyle}
            selectedItemLabelStyle={styles.genderSelectedItemLabelStyle}
            tickIconContainerStyle={styles.genderTickIconContainerStyle}
            placeholderStyle={styles.placeholderStyle}
            listMode="SCROLLVIEW"
          />
          <TextInput
            style={{...styles.inputStyle, marginTop: 20}}
            mode="outlined"
            label={t('address')}
            value={formData.address}
            onChangeText={v => handleInputChange('address', v)}
            outlineColor="#E9EAEC"
            outlineStyle={{borderRadius: 10}}
            theme={styles.themeInput}
            autoCapitalize="none"
            contentStyle={{color: 'black'}}
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
            contentStyle={{color: 'black'}}
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
      onSurfaceVariant: 'black',
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
    marginBottom: 20,
    color: 'black',
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
  unvDropdownPicker: {
    borderColor: '#E9EAEC',
  },

  unvDropDownContainerStyle: {
    marginTop: 6,
    backgroundColor: '#fff',
    ...SHADOWS.medium,
    borderWidth: 0,
    padding: 6,
    position: 'relative',
    top: 0,
  },

  unvsearchTextInputStyle: {
    borderWidth: 0,
  },

  unvTickIconContainerStyle: {
    paddingTop: 4,
    justifyContent: 'center',
  },

  unvSelectedItemLabelStyle: {
    color: '#ee463b',
    fontWeight: 500,
    fontStyle: 'italic',
  },

  unvsearchContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#E9EAEC',
  },

  unvListItemContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9EAEC',
  },

  genderDropDownPicker: {
    borderColor: '#E9EAEC',
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
  },

  genderDropDownContainerStyle: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderColor: 'gray',
    ...SHADOWS.medium,
    borderWidth: 0,
    padding: 6,
    position: 'relative',
    top: 0,
  },

  genderListItemContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#E9EAEC',
  },

  genderSelectedItemLabelStyle: {
    color: '#ee463b',
    fontWeight: 500,
    fontStyle: 'italic',
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '100%',
  },
});
export default UserInfo;
