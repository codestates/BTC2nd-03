var router = require("express").Router();
const Web3 = require("web3");

//router.get('/getBalance/:account', async (req, res, next) => {
router.get("/balance/:account", async (req, res, next) => {
  const account = req.params.account;
  //const account="0xc6516E8E3379299AaC6b2f5a3688a6CfB9370B65";
  // const account=req.body.account;
  console.log("current account :", account);

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";

    //const web3 = new Web3(rpcURL);

    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
    let bal = await web3.eth.getBalance(account);
    let eth = web3.utils.fromWei(bal, "ether");
    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { wei: bal, matic: eth },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

router.get("/getTransactionInfo/:transactionId", async (req, res, next) => {
  const transactionId = req.params.transactionId;

  console.log("current transactionId (Info function) : ", transactionId);

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    //const transactionId = "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c";  //Transaction Hash

    let transactionInfo = await web3.eth.getTransaction(transactionId);

    console.log("Returened Transaction Info : ", transactionInfo);

    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { transactionInfo },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

router.get("/getTransactionReceipt/:transactionId", async (req, res, next) => {
  const transactionId = req.params.transactionId;

  console.log("current transactionId (Receipt function) : ", transactionId);

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    //const transactionId = "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c";  //Transaction Hash

    let transactionReceipt = await web3.eth.getTransactionReceipt(
      transactionId
    );

    console.log("Returened Transaction Receipt : ", transactionReceipt);

    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { transactionReceipt },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

//
router.post("/createAccount", async (req, res, next) => {
  console.log("new account address :make requested--");

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    var new_account = await web3.eth.accounts.create();

    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { new_account },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

//

router.post("/transfer", async (req, res, next) => {
  console.log("transfer request requested--");

  const sender = req.body.sender; //sender account address
  const receiver = req.body.sender; //receiver account address
  const matic_amount = req.body.matic_amount; //amount : Matic (unit)
  const private_key = req.body.private_key;

  console.log("sender : ", sender);
  console.log("receiver : ", receiver);
  console.log("matic_amount : ", matic_amount);
  console.log("private_key : ", private_key);

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    console.log(
      "matic amount (wei) : ",
      web3.utils.toWei(matic_amount, "ether")
    );

    const nonce = await web3.eth.getTransactionCount(sender, "latest"); // nonce starts counting from 0
    console.log("nonce : ", nonce);

    let amount = await web3.utils.toWei(matic_amount, "ether");
    //let gas= await web3.eth.getGasPrice();
    //let maxPriorityFeePerGas=await web3.eth.getMaxPriorityFeePerGas();

    const transaction = {
      to: receiver,
      value: amount,
      gas: 30000,
      //'maxPriorityFeePerGas': 10000001,   //0.000000023650845947
      //'maxPriorityFeePerGas': 23650845947,   //0.000000023650845947
      // 'maxPriorityFeePerGas': 23700848947,   //0.000000023650845947
      maxPriorityFeePerGas: 25000848947, //0.000000023650845947
      //'maxPriorityFeePerGas': maxPriorityFeePerGas,
      //'maxPriorityFeePerGas' : 1000000000,
      nonce: nonce,
      // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      private_key
    );

    let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { receipt },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

router.get("/getBlockInfo/:blockNumber", async (req, res, next) => {
  const blockNumber = req.params.blockNumber;
  //const blockNum = "26290542";
  console.log("current blockNumber (Info function) : ", blockNumber);

  try {
    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    let blockInfo = await web3.eth.getBlock(blockNumber);

    console.log("Returened Block Info : ", blockInfo);

    res
      .status(200)
      .json({
        status: "OK",
        status_code: 200,
        data: { blockInfo },
        message: "success",
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "FAIL",
      status_code: 400,
      data: "",
      message: err.toString(),
    });
  }
});

module.exports = router;
