



const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//to register a user
//to login a user
//for logout

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


const generateToken = (getId) => {
    return jwt.sign({ getId }, 'DEFAULT_SECRET_KEY', {
        expiresIn: 3 * 24 * 60 * 60,
    })
}



const registerUser = async (req, res, next) => {
    const { name,
        email,
        password } =  await req.body;

    const { error } = registerSchema.validate({ name, email, password });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    try {
        const isUserEmailAlreadyExists = await User.findOne({ email });

        if (isUserEmailAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User email already exists!please try with different emial"
            })
        }
        else {
            const hashPassword = await bcrypt.hash(password, 12);
            const newlyCreatedUser = await User.create({
                name,
                email,
                password: hashPassword
            });

            if (newlyCreatedUser) {
                const token = generateToken(newlyCreatedUser?._id);

                //to store the token in cookies
                //withCredentials:true is used to send cookies in the request
                //httpOnly:false is used to access the cookies in the frontend
                //if httpOnly is true, then cookies cannot be accessed in the frontend
                //if httpOnly is false, then cookies can be accessed in the frontend
                res.cookie('token', token, {
                    withCredentials: true,
                    httpOnly: false,
                });

                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    userData: {
                        name: newlyCreatedUser.name,
                        email: newlyCreatedUser.email,
                        _id: newlyCreatedUser._id,
                    },
                });
                next();
            }

        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong!Please try again"
        });

    }

}

const loginUser = async (req, res, next) => {
    const { password, email } = await req.body;

    const { error } = loginSchema.validate({  email, password });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

   try{
    const getUser=await User.findOne({email});
    if(!getUser){
        return res.json({
           message: "Incorrect email",
           success: false,
        });
    }
    const checkAuth=await bcrypt.compare(password, getUser.password);

    if(!checkAuth){
        return res.json({
            message:"Incorrect password",
            success: false,
        });
    }

    const token = generateToken(getUser?._id);
    res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
    });


    res.status(201).json({
        success:true,
        message:'User logged in'
    })

    next();

   }catch(error){
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Something went wrong!please try again"
     });
   }
 
};


const logout=async(req,res)=>{
    res.cookie('token',"",{
        withCredentials:true,
        httpOnly:false
    })
    return res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
}

    module.exports = { registerUser ,loginUser,logout};