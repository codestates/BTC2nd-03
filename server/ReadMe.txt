[1] 니모닉 생성 요청  api (return 으로 생성한 니모닉 코드 return)
 1) method type : post 
 2) test url 주소 : http://localhost:5005/wallet/newMnemonic
 3) request body : 없음
 4) return 예제  
  4-1) success 시에 return 예제 
  {
      "status": "OK",
      "status_code": 200,
      "data": {
          "mnemonic": "voyage solve door silk diary amateur shallow lounge valid brick undo scheme"
      },
      "message": "success"
  }

  4-2) fail시에 return 예제 

  {
      "status": "FAIL",
      "status_code": 400,
      "data": "",
      "message": "TypeError: lightwallet.keystore.generateRandomSeed2 is not a function"
  }





[2] 니모닉 코드와 패스워드를 이용한 keystore와 address를 return하는 api 
 : (옵션으로 accountCount 를 입력받아(정수), address를 여러개 return 받을 수 있음)-아래 예시 3-2)참조

 1) http method : post
 2) url : http://localhost:5005/wallet/newWallet
 3) request and response 예시 
  3-1) 옵션 accountCount 비 포함 요청시 
  request body 예시 (body > json 형식 포맷)
  {
      "mnemonic": "voyage solve door silk diary amateur shallow lounge valid brick undo scheme",
      "password": "7890",    
  }
  response body 예시 (성공시) -header :200 
  { 
      "status": "OK",
      "status_code": 200,
      "data": {
          "keystore": "{\"encSeed\":{\"encStr\":\"nppohcxdmvAU2zZR+PmfEjnxa+Jp5eqUXHdsuGGdpTL2C7bMFdX9a1wGQzriOxkAvyPgz4oKwpEeDD72zDHKSllhlvR6h3SM1TYwE9y0uAfnIfmMsf3Z5AgjvJ3sgbLWil/PuHUS0kLehLNNQ7PtzZ2K/O7+JL7HVfLTezgB8C0SBoA6p2GhBQ==\",\"nonce\":\"JkDMBLeWgyOpruj0OTjQ0iEWcTzVtnMs\"},\"encHdRootPriv\":{\"encStr\":\"Q64mqLjwqPIK/h/qcltwUXejed7IFPPi7XhtsXt0N2W/iDCtFpRWViKDeyE7MUdLRJZFa8cVhDgp7MACP9R0B8cJYwunJK2GBv4a5vIdaFoLT1zoCeHrdIxKVmVPzLGlJ77tjds8oFazop6Jaa46Ch+W5coNqPMNCbol1ZuUrQ==\",\"nonce\":\"vN4P4SO7xtNvmSLnneV0duLYNZWpKut7\"},\"addresses\":[\"5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6\"],\"encPrivKeys\":{\"5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6\":{\"key\":\"ChmC/M20WLy86q0CIGklux656bDTfzdLIBDolC0FqvsW/KvSRE0w6fWl5ntvO6t2\",\"nonce\":\"NK+1hIZd8Lmnf8lF4eUsjZbSsv/98fW7\"}},\"hdPathString\":\"m/0'/0'/0'\",\"salt\":\"DkGHlYxpr9MqdmnW8tGlyeeiETrRtWbfZ9vn0dKCS3c=\",\"hdIndex\":1,\"version\":3}",
          "address": "0x5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6"
       },
      "message": "success"
  }
  response body 예시 (실패시) -header :400
  {
     "status": "FAIL",
     "status_code": 400,
     "data": "",
     "message": "TypeError: lightwallet.keystore.createVault2 is not a function"
  }



  3-2) 옵션 accountCount 포함 요청 시
  request body 예시 (body > json 형식 포맷)
  {
      "mnemonic": "voyage solve door silk diary amateur shallow lounge valid brick undo scheme",
      "password": "7890",
      "accountCount" : 3
  }
  response body 예시 (성공시) -header :200 
  {
     "status": "OK",
     "status_code": 200,
     "data": {
         "keystore": "{\"encSeed\":{\"encStr\":\"0KGX0JrweWnqIUoVvbuKrImza8eSgvTSXoJxaGEeV1skCtfqyp2hZWmq/HQHY83j2ux96jd07//hLir9GU5112OL7cmpLTYyiERkTA4mG4DW8QgzoBsidrT7TL0lHrl5AXCNlYGJ4L2sstD7GCIdrtnXLHHYLXWSBJvdnBld6/i1PVk+JHv0YQ==\",\"nonce\":\"njASUYR/MPKTT4Yjwb+ApAz3d0MKeB50\"},\"encHdRootPriv\":{\"encStr\":\"ht3kzwSEmyybEMb5JI3RDE6U2x1dYzXTZIUUbYNDvWwjm2SgoBROdL/WZfrQQftNuSGn32M0Ihp87fAKHO5jj7ZcSP1f+6w80ItRxfrPeM2Tf57s0hU5qnjV6/ruHT3YNkqmZgfz/KItIEVdsep8mdokUuruUV9nqPJHwqoEHQ==\",\"nonce\":\"tS0cm88HuDCMU+7y+7fySNdZWzKMWP9D\"},\"addresses\":[\"5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6\",\"97dbb4e97d163712ffd9757901df504fe18ac930\",\"c52c9db5011fcb9e557f87bb94c5abdfe81ae127\"],\"encPrivKeys\":{\"5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6\":{\"key\":\"OW3bz3GAnai5/T2ysmINZkL2ru/DPdJEJEVHC+BjeYiZ+TH/FoSgK+iY1cUejtky\",\"nonce\":\"DNny3exdJ8fTQLm8iYSjHxWp8Ps3e++g\"},\"97dbb4e97d163712ffd9757901df504fe18ac930\":{\"key\":\"InH5+1y1Uac6rBG+7qU91gCHo46LnUfl3jqUUnXdwWYlDju2mb326hn83mED/4pZ\",\"nonce\":\"48vnWe1e+PnGMPg7bRa9eP9WggOZEwWv\"},\"c52c9db5011fcb9e557f87bb94c5abdfe81ae127\":{\"key\":\"l15dg8MkgnFSbl13bELiOtndPR01cqV4ph7g8ww3fGIn5I0Rid8RKYAClFLgX4od\",\"nonce\":\"Wf51jmWn60auYbRQ0rZcsA5jbRhvn89M\"}},\"hdPathString\":\"m/0'/0'/0'\",\"salt\":\"UVe9fqrfMY8UQzCjvMmw6wXNKn0y0EcN5zn2QYuK2A4=\",\"hdIndex\":3,\"version\":3}",
         "address": "0x5a748ecb0b3bc1dbe7d66ef1bc6d78a689af1bd6,0x97dbb4e97d163712ffd9757901df504fe18ac930,0xc52c9db5011fcb9e557f87bb94c5abdfe81ae127"
     },
     "message": "success"
   }
   response body 예시 (실패시) -header :400
   {
      "status": "FAIL",
      "status_code": 400,
      "data": "",
      "message": "TypeError: lightwallet.keystore.createVault2 is not a function"
    }


