import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import styles from "../styles/styles";
import WebView from "react-native-webview";
import useAppContext from "../context/AppContext";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { ModalPortal } from "react-native-modals";
import BarcodeScanner from "./ScannerScreen";

const WebViewScreen = () => {
    const {url, webviewRef} = useAppContext();
    const [barcodeReaderVisible, setBarcodeReaderVisible] = useState(false);
    const injectedJavaScript = useMemo(() => {
        return `(() => {
                window.isNativeApp = true;
                const meta = document.createElement('meta');
                meta.setAttribute('content', 'width=device-width, initial-scale=0.75, maximum-scale=0.75, user-scalable=0');
                meta.setAttribute('name', 'viewport');
                document.getElementsByTagName('head')[0].appendChild(meta);
            })();
         `
    }, []);

    useEffect(() => {
        if (barcodeReaderVisible) {
            ModalPortal.show((
                <BarcodeScanner closeModal={() => setBarcodeReaderVisible(false)}/>
            ), {
                containerStyle: { zIndex: 10, elevation: 10, marginTop: 10, backgroundColor: 'none' },
                height: 307,
                width: 547,
                onTouchOutside: () => setBarcodeReaderVisible(false),
                onHardwareBackPress: () => setBarcodeReaderVisible(false)
            });
        } else {
            ModalPortal.dismissAll();
        }
    }, [barcodeReaderVisible]);

    return <View style={styles.webViewContainerStyle}>
            <WebView
                source={{uri: url}}
                startInLoadingState={true}
                renderLoading={() => <View style={styles.overlay}><ActivityIndicator size={120} color="#8dbf4c"/></View>}
                ref={webviewRef}
                onMessage={(event) => {
                    if (event.nativeEvent.data === 'OPEN_BARCODE_SCANNER') {
                        setBarcodeReaderVisible(true)
                    }
                }}

                onError={(syntheticEvent) => {
                    const {nativeEvent} = syntheticEvent;
                    console.warn('Web error: ', nativeEvent);
                }}
                injectedJavaScript={injectedJavaScript}
            />
    </View>;
};

export default WebViewScreen;
