import React, {useState, useCallback, useEffect} from 'react';
import {
  RefreshControl,
  Text,
  FlatList,
  View,
  Image,
} from 'react-native';
import styles from './Notification.style';
import AppLoader from '../../Components/AppLoader';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import notificationApi from '../../api/notificationApi';
const Notification = () => {
  const {t, i18n} = useTranslation();
  const token = useSelector(state => state.auth.userData.token);
  console.log(token)
  const [notifications, setNotification] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      getAllNotification();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    getAllNotification();
    console.log(notifications);
  }, []);
  const getAllNotification = async () => {
    await notificationApi
      .getAll()
      .then(res => {
        console.log(res);
        // if (res.status == 200) {
          setNotification(res);
        // }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const renderLimitedMessage = (message,limit) => {
    if (message.length > limit) {
      return message.slice(0, limit) + '...';
    }
    return message;
  };
  return (
    <>
          {notifications.length != 0 ? (
            <FlatList
              data={notifications}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => (
                <View style={styles.card} key={item.id}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require('../../assets/images/ACVA/ACVA_Logo.png')}
                  />
                  <View style={styles.textBlock}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Text style={styles.textSubTitle}>{renderLimitedMessage(item.contents,28)}</Text>
                    <Text style={styles.textDate}>{item.date}</Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
              <View style={styles.imgList}>
                <Image
                  source={require('../../assets/images/ACVA/ACVA_List.png')}
                  style={{width: 150, height: 150}}
                  resizeMode='contain'
                />
                <Text style={{color: '#A1a1a1'}}>{t('empty_notification')}</Text>
              </View>
          )}
      {loading ? <AppLoader /> : ''}
    </>
  );
};
export default Notification;
