
const jwt=require('jsonwebtoken');
const user=require('../models/user');



const userAuthVerification=async(req,res)=>{
    const token=req.cookies.token;
    console.log(token,"token");
    
    if(!token){
        return res.json({
            success:false,
            message:"token is not available"
        })
    }

    if(token){
        try{
           const decoded=jwt.verify(token,'DEFAULT_SECRET_KEY');
           
            
           

           const userInfo=await user.findById(decoded.getId);
          
           

           if(userInfo){
                return res.status(200).json({
                     success:true,
                     userInfo,
                });
           }
        }
        catch(error){
    return res.status(401).json({
        success:false,
        message:"user not authenticated"
    })
        }
    }
}

module.exports={userAuthVerification};