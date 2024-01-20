// const Book = require('../model/Book');
const fs = require('fs');
const path = require('path');

const data ={
    books: require('../public/dbdata/books.json'),
    setBooks: function(data) {
        this.books=data
        fs.writeFileSync(path.join(__dirname,'../public/dbdata/books.json'),JSON.stringify(this.books,null,2));
    }
}

const getAllBooks= async(req, res)=>{
    // const books = await Book.find();
    // if(!books) return res.status(204).json({'message':'No books found'});
    // res.json(books);
    res.json(data.books);
}

const createNewBooks= async(req, res)=>{
    const newBooks = {
        id: data.books?.length ? data.books[data.books.length - 1].id + 1 : 1,
        title: req.body.title,
        image: req.body.image,
        bookcontent: req.body.bookcontent,
        audio: req.body.audio,
        authorinfo: req.body.author,
        summary: req.body.summary,
        authorpic: req.body.authorPic
    }

        if(!newBooks.title){
        return res.status(400).json({'message':'book title required'});
    }
    data.setBooks([...data.books,newBooks]);
    res.status(201).json(data.books);

    // if(!req?.body?.title){
    //     return res.status(400).json({'message':'book title required'});
    // }

    // try{
    //     const result = await Book.create({
    //         booknum: req.body.booknum,
    //         title: req.body.title,
    //         image: req.body.image,
    //         bookcontent: req.body.bookcontent,
    //         audio: req.body.audio,
    //         author: req.body.author,
    //         summary: req.body.summary,
    //         authorPic: req.body.authorPic
    //     });
    //     res.status(201).json(result);
    // }catch(err){
    //     console.error(err);
    // }
}

const upddateBook = async(req, res)=>{
    // if (!req?.body?.id) {
    //     return res.status(400).json({ 'message': 'ID parameter is required.' });
    // }
    // const book = await Book.findOne({_id: req.body.id}).exec();

    // if(!book){
    //     return res.status(204).json({'message':`No book matches ID ${req.body.id}`});
    // }

        // if(req.body?.booknum) book.booknum = req.body.booknum;
    // if(req.body?.title) book.title = req.body.title;
    // if(req.body?.image) book.image = req.body.image;
    // if(req.body?.bookcontent) book.bookcontent = req.body.bookcontent;
    // if(req.body?.audio) book.audio = req.body.audio;
    // if(req.body?.author) book.author = req.body.author;
    // if(req.body?.summary) book.summary = req.body.summary;
    // if(req.body?.authorPic) book.authorPic = req.body.authorPic;
    // const result = await book.save();
    // res.json(result);

     const book = data.books.find(bk => bk.id === parseInt(req.body.id));
    if(!book){
        return res.status(400).json({'message':'book not found'});
    }

    if(req.body.title) book.title = req.body.title;
    if(req.body.image) book.image = req.body.image;
    if(req.body.bookcontent) book.bookcontent = req.body.bookcontent;
    if(req.body.audio) book.audio = req.body.audio;
    if(req.body.author) book.aboutinfo = req.body.author;
    if(req.body.summary) book.summary = req.body.summary;
    if(req.body.authorpic) book.authorpic = req.body.authorpic;

    const filteredArray = data.books.filter(bk =>bk.id !== parseInt(req.body.id));
   const unsortedArray = [...filteredArray,book];
   data.setBooks(unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
   res.json(data.books);
}

const deleteBook = async(req, res) =>{
    // if (!req?.body?.id) {
    //     return res.status(400).json({ 'message': 'book ID is required.' });
    // }
    // const book = await Book.findOne({_id:req.body.id}).exec();
    // if(!book){
    //     return res.status(204).json({'message': `book ID: ${req.body.id} not found`});
    // }
    // const result = await book.deleteOne();
    // res.json(result);

    const book = data.books.find(bk => bk.id === parseInt(req.body.id));
    if(!book){
        return res.status(400).json({'message': `book title ${req.body.id} not found`});
    }
    const filteredArray = data.books.filter(bk => bk.id !== parseFloat(req.body.id));
    data.setBooks([...filteredArray]);
    res.json(data.books);
}

const getBook = async(req, res)=>{
    // if (!req?.params?.id) {
    //     return res.status(400).json({ 'message': 'book ID is required.' });
    // }
    // const book = await Book.findOne({_id: req.params.id}).exec();
    // if(!book){
    //     return res.status(204).json({'message': `book ID: ${req.params.id} not found`});
    // }
    // res.json(book);

    const book = data.books.find(bk => bk.id === parseInt(req.params.id));
    if(!book){
        return res.status(400).json({'message': `book title ${req.params.id} not found`});
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