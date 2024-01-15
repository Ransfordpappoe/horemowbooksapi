const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/booksController');

router.route('/')
    .get(booksController.getAllBooks)
    .post(booksController.createNewBooks)
    .put(booksController.upddateBook)
    .delete(booksController.deleteBook);

router.route('/:id')
    .get(booksController.getBook);
    
module.exports = router;