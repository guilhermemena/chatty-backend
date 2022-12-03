import Logger from 'bunyan';
import mongoose from 'mongoose';

import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';

const log: Logger = config.createLogger('setupDatabase');

const MongoDB = () => {
  const connect = () => {
    mongoose.connect(config.DATABASE_URL as string).then(() => {
      log.info('Successfully connected to database');
      redisConnection.connect();
    })
    .catch((err) => {
      log.error('Error connecting to database', err);
      return process.exit(1);
    });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

export default MongoDB;
