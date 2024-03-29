import React, { createRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import { Avatar, Button, TextInput, Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import AppLoader from '../../Components/AppLoader';
import universityApi from '../../api/universityApi';
import usersApi from '../../api/usersApi';
import { SHADOWS } from '../../constants';
import { COLORS, SIZES } from '../../constants/theme';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';

const extractName=(name)=>{
  if(name+""=="" || name+""=="null" || name+""=="undefined"){
    return "";
  }
  const words=name.split(' ');
  if(words.length>=2){
    const lastWord=words[words.length-1];
    const secondLastWord=words[words.length-2];

    const result = secondLastWord+"+"+lastWord;
    return result
  }else{
    return name;
  }
}
const UserInfo = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const refPhone = createRef();
  const userData = useSelector(state => state.auth.userData.user);
  console.log(userData);
  const token = useSelector(state => state.auth.userData.token);
  const [formData, setFormData] = useState(userData);
  const [uni, setUni] = useState([]);
  const [image, setImage] = useState('http://acva.vn/quiz/' + userData?.image46);
  const [loading, setLoading] = useState(true);
  const theme = Appearance.getColorScheme();
  const [isEdit,setIsEdit] = useState(false);
  const email2Ref=useRef();
  const fullnameRef=useRef();
  const addressRef=useRef();
  const birthdayRef=useRef();
  const updateHeaderButton = () => {
    if(isEdit){
      navigation.setOptions({
        headerRight: () => (
            <Button icon="check" compact={true} textColor={'#3DC65E'} mode="text" onPress={saveProfile}>
              {t('save')}
            </Button>
        )
      });

    }
    else{
      navigation.setOptions({
        headerRight:()=>(
          <Button icon="pencil" textColor={'#0B47DA'} compact={true} mode="text" onPress={()=>setIsEdit(true)}>
            {t('edit')}
          </Button>
        )
      })
    }
  }
  updateHeaderButton();

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
        setImage('http://acva.vn/quiz/' + res.data.avatar_path);
        let clone = {
          token: token,
          user: {
            ...userData,
            image46: res.data.avatar_path,
          },
        };
        dispatch(actions.changeUserData(clone));
        showSuccess(t('change_avatar_success'));
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => console.log(error));
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
    updateHeaderButton();
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
            return { value: u.id, label: u.name };
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
  const setUp = async () => {
    await getDataUniversity();
  };
  const handleInputChange = (f, v) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [f]: v,
    }));
  };

  function formatDate(input) {
    if (input == '' || input == null) return;
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + '-' + month + '-' + year;
  }

  function createDate(input) {
    if (input == '' || input == null) return new Date();
    var dateParts = input.split('-');
    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
  }
  const saveProfile = async () => {
    if(addressRef.current){
      addressRef.current.blur();
    }
    if(email2Ref.current){
      email2Ref.current.blur();
    }
    if(fullnameRef.current){
      fullnameRef.current.blur();
    }
    if(birthdayRef.current){
      birthdayRef.current.blur();
    }
    if(refPhone.current){
      refPhone.current.blur();
    }
    let data = {
      id: userData.id,
      fullname: formData?.full_name,
      birthday: formData.birthday,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      uni_id: formData.universities_id,
      email2: formData.email2,
    };
    let clone = {
      token: token,
      user: {
        ...userData,
        full_name: formData?.full_name,
        birthday: formData.birthday,
        email2: formData.email2,
        universities_id: formData.universities_id,
        gender: formData.gender,
        address: formData.address,
        phone: formData.phone,
        image46: image.replace('http://acva.vn/quiz/', ''),
      },
    };
    console.log(clone);
    dispatch(actions.changeUserData(clone));

    // console.log(data);
    await usersApi
      .updateUserInfo(data)
      .then(res => {
        showSuccess(res.message);
        // updateHeaderButton();
        setIsEdit(false)
        setUnvOpen(false);
        setGenderOpen(false);
        Keyboard.dismiss();
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const genderData = [
    { key: 0, value: t('male') },
    { key: 1, value: t('female') },
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
    setFormData(prevFormData => ({
      ...prevFormData,
      birthday: newCurrentdate,
    }));
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
  const onRemoveAccountAlert = () => {
    Alert.alert(
      t('danger'),
      t('remove_msg'),
      [
        { text: t('no'), style: 'cancel' },
        {
          text: t('remove_account'),
          style: 'destructive',
          onPress: removeAccount,
        },
      ],
      { cancelable: true },
    );
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actions.logout());
  };
  const removeAccount = async () => {
    let data = { id: userData?.id };
    await usersApi
      .removeAccount(data)
      .then(res => {
        if (res.status == 200) {
          Alert.alert(
            t('notification'),
            t('remove_account_success'),
            [{ text: t('Ok'), style: 'cancel' }],
            { cancelable: true },
          );
          navigation.navigate('Profile');
        }
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => {
        console.log('Delete Done');
        logout();
      });
  };
  let avatar = '';

  if (userData?.image46 && userData?.image46+"" !== "null") {
    avatar = (
      <Avatar.Image
        size={100}
        source={{
          uri: 'http://acva.vn/quiz/' + userData?.image46,
        }}
        style={{ margin: 0 }}
      />
    );
  } else {
    avatar = (
      <Avatar.Image
        size={100}
        source={{
          uri:
            'https://ui-avatars.com/api/?background=00d1b2&color=fff&name=' +
            extractName(userData?.full_name),
        }}
        style={{ margin: 0 }}
      />
    );
  }
  console.log(avatar)
  // themeInput: {
  //   colors: {
  //     placeholder: COLORS.tertiary,
  //     text: COLORS.tertiary,
  //     primary: COLORS.tertiary,
  //     underlineColor: COLORS.tertiary,
  //     background: 'white',
  //     onSurfaceVariant: '#98989D',
  //   },
  // },
  const themeInputTest={
      colors:{
        ...styles.themeInput.colors,
        onSurfaceVariant: isEdit?'black':'#98989D',
      }
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null} // Android doesn't need 'padding' behavior
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} // Adjust as needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled" // Allows tapping outside the keyboard to dismiss it
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: 'white' },
          ]}>
          {avatar}
          <View
            style={{ flexDirection: 'row', columnGap: 5, marginVertical: 15 }}>
            <Button
              icon="upload"
              mode="contained"
              onPress={openImagePicker}
              compact={true}
              // disabled={!isEdit}
            >
              {t('upload_avatar')}
            </Button>
            {/* <Button
              buttonColor="red"
              icon="delete"
              mode="contained"
              compact={true}
              disabled={!isEdit}
              onPress={onRemoveAccountAlert}
              textColor='white'>
              {t('remove_account')}
            </Button> */}
          </View>

          <DropDownPicker
            loading={loading}
            open={unvOpen}
            setOpen={isEdit?setUnvOpen:()=>setUnvOpen(false)}
            items={uni}
            labelStyle={isEdit ? { color: 'black' } : { color: '#98989D' }}
            placeholder={t('select_school') + ' *'}
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
              <View style={{ ...listMessageContainerStyle, zIndex: 0 }}>
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
            TickIconComponent={({ style }) => (
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
            style={{ ...styles.inputStyle, marginTop: 15 }}
            mode="outlined"
            value={formData.email}
            editable={false}
            textColor="#98989D"
            label={t('email') + ' *'}
            autoCapitalize="none"
            outlineColor="#E9EAEC"
            outlineStyle={{ borderRadius: 10 }}
            theme={styles.themeInput}
          />
          <TextInput
          ref={email2Ref}
            style={styles.inputStyle}
            mode="outlined"
            value={formData.email2}
            editable={isEdit}
            textColor={isEdit ? 'black' : '#98989D'}
            onChangeText={v => handleInputChange('email2', v)}
            label={t('backup_email') + ' (' + t('optional') + ')'}
            outlineColor="#E9EAEC"
            outlineStyle={{ borderRadius: 10 }}
            theme={themeInputTest}
            autoCapitalize="none"
          />
          <TextInput
          ref={fullnameRef}
            style={styles.inputStyle}
            value={formData?.full_name}
            editable={isEdit}
            textColor={isEdit ? 'black' : '#98989D'}
            onChangeText={v => handleInputChange('full_name', v)}
            mode="outlined"
            label={t('full_name') + ' *'}
            outlineColor="#E9EAEC"
            theme={themeInputTest}
            outlineStyle={{ borderRadius: 10 }}
          />
          <TextInput
          ref={birthdayRef}
            style={styles.inputStyle}
            value={formatDate(formData.birthday)}
            mode="outlined"
            label={t('birthday') + ' (' + t('optional') + ')'}
            outlineColor="#E9EAEC"
            theme={themeInputTest}
            outlineStyle={{ borderRadius: 10}}
            editable={isEdit}
            textColor={isEdit ? 'black' : '#98989D'}
            onPressIn={() => isEdit ? setOpen(true) : setOpen(false)}
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
            setOpen={isEdit?setGenderOpen:()=>setGenderOpen(false)}
            placeholder={t('gender') + ' (' + t('optional') + ')'}
            labelStyle={isEdit ? { color: 'black' } : { color: '#98989D' }}

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
            TickIconComponent={({ style }) => (
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
          ref={addressRef}
            style={{ ...styles.inputStyle, marginTop: 10 }}
            mode="outlined"
            label={t('address') + ' (' + t('optional') + ')'}
            value={formData.address}
            onChangeText={v => handleInputChange('address', v)}
            outlineColor="#E9EAEC"
            outlineStyle={{ borderRadius: 10 }}
            theme={themeInputTest}
            autoCapitalize="none"
            editable={isEdit}
            textColor={isEdit ? 'black' : '#98989D'}
          />

          <TextInput
            style={{ ...styles.inputStyle }}
            mode="outlined"
            label={t('tel') + ' (' + t('optional') + ')'}
            value={formData.phone}
            onChangeText={v => handleInputChange('phone', v)}
            outlineColor="#E9EAEC"
            outlineStyle={{ borderRadius: 10 }}
            theme={themeInputTest}
            editable={isEdit}
            textColor={isEdit ? 'black' : '#98989D'}
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
          <View style={{width:'100%'}}>
            <Divider style={{marginVertical:20}} />
            <Button
              mode="text"
              textColor={'#F43732'}
              labelStyle={{ fontWeight: 'bold', fontSize: SIZES.medium, textTransform: 'uppercase' }}
              onPress={onRemoveAccountAlert}>
              {t('remove_account')}
            </Button>
          </View>
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
      onSurfaceVariant: '#98989D',
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
    marginBottom: 10,
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
    borderColor: '#98989D',
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
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
  },
});
export default UserInfo;
