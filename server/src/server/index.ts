import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import Pusher from 'pusher';

import {
  config,
  PUSHER_CHANNELS,
  PUSHER_EVENTS,
} from './consts';

const init = () => {

  // TODO: use schema validation library?
  if (Object.values(config).some(v => !v)) {
    console.log('missing config values. current config:\n', config);

    throw new Error('Invalid config');

  } else {
    console.log('config OK');
  }

  const pusher = new Pusher({
    appId:   config.PUSHER_APP_ID || 'N/A',
    key:     config.PUSHER_KEY || 'N/A',
    secret:  config.PUSHER_SECRET || 'N/A',
    cluster: config.PUSHER_CLUSTER || 'N/A',
    useTLS:  true
  });

  const app = express();
  const PORT = process.env.PORT || 8888;

  app.use(cors({
    origin: ['http://localhost:3000']
  }));

  app.use(express.json());

  app.post('/api/messages', async (req: Request, res: Response) => {

    await pusher.trigger(PUSHER_CHANNELS.CHAT, PUSHER_EVENTS.MESSAGE, {
      username: req.body.username,
      message:  req.body.message,
    });

    res.json([]);

  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

};

init();
