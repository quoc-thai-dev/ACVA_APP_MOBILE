import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  RefreshControl,
  Text,
  FlatList,
  View,
  Image,
} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Notification.style';
import notificationApi from '../../api/notificationApi';
import AppLoader from '../../Components/AppLoader';
const Notification = () => {
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
    // console.log(videos);
  }, [notifications]);
  const getAllNotification = async () => {
    await notificationApi
      .getAll()
      .then(res => {
        if(res.status==200){
          setNotification(res.data);
        }
      })
      .catch(e => {
        console.log(e);
      }).finally(()=>{
        setLoading(false)
      });
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={notifications}
          style={{paddingHorizontal: 20}}
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
                <Text style={styles.textSubTitle}>{item.contents}</Text>
                <Text style={styles.textDate}>{item.date}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      {loading ? <AppLoader /> : ''}
    </>
  );
};
export default Notification;
