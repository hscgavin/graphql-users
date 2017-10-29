const graphql = require('graphql');
const fetch = require('node-fetch');
const formData = require('form-data')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const apiHost = 'http://localhost:3000';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return fetch(`${apiHost}/companies/${parentValue.id}/users`).then(res => res.json());
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return fetch(`${apiHost}/companies/${parentValue.companyId}`).then(res => res.json());
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return fetch(`${apiHost}/users/${args.id}`).then(res => res.json());
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return fetch(`${apiHost}/companies/${args.id}`).then(res => res.json());
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, args ) {
        return fetch(`${apiHost}/users`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify(args)
        }).then(res => res.json())
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})