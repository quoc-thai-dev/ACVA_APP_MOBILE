import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import styles from './Login.style';
import TextInputWithLabel from '../../Components/Common/TextInputCustom/TextInputCustom';
import ButtonWithLoader from '../../Components/Common/ButtonWithLoader/ButtonWithLoader';

import validator from '../../utils/validations';
import {showError} from '../../utils/helperFunction';
import actions from '../../redux/actions';
import HeaderAuth from '../../Components/HearderAuth/HeaderAuth';
import {COLORS, images} from '../../constants';
import SocialIcon from '../../Components/SocialIcon/SocialIcon';
import icons from '../../constants/icons';

import {Button, Modal} from 'react-native-paper';

// Import vector icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useSelector, useDispatch} from 'react-redux';
import {authSelector} from '../../redux/selectors';
import authApi from '../../api/authApi';
import {changeStatusActived} from '../../redux/actions/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import  ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const Login = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const [state, setState] = useState({
    //Setting
    isSending: false,
    isModal: false,
    isEventFogot: false,
    isEventActive: false,

    //info
    email: '',
    password: '',
    titleModal: '',

  });
  const rnBiometrics = new ReactNativeBiometrics()
  const [imageBiometrics,setImageBiometrics]= useState();
  const {
    //info
    email,
    password,
    titleModal,

    //setting
    isSecure,
    isModal,
    isSending,
    isEventFogot,
  } = state;

  const {isLoading, message, isAlertActived} = useSelector(authSelector);

  const updateState = data => setState({...state, ...data});

  const dispatch = useDispatch();

  const isValidData = () => {
    const error = validator({
      email,
      password,
    });

    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const checkValidmail = () => {
    const error = validator({
      email,
    });

    if (error) {
      dispatch(actions.registerFailed());
      showError(error);
      return false;
    }
    return true;
  };

  const onActiveAlert = message => {
    updateState({isEventFogot: false});
    Alert.alert(
      t('notification'),
      message,
      [
        {
          text: t('activated'),
          onPress: () => {
            updateState({
              isModal: !isModal,
              isEventFogot: false,
              titleModal: t('account_activated'),
            });

            dispatch(changeStatusActived(''));
          },
        },
        {
          text: t('continue'),
          onPress: () => {
            dispatch(changeStatusActived(''));
          },
        },
      ],
      {cancelable: true},
    );
  };
  useEffect(()=>{
    checkBiometrics()
  },[])
  useEffect(() => {
    if (isAlertActived) onActiveAlert(t('message_active'));
  }, [isAlertActived]);

  //event login
  const onLogin = async () => {
    dispatch(
      actions.login({
        email,
        password,
      }),
    );
  };
  //cleanUp

  const cleanUp = () => {
    updateState({
      isSending: false,
      isSecure: true,
      isModal: false,
      isEventFogot: false,
      isEventActive: false,

      //info
      message: '',
      email: '',
      password: '',
      titleModal: '',
    });
  };
  //event show modal

  const onShowModal = () => {
    updateState({
      isModal: !isModal,
    });
  };

  //event show modal forgot password
  const onForgotPassword = () => {
    updateState({
      isModal: !isModal,
      isEventFogot: true,
      titleModal: t('forgot_password'),
    });
  };

  // event redirect to register screen
  const onRegister = async () => {
    navigation.navigate('Register');
  };

  //event send mail forgot password to server
  const onSendForGot = async () => {
    const checkValidmail1 = checkValidmail();

    updateState({isSending: true});

    if (checkValidmail1) {
      await authApi
        .forgotPassword({email: email})
        .then(res => {
          Alert.alert(t('notification'), res.message, [{text: t('continue')}], {
            cancelable: true,
          });
        })
        .catch(error => {
          showError(error.message ? error.message : error);
        })
        .finally(() => {
          updateState({
            isEventFogot: !isEventFogot,
            isModal: false,
            isSending: false,
            email: '',
            password: '',
          });
        });
    } else {
      cleanUp();
    }
  };

  const onActive = async () => {
    const checkValidmail1 = checkValidmail();

    updateState({isSending: true});

    if (checkValidmail1) {
      await authApi
        .sendMailActive({email: email})
        .then(res => {
          Alert.alert(t('notification'), res.message, [{text: t('continue')}], {
            cancelable: true,
          });
        })
        .catch(error => {
          showError(error.message ? error.message : error);
        })
        .finally(() => {
          updateState({
            isEventFogot: !isEventFogot,
            isModal: false,
            isSending: false,
            email: '',
            password: '',
          });
        });
    } else {
      cleanUp();
    }
  };

  const scrollRef = useRef();

  const _scrollToInput = reactNode => {
    //scrollRef.current.memoizedProps.scrollToFocusedInput(reactNode)
  };

  const checkBiometrics= async()=>{
    rnBiometrics.isSensorAvailable()
    .then((resultObject) => {
      const { available, biometryType } = resultObject
      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported')
        setImageBiometrics(<Image
        source={require('../../assets/touch_id.png')}
        style={{width: 48, height: 48}}
      />)
      } else if (available && biometryType === BiometryTypes.FaceID) {

        console.log('FaceID is supported')
        setImageBiometrics(<Image
        source={require('../../assets/face_id.png')}
        style={{width: 56, height: 56}}
      />);

      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported')
      } else {
        console.log('Biometrics not supported')
        setImageBiometrics(null);
      }
    })
  }
  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          extraScrollHeight={9}
          //  extraHeight={120}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}>
          <HeaderAuth
            urlBackground={images.acva_header}
            urlLogo={images.acva_logo}
            titleHeader={t('login')}
            iconHeader={'user'}
            textWelcome={t('welcome')}></HeaderAuth>

          <View style={styles.bodyLogin}>
            <TextInputWithLabel
              placeHolder={t('type_email')}
              onChangeText={email => updateState({email})}
              value={email}
              onFocus={event => {
                _scrollToInput(findNodeHandle(event.target));
              }}
              iconRight={
                email
                  ? {
                      icon: <Feather name="x" size={24} color="#EE6155" />,
                    }
                  : ''
              }
              iconRightOnPress={() => updateState({email: ''})}
            />
            <TextInputWithLabel
              placeHolder={t('type_password')}
              secureTextEntry={isSecure}
              value={password}
              onChangeText={password => updateState({password})}
              iconRight={{
                icon2: (
                  <Ionicons name="eye-outline" size={24} color="#EE6155" />
                ),
                icon: (
                  <Ionicons name="eye-off-outline" size={24} color="#EE6155" />
                ),
                hide: true,
              }}
              onFocus={event => {
                _scrollToInput(findNodeHandle(event.target));
              }}
            />

            <View style={styles.textForgot}>
              <Text onPress={() => onForgotPassword()} style={styles.textStyle}>
                {t('forgot_password')}!
              </Text>
            </View>
            <View></View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 9}}>
                <ButtonWithLoader
                  text={t('login')}
                  onPress={onLogin}
                  isLoading={isLoading}
                  style={{marginTop: 12}}
                />
              </View>
              {
                imageBiometrics?
                <View>
                <Button onPress={() => alert(1)}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                      {imageBiometrics}
                  </View>
                </Button>
              </View>:null
              }
              
            </View>
          </View>

          <View style={styles.footerLogin}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
              <Text style={{width: 150, textAlign: 'center'}}>Hoặc đăng ký với</Text>
            </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        <View style={styles.social_icon}>
            <SocialIcon source={icons.social_google}/>
            <SocialIcon source={icons.social_fb}/>
            <SocialIcon source={icons.social_apple}/>
        </View> */}
            <View style={styles.footerRegister}>
              <Text onPress={onRegister}>
                {t('not_have_account')}{' '}
                <Text style={styles.textRegister}>{t('register')}</Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {
        //#region Modal
      }
      <Modal
        visible={isModal}
        onDismiss={onShowModal}
        contentContainerStyle={styles.modalContainer}>
        <Feather
          onPress={onShowModal}
          style={styles.headerModal}
          name="x"
          size={24}
          color="gray"
        />
        <Image source={images.acva_logo} style={{width: 250, height: 110}} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text
              style={{
                width: 130,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              {titleModal}
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        <View style={{width: '100%', alignItems: 'center'}}>
          {/* <TextInput
            style={styles.textInputModal}
            placeholder={t('type_email')}
            onChangeText={email => updateState({email})}
          /> */}
          <TextInputWithLabel
            placeHolder={t('type_email')}
            style={{width: 255, marginTop: 20}}
            onChangeText={email => updateState({email})}
            value={email}
            onFocus={event => {
              _scrollToInput(findNodeHandle(event.target));
            }}
          />
          <View style={styles.btnSend}>
            <ButtonWithLoader
              text={t('send')}
              isLoading={isSending}
              onPress={isEventFogot ? onSendForGot : onActive}
            />
          </View>
        </View>
      </Modal>
      {
        //#endregion
      }
    </>
  );
};

export default Login;
