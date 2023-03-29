const {check, body} = require('express-validator');
const {compareSync} = require('bcryptjs')
const db = require('../models/Usuarios');

module.exports = [

    check('email')
        .notEmpty().withMessage('Este campo es obligatorio').bail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom( (value,{req}) => {
            if (req.body.email.includes("@")) {

                return db.user.findOne({
                    where : {
                        email : req.body.email
                    }
                  }).then( user => {
                        if(!user || !compareSync(value, user.password)) {
                            return Promise.reject()
                        }
                  }).catch( () => Promise.reject('Credenciales inválidas'))

            }else{

                return db.user.findOne({
                    where : {
                        name : req.body.email
                    }
                  }).then( user => {
                        if(!user || !compareSync(value, user.password)) {
                            return Promise.reject()
                        }
                  }).catch( () => Promise.reject('Credenciales inválidas'))

            }     
        })
]