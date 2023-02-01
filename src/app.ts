import express from 'express';
import config from 'config';
import connect from './db/connect';
import routes from './routes';

const port: number = config.get('port');

const app = express();

app.listen(port, async () => {
  console.log('Server listing');

  await connect();

  routes(app);
});