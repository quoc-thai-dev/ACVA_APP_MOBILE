import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HomeHeader} from '../../Components';
import {images} from '../../constants';
import actions from '../../redux/actions';
import {examSelector} from '../../redux/selectors';
import styles from './Home.style';
import { useTranslation } from 'react-i18next';
const Home = ({navigation}) => {
  const [t, i18n] = useTranslation();
  const [state, setState] = useState({
    isDontHaveData: false,
    refreshing: false,
    checkId: '',
  });


  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();

  const {isDontHaveData, refreshing} = state;
  const updateState = data => setState(() => ({...state, ...data}));

  const {isSuccess, exams, isLoading} = useSelector(examSelector);



  useEffect(()=>{
    dispatch(actions.getAllExam());
  },[])
  
  useEffect(() => {
    if (exams.length) {
      updateState({ isDontHaveData: false})
    } else {
      updateState({isDontHaveData: true});
    }
  }, [exams]);

  const onRefresh = useCallback(() => {
    dispatch(actions.getAllExam());
  }, []);

  const onShowDetailExam = useCallback(id => {
    dispatch(actions.getExamByID(id));
    dispatch(actions.getAttendanceByID(id));
    setSelectedId(id);
    setTimeout(() => {
      navigation.navigate('DetailExam');
      setSelectedId('');
    }, 2500);
  }, []);

  const renderItem = ({item}) => {
    const isLoading = item.id === selectedId;
    return (
      <Item
        item={item}
        onPress={() => onShowDetailExam(item.id)}
        isLoading={isLoading}
        language={t}
      />
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator = {false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HomeHeader navigation={navigation} />
      <SafeAreaView style={styles.bodyContainer}>
        {isLoading && (
          <View style={{marginTop: 30}}>
            <ActivityIndicator size={'large'} color={'gray'} />
          </View>
        )}

        {exams.length > 0 && exams.map((item,index)=> {
          const isLoading = item.id === selectedId;
          return (
            <View key={index}>
                <Item
                  item={item}
                  onPress={() => onShowDetailExam(item.id)}
                  isLoading={isLoading}
                  language={t}
                />
            </View>
            
          )
        })}

        {isDontHaveData && (
          <View style={styles.noTestContainer}>
            <View style={styles.imgList}>
              <Image source={images.acva_list} />
              <Text style={{color: '#1A1A1A'}}>{t('not_schedule')}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const Item = memo(({item, onPress, isLoading,key,language}) => {
  const formatDate = date => {
    const dateFormat = new Date(date);
    const newDate = `${String(dateFormat.getDate()).padStart(2, '0')}/${String(
      dateFormat.getMonth() + 1,
    ).padStart(2, '0')}/${dateFormat.getFullYear()}`;
    return newDate;
  };

  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 === date2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View  style={styles.wrapper}>
        <View style={styles.headerCard}>
          <View style={{ alignItems: 'stretch',  padding: .5,}}>
            <BGText 
                background={item.type === 1 ? '#ECFDF5' : '#FDF2F8'} 
                style={styles.statusText(item.type === 1 ? '#059669' : '#EB4898')} >
                 {item.type === 1 ? language('online') : language('offline')} 
            </BGText>
          </View>
          <Text style={styles.textExamCode}>{language('exam_code')}: {item.code}</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.textLeft}>
            {language('exam_date')}:{' '}
            <Text style={styles.textRight}>
              {!compareDates(item.date_start, item.date_end)
                ? `${formatDate(item.date_start)} - ${formatDate(
                    item.date_end,
                  )}`
                : formatDate(item.date_start)}
            </Text>
          </Text>
          <Text style={styles.textLeft}>
          {language('test_date')}:{' '}
            <Text style={styles.textRight}>{formatDate(item.date_exam)}</Text>
          </Text>
          <Text style={styles.textLeft}>
          {language('exam_time')}:{' '}
            <Text style={styles.textRight}>
              {item.time_exam} - {item.time_exam_end}
            </Text>
          </Text>
        </View>

        {isLoading
          ? isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator />
              </View>
            )
          : false}
      </View>
    </TouchableOpacity>
  );
});

const BGText = props => {
  const { background } = props;
  return <Text style={{backgroundColor: background, ...props.style}}>{props.children}</Text>;
}
export default Home;
