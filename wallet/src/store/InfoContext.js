import { useState,createContext } from 'react';

export const InfoContext = createContext({
    info: {
        password:"",
        checkPassword: "",
    },
    coin: {
        matic:"0"
    },
    setInfo: (info) => {},
    setCoin: (coin) => {}
});

// export const CoinContext = createContext({

// });

const InfoContextProvider = ({children})=>{
    const [info, setInfo] = useState({password:"",checkPassword: ""});
    const [coin, setCoin] = useState({coin: {matic:"0"}});

    const setPasswordHandler = (info) => setInfo(info);
    const setCoinHandler = (coin) => setCoin(coin);
    return (
        <InfoContext.Provider value={{info: info, setInfo: setPasswordHandler, coin:coin, setCoin:setCoinHandler}}>
            {children}
        </InfoContext.Provider>
    );
}

export default InfoContextProvider;