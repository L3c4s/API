const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authconfig = require("../config/auth.json");
const validação = require('../middlewares/validação');

const UserModel = require("../models/User");

const router = express.Router();



const generateToken = (user = {}) => {
  const token = jwt.sign({ id: user.id, name: user.name }, authconfig.secret, { expiresIn: 86400 });

  return token;
};


router.post('/register', validação, async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (await UserModel.findOne({ email })) {
      return res.status(400).json({
        message: 'User Already exists',
      });
    }

    
    const user = await UserModel.create({
      email,
      password,
      name,
    });

    user.password = undefined;

    return res.json({
      user,
      token: generateToken(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: 'User Not Found'
      });
    }

    if(!await bcrypt.compare(password,user.password)){
      return res.status(400).send({
        message: 'Invalid password'
      })
    }

    user.password = undefined;

    return res.json({
    user,
    token: generateToken(user)
    });
  } catch (error) {
    
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});


module.exports = router;