const Video = require("../model/TvShows");
const AdVideos = require("../model/TvAdshow");
const Admin = require('../model/Admins');

const getCurrentVideo = async(req, res) =>{
    const videos = await Video.find().sort('startTime');

    if(!videos) return res.status(204).json({"message":"no video found"});
    
    const now = Date.now();
    for (let i = 0; i < videos.length; i++) {
        if (now >= videos[i].startTime && now <= videos[i].endTime) {
            let playbackPosition = (now - videos[i].startTime) / 1000;
            res.json({
                videoUrl: videos[i].videoUrl,
                videoDesc: videos[i].videoTitle,
                playbackPosition
            })
            return;
        }
    }
    res.status(204).json({"message":"no video currently playing"});
}

const getVideoAds=async(req,res)=>{
    try {
        const adVideos = await AdVideos.find();
    if(!adVideos) res.status(204).json({"message":"no video ad found"});
    res.json(adVideos);
    } catch{
        
    }
}

const getAllVideos = async(req, res)=>{
    try {
        const videos = await Video.find();
        if(!videos) return res.status(204).json({"message":"no videos found"});
        res.json(videos);
    } catch{
        
    }
}

const scheduleVideos = async(req, res)=>{
    if (!req?.body?.userid) {
        return res.status(400).json({"message":"user email and userid are required"});
    }
    const admin = await Admin.findOne({userID:req.body.userid}).exec();
    if (!admin) return res.sendStatus(401); //unauthorized
    
    if(admin.userEmail !== req.body.useremail) return res.sendStatus(401);

    if (!req?.body?.videoLink) {
        return res.status(400).json({"message":"videoUrl required"});
    }

    try {
        const result = await Video.create({
            videoUrl: req.body.videoLink,
            videoTitle: req.body.videoTitle,
            videoThumbnail: req.body.videoThumbNail,
            startTime: req.body.startTime,
            endTime: req.body.videoEndTime,
            duration: req.body.vidDuration
        });
        res.status(201).json(result);
        
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

// const createAdmin = async(req, res)=>{
//     if (!req?.body?.userid) {
//         return res.status(400).json({"message":"userid required"});
//     }
//     try {
//         const result = await Admin.create({
//             userID: req.body.userid,
//             userEmail: req.body.useremail
//         });
//         res.status(201).json(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// const updateVideoSchedule = async(req, res)=>{
//     if (!req?.body?.id) {
//         return res.status(400).json({"message":"ID parameter required"});
//     }

//     const video = await Video.findOne({_id: req.body.id}).exec();

//     if (!video) {
//         return res.status(204).json({"message":`No ID parameter matches ${req.body.id}`})
//     }

//     if(req.body?.videoLink) video.videoUrl = req.body.videoLink;
//     if(req.body?.startTime) video.startTime = req.body.startTime;
//     if(req.body?.videoEndTime) video.endTime = req.body.videoEndTime;
//     if(req.body?.videoTitle) video.videoTitle = req.body.videoTitle;
//     if(req.body?.videoThumbNail) video.videoThumbnail = req.body.videoThumbNail;

//     const result = await video.save();
//     res.json(result);
// }

const deleteVideo = async(req, res) =>{
    if (!req?.body?.userid) {
        return res.status(400).json({"message":"user email and userid are required"});
    }
    const admin = await Admin.findOne({userID:req.body.userid}).exec();
    if (!admin) return res.sendStatus(401); //unauthorized
    
    if(admin.userEmail !== req.body.useremail) return res.sendStatus(401);
    
    if (!req?.body?.id) return res.status(400).json({ 'message': 'video ID is required.' });
    
    const video = await Video.findOne({_id:req.body.id}).exec();
    if(!video){
        return res.status(204).json({'message': `video ID: ${req.body.id} not found`});
    }
    try {
        const result = await video.deleteOne();
        res.json(result);
    } catch{
        return res.status(500).json({'message':'an internal error occurred'});
    }
 
}

module.exports={
    getCurrentVideo,
    scheduleVideos,
    // updateVideoSchedule,
    getAllVideos,
    getVideoAds,
    deleteVideo
    // createAdmin
}