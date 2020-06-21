const JWT = require('jsonwebtoken');
const config = require('../config/keyToken');

function auth(req,res,next){
    const token = req.header('xaccess');

    if(!token){
        res.status(401).send('No se envió ningún token');
        //error 401 es de permisos
    }
    try {
        const decoded = JWT.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch(exception){
        res.status(401).send('Token inválido')
    }

}
module.exports = auth;