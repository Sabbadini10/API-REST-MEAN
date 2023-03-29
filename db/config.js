const mongoose = require('mongoose');
const conectionDB = async () =>  {

try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@cluster0.ctgednd.mongodb.net/test`);
console.log('conectado a base de datos mongo')
} catch (error) {
    console.log('error al conectar')
}

  
} 


module.exports = conectionDB;