[3] getbalance 
 1) http method : post
 2) url : http://localhost:5005/coin/getBalance
 3) request and response 예시
  3-1) request 예시 
  >> request body 예시 (body > json 형식 포맷)
  {

    "account" : "0xc6516E8E3379299AaC6b2f5a3688a6CfB9370B65"
    
  }
  >> response body 예시  
  //성공시 
  {
    "status": "OK",
    "status_code": 200,
    "data": {
        "wei": "139377332219816000",
        "matic": "0.139377332219816"
    },
    "message": "success"
  }
  //실패시 
  {
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "Error: Provided address 0xc6516E8E3379299AaC6b2f5a3688a6CfB93765 is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted."
}

[4] getTransactionInfo
 1) http method : get
 2) request url : http://localhost:5005/coin/getTransactionInfo/[TransactionId]
 3) request and response 예시
  3-1) 
   3-1-1) request 예시 
   (get방식)
   http://localhost:5005/coin/getTransactionInfo/0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c 

   3-1-2) reponse 예시  

   {
    "status": "OK",
    "status_code": 200,
    "data": {
        "transactionInfo": {
            "accessList": [],
            "blockHash": "0x4a265b6460614e4bced7611bab89d06a091e4ec1fa2f37147c9f7fe381006f96",
            "blockNumber": 26290542,
            "chainId": "0x13881",
            "from": "0xc6516E8E3379299AaC6b2f5a3688a6CfB9370B65",
            "gas": 21000,
            "gasPrice": "23650845957",
            "hash": "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c",
            "input": "0x",
            "maxFeePerGas": "23650845961",
            "maxPriorityFeePerGas": "23650845947",
            "nonce": 0,
            "r": "0x64696ea7e8f1301f7588e14d367ec3097347aac1002545e4e68c20c53a355a67",
            "s": "0x356dd0f2417b8d2ec31e2cc353840ade71fe68b29bdb755f9da99d161733a899",
            "to": "0x5E3972CD07Ff39159654498799615A54b2e4Cd19",
            "transactionIndex": 12,
            "type": 2,
            "v": "0x0",
            "value": "10000000000000000"
        }
    },
    "message": "success"
    }


