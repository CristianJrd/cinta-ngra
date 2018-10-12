const {getUserId} = require('../utils/utils');

async function users(parent, args, context, info) {
    let user = getUserId(context)
    /*parent es todas las ramas que hay dentro de graphql*/
    /*args es lo que nosotros mandamos*/
    /**info es información extra de los query o los mutations, como id, 
    o parámetros de búsqueda*/
    const user = context.db.query.users({}, info)  
    /*El context es un objeto que se pasa a todos los query mutations*/
    /*Lo que estoy haciendo con db.query.users{} es que me mande todos 
    los usuarios*/  
    if (!users) throw new Error("No hay usuarios todavía compa")
    /*Con esto estoy manejando errores*/
}

async function movies(parent, args, context, info){
    let user = getUserId(context)
    return context.db.query.movies({},info)
}

async function movie(parent, args, context, info){
    let user = getUserId(context)
    return context.db.query.movie({where:{id:args.id}},info)
    /*El where le dice que busque bla bla bla donde id sea igual al id
    que le estoy pasando*/
}

async function moviesGenre(parent, args, context, info){
    let user = getUserId(context)
    return context.db.query.movies({where:{genre:args.genre}},info)
}

async function moviesCategory(parent, args, context, info){
    let user = getUserId(context)
    return context.db.query.movies({where:{category:args.category}},info)
}

async function moviesSuscription(parent, args, context, info){
    let user = getUserId(context)
    return context.db.query.movies({where:{suscription_type:args.suscription_type}},info)
}
/*Todas estas funciones deben tener el mismo nombre de nuestros elementos en 
schema*/

module.exports = {
    users,
    movies,
    movie,
    moviesGenre,
    moviesCategory,
    moviesSuscription
}