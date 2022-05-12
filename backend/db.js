const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";
const connecttoMongo = () =>{
 mongoose.connect(mongoURI,()=>{
     console.log('success');
 })
}

module.exports = connecttoMongo;