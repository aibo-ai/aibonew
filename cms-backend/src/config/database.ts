import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Neon Postgres is the only supported datastore in Vercel deployment.
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

let sequelize: Sequelize;

if (!databaseUrl) {
  throw new Error('NEON_DATABASE_URL is required for cms-backend');
}

const dbUrl = new URL(databaseUrl as string);
const dbHost = dbUrl.hostname;
const dbPort = parseInt(dbUrl.port || '5432');
const dbName = dbUrl.pathname.split('/')[1];
const dbUser = dbUrl.username;
const dbPassword = dbUrl.password;

sequelize = new Sequelize({
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPassword,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    lookup: (hostname: string, opts: any, cb: any) => {
      dns.lookup(hostname, { family: 4, all: false }, cb);
    },
  } as any,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    console.log('✅ Using Postgres migrations for schema management');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
