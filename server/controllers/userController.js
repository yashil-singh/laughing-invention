const { User } = require('../models/usersModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRECT, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    
    let body = {...req.body} 

    try{

        const registeredUser = await User.login(body)
        
         //create a token
         const token = createToken(registeredUser._id);
         const email = registeredUser.email;
         const _id = registeredUser._id;
         res.status(200).json({email, token, _id});

    }
    catch(error){ 
        res.status(400).json({error:error.message});   
    }
    
}

//signup user
const signupUser = async (req, res) => {

    let body = {...req.body}

    try{

       const newUser = await User.signup(body)

        //create a token
        const token = createToken(newUser._id);
        const email = newUser.email;
        const _id = newUser._id
        res.status(200).json({email, token, _id});
    }
    catch(error){ 
        res.status(400).json({error:error.message});
    }
}

module.exports = { signupUser, loginUser }