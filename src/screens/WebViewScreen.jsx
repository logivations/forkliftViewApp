import React, {useMemo} from 'react';
import {ActivityIndicator, View} from "react-native";
import styles from "../styles/styles";
import WebView from "react-native-webview";
import useAppContext from "../context/AppContext";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const WebViewScreen = () => {
    const {url, webviewRef} = useAppContext();
    const injectedJavaScript = useMemo(() => {
        return `(() => {
                const meta = document.createElement('meta');
                meta.setAttribute('content', 'width=device-width, initial-scale=0.75, maximum-scale=0.75, user-scalable=0');
                meta.setAttribute('name', 'viewport');
                document.getElementsByTagName('head')[0].appendChild(meta);
            })();
         `
    }, []);

    return <View style={styles.webViewContainerStyle}>
        <KeyboardAvoidingWrapper>
            <WebView
                source={{uri: url}}
                startInLoadingState={true}
                renderLoading={() => <View style={styles.overlay}><ActivityIndicator size={120} color="#8dbf4c"/></View>}
                ref={webviewRef}
                onMessage={(event) => {
                    console.log('data', event.nativeEvent.data) // Client received data
                }}
                onError={(syntheticEvent) => {
                    const {nativeEvent} = syntheticEvent;
                    console.warn('Web error: ', nativeEvent);
                }}
                injectedJavaScript={injectedJavaScript}
            />
        </KeyboardAvoidingWrapper>
    </View>;
};

export default WebViewScreen;
