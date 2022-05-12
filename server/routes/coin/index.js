
var express = require('express');

const Web3 = require("web3");


var router = express.Router();

//router.get('/getBalance/:account', async (req, res, next) => {    
router.post('/getBalance', async (req, res, next) => {  
  //const account = req.params.account;
  //const account="0xc6516E8E3379299AaC6b2f5a3688a6CfB9370B65";
  const account=req.body.account;
  console.log("current account :",account);
  
  try { 

    const rpcURL = "https://rpc-mumbai.matic.today";

    //const web3 = new Web3(rpcURL);

    const web3= new Web3(new Web3.providers.HttpProvider(rpcURL));
    let bal= await web3.eth.getBalance(account);
    let eth=web3.utils.fromWei(bal, "ether");
    res.status(200).json(
      { 'status':'OK',
        'status_code':200,
        'data': { "wei" : bal ,'matic' :eth },
        'message':'success' 
      });

  }  catch(err)
  {
    console.log(err);
    res.status(200).json(
    { 
      'status':'FAIL',
      'status_code':400,
      'data': "",
      'message': err.toString()
    });
  }
  
});
  
/*
[1] 성공 return 예시 
{
    "status": "OK",
    "status_code": 200,
    "data": {
        "wei": "139377332219816000",
        "matic": "0.139377332219816"
    },
    "message": "success"
}

*/


module.exports = router;