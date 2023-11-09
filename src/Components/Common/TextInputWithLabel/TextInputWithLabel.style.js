import {Platform, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 12,
    marginBottom: 6,
  },

  labelContainer: {
    backgroundColor: '#fff', // Same color as background
    alignSelf: 'flex-start', // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: 'white', // Same as background color because elevation: 1 creates a shadow that we don't want
    position: 'absolute', // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
  inputContainer: focus => ({
    borderWidth: 1, // Create border
    borderRadius: 8, // Not needed. Just make it look nicer.
    // padding: 8, // Also used to make it look nicer
    zIndex: 0, // Ensure border has z-index of 0
    borderColor: focus ? '#1b1c1b' : '#e5e2e2',
    // backgroundColor: 'red',
    padding: Platform.OS === 'ios' ? 15 : 5,
  }),

  textInput: focus => ({
    color: focus ? '#e5e2e2' : '#333',
  }),

  textInputabsent: {
    color: '#f54257',
    fontWeight: '500',
  },

  textInputpresent: {
    color: 'green',
    fontWeight: '500',
  },
  icon: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',

    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 9,
  },
});

export default styles;
