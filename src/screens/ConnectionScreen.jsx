import React, {useCallback, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";

import styles from './../styles/styles';
import {CONNECTION_URL, storeData} from "../services/AsyncStorageOperations";
import useAppContext from "../context/AppContext";
import RouteNames from "../constants/route.names";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import Constants from 'expo-constants';
const ConnectionScreen = ({navigation}) => {
    const {url, setUrl} = useAppContext();
    const [isUrlValid, setUrlValidity] = useState(true);

    const handleSave = useCallback(() => {
        setUrlValidity(true);
        fetch(`${url}/anonymous/getServerVersion`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Accept: '*/*',
                Connection: 'keep-alive',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, X-Requested-With',
            },
        })
            .then((res) => res.json())
            .then(async (res) => {
                setUrlValidity(true);
                await storeData(CONNECTION_URL, url);
                navigation.push(RouteNames.WEB_VIEW);
            })
            .catch(() => {
                setUrlValidity(false);
            })
    }, [url]);

    return <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Please set connection URL</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'http://127.0.0.1:8080/whapp'}
                    value={url}
                    onChangeText={(text) => setUrl(text)}
                />
                {!isUrlValid && <Text style={styles.textError}>
                    Wrong URL
                </Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>Build version: {Constants?.manifest?.version}</Text>
        </View>;
};

export default ConnectionScreen;
