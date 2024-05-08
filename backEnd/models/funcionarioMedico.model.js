const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const funcionarioMedicoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    apMaterno: {
        type: String,
        required: [true,"Please add apellido materno"]
    },
    apPaterno: {
        type: String,
        required: [true,"Please add apellido paterno"]
    },
    rol: {
        type: String,
        required: [true, "Please add a role"]
    },
    username: {
        type: String,
        required: [true, 'Please type a username']
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be 6 to 23 characters"],
        // maxLength: [7, "Password must be 6 to 23 characters"]
    },
    image: {
        type: String,
        required: [true, "Please enter an image"],
        default: "https://icons8.com/icon/23265/user"
    },
    phone: {
        type: String,
        default: "+591"
    },
},
{
    timestamps: true
})


// Encrypt password before saving to DB
funcionarioMedicoSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next();
    }



    //Hash password
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const FuncionarioMedico = mongoose.model('funcionariomedicos',funcionarioMedicoSchema);

module.exports = FuncionarioMedico;