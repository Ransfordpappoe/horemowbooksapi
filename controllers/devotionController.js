const Book = require('../model/Engdevotion');

const getAllBooks= async(req, res)=>{
    try{
        const books = await Book.find();
        if(!books) return res.status(204).json({'message':'No books found'});
        res.json(books);
    }catch{

    }
}

const createNewBooks= async(req, res)=>{
    if(!req?.body?.title){
        return res.status(400).json({'message':'book title required'});
    }

    try{
        const result = await Book.create({
            title: req.body.title,
            image: req.body.image,
            bookcontent: req.body.bookcontent,
            bookcontent2: req.body.bookcontent2,
            bookcontent3: req.body.bookcontent3
        });
        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
}

const upddateBook = async(req, res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const book = await Book.findOne({_id: req.body.id}).exec();

    if(!book){
        return res.status(204).json({'message':`No book matches ID ${req.body.id}`});
    }
    if(req.body?.title) book.title = req.body.title;
    if(req.body?.image) book.image = req.body.image;
    if(req.body?.bookcontent) book.bookcontent = req.body.bookcontent;
    if(req.body?.bookcontent2) book.bookcontent2 = req.body.bookcontent2;
    if(req.body?.bookcontent3) book.bookcontent3 = req.body.bookcontent3;
    const result = await book.save();
    res.json(result);
}

const deleteBook = async(req, res) =>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'book ID is required.' });
    }
    const book = await Book.findOne({_id:req.body.id}).exec();
    if(!book){
        return res.status(204).json({'message': `book ID: ${req.body.id} not found`});
    }
    const result = await book.deleteOne();
    res.json(result);
}

const getBook = async(req, res)=>{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'book ID is required.' });
    }
    const book = await Book.findOne({_id: req.params.id}).exec();
    if(!book){
        return res.status(204).json({'message': `book ID: ${req.params.id} not found`});
    }
    res.json(book);
}

module.exports = {
    getAllBooks,
    createNewBooks,
    upddateBook,
    deleteBook,
    getBook
}