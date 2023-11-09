import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './ChangePassword.style';
import {TextInputWithLabel} from '../../Components';
import ButtonWithLoader from '../../Components/Common/ButtonWithLoader/ButtonWithLoader';
import authApi from '../../api/authApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/selectors';
import {showError} from '../../utils/helperFunction';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
const ChangePassword = ({navigation}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    //setting
    isLoading: false,
    //info
    id: '',
    oldPassWord: '',
    newPassWord: '',
    confirmNewPassowrd: '',
  });

  const updateState = data => setState({...state, ...data});
  const {userData} = useSelector(authSelector);

  const {oldPassWord, newPassWord, confirmNewPassowrd, id, isLoading} = state;

  const onSubmitChangePassWord = async () => {
    const data = {
      id: userData.user.id,
      oldPass: oldPassWord,
      newPass: newPassWord,
      renewPass: confirmNewPassowrd,
    };

    updateState({isLoading: true});
    await authApi
      .changePassword(data)
      .then(res => {
        updateState({isLoading: false});
        Alert.alert(
          t('notification'),
          res.message,
          [
            {
              text: t('continue'),
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: true},
        );
      })
      .catch(error => {
        updateState({isLoading: false});
        showError(error.message ? error.message : error);
      });
  };

  return (
    <View style={styles.ChangePasswordContainer}>
      <TextInputWithLabel
        label={t('old_password')}
        onChangeText={oldPassWord => updateState({oldPassWord})}
        placeholder={t('type_old_password')}
        iconRight={{
          icon2: <Ionicons name="eye-outline" size={24} color="#f54257" />,
          icon: <Ionicons name="eye-off-outline" size={24} color="#f54257" />,
          hide: true,
        }}
      />

      <TextInputWithLabel
        label={t('new_password')}
        onChangeText={newPassWord => updateState({newPassWord})}
        placeholder={t('type_new_password')}
        iconRight={{
          icon2: <Ionicons name="eye-outline" size={24} color="#f54257" />,
          icon: <Ionicons name="eye-off-outline" size={24} color="#f54257" />,
          hide: true,
        }}
      />

      <TextInputWithLabel
        label={t('renew_password')}
        onChangeText={confirmNewPassowrd => updateState({confirmNewPassowrd})}
        placeholder={t('type_renew_password')}
        iconRight={{
          icon2: <Ionicons name="eye-outline" size={24} color="#f54257" />,
          icon: <Ionicons name="eye-off-outline" size={24} color="#f54257" />,
          hide: true,
        }}
      />

      <View style={styles.btnSave}>
        <ButtonWithLoader
          text={t('save')}
          onPress={() => onSubmitChangePassWord()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
