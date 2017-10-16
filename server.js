const express = require('express');

const expressGraphQL = require('express-graphql')

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true,
}));

app.listen(4800, () => {
    console.log('Listening to 4800')
});