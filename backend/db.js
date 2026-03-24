const mongoose = require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI).then((con)=>{
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch((err)=>{  
        console.log(`Error connecting to MongoDB: ${err.message}`);
    });
}
module.exports = connectDatabase;