[5] getTransactionReceipt
 1) http method : get
 2) request url : http://localhost:5005/coin/getTransactionReceipt/[TransactionId]
 3) request and response 예시
  3-1) 
   3-1-1) request 예시 
   (get방식)
   http://localhost:5005/coin/getTransactionReceipt/0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c

   3-1-2) reponse 예시  
   {
    "status": "OK",
    "status_code": 200,
    "data": {
        "transactionReceipt": {
            "blockHash": "0x4a265b6460614e4bced7611bab89d06a091e4ec1fa2f37147c9f7fe381006f96",
            "blockNumber": 26290542,
            "contractAddress": null,
            "cumulativeGasUsed": 7552272,
            "effectiveGasPrice": 23650845957,
            "from": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "gasUsed": 21000,
            "logs": [
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0x4a265b6460614e4bced7611bab89d06a091e4ec1fa2f37147c9f7fe381006f96",
                    "blockNumber": 26290542,
                    "data": "0x000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000002c4c739415e3dd8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a14046d19d3dd8000000000000000000000000000000000000000000000000002386f26fc10000",
                    "logIndex": 528,
                    "removed": false,
                    "topics": [
                        "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x0000000000000000000000005e3972cd07ff39159654498799615a54b2e4cd19"
                    ],
                    "transactionHash": "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c",
                    "transactionIndex": 12,
                    "id": "log_d8a81df1"
                },
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0x4a265b6460614e4bced7611bab89d06a091e4ec1fa2f37147c9f7fe381006f96",
                    "blockNumber": 26290542,
                    "data": "0x0000000000000000000000000000000000000000000000000001c3b779b28dd800000000000000000000000000000000000000000000000002c68af0bb1400000000000000000000000000000000000000000000000015939ec800452fcdbe7300000000000000000000000000000000000000000000000002c4c739416172280000000000000000000000000000000000000000000015939ec9c3fca9804c4b",
                    "logIndex": 529,
                    "removed": false,
                    "topics": [
                        "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
                    ],
                    "transactionHash": "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c",
                    "transactionIndex": 12,
                    "id": "log_ab0e6d97"
                }
            ],
            "logsBloom": "0x00000000000000000000000000000000000000000000000100000001000000000000000000100000000000100000000000008000000200000000000000000000000000000000000000000020000000800000000000000000000100000000004000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200000000000000000000000000000000000000000000000000000000000004000000000000000000001000000000000000000000000800000108040000000000000000000000000000000000000000000000000000000000020000000100000",
            "status": true,
            "to": "0x5e3972cd07ff39159654498799615a54b2e4cd19",
            "transactionHash": "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c",
            "transactionIndex": 12,
            "type": "0x2"
        }
     },
    "message": "success"
    }


