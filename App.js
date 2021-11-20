import React from 'react';
import {AppContextProvider} from "./src/context/AppContext";
import RootStack from "./src/navigation/RootStack";

export default function App() {
    return <AppContextProvider>
        <RootStack/>
    </AppContextProvider>
}
