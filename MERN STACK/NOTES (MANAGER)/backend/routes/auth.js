const jwt = require('jsonwebtoken');
const express = require('express');
const fetcUser=require('../middleware/fetchUser')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const router = express.Router();
const jwtsecret = "KingServent"

router.post('/SignUp', [
  body('name', "enter a valid name").notEmpty(),
  body('password', "min length is 5").isLength({ min: 5 }),
  body('email', "enter a valid email").isEmail(),
],
  async (req, res) => {
    try {

      const err = await validationResult(req);
      if (!err.isEmpty()) {
        return res.send({ errors: err.array() });
      }
      let userr = await (User.findOne({ email: req.body.email }));
      if (userr) {
        return res.json({ User: "User already exists" })

      }

      const salt = await (bcrypt.genSalt(10));
      let seccpassword = await (bcrypt.hash(req.body.password, salt));

      let userrr = await User.create({
        name: req.body.name,
        password: seccpassword,
        email: req.body.email,
      })
      data = {
        user: {
          id: userrr.id
        }
      }
      const authtoken = jwt.sign(data, jwtsecret);
      res.json({ authtoken });
    }
    catch (error) {
      res.status(500).send("some error occured")
    }

  });

router.post('/Login',[
  body('email').isEmail(),
  body('password').exists()
], async(req, response) => {

  const errors = await (validationResult(req));
  if (!errors.isEmpty()) {
    return response.status(400).json({ error: errors.array() })
  }
  try {
    const { email, password } =await req.body;
    console.log(" e "+email);
    console.log(" pa: "+password);

  const user = await(User.findOne({email }));
    if (!user) {
      return response.json({ error: "Try with correct credentials" })
    }
    const checkpassword = await (bcrypt.compare(password, user.password))
    if (!checkpassword) {
      return response.status(400).json({ error: "Incorrect credentials" });
    }
    const dataa = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(dataa, jwtsecret);
    response.json({ authtoken });


  }
  catch (error) {
    return response.status(500).json({ error: "internal server error" })
  }
  });

router.post('/GetUser',fetcUser, async(req, res) => {
  try{
    const userid=req.user.id;
    const user=await(User.findById(userid));
    res.send(user)
  }  
  catch(Error){
    return res.status(401).send("some error occured...")
  }

})
  


module.exports = router;