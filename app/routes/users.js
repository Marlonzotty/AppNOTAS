var express = require('express');
var router = express.Router();
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');


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


module.exports = router;
