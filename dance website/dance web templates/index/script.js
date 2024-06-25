const express=require("express")
const path = require("path")
script=express()
const port=80

script.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})


script.listen(port,()=>{
    console.log("i am working here")
})



