const express = require('express');

const expressGraphQL = require('express-graphql')

const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
  graphiql: true,
}));

app.listen(4800, () => {
    console.log('Listening to 4800')
});