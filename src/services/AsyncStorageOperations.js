/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2021
 ******************************************************************************/

import AsyncStorage from '@react-native-async-storage/async-storage';

export const CONNECTION_URL = '@connection-url';

export const storeData = async (key, value) => {
    try {
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error(e);
    }
};