[6] createAccount 요청 처리 

 1) http method : post
 2) request url : http://localhost:5005/coin/createAccount
 3) request and response 예시
   3-1) request 
    (body 본문 없음 )
   3-2) response 예시 
   >>success시에 

   {
    "status": "OK",
    "status_code": 200,
    "data": {
        "new_account": {
            "address": "0x41e6A776AC3cbBDC52dAed3c04741849E7d3fB27",
            "privateKey": "0xe3a07d56582c4b000845581956caf509845c55bdfa491e53248be89782e8c20e"
        }
    },
    "message": "success"
   }

   >>fail시에 
   {
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "TypeError: web3.eth.accounts.create2 is not a function"
   }


[7] transfer
 
 1) http method : post
 2) request url : http://localhost:5005/coin/transfer
 3) request and response 예시
   3-1) request 

  >> reqeust body json    
{
    "sender": "보내는 송신 주소 account address",
    "receiver": "받는 수신 주소 account address",
    "matic_amount": "matic 단위의 보내려는 amount 금액",
    "private_key": "실제 privatekey 값"
}
 ex) reqeust body json  

{
    "sender": "0xc6516E8E3379299AaC6b2f5a3688a6CfB9370B65",
    "receiver": "0x40B24eAAD408f6E21A876abB7dC64f14415acFCc",
    "matic_amount": "0.000000000001",
    "private_key": "실제 privatekey 값 "
}


   3-2) response 예시 


>> 성공시에 (성공 예-1)
  
{
    "status": "OK",
    "status_code": 200,
    "data": {
        "receipt": {
            "blockHash": "0xf50b06a45cfd32b968abe79f1b07cef2d1b18d3bc84b59ee4891b771b6f0608c",
            "blockNumber": 26293748,
            "contractAddress": null,
            "cumulativeGasUsed": 550526,
            "effectiveGasPrice": 23650845964,
            "from": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "gasUsed": 21000,
            "logs": [
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0xf50b06a45cfd32b968abe79f1b07cef2d1b18d3bc84b59ee4891b771b6f0608c",
                    "blockNumber": 26293748,
                    "data": "0x000000000000000000000000000000000000000000000000000000e8d4a5100000000000000000000000000000000000000000000000000001ec64386049d3c000000000000000000000000000000000000000000000000001ec64386049d3c000000000000000000000000000000000000000000000000001ec64386049d3c000000000000000000000000000000000000000000000000001ec64386049d3c0",
                    "logIndex": 20,
                    "removed": false,
                    "topics": [
                        "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65"
                    ],
                    "transactionHash": "0x2653d8178435492925eb4e850a8b686e8e16570667d23f743e1659cf31ec12dc",
                    "transactionIndex": 5,
                    "id": "log_cdf518bf"
                },
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0xf50b06a45cfd32b968abe79f1b07cef2d1b18d3bc84b59ee4891b771b6f0608c",
                    "blockNumber": 26293748,
                    "data": "0x0000000000000000000000000000000000000000000000000001c3b779b28dd800000000000000000000000000000000000000000000000001eee987a075420000000000000000000000000000000000000000000000159d760855c0f4590f2000000000000000000000000000000000000000000000000001ed25d026c2b42800000000000000000000000000000000000000000000159d760a19786e0b9cf8",
                    "logIndex": 21,
                    "removed": false,
                    "topics": [
                        "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
                    ],
                    "transactionHash": "0x2653d8178435492925eb4e850a8b686e8e16570667d23f743e1659cf31ec12dc",
                    "transactionIndex": 5,
                    "id": "log_a8a48b9d"
                }
            ],
            "logsBloom": "0x00000000000000000000000000000000000000000000000100000001000000000000000000100000000000100000000000008000000000000000000000000000000000000000000000000000000000800000000000000000000100000000004000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200000000000000000000000000000000000000000000000000000000000004000000000000000000001000000000000000000000000800000108040000000000000000000000000000000000000000000000000000000000000000000100000",
            "status": true,
            "to": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "transactionHash": "0x2653d8178435492925eb4e850a8b686e8e16570667d23f743e1659cf31ec12dc",
            "transactionIndex": 5,
            "type": "0x2"
        }
    },
    "message": "success"
}

