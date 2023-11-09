import {Dimensions, StyleSheet} from 'react-native';
import {SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    // backgroundColor: 'red',
    position: 'absolute',
    // top: (Dimensions.get('window').height * 1) / 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50,
  },
  blockList: {
    // width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  blockAvatar: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  name: {
    fontSize: 18,
    marginVertical: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  menuItem: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    backgroundColor: 'black',
  },
  menuText: {
    fontSize: 16,
  },
});

export default styles;
