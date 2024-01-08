var express = require('express');
var router = express.Router();
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;


router.post('/register', async (req, res) => {
  
  try {
    const { name,email,password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const user = new User({ name, email, password });
    await user.hashPassword();
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email:"marlinhoicloud423@gmail.com" });
    
    if (!user) {
      
      res.status(401).json({ error: 'Usuário, email ou senha incorreta' });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(401).json({ error: 'Usuário, email ou senha incorreta 1' });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
          res.json({ user: user, token: token });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno, por favor, tente novamente' });
  }
});


module.exports = router;
