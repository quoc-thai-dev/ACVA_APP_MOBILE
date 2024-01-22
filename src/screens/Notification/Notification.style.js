import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  card: {
    height: 120,
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F5',
    // paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal:20,
    marginHorizontal:20,
  },
  textBlock: { 
    paddingLeft:20,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  textSubTitle: {
    fontSize: 18,
    color: '#050505',
    marginBottom: 5,
  },
  textDate: {
    fontSize: 15,
    color: '#4E4B66',
    marginBottom: 5,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex:1,
    paddingHorizontal:15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgList: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default styles;
