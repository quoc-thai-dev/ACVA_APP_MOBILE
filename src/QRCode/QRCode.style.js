import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'red', // Color of the floating frame
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: Dimensions.get('screen').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedText: {
    color: 'white',
    fontSize: 20,
  },
});

export default styles;
