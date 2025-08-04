import express from 'express';
const app=express()
import mongoose from 'mongoose';
import bodyparser from 'express';
import userRouter from './Routes/user.js'
import Products from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addreesRouter from './Routes/addrees.js'
import cors from "cors";
const port=5000;
app.use(express.json())
app.use(cors());
app.use(bodyparser.json())
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});
mongoose.connect("mongodb+srv://aseerabbas492:OXcufy7xm3gssJkX@cluster0.1qyji6n.mongodb.net/",{
    dbName:"mern-ecomerce"
}).then(()=>{
    console.log("mongodb connecd successfully")
}).catch((err)=>{
    console.log(err)
})
app.use('/api/user',userRouter);
app.use('/api/product',Products)
app.use('/api/cart',cartRouter)
app.use('/api/addrees',addreesRouter)

app.listen(port,()=>{
    console.log(`server is running on the port ${port} `)
})