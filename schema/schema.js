const graphql = require('graphql');
const fetch = require('node-fetch');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const apiHost = 'http://localhost:3000';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return fetch(`${apiHost}/companies/${parentValue.companyId}`).then(res => res.json());
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return fetch(`${apiHost}/users/${args.id}`).then(res => res.json())
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})