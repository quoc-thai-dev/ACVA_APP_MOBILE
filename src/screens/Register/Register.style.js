import {StyleSheet} from 'react-native';
import React from 'react';
import {SHADOWS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  selectListContainer: {
    marginBottom: 12,
    // Add shadow based on the platform
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 5,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    borderRadius: 9,
    paddingHorizontal: 16,
  },
  inputGroup: {
    width: '49%',
  },
  textLogin: {
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#0082EF',
  },
  textFooter: {
    marginTop: 12,
    alignSelf: 'center',
  },
  iconHidden: {
    top: -10,
    bottom: 0,
    left: 0,
    right: 6,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholderStyle: {
    color: 'gray',
  },

  unvDropdownPicker: {
    borderColor: '#ccc',
  },

  unvDropDownContainerStyle: {
    marginTop: 6,
    backgroundColor: '#fff',
    ...SHADOWS.medium,
    borderWidth: 0,
    padding: 6,
    position: 'relative',
    top: 0,
  },

  unvsearchTextInputStyle: {
    borderWidth: 0,
  },

  unvTickIconContainerStyle: {
    paddingTop: 4,
    justifyContent: 'center',
  },

  unvSelectedItemLabelStyle: {
    color: '#ee463b',
    fontWeight: 500,
    fontStyle: 'italic',
  },

  unvsearchContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  unvListItemContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  genderDropDownPicker: {
    borderColor: '#ccc',
    height: 48,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  genderDropDownContainerStyle: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderColor: 'gray',
    ...SHADOWS.medium,
    borderWidth: 0,
    padding: 6,
    position: 'relative',
    top: 0,
  },

  genderListItemContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  genderSelectedItemLabelStyle: {
    color: '#ee463b',
    fontWeight: 500,
    fontStyle: 'italic',
  },

  genderTickIconContainerStyle: {
    paddingTop: 4,
    justifyContent: 'center',
  },
});

export default styles;
