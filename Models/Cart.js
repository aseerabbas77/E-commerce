import mongoose from "mongoose"

const cartItems= new mongoose.Schema({
    productId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Product"
    },
      title: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
     imgSrc:{type:String,require:true},
})

const cartSchema=new mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    items:[cartItems]
})

export const Cart=mongoose.model("Cart",cartSchema)