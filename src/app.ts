import express from 'express';
import config from 'config';
import connect from './db/connect';
import routes from './routes';

const PORT: number = config.get('port');

const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  console.log('Server is running on port', PORT);

  await connect();

  routes(app);
});