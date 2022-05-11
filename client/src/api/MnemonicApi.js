import {RolyPolyApi} from "../config/Ajax";

const MnemonicApi =() => {
    URL = '/api/mnemonic';

    const createMnemonic = (data) => {
        return RolyPolyApi.post(URL, data);
    }
}

export default MnemonicApi;