// import {AntDesign, Ionicons} from '@expo/vector-icons';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  LayoutAnimation,
  RefreshControl,
  TextInput,
  View,
  Appearance
} from 'react-native';
import {
  Button,
  List,
  Modal,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppLoader from '../../Components/AppLoader';
import SearchBar from '../../Components/Searchbar/SearchBar';
import qaApi from '../../api/qaApi';
import questionApi from '../../api/questionApi';
import {COLORS} from '../../constants';
import {showError, showSuccess} from '../../utils/helperFunction';
import { useTranslation } from 'react-i18next';
const QA = () => {
  const [t,i18n]=useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const inputSearch = useRef(null);
  const [questions, setQuestion] = useState([]);
  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      getAllQuestion();
      setRefreshing(false);
    }, 2000);
  }, []);
  const [visible, setVisible] = React.useState(false);
  const [questionData, setQuestionData] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    height: 400,
    padding: 20,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
  };
  const theme=Appearance.getColorScheme();
  useEffect(() => {
    getAllQuestion();
  }, []);
  const getAllQuestion = async () => {
    await questionApi
      .getAll()
      .then(res => {
        setQuestion(res.data);
        setQuestionFilter(res.data);
      })
      .catch(e => {
        showError(e.message ? e.message : e);
      })
      .finally(() => setLoading(false));
  };
  const [questionsFilter, setQuestionFilter] = useState(questions);
  const filterArray = str => {
    let clone = [...questions];
    let arr = clone.filter(x =>
      x.title.toLowerCase().includes(str.toLowerCase()),
    );
    setQuestionFilter(arr);
  };
  const handlePress = id => {
    Keyboard.dismiss();
    LayoutAnimation.easeInEaseOut();
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(i => i !== id));
    } else {
      setExpandedItems([id]);
    }
  };
  const handleQuestion = (f, v) => {
    setQuestionData(prev => ({
      ...prev,
      [f]: v,
    }));
  };
  const handleSendQuestion = () => {
    console.log(questionData);
    setLoadingButton(true);
    qaApi
      .sendQuestion(questionData)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          showSuccess(res.message);
          hideModal();
        } else {
          showError(res.message);
        }
        setLoadingButton(false);
      })
      .catch(e => {
        showError(e.message ? e.message : e);
        setLoadingButton(false);
      });
  };
  return (
    <>
      <PaperProvider>
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '85%'}}>
              <SearchBar data={questions} callback={filterArray} />
            </View>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text onPress={() => showModal()}>
                {/* <Ionicons
                  name="add-outline"
                  size={24}
                  color={COLORS.secondary}
                /> */}
              </Text>
            </View>
          </View>
          <Portal>
            <Modal
              style={{zIndex: 10}}
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {t('make_question')}
                </Text>
                <Text>{t('full_name')}</Text>
                <TextInput
                  // style={styles.input}
                  onChangeText={t => handleQuestion('fullname', t)}
                  placeholder={t('type_full_name')}
                  placeholderTextColor={'#C5C5C5'}
                  style={{
                    padding: 15,
                    borderWidth: 1,
                    borderColor: '#E9EAEC',
                    borderRadius: 10,
                  }}
                />
                <Text>{t('question')}</Text>
                <TextInput
                  editable
                  multiline
                  numberOfLines={6}
                  maxLength={40}
                  onChangeText={t => handleQuestion('question', t)}
                  placeholder={t('type_question')}
                  placeholderTextColor={'#C5C5C5'}
                  style={{
                    borderWidth: 1,
                    borderColor: '#E9EAEC',
                    borderRadius: 10,
                    padding: 10,
                    textAlignVertical: 'top',
                  }}
                />
              </View>
              <Button
                style={{backgroundColor: COLORS.primary, borderRadius: 10}}
                onPress={handleSendQuestion}
                labelStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 15,
                  padding: 6,
                }}
                loading={loadingButton}>
                {t('send')}
              </Button>
            </Modal>
          </Portal>
          <List.Section
            title=""
            style={{paddingBottom: 20, paddingHorizontal: 20, height: 500}}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              iniinitialNumToRender={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              data={questionsFilter}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <List.Accordion
                  style={{borderTopColor: '#cdd6da', borderTopWidth: 2,backgroundColor:'white'}}
                  title={item.title}
                  titleNumberOfLines={5}
                  titleStyle={{fontSize: 18, fontWeight: 'bold',color:'black'}}
                  // right={props => (
                  //   <AntDesign
                  //     {...props}
                  //     name={
                  //       expandedItems.includes(index)
                  //         ? 'upcircleo'
                  //         : 'circledowno'
                  //     }
                  //     size={18}
                  //     color={props.color}
                  //   />
                  // )}
                  theme={{colors: {primary: COLORS.primary}}}
                  expanded={expandedItems.includes(index)}
                  onPress={() => handlePress(index)}
                  id={index + 1}
                  key={index}>
                  <List.Item
                    title={() =>
                      item.content ? (
                        <RenderHTML
                          contentWidth={500}
                          source={{html: item.content}}
                        />
                      ) : (
                        <Text>{t('waiting_answer')}</Text>
                      )
                    }
                    titleNumberOfLines={5}
                    titleStyle={{fontSize: 20}}
                  />
                </List.Accordion>
              )}
            />
            {loading ? <AppLoader /> : ''}
          </List.Section>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
};

export default QA;