>> 성공 예2) 

 {
    "status": "OK",
    "status_code": 200,
    "data": {
        "receipt": {
            "blockHash": "0x0de42c5e0e132bf89a0e2583b1e2fbc9a44f6494b83c466c21271956c59e7e4e",
            "blockNumber": 26293769,
            "contractAddress": null,
            "cumulativeGasUsed": 337681,
            "effectiveGasPrice": 23700848958,
            "from": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "gasUsed": 21000,
            "logs": [
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0x0de42c5e0e132bf89a0e2583b1e2fbc9a44f6494b83c466c21271956c59e7e4e",
                    "blockNumber": 26293769,
                    "data": "0x00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000001ea9f23a23fb00000000000000000000000000000000000000000000000000001ea9f23a23fb00000000000000000000000000000000000000000000000000001ea9f23a23fb00000000000000000000000000000000000000000000000000001ea9f23a23fb000",
                    "logIndex": 5,
                    "removed": false,
                    "topics": [
                        "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65"
                    ],
                    "transactionHash": "0x219fc321dfadbf9ab78f7717fa5334606efd52c0af9b1ab1c71fe33ce309ce18",
                    "transactionIndex": 2,
                    "id": "log_a3e75046"
                },
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0x0de42c5e0e132bf89a0e2583b1e2fbc9a44f6494b83c466c21271956c59e7e4e",
                    "blockNumber": 26293769,
                    "data": "0x0000000000000000000000000000000000000000000000000001c4abf6545f9800000000000000000000000000000000000000000000000001ed25d026bd41a000000000000000000000000000000000000000000000159d96e45245b507e54100000000000000000000000000000000000000000000000001eb61243068e20800000000000000000000000000000000000000000000159d96e616f1ab5c44d9",
                    "logIndex": 6,
                    "removed": false,
                    "topics": [
                        "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
                    ],
                    "transactionHash": "0x219fc321dfadbf9ab78f7717fa5334606efd52c0af9b1ab1c71fe33ce309ce18",
                    "transactionIndex": 2,
                    "id": "log_c6a4e7bf"
                }
            ],
            "logsBloom": "0x00000000000000000000000000000000000000000000000100000001000000000000000000100000000000100000000000008000000000000000000000000000000000000000000000000000000000800000000000000000000100000000004000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200000000000000000000000000000000000000000000000000000000000004000000000000000000001000000000000000000000000800000108040000000000000000000000000000000000000000000000000000000000000000000100000",
            "status": true,
            "to": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "transactionHash": "0x219fc321dfadbf9ab78f7717fa5334606efd52c0af9b1ab1c71fe33ce309ce18",
            "transactionIndex": 2,
            "type": "0x2"
        }
    },
    "message": "success"
}

>>  성공 예3)

