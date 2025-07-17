import express from 'express';
const app=express()
import mongoose from 'mongoose';
const port=5000;

mongoose.connect("mongodb+srv://aseerabbas492:OXcufy7xm3gssJkX@cluster0.1qyji6n.mongodb.net/",{
    dbName:"mern-ecomerce"
}).then(()=>{
    console.log("mongodb connecd successfully")
}).catch((err)=>{
    console.log(err)
})

app.listen(port,()=>{
    console.log(`server is running on the port ${port} `)
})