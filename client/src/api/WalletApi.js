import {RolyPolyApi} from "../config/Ajax";

URL = '/api/wallets';

export const createWallet = (data) => {
    return RolyPolyApi.post(URL, data);
}

export const createMnemonic = (data) => {
    return RolyPolyApi.post(`${URL}/mnemonic`, data);
}