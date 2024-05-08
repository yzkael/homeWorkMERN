const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const funcionarioRoute = require('./routes/funcionario.route');
const errorHandler = require('./middleWare/errorMiddleWare');
const app = express();
const cookieParser = require("cookie-parser");
// const errorHandler = require('./middleWare/errorMiddleWare');
const PORT = process.env.PORT || 3000;

//MiddleWares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes MiddleWare

app.use('/api/funcionarios', funcionarioRoute)

//Routes
app.get('/',(req,res)=>{
    res.send("Home Page");
})


// Error MiddleWare

app.use(errorHandler);

//connect and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log('Succesfully connected to: ',PORT);
        })
    })
    .catch((error)=>{
        console.log(error.message)
    })