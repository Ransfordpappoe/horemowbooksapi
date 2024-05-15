const { StreamClient } = require("@stream-io/node-sdk");

const createUser=async(req,res)=>{
 const apiKey=process.env.STREAM_API_KEY;
const secret=process.env.STREAM_SECRET_KEY;
const client = new StreamClient(apiKey,secret);


    const userId = req.body.userId;
    const userName = req.body.userName;
    const userImage = req.body.userImage;

    const newUser ={
        id: userId,
        name: userName,
        image: userImage,
    };

    try {

        await client.upsertUsers({
            users:{
                [newUser.id]: newUser,
            },
        });
    
        let iat = Math.floor(Date.now() / 1000) - 60 * 60 * 24;
        let exp = Math.round(Date.now()/1000) + 60 * 60 * 24 * 14;
        // const payload = {userId,iat,exp};

        // jwt.sign(payload,secret,{algorithm: 'HS256'});
        let token = client.createToken(userId,exp,iat)
        setTimeout(() => {
            res.json({token});
        },5000);
    
     
        
    } catch (error) {
        console.error(error);
    }

 

};

module.exports = {createUser}