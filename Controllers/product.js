import { Products } from "../Models/Product.js";

//add product 

export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body;
    try {
        let product = await Products.create({
            title, description, price, category, qty, imgSrc
        })
        res.json({ message: "product added successfully....!", product, success: true })

    } catch (err) {
        res.json({ message: err.message })
               }
}

export const getProducts= async (req,res)=>{
    try{
         let products=await Products.find().sort({createdAt:-1})
         res.json({message:"all products",products})
    }catch(err){
        res.json({message:err.message})
    }
}
export const getProductsById= async(req,res)=>{
    const {id}=req.params;
    try{
       let product=await Products.findById(id)
       if(!product){
        return res.json({message:"product not find"})
       }
       res.json({message:"employee",product});
    }catch(err){
        res.json({message:err.message})
    }
    
}

export const updateProductsById= async(req,res)=>{
    const {id}=req.params;
    try{
       let product=await Products.findByIdAndUpdate(id,req.body,{new:true})
       res.json({message:"product has been updated",product});
    }catch(err){
        res.json({message:err.message})
    }
    
}
export const deleteProductsById= async(req,res)=>{
    const {id}=req.params;
    try{
       let product=await Products.findByIdAndDelete(id)
       if(!product){
        return res.json({message:"product not find"})
       }
       res.json({message:"product deleted"});
    }catch(err){
        res.json({message:err.message})
    }
    
}