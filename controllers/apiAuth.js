const modelUser = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports  = {
login: async (req, res) => {
    const {email, password} = req.body; 

    const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(500).json({
        ok: false,
        errors: error.mapped()
    })
}


try {
    
    let user = await modelUser.findOne({email});

    if(!user){
        return res.status(401).json({
            ok: false,
            msg: "Credenciales Invalidas" 
        })
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if(!passwordCompare){
        return res.status(401).json({
            ok: false,
            msg: "Credenciales Invalidas" 
        })
    }
    const payload = {
        id: user.id,
     }

     jwt.sign(payload, process.env.JWTSECRET,{expireIn: 3600}, (error, token) => {
       return  res.json({
            ok: true,
            id: user.id,
            email,
            password: user.password,
            msg: 'usuario logueado',
            token
         })
     });

} catch (error) {
    res.json({
        ok: false,
        msg: 'error al loguearse'
    })
}
},
register: async (req, res) => {
    const {email, password, username} = req.body; 
const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(500).json({
        ok: false,
        errors: error.mapped()
    })
}

    try{
    let user = await modelUser.findOne({email});

    if(user){
        return res.status(500).json({
            ok: false,
            msg: "El email ya existe" 
        })
    }

     user = new modelUser({ email, password, username})

     const salt = bcrypt.genSaltSync(10);
    user.password  = bcrypt.hashSync(password, salt);

     await user.save();

     const payload = {
        id: user.id,
     }

     jwt.sign(payload, process.env.JWTSECRET,{expireIn: 3600}, (error, token) => {
       return  res.json({
            ok: true,
            id: user.id,
            email,
            username,
            password: user.password,
            msg: 'usuario creado con exito',
            token
         })
     });

   
    }
    catch(error){
        res.json({
            ok: false,
            msg: 'error al registrar'
        })
    }

}
}

