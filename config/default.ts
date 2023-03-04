import dotenv from 'dotenv';

dotenv.config();
const DB: string = process.env.DB_URI || 'url mongodb database';
const TOKEN_SECRET_KEY: string = process.env.SECRET_KEY || '';
const TELEGRAM_TOKEN: string = process.env.TELEGRAM_TOKEN || '';
const TELEGRAM_CHAT: string = process.env.TELEGRAM_CHAT || '';


export default {
  port: 3005,
  host: 'localhost',
  dbUri: DB,
};

export const bcryptSaltRounds = 10;

export const tokenSettings = {
  secretKey: TOKEN_SECRET_KEY,
  time: '30d',
};

export const telegram = {
  url: 'https://api.telegram.org',
  token: TELEGRAM_TOKEN,
  chat: TELEGRAM_CHAT,
};

export const defaultUserAvatar = 'assets/avatars/default.svg';
export const defaultPhoneNumber = null;

export const initDate = new Date('2020-01-01');