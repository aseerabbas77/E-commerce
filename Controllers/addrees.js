import { Addrees } from "../Models/Addrees.js";

export const addAddrees = async (req, res) => {
    const { fullName, addrees, city, state, country, pincode, phoneNumber } = req.body;
    let userId=req.user;
    let  newaddrees= await Addrees.create({
        userId,fullName, addrees, city, state, country, pincode, phoneNumber
    })
     res.json({message:"addrees added",newaddrees})
}

export const getAddrees = async (req, res) => {
  console.log("req.user:", req.user);

  let addrees = await Addrees.find({ userId: req.user }).sort({ createdAt: -1 });
  console.log("Found addresses:", addrees);

  res.json({
    message: "addrees",
    useraddrees: addrees[0] || null
  });
};
