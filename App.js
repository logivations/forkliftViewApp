import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppContextProvider} from "./src/context/AppContext";
import RootStack from "./src/navigation/RootStack";

export default function App() {
    return <AppContextProvider>
        <RootStack/>
    </AppContextProvider>



    // useEffect(() => {
    //     setTimeout(() => {
    //         webviewRef.current.postMessage('INITIALIZATION')
    //     }, 10000)
    // }, [])

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
