const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }catch(err){
        console.error(err);
    }
}

const devotionDB = async () =>{
    try{
      const conn =  await mongoose.createConnection(process.env.DATABASE_URI_DEVO);
      return conn;
    }catch(err){
        console.error(err);
    }
}

const audioBooksDB = async () =>{
    try{
      const conn =  await mongoose.createConnection(process.env.DATABASE_URI_AUDIOBOOK);
      return conn;
    }catch(err){
        console.error(err);
    }
}
module.exports = {
    connectDB,
    devotionDB,
    audioBooksDB
}