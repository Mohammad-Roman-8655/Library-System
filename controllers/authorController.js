const Author=require("../models/Author");
const mongoose = require("mongoose"); 

exports.getAllAuthors= async (req,res)=>{
    try {
        const authors= await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({message:"Error somethng"});
    }
}

exports.getAuthorById= async (req,res)=>{
    try {
        const author= await Author.findById(req.params.id);
        if(!author){
            res.status(404).json({message:"Author not found"});
        }
        res.status(200).json(author);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.createAuthor= async (req,res)=>{
     try {
        const author= new Author(req.body);
        await author.save();
         res.status(201).json(author);  
     } catch (error) {
        res.status(500).json({message:error.message});
     }
}

exports.updateAuthor= async (req,res)=>{
    try {
        const author =await Author.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!author){
            res.status(404).json({message:"Author not found to update"});
        }
        res.status(200).json(author);
    } catch (error) {
         res.status(500).json({message:error.message});
    }
}

exports.deleteAuthor= async (req,res)=>{
   try {
    const author=await Author.findByIdAndDelete(req.params.id);
    if(!author){
        res.status(404).json({message:"Author not found to delete"});
    }
    res.status(200).json({message:"Author delete successfully"});
   } catch (error) {
       res.status(500).json({message:error.message});
   }
}