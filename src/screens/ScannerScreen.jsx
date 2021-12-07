import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import useAppContext from "../context/AppContext";

const BarcodeScanner = ({ closeModal }) => {
    const {webviewRef} = useAppContext();

    const [barcodeValue, setBarcodeValue] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        webviewRef.current.injectJavaScript(`
                window['setSerialNumber'] && window['setSerialNumber']('${barcodeValue}')
        `);
    }, [barcodeValue]);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        webviewRef.current.postMessage(data);
        setBarcodeValue(data);
        closeModal();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    console.log('scanned', scanned)

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity style={styles.crossIcon} onPress={() => closeModal()}><Text style={styles.crossIcon} >&#215;</Text></TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    crossIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 40,
        width: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 40,
        fontWeight: '800'
    }
});

export default BarcodeScanner;

