const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebook";
const connecttoMongo = () =>{
 mongoose.connect(mongoURI,()=>{
     console.log('success');
 })
}

module.exports = connecttoMongo;