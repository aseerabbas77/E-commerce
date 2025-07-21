import { Products } from "../Models/Product.js";
import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
export const register=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email})
        if(user){
           return res.json({message:"this user already exist", success:false})
        }
        let hashpass=await bcrypt.hash(password,10)
         user=await User.create({name,email,password:hashpass});
         
        res.json({message:"user register successfully....!",user,success:true})
    }catch(err){
        res.json({message:err.meessage})

    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.json({message:"user invalid",success:false})
        }
        const validpass=await bcrypt.compare(password,user.password);
        if(!validpass){
            return res.json({message:"invalid credentials",success:false})
        }
     res.json({message:`welcome ${user.name}`,success:true,user})

    }catch(err){
          res.json({message:err.message})
    }
}

export const users=async (req,res)=>{
    try{
        let users= await User.find().sort({createdAt:-1})
        if(!users){
            return res.json({message:"no users avalble ",success:false})
        }
        res.json(users)
    }catch(err){
        res.json({message:err.message})
           
    }
}

