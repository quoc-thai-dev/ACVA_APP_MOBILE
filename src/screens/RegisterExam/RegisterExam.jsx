
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import ButtonWithLoader from '../../Components/Common/ButtonWithLoader/ButtonWithLoader';
import examApi from '../../api/examApi';
import {images} from '../../constants';
import styles from './RegisterExam.style';

import DropDownPicker from 'react-native-dropdown-picker';
import {formatDate} from '../../utils/helperFunction';

// import {MaterialCommunityIcons, FontAwesome5, AntDesign,} from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
import {useDispatch} from 'react-redux';
import actions from '../../redux/actions';
import {useTranslation} from 'react-i18next';


const RegisterExam = ({navigation}) => {
  const {t} = useTranslation();
  const levels = [
    {value: 0, label: t('A_standard')},
    {value: 1, label: t('B_profession')},
  ];
  const [exams, setExams] = useState([]);
  const [idExam, setIdExam] = useState('');

  const [openLevel, setOpenLevel] = useState(false);
  const [level, setLevel] = useState(0);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uploadImage, setUploadImage] = useState(false);

  const [imageCCCD, setImageCCCD] = useState('');
  // const [imageGCN, setImageGCN] = useState(null);
  const [nameImageCmnd, setNameImageCmnd] = useState('');
  const [base64ImageCmnd, setBase64ImageCmnd] = useState('');
 

  const dispatch = useDispatch();

  // const pickImageCCCD = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     const filenameCCCD =
  //       result.assets[0].uri &&
  //       result.assets[0].uri.substring(
  //         result.assets[0].uri.lastIndexOf('/') + 1,
  //         result.assets[0].uri.length,
  //       );
  //     setImageCCCD(result.assets[0].uri);
  //     setNameImageCmnd(filenameCCCD);
  //     setBase64ImageCmnd(result.assets[0].base64);
  //   }
  // };

  const onRegisterExam = async () => {
    const data = {
      level,
      idExam,
      nameImageCmnd,
      base64ImageCmnd,
    };

    setLoading(true);
    await examApi
      .registerExam(data)
      .then(res => {
        onAlert(res.message, () => {
          dispatch(actions.getAllExam());
          navigation.goBack();
        });
      })
      .catch(error => {
        onAlert(error.message ? error.message : error);
      })
      .finally(() => setLoading(false));
  };
  function compareDate(day) {
    const currentDate = new Date();
    const expireDate = new Date(day);

    if (expireDate < currentDate) {
      return false;
    } else if (expireDate >= currentDate) {
      return true;
    }
  }

  const fetchExam = async () => {
    await examApi
      .getExamByLevel(level)
      .then(res => {
        if (res && res.data && res.data.length !== 0) {
          const data = [];
          res.data.map(item => {
            if (item.expired_time != null && compareDate(item.expired_time)) {
              data.push({
                label: `[${item.code}] ${item.name} - ${t('from')} ${formatDate(
                  item.date_start,
                )} ${t('to')} ${formatDate(item.date_end)} - ${t('regis_deadline')}: ${formatDate(
                  item.expired_time,
                )} `,
                value: item.id,
              });
            }
          });

          setExams(data);
        }
      })
      .catch(err => console.log('err registerExam', err));
  };

  useEffect(() => {
    fetchExam();
  }, [level]);

  const onAlert = (message, callBack = () => {}) => {
    Alert.alert(t('notification'), message, [
      {
        text: t('continue'),
        onPress: () => {
          callBack();
        },
      },
    ]);
  };

  return (
   
    <View style={styles.container}>
       <ScrollView></ScrollView>
      <Image style={{alignSelf: 'center'}} source={images.acva_logo} />

      <DropDownPicker
        open={openLevel}
        setOpen={setOpenLevel}
        items={levels}
        value={level}
        setValue={setLevel}
        disableBorderRadius={false}
        // ArrowDownIconComponent={() => (
        //   <AntDesign name="caretdown" size={12} color="#333" />
        // )}
        // ArrowUpIconComponent={() => (
        //   <AntDesign name="caretup" size={12} color="#333" />
        // )}
        // TickIconComponent={({style}) => (
        //   <AntDesign
        //     style={style}
        //     name="checkcircle"
        //     size={16}
        //     color="#ee463b"
        //   />
        // )}
        style={styles.levelDropDownPicker}
        dropDownContainerStyle={styles.levelDropDownContainerStyle}
        listItemContainerStyle={styles.levelListItemContainerStyle}
        selectedItemLabelStyle={styles.levelSelectedItemLabelStyle}
        tickIconContainerStyle={styles.levelTickIconContainerStyle}
        onChangeValue={value => {
          if (value === 1) {
            setUploadImage(true);
          } else if (value === 0) {
            setUploadImage(false);
          }
        }}
      />

      <DropDownPicker
        open={open}
        setOpen={setOpen}
        loading={loading}
        placeholder={t('choose_exam')}
        items={exams}
        value={idExam}
        setValue={setIdExam}
        autoScroll={true}
        disableBorderRadius={false}
        flatListProps={{
          showsHorizontalScrollIndicator: false,
          showsVerticalScrollIndicator: false,
        }}
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
          <View style={listMessageContainerStyle}>
            {loading ? (
              <ActivityIndicatorComponent />
            ) : (
              <Text style={[listMessageTextStyle, styles.dropBoxMessageEmpty]}>
                {t('no_exam')}
              </Text>
            )}
          </View>
        )}
        labelProps={{
          numberOfLines: 1,
        }}
        // ArrowDownIconComponent={() => (
        //   <AntDesign name="caretdown" size={12} color="#333" />
        // )}
        // ArrowUpIconComponent={() => (
        //   <AntDesign name="caretup" size={12} color="#333" />
        // )}
        renderListItem={props => {
          return (
            <View
              style={
                props.isSelected
                  ? props.selectedItemContainerStyle
                  : props.customItemContainerStyle
              }>
              <TouchableOpacity
                style={props.customItemLabelStyle}
                key={props.value}
                onPress={() => {
                  setIdExam(props.value);
                  setOpen(!open);
                }}>
                <MoreLessText
                  isSelected={props.isSelected}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  <Text
                    style={
                      props.isSelected
                        ? props.selectedItemLabelStyle
                        : props.labelStyle
                    }>
                    {props.label}
                  </Text>
                </MoreLessText>
              </TouchableOpacity>
            </View>
          );
        }}
        style={styles.examDropDownPicker}
        dropDownContainerStyle={styles.examDropDownContainerStyle}
        customItemContainerStyle={styles.examCustomItemContainerStyle}
        selectedItemContainerStyle={styles.examSelectedItemContainerStyle}
        selectedItemLabelStyle={styles.examSelectedItemLabelStyle}
        listMode="SCROLLVIEW"
      />

     
        <View style={styles.upLoadContainer}>

          <View style={styles.updLoadItem}>
              <View style={styles.labelUploadItem}>
                {/* <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={24}
                    color="#333"
                  /> */}
                <Text style={{fontWeight:"500", color:'#333',marginLeft:6}}>{t('upload_cccd')}</Text>
              </View>

              <View style={styles.btnUpLoadCCCDContainer}>

                  <TouchableOpacity 
                  // onPress={pickImageCCCD} 
                  style={styles.btnUpLoadCCCD}
                  >
                   {/* <FontAwesome5 name="upload" size={18} color="#333" />  */}
                  </TouchableOpacity>

              </View>
             
          </View>


          <View
            style={styles.reviewImageCCCD}
          >
            {/* {imageCCCD? imageCCCD &&<Image source={{uri : imageCCCD}} resizeMode='contain' style={{width: '100%',height: 150}}/>
            : <AntDesign name="picture" size={30} color="gray" />} */}

          </View>

      
        </View>

        
     

      <View
        style={{
          height: uploadImage ? '15%' : '15%',
          justifyContent: 'flex-end',
        }}>
        <ButtonWithLoader
          isLoading={loading}
          onPress={onRegisterExam}
          text={t('register')}
        />
      </View>
    </View>
  );
};

function ButtonWithIcon({children, loading, setLoading, onPress, icon}) {
  const [isLoading, setIsLoading] = useState(loading);
  return (
    <TouchableOpacity style={styles.btnIconContainer} onPress={onPress}>
      <Text style={{color: '#333', fontWeight: 500}}>{children}</Text>
      {icon && <View style={{padding: 3}}>{icon.icon}</View>}
    </TouchableOpacity>
  );
}

function MoreLessText({children, numberOfLines, style, isSelected}) {
  const [isTruncatedText, setIsTruncatedText] = useState(false);
  const [showMore, setShowMore] = useState(true);

  return isTruncatedText ? (
    <>
      <Text numberOfLines={showMore ? numberOfLines : 0}>{children}</Text>
      <Text
        style={styles.moreLessText(isSelected)}
        onPress={() => setShowMore(!showMore)}>
        {showMore ? 'Xem thêm' : 'Ẩn'}
      </Text>
    </>
  ) : (
    <Text
      onTextLayout={event => {
        const {lines} = event.nativeEvent;
        setIsTruncatedText(lines?.length > numberOfLines);
      }}>
      {children}
    </Text>
  );
}

export default RegisterExam;
