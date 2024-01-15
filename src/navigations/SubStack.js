import React, { useState } from 'react';
import UserInfo from '../screens/Profile/UserInfo';
import VideoDetail from '../screens/Video/VideoDetail';
import { ChangePassword, DetailExam } from '../screens';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import RegisterExam from '../screens/RegisterExam/RegisterExam';
import Notification from '../screens/Notification/Notification';
import { useTranslation } from 'react-i18next';

function SubStack(Stack) {
  const { t } = useTranslation();
  // const [isEditting, setIsEditting] = useState(false);
  // function handleEdit(){
  //   setIsEditting(true);
  //   alert('edit');
  // }
  // function handleSave(){
  //   setIsEditting(false);
  //   alert('save');
  // }
  console.log('SubStack rerender')
  return (
    <>
      <Stack.Screen name="UserInfo"
        options={({ navigation }) => ({
          // headerBackVisible: true,
          title: t('UserInfo'),
          // title: 'Aligned Center',
          // headerTitleAlign: 'center',
          // headerRight: () => (
          //   // isEditting ?

          //   //   :
          //     <Button icon="pencil" textColor={'blue'} compact={true} mode="text" onPress={()=>navigation.navigate('UserInfo',{isEdit:true})}>
          //       {t('edit')}
          //     </Button>
          // )
          })
        }
        component={UserInfo} />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerBackVisible: true,
          headerTitle: t('VideoDetail'),
          title: 'Aligned Center',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="DetailExam"
        component={DetailExam}
        options={{
          headerBackVisible: true,
          headerTitle: t('DetailExam'),
          title: 'Aligned Center',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerBackVisible: true,
          headerTitle: t('ChangePassword'),
          title: 'Aligned Center',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerBackVisible: true,
          headerTitle: t('Notification'),
          title: 'Aligned Center',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="RegisterExam"
        component={RegisterExam}
        options={{
          headerBackVisible: true,
          headerTitle: t('register_exam'),
          title: 'Aligned Center',
          headerTitleAlign: 'center',
        }}
      />
    </>
  );
}

export default SubStack;
