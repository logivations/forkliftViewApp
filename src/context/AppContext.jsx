import React, {useContext, useEffect, useRef, useState} from 'react';
import {CONNECTION_URL, getData} from "../services/AsyncStorageOperations";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
    const webviewRef = useRef(null);

    const [url, setUrl] = useState('');
    useEffect(() => {
        (async () => {
            const connectionUrl = await getData(CONNECTION_URL);
            setUrl(connectionUrl);
        })();
    }, []);

    return (<AppContext.Provider
        value={{
            url,
            setUrl,
            webviewRef
        }}
    >
        {children}
    </AppContext.Provider>);
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
