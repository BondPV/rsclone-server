import mongoose from 'mongoose';
import config from 'config';

mongoose.set('strictQuery', true);

async function connect() {
  const dbUri: string = config.get('dbUri');

  try {
    await mongoose.connect(dbUri);
    console.log('Database connected');
  } catch (error) {
    console.error('Database error', error);
    process.exit(1);
  }
}

export default connect;