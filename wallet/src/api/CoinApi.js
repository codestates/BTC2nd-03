import {RolyPolyApi} from "../config/Ajax";
const URL = '/api/coins';

export const createMnemonic = (data) => {
    return RolyPolyApi.post(URL, data);
}

export const getBalance = (address) => {
    return RolyPolyApi.get(`${URL}/balance/${address}`);
}

export const transfer = (data) => {
    return RolyPolyApi.post(`${URL}/transfer`,data);
}

export const getTransaction = (id) => {
    return RolyPolyApi.post(`${URL}/test?id=${id}`);
}

export const fromWei = (amount) => {
    return RolyPolyApi.post(`${URL}/from_wei/${amount}`);
}