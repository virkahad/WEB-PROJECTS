const mongoose = require('mongoose');
const {Schema} = mongoose;


const PasswordSchema = new Schema({
     user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
     },
    SiteName: {
         type: String, 
         required:true
         },
    SitePassword: {
         type: String,
         required:true
         },
    SiteUserName: {
         type: String, 
        required:true },
   
  });

  const PasswordManage = mongoose.model('PasswordManage', PasswordSchema);
  module.exports=PasswordManage