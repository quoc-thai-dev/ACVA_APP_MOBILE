import {Platform, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 12,
    marginBottom: 6,
  },

  labelContainer: {
    backgroundColor: '#fff', // Same color as background
    alignSelf: 'flex-start', // Have View be same width as Text inside
    paddingHorizontal: 5, // Amount of spacing between border and first/last letter
    marginStart: 15, // How far right do you want the label to start
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
    borderColor: focus ? '#f54257' : '#ccc',
    // backgroundColor: 'red',

    padding: Platform.OS === 'ios' ? 15 : 0,
    paddingLeft: 10,
    // Add shadow based on the platform
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 5,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: 'white',
  }),

  textInput: focus => ({
    color: focus ? '#f54257' : '#ccc',
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
    position: 'absolute',
    right: 0,
    bottom: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    // backgroundColor: 'red',
  },
});

export default styles;
