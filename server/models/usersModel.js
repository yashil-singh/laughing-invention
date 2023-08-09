const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


/*Schema for mongoose database*/
const userSchema = new mongoose.Schema({
    name:{
        type:  String, 
        required: true
    },
    email:{
        type:  String, 
        required: true,
        unique: true
    },
    password:{
        type:  String, 
        required: true
    },
    role:{
        type:  String, 
        required: true
    },
});

userSchema.statics.login = async function (body) {
    if (!body.email || !body.password) {
        throw Error('All fields must be filled')
    }

    const registeredUser = await User.findOne({email:body.email});

    if(!registeredUser){
        throw Error('Invalid email or password.');
    }
    
    const match = await bcrypt.compare(body.password, registeredUser.password)
    if (!match) {
        throw Error('Invalid email or password.');
    }

    return registeredUser
}

userSchema.statics.signup = async function (body) {
    if (!body.name || !body.email || !body.password) {
        throw Error('All fields must be filled.')
    }

    if(!body.role) {
        body = {...body, role:'user'}
    }

    if (!validator.isEmail(body.email)) {
        throw Error('Email is not valid.')
    }

    if (!validator.isStrongPassword(body.password)) {
        throw Error('Passowrd is not strong enough.')
    }

    const registeredUser = await User.findOne({email:body.email});

    if(registeredUser){
        throw Error('Email already in use.')
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT)); //decrypt intensity (value 1 to 5)
    const hashedPassword = await bcrypt.hash(body.password, salt); //decrypted password

    const user = await new User({...body, password:hashedPassword}).save();

    return user

}

const User = mongoose.model('User', userSchema);

module.exports = { User }