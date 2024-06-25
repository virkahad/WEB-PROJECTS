const mongoose = require('mongoose');

const URI="mongodb://127.0.0.1:27017/Manager";
const mongoseConnect= ()=>{
     (mongoose.connect(URI))
    console.log("I Am Connected")


}
module.exports=mongoseConnect

