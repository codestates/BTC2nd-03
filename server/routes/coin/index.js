
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
  


router.get('/getTransactionInfo/:transactionId', async (req, res, next) => {  
  const transactionId = req.params.transactionId;

  console.log("current transactionId (Info function) : ",transactionId);
  
  try { 

    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3= new Web3(new Web3.providers.HttpProvider(rpcURL));
    

    //const transactionId = "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c";  //Transaction Hash

    let transactionInfo=await web3.eth.getTransaction(transactionId);
      

    console.log("Returened Transaction Info : ",transactionInfo);


    res.status(200).json(
      { 'status':'OK',
        'status_code':200,
        'data': {transactionInfo},
        'message':'success' 
      });

    }catch(err)
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


router.get('/getTransactionReceipt/:transactionId', async (req, res, next) => {  
    const transactionId = req.params.transactionId;

    console.log("current transactionId (Receipt function) : ",transactionId);
    
    try { 
  
      const rpcURL = "https://rpc-mumbai.matic.today";
      const web3= new Web3(new Web3.providers.HttpProvider(rpcURL));
      

      //const transactionId = "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c";  //Transaction Hash

      let transactionReceipt=await web3.eth.getTransactionReceipt(transactionId);
        

      console.log("Returened Transaction Receipt : ",transactionReceipt);

  
      res.status(200).json(
        { 'status':'OK',
          'status_code':200,
          'data': {transactionReceipt},
          'message':'success' 
        });
  
     }catch(err)
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



//
router.post('/createAccount', async (req, res, next) => {  

  console.log("new account address :make requested--");
  
  try { 

    const rpcURL = "https://rpc-mumbai.matic.today";
    const web3= new Web3(new Web3.providers.HttpProvider(rpcURL));
    
    var new_account = await web3.eth.accounts.create();
    
    res.status(200).json(
      { 'status':'OK',
        'status_code':200,
        'data': { new_account},
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




module.exports = router;