const express = require('express');
const router = express.Router();
const devotionController = require('../../controllers/devotionController');

router.route('/')
    .get(devotionController.getAllBooks)
    .post(devotionController.createNewBooks)
    .put(devotionController.upddateBook)
    .delete(devotionController.deleteBook);

router.route('/:id')
    .get(devotionController.getBook);
    
module.exports = router;