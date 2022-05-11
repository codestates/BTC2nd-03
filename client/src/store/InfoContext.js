import { useState,createContext } from 'react';

export const InfoContext = createContext({
    info: {
        password:"",
        checkPassword: "",
    },
    
    setInfo: (info) => {}
});

const InfoContextProvider = ({children})=>{
    const [info, setInfo] = useState({password:"",checkPassword: ""});

    const setPasswordHandler = (info) => setInfo(info);

    return (
        <InfoContext.Provider value={{info: info, setInfo: setPasswordHandler}}>
            {children}
        </InfoContext.Provider>
    );
}

export default InfoContextProvider;