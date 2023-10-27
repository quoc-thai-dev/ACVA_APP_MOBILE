import { View, Text } from 'react-native'
import React from 'react'
import styles from './DetaiAttendance.style'
// import { SimpleLineIcons } from '@expo/vector-icons';
import { formatDate } from '../../utils/helperFunction';
import { useTranslation } from 'react-i18next';
const DetailAttendance = ({status, dateLearn, timeStart, timeEnd, index}) => {

  const checkAttendance = () => {
    let currentDay = new Date();
    let learnDay = new Date(dateLearn);

    currentDay = Number(`${currentDay.getFullYear()}${String(currentDay.getMonth() + 1).padStart(2, '0')}${String(currentDay.getDate()).padStart(2, '0')}`);
    learnDay = Number(`${learnDay.getFullYear()}${String(learnDay.getMonth() + 1).padStart(2, '0')}${String(learnDay.getDate()).padStart(2, '0')}`);

    let result = (currentDay <= learnDay) && !status
    return result ;
  }
  const {t}= useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>

        <View style={styles.contentContainer}>
            <View style={styles.labelContentInner} >
                <View>
                    <Text style={styles.labelTextContent}>{t('school_day')}: </Text>
                </View>

                <View>
                    <Text style={styles.labelTextContent} >{t('time_start')}:</Text>
                </View>
            
                <View>
                    <Text style={styles.labelTextContent}>{t('time_end')}:</Text>
                </View>
                
            </View>

            <View style={styles.textInfoInner}>
                <Text style={styles.textInfo}>{dateLearn ? formatDate(dateLearn) : ''}</Text>
                <Text style={styles.textInfo}>{timeStart}</Text>
                <Text style={styles.textInfo}>{timeEnd}</Text>
            </View>

        </View>

        <View style={styles.statusContainer}>
            <View style={styles.statusInner}>
              <View style={styles.iconAttendance}>
    
               {/* {
                dateLearn ? 
                (checkAttendance() ?  
                    <SimpleLineIcons name="user" size={24} color="gray" />
                    :
                    <SimpleLineIcons name={status === 1 ? "user-following" : 'user-unfollow'} size={24} color={status === 1 ? "green" : "red"}/>
                )
                  :
                  <SimpleLineIcons name='user-unfollow' size={24} color={"red"}/>
               } */}

              </View>

              {
              dateLearn ?
              (!checkAttendance() && 
              (
                <View style={styles.textattendance}>
                  <Text style={{color: status ? 'green' : 'red'}}>
                    {status ? t('present') : t('absent')}
                  </Text>
                </View>))
              :
              (
                <View style={styles.textattendance}>
                  <Text style={{color:  'red'}}>
                     {t('absent')}
                  </Text>
                </View>
              )
              } 
            </View>
          
        </View>

      </View>
    </View>
  )
}

export default DetailAttendance