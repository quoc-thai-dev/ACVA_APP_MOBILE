import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black'
  },
  blockList: {
    width:'100%',
  },
  blockAvatar: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  name: {
    fontSize: 18,
    marginVertical:20,
    color:'black'
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
