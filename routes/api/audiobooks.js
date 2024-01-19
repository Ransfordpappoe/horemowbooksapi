const express = require('express');
const router = express.Router();
const audiobController = require('../../controllers/audiobController');

router.route('/')
    .get(audiobController.getAllBooks)
    .post(audiobController.createNewBooks)
    .put(audiobController.upddateBook)
    .delete(audiobController.deleteBook);

router.route('/:id')
    .get(audiobController.getBook);
    
module.exports = router;