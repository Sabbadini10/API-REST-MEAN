const { check, body } = require('express-validator');

const db = require("../models/Usuarios");


module.exports = [
    check('username')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Mínimo 2 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos').bail()
        ,
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido').bail()
        .custom((value, { req }) => {
            return db.user.findOne({
                where : {
                    email : value
                }
              }).then( user => {
                    if(user) {
                        return Promise.reject()
                    }
              }).catch( () => Promise.reject('El email ya se encuentra registrado'))
        }),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min: 6,
            max: 12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

]