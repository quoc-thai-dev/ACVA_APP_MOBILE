import { StyleSheet, } from 'react-native'
import React from 'react'
import { SHADOWS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    selectListContainer:{
        marginBottom: 12,
    },
    groupContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    inputStyle:{
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        color: '#333',
        borderRadius: 9,
        paddingHorizontal: 16,
    },
    inputGroup:{
        width: '49%'
    },
    textLogin:{
        fontWeight: 'bold'
    },
    textFooter:{
        marginTop: 12,
        alignSelf: 'center'
    },
    iconHidden:{
        top:-10,
        bottom: 0,
        left:0,
        right:6,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center'
       
    },
    placeholderStyle: {
        color: 'gray'
    },

    unvDropdownPicker:{
        borderColor: 'gray'
    },

    unvDropDownContainerStyle:{
        marginTop: 6,
        backgroundColor: "#fff",
        borderColor: 'gray',
        zIndex: 10,
        ...SHADOWS.medium,
        borderWidth: 0,
        padding: 6,
    },

    unvsearchTextInputStyle: {
        borderWidth: 0,
    },

    unvTickIconContainerStyle:{
        paddingTop: 4,
        justifyContent: 'center'
    },

    unvSelectedItemLabelStyle:{
        color: '#ee463b',
        fontWeight: 500,
        fontStyle: 'italic',
    },

    unvsearchContainerStyle :{
        borderBottomWidth: 1, 
        borderColor: '#eee',
    },

    unvListItemContainerStyle:{
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

   genderDropDownPicker:{
        borderColor: '#1b1c1b',
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 9,
    },

   genderDropDownContainerStyle:{
        marginTop: 6,
        backgroundColor: "#fff",
        borderColor: 'gray',
        zIndex: 9,
        ...SHADOWS.medium,
        borderWidth: 0,
        padding: 6,
    },

   genderListItemContainerStyle:{
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

   genderSelectedItemLabelStyle:{
        color: '#ee463b',
        fontWeight: 500,
        fontStyle: 'italic',
    },

   genderTickIconContainerStyle:{
        paddingTop: 4,
        justifyContent: 'center'
    },


});

export default styles;

