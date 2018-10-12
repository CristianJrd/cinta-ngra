const { GraphQLServer } =  require('graphql-yoga')

const { Prisma } = require('prisma-binding');
/*Estamos importando un módulo llamado prisma-binging es grandisimo, 
con decirle que queremos un elemento en específico de todo lo que estamos
importando de prisa-binding le indicamos entre llaves {} que queremos un 
elemento llamado Prisma.*/

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
/*Con estos dos importamos los dos archivos que creamos*/

const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        /*Los tres puntos se llaman spread separator, lo que hacen es de que todo
        lo que venía dentro del request, hace una copia y aparte le estoy agregando
        más cosas, osea el db y lo que viene dentro*/
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/diegorko/netflix_clone_backend-master/dev',
            /*Este es el endpoint de la base de datos*/
            debug: true
        })
        /*Con esto estamos haciendo la configuración de prisma-binding*/
    }),
    resolverValidationOptions:{
        requireResolversForResolveType:false
    }
    /*Esto lo que hace es no dejar que salga un warning diciendome que los resolvers
    no tienen un type, pero no es un error, simplemente es un warning*/
})

module.exports = server;
/*Docker no hace loadreloading, para hacer esto tenemos que hacer que nodemon corra a nodemon*/