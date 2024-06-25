const mongoose=require('mongoose');
const mongoUri="mongodb://127.0.0.1:27017/test";




const mongoConnect=async ()=>{
  
    mongoose.connect(mongoUri );
    console.log("connected..")
     
  
    
}
module.exports=mongoConnect;