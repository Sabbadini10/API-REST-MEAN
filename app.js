require('dotenv').config();

const express = require('express');
const conectionDB = require('./db/config');

const app = express();
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

conectionDB();

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
console.log(`aplicacion corriendo en puerto ${process.env.PORT}`)
});