// conexion de mongoose, o modulo de mongoose
const mongoose = require('mongoose');
//const { MONGODB_URI } = process.env
//const MONGODB_URI =`mongodb://${BOOKFLIX_APP_MONGODB_HOST}/${BOOKFLIX_APP_MONGODB_DATABASE}`;
const MONGODB_URI = `mongodb+srv://admin2:contrasena@cluster0-ltqg9.mongodb.net/test?retryWrites=true&w=majority`


// si lo levanto del env no funciona

mongoose.connect(MONGODB_URI,{
   useUnifiedTopology: true, 
   useNewUrlParser: true,  
})
    .then(console.log('DB is connected'))
    .catch(err => console.log(err));

    

    
module.exports = mongoose;