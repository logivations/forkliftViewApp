import React from 'react';
import {AppContextProvider} from "./src/context/AppContext";
import RootStack from "./src/navigation/RootStack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { ModalPortal } from 'react-native-modals';

export default function App() {
    return <AppContextProvider>
        <SafeAreaProvider style={{ flex: 1 }}>
            <RootStack/>
            <ModalPortal />
        </SafeAreaProvider>
    </AppContextProvider>
}
