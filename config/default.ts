export default {
  port: 3005,
  host: 'localhost',
  dbUri: 'mongodb+srv://bondpv:mongo2023bpv@cluster0.cbz4yfq.mongodb.net/MAPmoney?retryWrites=true&w=majority',
};

export const bcryptSaltRounds = 10;

export const tokenSettings = {
  secretKey: 'MAPMoney',
  time: '30d',
};

export const telegram = {
  url: 'https://api.telegram.org',
  token: '6127257686:AAEcZFgBiXQnkfL7BG30L9gw_6Up9Thv8p0',
  chat: '-860431449',
};

export const defaultUserAvatar = 'assets/avatars/default.svg';
export const defaultPhoneNumber = null;

export const initDate = new Date('2020-01-01');