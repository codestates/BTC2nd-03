var express = require('express');
var router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require('fs');


//lightwallet 모듈을 사용하여 랜덤한 니모닉 코드를 얻습니다.
router.post('/mnemonic', async(req,res) => {
    let mnemonic;
    try {
        mnemonic = lightwallet.keystore.generateRandomSeed();
        res.status(200).json(
        { 'status':'OK',
          'status_code':200,
          'data': {mnemonic},
          'message':'success' 
        });
    } catch(err) {
        console.log(err);
        res.status(200).json(
        { 'status':'FAIL',
          'status_code':400,
          'data': "",
          'message': err.toString()
        });
    }
});

//(1) success 시에 return 예제 
//위는 케이스2로 return 
//케이스 1
// {
//     "status": "OK",
//     "status_code": 200,
//     "data": "scissors midnight siren window portion kid oblige brief advance neutral nuclear meat",
//     "message": "success"
// }

//케이스 2
// {
//     "status": "OK",
//     "status_code": 200,
//     "data": {
//         "mnemonic": "voyage solve door silk diary amateur shallow lounge valid brick undo scheme"
//     },
//     "message": "success"
// }

//(2) fail시에 return 예제 

// {
//     "status": "FAIL",
//     "status_code": 400,
//     "data": "",
//     "message": "TypeError: lightwallet.keystore.generateRandomSeed2 is not a function"
// }



/*
{
    "mnemonic": "illegal same parent empty razor outer present mercy atom swarm hope mom"
}
*/

router.post('/import', async(req,res) => {
  const mnemonic = req.body.mnemonic;
  console.log(mnemonic);
  const test = lightwallet.keystore.getAddresses();
  console.log(test);
  
  try {
      const result = lightwallet.keystore.isSeedValid(mnemonic);
      res.status(200).json(
      { 
        'status':'OK',
        'status_code':200,
        'data': {result},
        'message':'success' 
      });
  } catch(err) {
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

router.post('/test', async(req, res) => {
  let password = req.body.password;
  let mnemonic = req.body.mnemonic;
  let data_address =  req.body.data_address;


  try {
    //lightwallet.keystore.createVault(
    lightwallet.keystore.createVault(    
      {
        password: password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'"
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);
          console.log("[0] pwDerivedKey : ",pwDerivedKey);

          let address = (ks.getAddresses()).toString();
          let keystore = ks.serialize();
          
          console.log("[1] keystore : ",keystore);
          console.log("[2] address : ",address);

          let private_key = ks.exportPrivateKey(data_address, pwDerivedKey);
          console.log("[3] exportPrivateKey : ",private_key);

          res.status(200).json(
          { 'status':'OK',
                'status_code':200,
                'data': { keystore: keystore, address: address, private_key:private_key },
                'message':'success' 
          });

        });
      }
    );
  } catch (exception) {
    console.log("NewWallet ==>>>> " + exception);
    res.status(200).json(
      { 'status':'FAIL',
        'status_code':400,
        'data': "",
        'message': exception.toString()
      });
  }

});

//니모닉 코드와 패스워드를 이용해 keystore와 address를 생성합니다.
router.post('/', async(req, res) => {
    let password = req.body.password;
    let mnemonic = req.body.mnemonic;
    let accountCount=1;
    if(req.body.accountCount==null|| req.body.accountCount=="")
    {
        console.log("accountCount is null or blank string");
    }
    else{
        accountCount=req.body.accountCount;
    }

    try {
      //lightwallet.keystore.createVault(
      lightwallet.keystore.createVault(    
        {
          password: password,
          seedPhrase: mnemonic,
          hdPathString: "m/0'/0'/0'"
        },
        function (err, ks) {
          ks.keyFromPassword(password, function (err, pwDerivedKey) {
            ks.generateNewAddress(pwDerivedKey, accountCount);
            console.log("[0] pwDerivedKey : ",pwDerivedKey);

            let address = (ks.getAddresses()).toString();
            let keystore = ks.serialize();

            console.log("[1] keystore : ",keystore);
            console.log("[2] address : ",address);

            const addressFirst = address.split(',',1);
            const privateKey = ks.exportPrivateKey(addressFirst[0], pwDerivedKey);
            console.log("[3] exportPrivateKey : ",privateKey);

            res.status(200).json(
            { 'status':'OK',
                  'status_code':200,
                  'data': { keystore: keystore, address: address, privateKey:privateKey },
                  'message':'success' 
            });

          });
        }
      );
    } catch (exception) {
      console.log("NewWallet ==>>>> " + exception);
      res.status(200).json(
        { 'status':'FAIL',
          'status_code':400,
          'data': "",
          'message': exception.toString()
        });
    }

});

