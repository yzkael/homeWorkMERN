
const FuncionarioMedico = require('../models/funcionarioMedico.model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Function to create a token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};




// Register funcionarioMedico
const registerFuncionarioMedico = asyncHandler( async (req, res) => {
    const {name,email,password, apMaterno, apPaterno, rol, username} = req.body

    // Validation
    if(!name || !email || !password || !apMaterno || !apPaterno || !rol || !username){
        res.status(400)
        throw new Error('Please fill in all required fields!')
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }
    // check if user email already exists 
    const funcionarioExist = await FuncionarioMedico.findOne({email});

    if (funcionarioExist) {
        res.status(400)
        throw new Error("Email has already been used!")
    }



    //Create new funcionarioMedico
    const user = await FuncionarioMedico.create({
        name,
        email,
        password,
        apMaterno, 
        apPaterno, 
        rol, 
        username
    })

    
    // Generate Token
    const token = generateToken(user._id);

    // send HTTP-only Cookie

    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // +1 day
        sameSite: "none",
        secure: true

    });


    if (user){
        const {_id, name, email, image, phone} = user;
        res.status(201).json({
            _id, name, email, image, phone,token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})


// LOGIN USER

const loginFuncionarioMedico = asyncHandler( async (req,res)=>{

    const {username, password} = req.body;

    //Validate Request
    if(!username || !password) {
        res.status(400);
        throw new Error("Please add an Username and a Password!");

    }

    //Checks if user exist

    const funcionarioMedico = await FuncionarioMedico.findOne({username: username});
    if(!funcionarioMedico) {
        res.status(400);
        throw new Error("User not found!");
    }
    // Checks if password is correct, only after the funcionarioMedico Username is checked 

    const passwordIsCorrect = await bcrypt.compare(password, funcionarioMedico.password);

    // Generate Token
    const token = generateToken(funcionarioMedico._id);

    // send HTTP-only Cookie
    
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // +1 day
        sameSite: "none",
        secure: true
    
        });


    if (funcionarioMedico && passwordIsCorrect) {
        const {_id, name, email, image, phone} = funcionarioMedico;
        res.status(200).json({
            _id, 
            name, 
            email, 
            image, 
            phone,
            token
        })
    }else{
        res.status(400);
        throw new Error("Invalid Username or Password!")
    }


})




module.exports = {
    registerFuncionarioMedico,
    loginFuncionarioMedico
};



















//Chat gpts way


// const registerFuncionarioMedico = async (req, res) => {
//     try {
//         const newFuncionarioMedico = await FuncionarioMedico.create(req.body);
//         res.status(201).json(newFuncionarioMedico);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };