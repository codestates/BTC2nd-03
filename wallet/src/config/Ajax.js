import axios from "axios";
import URL from './URL';

const RolyPolyApiConfig = {
    baseURL: URL.ROLY_POLY_API,
    timeout: 15000,
}

export const RolyPolyApi = axios.create(RolyPolyApiConfig);