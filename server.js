require('dotenv').config();
const express=require("express");
const mongoose=require('mongoose');
const app=express();

const PORT=process.env.PORT || 4000;

main().then(()=>{
    console.log('MongoDB database connected successfully');
}).catch((error)=>{
    console.log(`Database is not connected successfully : ${error}`)
})

async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}

app.get('/',(req,res)=>{
    res.json({
        message:"Server created successfully",
        status:"Success"
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on PORT : ${PORT}`);
})