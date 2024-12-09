// const Book = require('../model/Book');
const fs = require('fs');
const path = require('path');

const data = {
    books: require('../model/books.json'),
    getEngBooks: function() {
        return this.books.Englishbooks;
    },
    setBooks: function(data) {
        this.books=data
        fs.writeFileSync(path.join(__dirname,'../model/books.json'),JSON.stringify(this.books,null,2));
    }
}

const getAllBooks= async(req, res)=>{
    res.json(data.getEngBooks());
}

const createNewBooks= async(req, res)=>{
    const newBooks = {
        id: data.getEngBooks()?.length ? data.getEngBooks()[data.getEngBooks().length - 1].id + 1 : 1,
        title: req.body.title,
        image: req.body.image,
        bookcontent: req.body.bookcontent,
        audio: req.body.audio,
        authorinfo: req.body.author,
        summary: req.body.summary,
        authorpic: req.body.authorpic
    }

    if(!newBooks.title){
    return res.status(400).json({'message':'book title required'});
    }
    data.setBooks([...data.getEngBooks(), newBooks]);
    res.status(201).json(data.getEngBooks());
}

const upddateBook = async(req, res)=>{
     const book = data.getEngBooks().find(bk => bk.id === parseInt(req.body.id));
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

    const filteredArray = data.getEngBooks().filter(bk =>bk.id !== parseInt(req.body.id));
   const unsortedArray = [...filteredArray, book];
   data.setBooks(unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
   res.json(data.getEngBooks());
}

const deleteBook = async(req, res) =>{
    const book = data.getEngBooks().find(bk => bk.id === parseInt(req.body.id));
    if(!book){
        return res.status(400).json({'message': `book id ${req.body.id} not found`});
    }
    const filteredArray = data.getEngBooks().filter(bk => bk.id !== parseFloat(req.body.id));
    data.setBooks([...filteredArray]);
    res.json(data.getEngBooks());
}

const getBook = async(req, res)=>{

    const book = data.getEngBooks()().find(bk => bk.id === parseInt(req.params.id));
    if(!book){
        return res.status(400).json({'message': `book id ${req.params.id} not found`});
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