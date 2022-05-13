import { RolyPolyApi } from "../config/Ajax";

const URL = "/api/coins";

export const getTransactionReceipt = (transactionId) => {
  return RolyPolyApi.get(`${URL}/getTransactionReceipt/:${transactionId}`);
};

export const getTransactionInfo = (transactionId) => {
  return RolyPolyApi.get(`${URL}/getTransactionInfo/:${transactionId}`);
};
