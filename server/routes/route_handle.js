const express = require('express')
const router = express.Router()

var routerResponse1 ={};
var routerResponse2 ={};

router.use((req, res, next) => {
    console.log('Called at ', Date.now(), ' Requested ....');
    next();
});

router.post('/',  (req, res) => {  
    console.log("req_body :",req.body);
 
    res.status(200).json({postTest:req.body});
 
 });

router.get('/',(req,res)=>{
    console.log("get Test Return !!");
    res.status(200).json({getTest:"getTest"})
});

module.exports = router