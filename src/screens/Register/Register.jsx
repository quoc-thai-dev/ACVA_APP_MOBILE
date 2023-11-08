import React, {useCallback, useEffect, useRef, useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  View,
  findNodeHandle,
  Dimensions,
} from 'react-native';

import ButtonWithLoader from '../../Components/Common/ButtonWithLoader/ButtonWithLoader';
import TextInputCustom from '../../Components/Common/TextInputCustom/TextInputCustom';
import styles from './Register.style';

import HeaderAuth from '../../Components/HearderAuth/HeaderAuth';
import {images} from '../../constants';
import {showError} from '../../utils/helperFunction';
import validator from '../../utils/validations';

import DateTimePicker from '@react-native-community/datetimepicker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import universityApi from '../../api/universityApi';
import actions from '../../redux/actions';
import {registerFailed} from '../../redux/actions/auth';
import {authSelector} from '../../redux/selectors';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';

const Register = ({navigation}) => {
  //const { universities } = useSelector(universitiesSelector);
  const {t} = useTranslation();
  const {isLoading, isRegisterSuccess, message} = useSelector(authSelector);
  const dispatch = useDispatch();
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

  const [state, setState] = useState({
    //Setting
    isSecure: true,
    showDate: false,
    date: new Date(),

    //info

    email: '',
    email_b: '',
    password,
    confirm_password: '',
    fullname: '',
    birthday: '',
    address: '',
    phone: '',
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUniversityApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState('');
  const [unvOpen, setUnvOpen] = useState(false);

  const [gender, setgender] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);

  useEffect(() => {
    fetchUniversityApi();
  }, []);

  const fetchUniversityApi = () => {
    setLoading(true);
    universityApi
      .getAll()
      .then(res => {
        setUniversities(res.data);
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    fullname,
    email,
    password,
    isSecure,
    birthday,
    date,
    showDate,
    email_b,
    confirm_password,
    address,
    phone,
  } = state;

  const updateState = data => setState({...state, ...data});
  useEffect(() => {
    dispatch(actions.fetchUniversities());
  }, []);

  useEffect(() => {
    if (isRegisterSuccess) {
      onAlert(message);
    }
  }, [isRegisterSuccess]);

  const isValidData = () => {
    const error = validator({
      // userName,
      // email,
      // password,
    });

    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onAlert = message => {
    Alert.alert(t('notification'), message, [
      {
        text: t('ok'),
        onPress: () => {
          dispatch(actions.registerFailed());
          navigation.navigate('Login');
        },
      },
    ]);
  };

  //const format date
  const formatDate = date => {
    const dateFormat = new Date(date);
    const newDate = `${dateFormat.getFullYear()}-${String(
      dateFormat.getMonth() + 1,
    ).padStart(2, '0')}-${String(dateFormat.getDate()).padStart(2, '0')}`;
    return newDate;
  };

  const onRegister = async () => {
    // const checkValid = isValidData();
    // if (checkValid) {
    //   navigation.navigate('Signup');
    // }

    updateState({isLoading: true});

    const data = {
      university_id: universityId,
      email,
      email_b,
      confirm_password,
      password,
      fullname,
      birthday: formatDate(date),
      gender,
      address,
      phone,
    };

    dispatch(actions.register(data));
  };

  //method date

  const showPicker = () => {
    updateState({showDate: !showDate});
    dispatch(registerFailed());
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const dateFormat = new Date(currentDate);
    const newCurrentdate = `${String(dateFormat.getDate()).padStart(
      2,
      '0',
    )}-${String(dateFormat.getMonth() + 1).padStart(
      2,
      '0',
    )}-${dateFormat.getFullYear()}`;
    updateState({
      showDate: !showDate,
      date: currentDate,
      birthday: newCurrentdate,
    });
  };

  const scrollRef = useRef();

  const _scrollToInput = reactNode => {
    //scrollRef.current._internalFiberInstanceHandleDEV.memoizedProps.scrollToFocusedInput(reactNode)
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={true}
      extraScrollHeight={170}
      extraHeight={150}
      keyboardShouldPersistTaps="handled"
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HeaderAuth
        urlBackground={images.acva_header}
        urlLogo={images.acva_logo}
        titleHeader={t('register')}
        iconHeader={'user'}
        textWelcome={t('welcome')}
      />

      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <View style={styles.selectListContainer}>
              <DropDownPicker
                loading={loading}
                open={unvOpen}
                setOpen={setUnvOpen}
                items={universities}
                placeholder={t('select_school')}
                searchPlaceholder={t('type_school')}
                schema={{
                  label: 'name',
                  value: 'id',
                }}
                labelProps={{
                  numberOfLines: 1,
                }}
                value={universityId}
                setValue={setUniversityId}
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
                        style={[
                          listMessageTextStyle,
                          styles.dropBoxMessageEmpty,
                        ]}>
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
            </View>

            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <TextInputCustom
                  placeHolder={t('email')}
                  onChangeText={email => updateState({email})}
                  value={email}
                  onFocus={event => {
                    _scrollToInput(findNodeHandle(event.target));
                  }}
                />
              </View>

              <View style={styles.inputGroup}>
                <TextInputCustom
                  placeHolder={t('backup_email')}
                  onChangeText={email_b => updateState({email_b})}
                  value={email_b}
                  onFocus={event => {
                    _scrollToInput(findNodeHandle(event.target));
                  }}
                />
              </View>
            </View>

            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <TextInputCustom
                  placeHolder={t('password')}
                  secureTextEntry={isSecure}
                  onChangeText={password => updateState({password})}
                  value={password}
                  iconRight={{
                    icon2: (
                      <Ionicons name="eye-outline" size={20} color="gray" />
                    ),
                    icon: (
                      <Ionicons name="eye-off-outline" size={20} color="gray" />
                    ),
                    hide: true,
                  }}
                  onFocus={event => {
                    _scrollToInput(findNodeHandle(event.target));
                  }}
                />
              </View>

              <View style={styles.inputGroup}>
                <TextInputCustom
                  placeHolder={t('confirm_password')}
                  secureTextEntry={isSecure}
                  onChangeText={confirm_password =>
                    updateState({confirm_password})
                  }
                  value={confirm_password}
                  iconRight={{
                    icon2: (
                      <Ionicons name="eye-outline" size={20} color="gray" />
                    ),
                    icon: (
                      <Ionicons name="eye-off-outline" size={20} color="gray" />
                    ),
                    hide: true,
                  }}
                  onFocus={event => {
                    _scrollToInput(findNodeHandle(event.target));
                  }}
                />
              </View>
            </View>

            <TextInputCustom
              placeHolder={t('full_name')}
              onChangeText={fullname => updateState({fullname})}
              value={fullname}
              onFocus={event => {
                _scrollToInput(findNodeHandle(event.target));
              }}
            />

            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <Pressable onPress={showPicker}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder={t('birthday')}
                    onBlur={() => updateState({showDatePicker: false})}
                    onPressIn={() => updateState({showDatePicker: true})}
                    editable={false}
                    value={birthday ? birthday : ''}
                  />
                </Pressable>
                {showDate ? (
                  <DateTimePicker
                    display="spinner"
                    mode="date"
                    value={new Date()}
                    style={{width: Dimensions.get('window').width}}
                  />
                ) : (
                  <></>
                )}
                <Button title="Pick a Date" onPress={showPicker} />
              </View>

              <View style={[styles.inputGroup, styles.selectListContainer]}>
                <DropDownPicker
                  open={genderOpen}
                  setOpen={setGenderOpen}
                  placeholder={t('gender')}
                  items={genders}
                  value={gender}
                  schema={{
                    label: 'label',
                    value: 'value',
                  }}
                  setValue={setgender}
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
              </View>
            </View>

            <TextInputCustom
              placeHolder={t('address')}
              onChangeText={address => updateState({address})}
              value={address}
              onFocus={event => {
                _scrollToInput(findNodeHandle(event.target));
              }}
            />
            <TextInputCustom
              placeHolder={t('tel')}
              onChangeText={phone => updateState({phone})}
              value={phone}
              onFocus={event => {
                _scrollToInput(findNodeHandle(event.target));
              }}
            />
          </View>

          <ButtonWithLoader
            text={t('register')}
            onPress={onRegister}
            isLoading={isLoading}
          />

          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.textFooter}>
            {t('have_account')}{' '}
            <Text style={styles.textLogin}>{t('login')}</Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Register;
