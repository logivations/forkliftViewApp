import React, {useMemo, useRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import styles from "../styles/styles";
import WebView from "react-native-webview";
import useAppContext from "../context/AppContext";

const WebViewScreen = () => {
    const {url, webviewRef} = useAppContext();

    return <View style={styles.webViewContainerStyle}>
        <WebView
            source={{uri: url}}
            startInLoadingState={true}
            renderLoading={() => <View style={styles.overlay}><ActivityIndicator size={120} color="#8dbf4c" /></View>}
            ref={ webviewRef }
            onMessage={(event) => {
                console.log('data', event.nativeEvent.data) // Client received data
            }}
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('Web error: ', nativeEvent);
            }}
        />
    </View>
};

export default WebViewScreen;
