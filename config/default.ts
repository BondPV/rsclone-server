export default {
  port: 3005,
  host: 'localhost',
  dbUri: 'mongodb+srv://bondpv:mongo2023bpv@cluster0.cbz4yfq.mongodb.net/MAPmoney?retryWrites=true&w=majority',
};

export const bcryptSaltRounds = 10;

export const tokenSettings = {
  secretKey: 'MAPMoney',
  time: '24h',
};

export const defaultLanguage = 'RUS'
export const defaultUserAvatar = 'https://github.com/BondPV/database/blob/main/images/avatarCatMoney.jpg?raw=true'
