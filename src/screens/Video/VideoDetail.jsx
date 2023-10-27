import React,{useState,useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppLoader from '../../Components/AppLoader';
import { useTranslation } from 'react-i18next';
const VideoDetail = (props) => {
  const [t,i18n]=useTranslation();
  const [playing, setPlaying] = useState(false);
  const [loading,setLoading]=useState(true);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      props.navigation.goBack(null);
    }
  }, []);
  const onReadyVideo=()=>{
    setLoading(false);
  }
  // const checkLanguage=()=>{
  //    return data.title_viet
  // }
  const data = props.route.params?.item;
  return (
    <>
    <SafeAreaView style={{paddingHorizontal:15}}>
      <YoutubePlayer
        height={240}
        play={playing}
        videoId={data.key_link_youtube}
        onChangeState={onStateChange}
        onReady={onReadyVideo}
        title={i18n.language=="vi"?data.title_viet:i18n.language=="en"?data.title_eng:data.title_kor}
      />
      <Text style={{fontWeight:'bold',color:'black',fontSize:30}}>{i18n.language=="vi"?data.title_viet:i18n.language=="en"?data.title_eng:data.title_kor}</Text>
    </SafeAreaView>
    {loading?<AppLoader/>:''}
    </>
  );
};
const styles = StyleSheet.create({});
export default VideoDetail;
