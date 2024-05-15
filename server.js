require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const dbConn = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

dbConn.connectDB();


app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/books',require('./routes/api/books'));
app.use('/dailydevotioneng',require('./routes/api/devotion'));
app.use('/audiobooks',require('./routes/api/audiobooks'));
app.use('/createusertoken',require('./routes/api/liveToken'));
app.use('/tvshows',require('./routes/api/tvschedule'));

app.all('*',(req, res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({"error": "404 Not Found"});
    }else{
        res.type('txt').send("404 Not Found")
    }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
   
});
