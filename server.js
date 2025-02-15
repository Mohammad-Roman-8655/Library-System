require('dotenv').config();
const express=require("express");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bookRoutes= require("./routes/bookRoutes");
const authorRoutes=require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const reviewRoutes=require("./routes/reviewRoutes")
const app=express();
const path = require("path");
const PORT=process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




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
        name:"Mohammad Roman",
        city:"lucknow"
    })
})
app.use('/users',userRoutes);
app.use('/books',bookRoutes);
app.use('/books',reviewRoutes);
app.use('/authors',authorRoutes);
app.use("/loans", loanRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on PORT : ${PORT}`);
})