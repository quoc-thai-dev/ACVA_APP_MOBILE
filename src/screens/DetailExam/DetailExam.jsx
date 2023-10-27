// import {Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputWithLabel} from '../../Components';
import DetailAttendance from '../../Components/DetailAttendance/DetailAttendance';
import {COLORS, images} from '../../constants';
import actions from '../../redux/actions';
import {examSelector} from '../../redux/selectors';
import styles from './DetailExam.style';
import { useTranslation } from 'react-i18next';
const DetailExam = () => {
    const {t}=useTranslation();
  const {exam, attendance} = useSelector(examSelector);
  const [state, setState] = useState({
    //exam
    fullName: '',
    birthday: '',
    email: '',
    codeExam: '',
    nameExam: '',
    dateExam: '',
    level: '',
    type: '',
    numberOfExam: '',
    dateOfTest: '',
    timeStart: '',
    totalExamTim: 0,

    //attendance
    attendances: [],
  });

  const updateState = data => setState({...state, ...data});
  const {
    fullName,
    birthday,
    email,
    codeExam,
    nameExam,
    dateExam,
    level,
    type,
    numberOfExam,
    dateOfTest,
    timeStart,
    totalExamTime,
    attendances,
  } = state;

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(actions.getExamByID(exam && exam.length !== 0 && exam[0].id_exam));
    dispatch(
      actions.getAttendanceByID(exam && exam.length !== 0 && exam[0].id_exam),
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (exam && exam.length !== 0) {
      updateState({
        fullName: exam[0].full_name ? exam[0].full_name : '',
        birthday: formatDate(exam[0].birthday),
        email: exam[0].email ? exam[0].email : '',
        codeExam: exam[0].code ? exam[0].code : '',
        nameExam: exam[0].name ? exam[0].name : '',
        dateExam: formatDate(exam[0].date_exam),
        level: exam[0].level === 0 ? t('standard'): t('career'),
        type: exam[0].type === 1 ? t('online') : t('offline'),
        numberOfExam: String(
          exam[0].number_of_sessions ? exam[0].number_of_sessions : '',
        ),
        dateOfTest: !compareDates(exam[0].date_start, exam[0].date_end)
          ? `${formatDate(exam[0].date_start)} - ${formatDate(
              exam[0].date_end,
            )}`
          : formatDate(exam[0].date_start),
        timeStart: exam[0].time_start ? exam[0].time_start : '',
        totalExamTime: exam[0].minutes ? String(exam[0].minutes) : '',
        attendances: attendance,
      });
    }
  }, [exam, attendance, refreshing]);

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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.userInfo}>
          <View style={styles.txtTitlesContainer}>
            {/* <MaterialCommunityIcons
              name="card-account-details-outline"
              size={24}
              color={COLORS.secondary}
            /> */}
            <Text style={styles.txtTitles}>{t('student_info')}</Text>
          </View>

          <View style={styles.userContent}>
            <TextInputWithLabel
              label={t('full_name')}
              editable={false}
              value={fullName}
            />
            <View style={styles.txtInputGroupContainer}>
              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('birthday')}
                  editable={false}
                  value={birthday}
                />
              </View>

              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('email')}
                  editable={false}
                  value={email}
                />
              </View>
            </View>
          </View>

          <View style={styles.examInfoContainer}>
            <View style={styles.txtTitlesContainer}>
              {/* <FontAwesome
                name="newspaper-o"
                size={24}
                color={COLORS.secondary}
              /> */}
              <Text style={styles.txtTitles}>{t('ExamInfo')}</Text>
            </View>

            <View style={styles.txtInputGroupContainer}>
              <View style={{width: '100%'}}>
                <TextInputWithLabel
                  label={t('exam_code')}
                  editable={false}
                  value={codeExam}
                />
              </View>

              <View style={{width: '100%'}}>
                <TextInputWithLabel
                  label={t('exam_name')}
                  editable={false}
                  value={nameExam}
                  numberOfLines={1}
                />
              </View>

              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('test_date')}
                  editable={false}
                  value={dateExam}
                />
              </View>

              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('level')}
                  editable={false}
                  value={level}
                />
              </View>
              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('exam_type')}
                  editable={false}
                  value={type}
                />
              </View>

              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('number_exam')}
                  editable={false}
                  value={numberOfExam}
                />
              </View>
            </View>
            <TextInputWithLabel
              label={t('exam_date')}
              editable={false}
              value={dateOfTest}
            />

            <View style={styles.txtInputGroupContainer}>
              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('exam_start')}
                  editable={false}
                  value={timeStart}
                />
              </View>

              <View style={styles.txtInputGroup}>
                <TextInputWithLabel
                  label={t('total_exam_time')}
                  editable={false}
                  value={totalExamTime}
                />
              </View>
            </View>
          </View>
          <View style={styles.txtTitlesContainer}>
            {/* <Entypo
              name="creative-commons-attribution"
              size={24}
              color={COLORS.secondary}
            /> */}
            <Text style={styles.txtTitles}>{t('attendance_info')}</Text>
          </View>
          <View style={styles.txtInputGroupContainer}>
            {attendance && attendance.length !== 0 ? (
              attendance.map((item, index) => {
                return (
                  <View key={index} style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        marginBottom: 10,
                        marginLeft: 6,
                      }}>
                      {t('lesson')} {item.index}
                    </Text>
                    <DetailAttendance
                      dateLearn={item.date_learn}
                      timeStart={item.time_start}
                      timeEnd={item.time_end}
                      status={item.status ? 1 : 0}
                      index={index}
                    />
                  </View>
                );
              })
            ) : (
              <View style={styles.nodataContainer}>
                <Image
                  style={{height: 80}}
                  resizeMode="contain"
                  source={images.acva_list}
                />
                <Text style={styles.txtInputNoData}>
                  {t('no_data_display')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailExam;
