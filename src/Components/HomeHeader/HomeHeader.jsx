import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../constants';
import styles from './HomeHeader.style';

// import {Feather, FontAwesome, Foundation} from '@expo/vector-icons';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import icons from '../../constants/icons';
import {authSelector} from '../../redux/selectors';
import {useTranslation} from 'react-i18next';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
// import { Entypo } from '@expo/vector-icons'; 



const HomeHeader = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const {userData} = useSelector(authSelector);

  const [state, setState] = useState({
    userBirthday: '',
    userEmail: '',
    userFullName: '',
    userImage: '',
  });

  const {userBirthday, userEmail, userFullName, userImage} = state;
  const {birthday, email, full_name, image46} = userData.user;
  const updateState = data => setState({...state, ...data});

  useEffect(() => {
    if (userData.user) {
      updateState({
        userBirthday: birthday ? birthday : '',
        userEmail: email ? email : '',
        userFullName: full_name ? full_name : '',
        userImage: image46,
      });
    }
  }, [userData]);

  const urlImage = `http://acva.vn/quiz/${userImage}`;

  const fomatDate = dates => {
    const dateFormat = new Date(dates);
    const newCurrentdate = 
      `${String(dateFormat.getDate()).padStart(2,'0',)}/${String(dateFormat.getMonth() + 1).padStart(2,'0',)}/${dateFormat.getFullYear()}`;
    return newCurrentdate;
  };
  return (
    <>
      <View style={styles.homeContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={images.acva_home_header}
        />

        <SafeAreaView style={styles.headerTopContainer}>
          <Text style={styles.textTitle}>{t('home_page')}</Text>
          <Avatar.Image
            size={45}
            source={image46 ? {uri: urlImage} : images.acva_avatar}
          />
        </SafeAreaView>

        <Text style={styles.textHeaderWelcome}>{t('hi')} {userFullName}</Text>

        <View style={styles.editInfoContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInfo')}
            style={{
              height: 30,
              width: 30,
            }}>
            <Image resizeMode="contain" source={icons.notification_icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerInfoContainer}>
          <View style={styles.textInfoContainer}>
            <View style={styles.infoItem}>
              {/* <Feather name="mail" size={16} color="gray" /> */}
              <Text style={styles.textItem}>{userEmail}</Text>
            </View>

            <View style={styles.infoItem}>
              {/* <FontAwesome name="calendar-o" size={16} color="gray" /> */}
              <Text style={styles.textItem}>{fomatDate(userBirthday)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.testScheduleHeader}>
          <View style={{flexDirection: 'row', justifyContent: 'center', gap:3, marginBottom: 6,}}>
            {/* <Entypo name="graduation-cap" size={20} color="#333" /> */}
            <Text style={styles.textTestSchedule}>{t('course')}</Text>
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 6,
            }}>
            {/* <Foundation name="clipboard-pencil" size={20} color="#333" /> */}
            <Text
              style={styles.textShowAll}
              onPress={() => navigation.navigate('RegisterExam')}>
              {' '}
              {t('register_exam')}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeHeader;
