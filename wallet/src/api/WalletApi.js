import {RolyPolyApi} from "../config/Ajax";

const URL = '/api/wallets';

export const createWallet = (data) => {
    return RolyPolyApi.post(URL, data);
}

export const createMnemonic = (data) => {
    return RolyPolyApi.post(`${URL}/mnemonic`, data);
}