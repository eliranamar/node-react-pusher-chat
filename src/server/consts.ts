export enum PUSHER_CHANNELS {
  CHAT = 'chat',
}

export enum PUSHER_EVENTS {
  MESSAGE = 'message',
}

export const config = {
  PUSHER_APP_ID:  process.env.PUSHER_APP_ID,
  PUSHER_KEY:     process.env.PUSHER_KEY,
  PUSHER_SECRET:  process.env.PUSHER_SECRET,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
};