{
    "status": "OK",
    "status_code": 200,
    "data": {
        "receipt": {
            "blockHash": "0xcbbf3191a3818249095ca39fafc553fcfac5a240e4966c74385922aa34431b6f",
            "blockNumber": 26293794,
            "contractAddress": null,
            "cumulativeGasUsed": 21000,
            "effectiveGasPrice": 237008489481,
            "from": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "gasUsed": 21000,
            "logs": [
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0xcbbf3191a3818249095ca39fafc553fcfac5a240e4966c74385922aa34431b6f",
                    "blockNumber": 26293794,
                    "data": "0x00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000001d21e6703aafd0000000000000000000000000000000000000000000000000001d21e6703aafd0000000000000000000000000000000000000000000000000001d21e6703aafd0000000000000000000000000000000000000000000000000001d21e6703aafd00",
                    "logIndex": 0,
                    "removed": false,
                    "topics": [
                        "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65"
                    ],
                    "transactionHash": "0xe086ccc2fe7333c37f26520654647be0b819b06bfd3967567bb13c4136c73a27",
                    "transactionIndex": 0,
                    "id": "log_bcbaf1f2"
                },
                {
                    "address": "0x0000000000000000000000000000000000001010",
                    "blockHash": "0xcbbf3191a3818249095ca39fafc553fcfac5a240e4966c74385922aa34431b6f",
                    "blockNumber": 26293794,
                    "data": "0x0000000000000000000000000000000000000000000000000011aeb79f4bbbf000000000000000000000000000000000000000000000000001eb612430655bb000000000000000000000000000000000000000000000159e585933faa69bb1af00000000000000000000000000000000000000000000000001d9b26c91199fc000000000000000000000000000000000000000000000159e586ae2b245e76d9f",
                    "logIndex": 1,
                    "removed": false,
                    "topics": [
                        "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
                        "0x0000000000000000000000000000000000000000000000000000000000001010",
                        "0x000000000000000000000000c6516e8e3379299aac6b2f5a3688a6cfb9370b65",
                        "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
                    ],
                    "transactionHash": "0xe086ccc2fe7333c37f26520654647be0b819b06bfd3967567bb13c4136c73a27",
                    "transactionIndex": 0,
                    "id": "log_a68155de"
                }
            ],
            "logsBloom": "0x00000000000000000000000000000000000000000000000100000001000000000000000000100000000000100000000000008000000000000000000000000000000000000000000000000000000000800000000000000000000100000000004000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200000000000000000000000000000000000000000000000000000000000004000000000000000000001000000000000000000000000800000108040000000000000000000000000000000000000000000000000000000000000000000100000",
            "status": true,
            "to": "0xc6516e8e3379299aac6b2f5a3688a6cfb9370b65",
            "transactionHash": "0xe086ccc2fe7333c37f26520654647be0b819b06bfd3967567bb13c4136c73a27",
            "transactionIndex": 0,
            "type": "0x2"
        }
    },
    "message": "success"
}


>> fail 시에 (예 1)
{
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "Error: Returned error: exceeds block gas limit"
}

>> fail 시에 (예 2)
{
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "Error: Invalid JSON RPC response: \"<html>\\r\\n<head><title>404 Not Found</title></head>\\r\\n<body>\\r\\n<center><h1>404 Not Found</h1></center>\\r\\n<hr><center>nginx/1.21.6</center>\\r\\n</body>\\r\\n</html>\\r\\n\""
}
>> fail 시에 (예 3)
{
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "Error: Failed to check for transaction receipt:\n{}"
}



[8] getBlockInfo
 
 1) http method : get
 2) request url : http://localhost:5005/coin/getBlockInfo/[BlockNumber]
 3) request and response 예시
   3-1) request 

   http://localhost:5005/coin/getBlockInfo/26290542

   3-2) response 예시 

   >>성공시 예시 1)

