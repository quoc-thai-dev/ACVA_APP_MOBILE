import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  LayoutAnimation,
  RefreshControl,
  TextInput,
  View,
  Appearance,
  Dimensions,
} from 'react-native';
import {
  Button,
  Divider,
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
import {COLORS, SIZES} from '../../constants';
import {showError, showSuccess} from '../../utils/helperFunction';
import {useTranslation} from 'react-i18next';
const QA = () => {
  const [t, i18n] = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const inputSearch = useRef(null);
  const [questions, setQuestion] = useState([]);
  const [idExpand, setidExpand] = useState(null);
  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      getAllQuestion();
      setRefreshing(false);
    }, 300);
  }, []);
  const [visible, setVisible] = React.useState(false);
  const [questionData, setQuestionData] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    height: Dimensions.get('screen').height - 350,
    padding: 20,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
  };
  const theme = Appearance.getColorScheme();
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
      setidExpand(null);
    } else {
      setExpandedItems([id]);
      setidExpand(id);
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '83%'}}>
              <SearchBar data={questions} callback={filterArray} />
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 30,
              }}>
              <Text onPress={() => showModal()}>
                <Ionicons
                  name="add-outline"
                  size={32}
                  color={COLORS.secondary}
                />
              </Text>
            </View>
          </View>
          <Portal>
            <Modal
              style={{zIndex: 10}}
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <View style={{flex: 1, justifyContent: 'space-around'}}>
                <Text
                  style={{
                    fontSize: SIZES.large,
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
                    padding: 10,
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
                  maxLength={200}
                  onChangeText={t => handleQuestion('question', t)}
                  placeholder={t('type_question')}
                  placeholderTextColor={'#C5C5C5'}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#E9EAEC',
                    borderRadius: 10,
                    height: 90,
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
                  // padding: 6,
                }}
                loading={loadingButton}>
                {t('send')}
              </Button>
            </Modal>
          </Portal>
          <List.Section
            title=""
            style={{
              height: Dimensions.get('screen').height - 250,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              iniinitialNumToRender={2}
              showsVerticalScrollIndicator={false}
              data={questionsFilter}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <List.Accordion
                  style={{
                    borderTopColor: '#D42E2E',
                    borderTopWidth: 2,
                    borderRadius: 20,
                    backgroundColor: idExpand === index ? '#D42E2E' : 'white',
                  }}
                  title={item.title}
                  titleNumberOfLines={5}
                  titleStyle={{
                    fontSize: SIZES.medium,
                    fontWeight: 'bold',
                    color: idExpand === index ? 'white' : 'black',
                  }}
                  right={props => (
                    <Entypo
                      {...props}
                      name={
                        expandedItems.includes(index)
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={18}
                      color={idExpand === index ? 'white' : 'black'}
                    />
                  )}
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
                          baseStyle={{fontSize: SIZES.small}}
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
        </View>
      </PaperProvider>
    </>
  );
};

export default QA;
