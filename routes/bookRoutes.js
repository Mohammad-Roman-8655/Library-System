const express=require('express');
const router=express.Router();
const {getBooks,getBookById,createBook,updateBook,deleteBook,uploadCover}=require("../controllers/bookContoller");
const upload = require("../middleware/upload");



router.post("/books/:id/upload-cover", upload.single("coverPhoto"),uploadCover);
router.get('/',getBooks);
router.get('/:id',getBookById);
router.post('/',createBook);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);

module.exports=router;
