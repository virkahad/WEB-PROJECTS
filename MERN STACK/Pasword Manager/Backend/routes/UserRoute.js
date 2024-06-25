const express = require('express')
const router = express.Router()
const User = require('../Models/Use');
const passworM = require('../Models/Password');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// SignUp End Point For the First time User
router.post('/SignUp', [
  body('name', "enter a valid name").notEmpty(),
  body('password', "min length is 5").isLength({ min: 5 }),
  body('email', "enter a valid email").isEmail(),
], async (req, res) => {
  console.log("starting")

  const err = await validationResult(req);
  if (!err.isEmpty()) {
   return  res.json({ Success: false, errors: err.array() })
  }
  let user = await (User.findOne({ email: req.body.email }))
  if (user) {
    return res.json({ Success: false, msg: "User Already exists With this Email" })
  }
  const hashpassword = bcrypt.hashSync(req.body.password, salt);
  let userrr = await User.create({
    name: req.body.name,
    password:hashpassword,
    email: req.body.email,
  })
  res.json({ succes:true });


})

// Login End point for the User
router.post('/Login', async(req, res) => {
 const {email, password} = req.body;
 let userr=await (User.findOne({email}))
 if(!userr){
  return res.json({success:false,msg:"Invalid Credentials"})
 }


 const checkPassword=bcrypt.compareSync(password, userr.password); 
 if(!checkPassword){
  return res.json({success:false , msg:"Invalid Password and username"})

 }
let senduser={
  name:userr.name,
  email:userr.email,
  password : password
}
 res.json(senduser)

})

module.exports = router