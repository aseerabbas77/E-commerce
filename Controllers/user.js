import { User } from "../Models/User.js";

export const register=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.create({name,email,password});
        res.json({message:"user register successfully....!",success:true})
    }catch(err){
        res.json({message:err.meessage})

    }
};