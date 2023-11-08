import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, View} from 'react-native';
import {Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppLoader from '../../Components/AppLoader';
import videoStudyApi from '../../api/videoStudyApi';
import {SIZES} from '../../constants';
import styles from './Video.style';
const Video = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      getAllVideos(videos);
      setRefreshing(false);
    }, 300);
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    getAllVideos();
  }, [i18n.language]);
  const getAllVideos = async () => {
    await videoStudyApi
      .getAll()
      .then(res => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };
  const showModalYoutube = item => {
    navigation.navigate('VideoDetail', {item});
  };
  const processTitle = item => {
    //console.log(item);
    return item.title_viet;
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            alignContent: 'center',
            // marginVertical: 5,
            gap: 7,
          }}
          // scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={videos}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <Card onPress={() => showModalYoutube(item)} style={styles.card}>
              <Card.Cover
                style={{height: 110}}
                source={require('../../assets/images/ACVA/ACVA_Video_Image.jpg')}></Card.Cover>
              <Card.Title
                titleNumberOfLines={5}
                title={
                  i18n.language == 'vi'
                    ? item.title_viet
                    : i18n.language == 'en'
                    ? item.title_eng
                    : item.title_kor
                }
                titleStyle={{
                  color: 'black',
                  fontSize: SIZES.xSmall,
                  lineHeight: 14,
                  textAlign: 'center',
                }}
              />
            </Card>
          )}
        />
      </View>
      {loading ? <AppLoader /> : ''}
    </>
  );
};

export default Video;
