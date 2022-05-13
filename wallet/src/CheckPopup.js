import React from 'react';
import WalletPage from './pages/WalletPage';
import { useNavigate } from 'react-router-dom';
import { GetStorageByBrowserType } from './config/Utils';
import App from './App';
const CheckPopup = () => {
    const navigate = useNavigate();
    return GetStorageByBrowserType('address') ? navigate('/') : <App/>
}

export default CheckPopup();