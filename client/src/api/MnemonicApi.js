import {RolyPolyApi} from "../config/Ajax";

URL = '/api/mnemonic';

export const createMnemonic = (data) => {
    return RolyPolyApi.post(URL, data);
}