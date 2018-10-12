const jwt = require('jsonwebtoken');
/*Importo el módulo de jsonwebtoken*/
const {APP_SECRET} = require('../const')
/*Importo el módulo creado por mi mismo llamado const que se encuentra una
carpeta atrás de la que me encuentro*/

function getUserId(context){
    const Authorization = context.request.get('Authorization')
    /*Esto busca alguna cabecera que diga Authorization*/
    if(Authorization){
        const token = Authorization.replace('JWT ','')
        /*Con esto le decimos que el token válido es JWT*/
        const {userId} = jwt.verify(token, APP_SECRET)
        /*Con esto se deshashea el token*/
        /*sign funciona para hashear y verify funciona para deshashear*/
        return userId
    }
    throw new Error("Not authenticated")
    /*Este es un manejo de errores*/
}
/*Esta la vamos a mandar a llamar cuando necesitemos que el usuario esté 
autentificado para proteger las mutations o las querys*/

module.exports = {
    getUserId
}
/*Con esto estoy importando lo que me retorne la función getUserId*/