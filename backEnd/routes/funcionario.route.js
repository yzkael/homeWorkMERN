// funcionario.routes.js
const express = require('express');
const router = express.Router();
const { registerFuncionarioMedico,loginFuncionarioMedico } = require('../controllers/funcionario.controller');

//register funcinoario
router.post("/register", registerFuncionarioMedico);

//login funcionario

router.post("/login", loginFuncionarioMedico);

module.exports = router; 
