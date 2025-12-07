require("dotenv").config();
const dotenv=require("dotenv");
const User = require("../Models/Users.model");
const jwt = require("jsonwebtoken");
const Role = require("../Models/roles.model");

dotenv.config();
async function authenticate(req,res,next) {
    try {
        // console.log("ENV  Header name:" ,process.env.JWT_TOKEN_HEADER);
        console.log("token received:" , req.header(process.env.JWT_TOKEN_HEADER));
        
        
        const rawToken = req.header(process.env.JWT_TOKEN_HEADER);
        console.log("Raw token:" ,rawToken);
        
        const token = rawToken?.replace("Bearer", "").trim();
        console.log("processed token" , token);
        
        
        if(!token) {
            console.log("no token provided");
            
            return res.status(401).json({msg: "no token provided"});
        }
        
    
        const tokenData = jwt.verify(token , process.env.SECRET_KEY);
        console.log("token data" , tokenData);
        
        const user = await User.findById(tokenData._id).populate('role');
        console.log("Fetched user:" , user);
        if(!user){
            console.log("user not found");
              
             return res.status(401).json({msg:"user is not authenticated"});          
        }
        req.user = user;
            return next()
       
    } catch (error) {
        console.error("auth middleware error:" , error.message);
        
        return res.status(500).json({"user is not authenticated" : error});
    }
}

async function authorize(req,res,next) {
    
        try {
            console.log("req.user.role:" , req.user?.role);
            if(req.user?.role?.name === "admin" || req.user?.role === "admin"){
                
                
                return next();
            }
            res.status(404).json({msg : "user is not authenticated"});
        } catch (error) {
            res.status(500).json({"user is not authorize." : error.message});
        }
       
    }


module.exports={
    authenticate,
    authorize
}
    