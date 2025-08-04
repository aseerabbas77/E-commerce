import { Products } from "../Models/Product.js";
import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // ✅ Only here, after password is valid
    const token = jwt.sign({ userId: user._id }, "@!jajkaf77()", {
      expiresIn: '365d'
    });

    res.json({ message: `Welcome ${user.name}`, token, success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

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

