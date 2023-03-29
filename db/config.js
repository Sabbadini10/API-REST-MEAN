const mongoose = require('mongoose');
const conectionDB = async () =>  {

try {
    await mongoose.connect(process.env.DB_CONNECT);
console.log('conectado a BASE DE DATOS')
} catch (error) {
    console.log('error al conectar LA BASE DE DATOS')
}

  
} 


module.exports = conectionDB;