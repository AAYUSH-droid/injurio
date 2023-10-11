import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
  const app = express();
  const PORT = Number(process.env.port) || 8080;

  app.use(express.json());

  //crate GraphQL server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `im gql server`,
      },
    },
  });

  //start gqlServer
  await gqlServer.start();

  app.get('/', (req: Request, res: Response) => {
    res.send('hi new ');
  });
  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8080');
  });
}

init();