module.exports = router;

/*
 
(A-1) "mnemonic": "illegal same parent empty razor outer present mercy atom swarm hope mom",
//test 1  (password 1234)
[1] keystore :  {"encSeed":{"encStr":"4FgbKD+mlj9GTsiQsywg8Fpnx8WBuoJREJtlLhNoWVZBI9B0uuTDBpB9mVPxkx5MEhMwReLiybyElW6DHF9waaUkgQ+ZN8nkgGKBz+RSD+8oUiyx6BZ3O9fxdnbvt5tpgKw8at3svO1Z2MWDGqrMiM4TBe5NYTNcA01I0F8opBbReJaJy+Dc/Q==","nonce":"DMdqz4XQrJJjFzZmuNP203/UJPvrr2pC"},"encHdRootPriv":{"encStr":"XN0I1GLKDYM6nhqZj8+frcBf+Vny3QhiMrB0C69fBzs3gtPgfMxgLJMctUWg67FOhG4zXZlkRDnA1Be5CCIIGnvO8uAn/Z9HxjKNWK7qvlTMhmAxEa+d/PBKIOMAG/RRb+gYNlRcEyGYbQWmCdGkdnkuHmziNMI2sK3D/8XBGQ==","nonce":"I22iIcAOmrTaq8Dv4fBtZV+68nhYXqHy"},"addresses":["70d50b51703f489de41d6a6563fd156867348317"],"encPrivKeys":{"70d50b51703f489de41d6a6563fd156867348317":{"key":"FGCFX7FEL35PxkzYnnW6pcmr6PO5ydbIatgd7hEqL8/6UZs0RwaWeKFMrlMRE0vI","nonce":"960tWMCNkTpqEISuc2+oqzIC/PnElMR7"}},"hdPathString":"m/0'/0'/0'","salt":"LQHdy1Y38uyjf7WMB8Mind5WUfPb6793LVRfe/K5CyU=","hdIndex":1,"version":3}
[2] address :  0x70d50b51703f489de41d6a6563fd156867348317


//test 2  (password 3456)
[1] keystore :  {"encSeed":{"encStr":"rgbwqpoQM1G1B3jM1miHlX58eTasM2ZPc01+rD04fQhYT4SqStG8LEq5AWulIefC2HtgKpXirwvfYr43Cp8v1M3YW0pyTOTezZu3XIitlJ2+ny4BRFDwN/HKWN47Dl9sVWcMJXTzvMYbfgKSUV9jBrAmhKQWsTSOlU7l8UA4tg2qRMwyM2/b1Q==","nonce":"wc2rgIh2v1/lVf9aanLC2BJ9ZjOWoFU/"},"encHdRootPriv":{"encStr":"c3CaiEY2ILrAjSwtivUmpGRp9iI+ylxcxm59+9J/NEOssBZK14I1tbQx9S4HAq1VNEmt4fbK6bhMraoikd8p8OCM5hJh78wTBDs4L1HYFxYtrFsex0Ddtab5K3/MTfdgw6OPEEMMdz9A8KQ26kPj9LKu0CINB2MWBawYqjlQrw==","nonce":"oILDx2IHV818DNCkmdendH+BM4YiADrA"},"addresses":["70d50b51703f489de41d6a6563fd156867348317"],"encPrivKeys":{"70d50b51703f489de41d6a6563fd156867348317":{"key":"gSWdk1eTI9TBwc+ZXBiCAIaecVJuOFNprXpuys8BQjlVDXBCkUpTChlXLpuJcIu1","nonce":"UzolPwMpRMssywMCKFDU0vplduCHiz5l"}},"hdPathString":"m/0'/0'/0'","salt":"xJ6xUeP30/vXaJpc9JFJ93htY1k6CDogEcG5pwnpIF0=","hdIndex":1,"version":3}
[2] address :  0x70d50b51703f489de41d6a6563fd156867348317


//test 3  (password 7890)
[1] keystore :  {"encSeed":{"encStr":"3ofHW9uHTY37SCV2WTuMAGhWWZE+9HQJbi7PgElsRU/tPVDrNBjUufVovTMGqst1ONv9Txd/wSsIBKNqUKXtRzZOVGkiqvwAVKb3FqVqSBu3DPrBaK4dtfGaF7t5S7ymjiAmh4Q+PTTf2iKsbkHFiJ32vW7JI9i90ZXr6ALpqGYVrShILcJYZw==","nonce":"R2+fI2oLQY7wCVMSw8pUEQcB7O8LBQCi"},"encHdRootPriv":{"encStr":"mtea0o4IeyLg54WHREeMD/4mSEjJ5nYZ5McngINJ8oQ9NSTn1TDASxqVKjzNrup5HQolXYvfhlb2cIitVB6Fyk9f0PSX75PSmxxjdN/9Mz/1GaWr3K6jp3t2Atk64kpL7cct6XbEZ1bFmJp2jS2oHYyiiGdIMmbQcz8ou7O/4Q==","nonce":"a5beYN8XMzNDqpk2HifWutUnQGYqm/Uf"},"addresses":["70d50b51703f489de41d6a6563fd156867348317"],"encPrivKeys":{"70d50b51703f489de41d6a6563fd156867348317":{"key":"1mDykg2M5KyzJc0Dk5DRFjcMFj9gzO6K9xmYWNwRTlYhYTXUy7/HlSqInJlPug1u","nonce":"J9FTWJIKHOUMiAXHW3yuZ66NFENz6x+k"}},"hdPathString":"m/0'/0'/0'","salt":"3t+feDnfIJPyTXscAG4XwGj8/jrgZIxrPu39MgAahxs=","hdIndex":1,"version":3}
[2] address :  0x70d50b51703f489de41d6a6563fd156867348317


(A-2) 위랑 동일한데 다만 서버 죽이고  ks.generateNewAddress(pwDerivedKey, 2);로 했을때의 모습 

//test 3 (password 7890)
[1] keystore :  {"encSeed":{"encStr":"Ffh/DVoU9FQCp/DNa7G/a+jM/HEBJNSz8GvGHToRhRyZj0A+kQ+WghgBlcqzNOIw0RaDMvaVtuszUA44UKJ+xv2Wxb+O9xyEeL4V6AjZmdOyb9Li4vsti7WI4+TTerhco2ivDJJQMqFjNzHzIlUX/nWvSJnZNdK5zmhyZ05U7tfAJYpOq2m7jA==","nonce":"XeAo8IEwkzjwHGImgzZp9xCpLKU8y+EX"},"encHdRootPriv":{"encStr":"qzewGcU3yry0MyI1aJ/yRvYtGWwHy3fOTegZsfLNeKaIw85Mv92vrvtnbyyMN/ayIJqS6e1JZO+2YY7CpTq1GjdmG3zYTKuSh89m06ZcH8SDo5q+HljA52Scq1sqXmkoHD4p0P1z81UahT3iSCPL2yV7jWHKpw0m4Kv5uYnGdA==","nonce":"as2DFitW8cUF71LJcxjiMLP/nTQpuIg4"},"addresses":["70d50b51703f489de41d6a6563fd156867348317","a4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb"],"encPrivKeys":{"70d50b51703f489de41d6a6563fd156867348317":{"key":"5DT1SdBRtZPKnUHAtdz57ebgWu+9L/zA5BMK38RIsnClUfAsc++Uu7kb9K/fV2Id","nonce":"1bJsWgN9+wIQVD5MzCajjXLqvoTTRkoQ"},"a4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb":{"key":"WD1XzkyV7Nv2YZbcpXuDiCdoKIVZm2YC98rz9+eMxqE87su25ulJ8coYsW/aRH9C","nonce":"ltVY5vKAhR9JAfFHzS8DvqZmZNutsdBl"}},"hdPathString":"m/0'/0'/0'","salt":"SZmjbyM8eyKSey02oc5jOio4knn0nlkgosZbz+922dU=","hdIndex":2,"version":3}
[2] address :  0x70d50b51703f489de41d6a6563fd156867348317,0xa4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb


(A-3) 위랑 동일한데 다만 서버 죽이고  ks.generateNewAddress(pwDerivedKey, 3);로 했을때의 모습 

//test 3 (password 7890)
[1] keystore :  {"encSeed":{"encStr":"UQCUUK59FOIIsiJcNcnGr4tFkEWSVLddQK/gtwAEKDU/va1/6GP704psLfjNqD5ZPTybaVhW09O5JVxAkHTaLkc/wQ3tlf5+WejGZ8nbILVa/bbepJxxsUALEx3BJ+JThhLDt97kuRFANwyQnYozfUQ5uQ6yy/Pce6HNh1vjfbXelWnxbj/xjw==","nonce":"fOtnALsALC1knE19xPEfDg/wL5Iqbnmk"},"encHdRootPriv":{"encStr":"EZXYcRXTEWvSrnZhkKgzR0++RX7/xP4jRdrrhQt5RcTXBe5xB7/YeHS84Ln1ULkpC8I9sl2rCyXfYi9r0M+gNbmpLA7TZ7zSFstrKar1W9BIJY1763bOwRkJvFNgyeeZxdl0aUqDcMJWU1aYfi0RTpvAYQf1EiRuDTzU45eJ9A==","nonce":"H+6LRNwvpx6zxGppDknQlN9SMD9vwN41"},"addresses":["70d50b51703f489de41d6a6563fd156867348317","a4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb","86662ceadd1f4e882832fc69391c6ed14ebdc6a8"],"encPrivKeys":{"70d50b51703f489de41d6a6563fd156867348317":{"key":"31+A/scinXrPUgdzqfwml6gtc6z6M/TmPaofHgsyZhcS4ZOG/Hk0+exyKLdDzBhc","nonce":"S+X0yvEZl7q1gIpdON6uh+MbXrygX+lW"},"a4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb":{"key":"DntvlW+cn0xxu4LNuXVqDlWAVqNyWCWr2UtVFXgLngaa5G+lGI2L8BxdzYKx5wUi","nonce":"4ed7Ja1PLudjraU2UTk26Wyg5B0mbrZQ"},"86662ceadd1f4e882832fc69391c6ed14ebdc6a8":{"key":"tvPw09L+gvh+fie/1Lm5ZcBe141tO1FEZ8ie65FTWI2Y1j5C29vpBty5QTdslT2N","nonce":"sK/624HWl9w8OdRVUa9/Gek9SYnFayXt"}},"hdPathString":"m/0'/0'/0'","salt":"f1HBJ/HQgkKvMKSYpvy83QBpYdRvwj+WtI+431J5FhQ=","hdIndex":3,"version":3}
[2] address :  0x70d50b51703f489de41d6a6563fd156867348317,0xa4afce79b6058cb629a6debb3a3cb7bf9e4dc4eb,0x86662ceadd1f4e882832fc69391c6ed14ebdc6a8


*/