const fs = require('fs');
const path = require('path');

const data ={
    books: require('../model/books.json'),
    setBooks: function(data) {
        this.books=data
        fs.writeFileSync(path.join(__dirname,'../model/books.json'),JSON.stringify(this.books,null,2));
    }
}

const getAllBooks=(req, res)=>{
    res.json(data.books);
}

const createNewBooks=(req, res)=>{
    const newBooks ={
        id: data.books?.length ? data.books[data.books.length - 1].id + 1 : 1,
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
        audio: req.body.audio,
        author: req.body.author,
        summary: req.body.summary
    }
    if(!newBooks.title){
        return res.status(400).json({'message':'book title required'});
    }
    data.setBooks([...data.books,newBooks]);
    res.status(201).json(data.books);
}

const upddateBook = (req, res)=>{
    const book = data.books.find(bk => bk.id === parseInt(req.body.id));
    if(!book){
        return res.status(400).json({'message':'book not found'});
    }
    if(req.body.title) book.title = req.body.title;
    if(req.body.image) book.image = req.body.image;
    if(req.body.body) book.body = req.body.body;
    if(req.body.audio) book.audio = req.body.audio;
    if(req.body.author) book.author = req.body.author;
    if(req.body.summary) book.summary = req.body.summary;
   const filteredArray = data.books.filter(bk =>bk.id !== parseInt(req.body.id));
   const unsortedArray = [...filteredArray,book];
   data.setBooks(unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
   res.json(data.books);
}

const deleteBook = (req, res) =>{
    const book = data.books.find(bk => bk.id === parseInt(req.body.id));
    if(!book){
        return res.status(400).json({'message': `book title ${req.body.id} not found`});
    }
    const filteredArray = data.books.filter(bk => bk.id !== parseFloat(req.body.id));
    data.setBooks([...filteredArray]);
    res.json(data.books);
}

const getBook = (req, res)=>{
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