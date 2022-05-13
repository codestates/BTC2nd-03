import { useState,createContext } from 'react';

export const InfoContext = createContext({
    info: {
        password:"",
        checkPassword: "",
    },
    account: {},
    thisAccount:{
        address:"", 
        keystore:"", 
        coin:{matic:"0"}
    },
    setInfo: (info) => {},
    setAccount: (account) => {},
    setThisAccount: (thisAccount) => {},
});

// export const CoinContext = createContext({

// });

const InfoContextProvider = ({children})=>{
    const [info, setInfo] = useState({password:"",checkPassword: ""});
    const [account, setAccount] = useState({account:{}});
    const [thisAccount, setThisAccount] = useState({address:"", keystore:"", coin:{matic:"0"}})

    const setPasswordHandler = (info) => setInfo(info);
    const setAccountHandler = (account) => setAccount(account);
    const setThisAccountHandler = (thisAccount) => setThisAccount(thisAccount);
    return (
        <InfoContext.Provider value={{info: info, setInfo: setPasswordHandler, account:account, setAccount:setAccountHandler, thisAccount:thisAccount, setThisAccount:setThisAccountHandler}}>
            {children}
        </InfoContext.Provider>
    );
}

export default InfoContextProvider;