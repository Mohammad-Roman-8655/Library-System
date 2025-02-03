require('dotenv').config();
const express=require("express");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bookRoutes= require("./routes/bookRoutes");
const authorRoutes=require("./routes/authorRoutes");
const app=express();

const PORT=process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));




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
app.use('/books',bookRoutes);
app.use('/authors',authorRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on PORT : ${PORT}`);
})