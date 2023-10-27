import { StyleSheet} from 'react-native';
import { SHADOWS } from '../../constants';

const styles = StyleSheet.create({
    container:{
        padding: 18,
        gap: 18,
    },

    dropBoxMessageEmpty: {
        fontStyle: 'italic',
        opacity: 0.6,
    },

    levelDropDownPicker:{
        borderColor: '#1b1c1b',
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 10,
    },

    levelDropDownContainerStyle:{
        marginTop: 6,
        backgroundColor: "#fff",
        borderColor: 'gray',
        zIndex: 10,
        ...SHADOWS.medium,
        borderWidth: 0,
        padding: 6,
    },

    levelListItemContainerStyle:{
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    levelSelectedItemLabelStyle:{
        color: '#ee463b',
        fontWeight: 500,
        fontStyle: 'italic',
    },

    levelTickIconContainerStyle:{
        paddingTop: 4,
        justifyContent: 'center'
    },

    examDropDownPicker:{
        width: '100%',
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

    examCustomItemContainerStyle:{
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: '#e5e2e2',
        padding: 6,
    },

    examSelectedItemContainerStyle:{
        backgroundColor: '#ee463b',
        padding: 6,
    },

    examSelectedItemLabelStyle:{
        color: '#fff'
    },

    examDropDownContainerStyle:{
        marginTop: 6,
        backgroundColor: "#fff",
        borderColor: 'gray',
        ...SHADOWS.medium,
        borderWidth: 0,
        zIndex: 9,
        padding: 6,

    },

    upLoadContainer: {
        flexDirection: 'row', 
        gap: 10,
    },

    updLoadItem:{
        // flexDirection:'row',
        gap: 18,
    },

    labelUploadItem:{
        flexDirection:'row',
        alignItems:'center',
    },

    btnUpLoadCCCDContainer:{
        height: 60,
        width: 120,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dotted',
        borderRadius: 6
    },

    btnUpLoadCCCD:{

        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'gray',
        width: 35,
        height:35,
        borderRadius:35,
        alignItems: 'center',
        justifyContent: 'center',

    },

    reviewImageCCCD:{
        flex: 1,
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius:6,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
        
      },

    btnIconContainer:{
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        gap: 10,
        borderRadius: 9,
        backgroundColor: '#97bec6',
    },
    
    btnIconTitle: {
        color: '#333', 
        fontWeight: 500
    },

    moreLessText:(isSelected) => (
        {
        color: isSelected ? '#fff' : '#333', 
        fontWeight: 500, 
        alignItems: 'center', 
        alignSelf:'center', 
        padding: 3, 
        borderWidth: 1, 
        borderColor: '#eee', 
        borderRadius: 6, 
        marginTop: 3, 
        fontSize: 13
    }),
})

export default styles

