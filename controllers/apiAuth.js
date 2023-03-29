const modelUser = require('../models/Usuarios');

module.exports  = {
login: (req, res) => {
res.send('hola desde login')
},
register: async (req, res) => {
    const {email, password, username} = req.body; 

    try{
    let user = await modelUser.findOne({email});

    if(user){
        return res.status(500).json({
            ok: false,
            msg: "El email ya existe" 
        })
    }

     user = new modelUser({ email, password, username})

     await user.save();

     res.json({
        ok: true,
        email,
        username,
        password,
        msg: 'usuario creado con exito'
     })
    }
    catch(error){
        res.json({
            ok: false,
            msg: 'error al registrar'
        })
    }

}
}