{
    "status": "OK",
    "status_code": 200,
    "data": {
        "blockInfo": {
            "baseFeePerGas": 10,
            "difficulty": "3",
            "extraData": "0xd682021083626f7288676f312e31382e31856c696e7578000000000000000000e88eaaac904b4e48190bb1809cc559067cf87498bc1e879a72d9db895c3aa3ff4ed348f3d6dcc8ee547c4e7f5ef3148f7d7067bfdf4426a42ac2077d91b68c8901",
            "gasLimit": 20000000,
            "gasUsed": 9068380,
            "hash": "0x4a265b6460614e4bced7611bab89d06a091e4ec1fa2f37147c9f7fe381006f96",
            "logsBloom": "0xf96b82a71f7f79d078a51ab7c603ba75f9feb96b1ba37f97767eb63daebe2e7d108fb1e1a7fd31029b99a515e2fba7fe8969b5ff9492ff6dcb6539c7deff16667e765b03f333cc3aad966dbec4d637ebe7c7983ace7e47b5b95b163e4a9efef95ccb2547ff0a5a09fce9679ab94e6ef7c7f7457affbd02099f63f87519fa71c8ee37eda4f1fb57fc17f9ce7eb1facf39fed8b329d9c3eb3ade7006f52696d7ebb7878ea79461b952850c3db81c7eeb1755212642ecf4378d7fb7907f30a7c353f7ed6cc6f8dc5fdc39ff77005d77aefdf9ee146d62f693e3bbfe8e5c75e9751fecf357ff0e08b4c42c2ac701a097f505549dc56b2ff392fcafbc0a5e5ff3728b",
            "miner": "0x0000000000000000000000000000000000000000",
            "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0x0000000000000000",
            "number": 26290542,
            "parentHash": "0x3d70530f348e0f8278a3b664b66643806349e781285aa1aeb30068d67e03f79a",
            "receiptsRoot": "0x24023a0a9764f798ce174fc5a09f807238ef6513b8617c7adb5116f0051684c0",
            "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
            "size": 25667,
            "stateRoot": "0x149ab0608e175fda29ba7cfd5b75bf0150413aa891ec48647dbaf1e4b8bbbb84",
            "timestamp": 1652316632,
            "totalDifficulty": "181894986",
            "transactions": [
                "0x45f034574826eae230f7688785bf8889515a43e99651cdecd52598714b70a5b3",
                "0x572e6439425e0ab5c5e8011e27c23ace8bc60ff30ae895ed9cd089ffb52553e9",
                "0x6d71614c425db1f9c008287514bd29fd41184b76c257610380857639947be2c8",
                "0x4afe708ed78f45fd79e7cc8c3baf82cd1da965999f55b83fd8149f35b2d16e70",
                "0xeab1d1ccf1d5f47cbf9cbc7a4a278928edfa4a9087053d273af3cb26ab2eac9e",
                "0xba452a0346abc2eab15b6138ca6b9e82eb6d75b30a2945d91d4b6bc5e2262e17",
                "0x48b1a613d1bf1e202eea29a3f6493a46041ac3a66720c403327e27131e0ee3b4",
                "0x262ad8c3ebf7b9671c19f2a2609a6fa52a72ee03a4d2022308f7bf2985e32623",
                "0xa2f7fa597772fdecc9a0f20c648cfb31f3c30a7a01fe3a8ca0f4cf623bb42976",
                "0xd927c4f6cd9e1191d818c3d556a104e8cd40a7ccc83273772ed2d467bb023fae",
                "0x28dfba366f453706d16a13c1350a12faef35773f3cf9038416f608fdd848dea9",
                "0xa7ea65677a1ed91fc15c096f58bb1c60f73b47f281aac7deca54e7d5eda3e285",
                "0x9a4889b34231687395d319c2d930629d07da5818cd4f35a6e91e613bdcb4347c",
                "0xb493facf436ef62accc783ff019296b1b9c82bba068b1cce41c3b7ce22f3afa9",
                "0x2850457d701f967646a11e617f69db2e7fbd0e8d7fa9418447b280d1b75a7ec5",
                "0x5755ed7b0d501a1a68bcc1b2c0cfda07800f83a7be5702b0c3f02dd7457b32b7",
                "0xd05bc33eeb309618c6c151508ce9b98237327d3e3cacf88735f63c9ad29da2a4",
                "0x5b839cceaf3803964bce630e1ef8489e462a0aa6d2053281bfc91896d504a5fa",
                "0xf36ef7aaace9b2c8ddb86163692fe6c919c56b6833aaf0ffdbac8edf16110f4d",
                "0x604a49b03b31837c19962f89853a1e91ef87aa38c91aba03a3b20f097c12d3a3",
                "0x6290e22dd867e60dda30a9de2e7aa3d7faad995d5edc5a60827fad4f33025bd6",
                "0x84b2888f65a2618f9ee48babca27fb4233fe165b5d1d3d0c104cf32462edabbc"
            ],
            "transactionsRoot": "0x368119c85f96258a22c3614ab0a58d7c526d05729493169ff6b1569a48fe5cec",
            "uncles": []
        }
    },
    "message": "success"
}

    >>실패시 예시 1)

     
    {
    "status": "FAIL",
    "status_code": 400,
    "data": "",
    "message": "TypeError: web3.eth.getBlock2 is not a function"
    }  