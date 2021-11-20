import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;


export default StyleSheet.create({
    webViewContainerStyle: {
        flex: 1,
        paddingTop: StatusBarHeight
    },
    appContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBarHeight,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    inputLabel: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    inputContainer: {
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textError: {
        marginTop: 10,
        color: '#ef4444',
    },
    textInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#d3d3d3',
        padding: 10,
        borderRadius: 4,
        fontSize: 16,
        height: 38,
        color: '#1f2937',
        width: 300
    },
    button: {
        padding: 0,
        backgroundColor: '#8dbf4c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 20,
        height: 38,
        width: 300
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
