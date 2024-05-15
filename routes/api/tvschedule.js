const express = require('express');
const router = express.Router();
const tvshowsController = require('../../controllers/tvshowsController');

router.route('/')
    .get(tvshowsController.getCurrentVideo)
    .post(tvshowsController.scheduleVideos)
    // .put(tvshowsController.updateVideoSchedule)
    .delete(tvshowsController.deleteVideo);

router.route('/allvideos')
    .get(tvshowsController.getAllVideos);
router.route('/videoads')
    .get(tvshowsController.getVideoAds);
// router.route('/admin')
//     .post(tvshowsController.createAdmin);
    
module.exports = router;