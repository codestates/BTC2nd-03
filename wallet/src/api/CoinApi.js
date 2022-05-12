import {RolyPolyApi} from "../config/Ajax";

const URL = '/api/coins';

export const createMnemonic = (data) => {
    return RolyPolyApi.post(URL, data);
}

export const getBalance = (address) => {
    return RolyPolyApi.get(`${URL}/balance/${address}`);
}