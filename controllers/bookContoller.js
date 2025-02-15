const Book=require("../models/Book");
const mongoose = require("mongoose"); 


exports.uploadCover = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        book.coverPhoto = `/uploads/${req.file.filename}`;
        await book.save();

        res.status(200).json({ message: "Cover image uploaded successfully", coverPhoto: book.coverPhoto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBooks=async (req,res)=>{
   try{
    const books=await Book.find();
    res.status(200).json(books);
   }catch(error){
    res.status(500).json({message:error.message});
   }
}

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });  
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createBook=async (req,res)=>{
  try{
    const book=new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch(error){
       res.status(500).json({message:error.message});
    }
}

exports.updateBook= async (req,res)=>{
    try{
        const book= await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!book){
            res.status(404).json({message:"Book not found to update"});
        }
        res.status(200).json(book);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.deleteBook= async (req,res)=>{
     try{
        const book= await Book.findByIdAndDelete(req.params.id);
        if(!book){
            res.status(404).json({message:"Book not found to delete"})
        }
        res.status(200).json({message:"Book deleted successfully"});
     }catch(error){
        res.status(500).json({message:error.message});
     }
}