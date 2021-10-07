import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";

import styles from './../styles/styles';
import {CONNECTION_URL, storeData} from "../services/AsyncStorageOperations";
import useAppContext from "../context/AppContext";
import RouteNames from "../constants/route.names";

const ConnectionScreen = ({ navigation }) => {
    const {url, setUrl} = useAppContext();

    return <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Please set connection URL</Text>
            <TextInput
                style={styles.textInput}
                placeholder={'http://127.0.0.1:8080/whapp'}
                value={url}
                onChangeText={(text) => setUrl(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    await storeData(CONNECTION_URL, url);
                    navigation.push(RouteNames.WEB_VIEW);
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    </View>;
};

export default ConnectionScreen;
