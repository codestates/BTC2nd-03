import {RolyPolyApi} from "../config/Ajax";

URL = '/api/wallet';

export const createWallet = (data) => {
    return RolyPolyApi.post(URL, data);
}

