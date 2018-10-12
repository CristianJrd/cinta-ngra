const bcrypt = require('bcrypt');
/*Se usa para hashear los passwords, hashear significa codificar 
osea sobreponer un String sobre otro y crear algo más cabron*/
const jsonwebtoken = require('jsonwebtoken');
/**/
const getID = `{id}`;
/*Esto fue una trampita porque si esto lo ponía abajo me daba
error, donde puse mi constante de getID*/
const {APP_SECRET} = require('../const')

async function signup(parent, args, context, info){
    const password = await bcrypt.hash(args.password,10);
    /*Con await lo que va a hacer es esperar a que haga lo de bycript.hash
    que hashea o codifica el password para poder guardarlo en la constante 
    password*/

    const user = context.db.mutation.createUser(
        {data:{...args,password},getID}
    )
    

    const token = await jsonwebtoken.sign({userId:uer.id},APP_SECRET)
    /*Esto es para usar un método del módulo jsonwebtoken*/
    /*const token = jsonwebtoken.sign({userId:uer.id},"secret")
                .then((token)=>{
                    return token
                })
    Esto es lo que hace el async en conjunto con el await, es una
    forma de hacer promesas pero más sencillas*/

    return{
        token,
        user
    }
}



async function login(parents, args, context, info){
    const user = await context.db.query.user({
        where:{email:args.email}
    })

    if(!user){
        throw Error("No encontre tu usuario compa");
    }
    /*El signo de exclamación (!) es un diferente a... en JavaScript*/

    const validPassword = await bcrypt.compare(args.password, user.password)

    if(!validPassword) throw new Error("Invalid password")

    const token = await jsonwebtoken.sign({userId:user.id},APP_SECRET)

    return{
        token,
        user
    }
}

module.exports = {
    signup,
    login
}
/*Esto es para hacer accesibles estas funciones a cualquier parte del sistema*/