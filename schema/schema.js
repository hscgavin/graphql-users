const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;


const users = [
    {id: '23', firstName: 'Bill', age: 21},
    {id: '47', firstName: 'Samantha', age: 22}
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},

    }
});

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
    fields: {
       user: {
           type: UserType,
           args: {id: {type: GraphQLString}},
           resolve(parentValue, args) {
               return users.find(user => user.id === args.id)
           }
       }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})