import express, { Request, Response } from 'express';
import createApolloGraphqlServer from './graphql';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
  const app = express();
  const PORT = Number(process.env.port) || 8080;

  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('hi new ');
  });
  // app.use('/graphql', expressMiddleware(gqlServer));
  app.use('/graphql', expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8080');
  });
}

init();
