import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';

dotenv.config();

// Resolve database mode: prefer DATABASE_URL then SUPABASE_URL; fallback to SQLite if neither
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_URL;
const useSQLite = process.env.USE_SQLITE === 'true' || !databaseUrl;

let sequelize: Sequelize;

if (useSQLite) {
  // Use SQLite (local dev or fallback when SUPABASE_URL is missing)
  const dbPath = path.join(__dirname, '../../database.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
  console.log('Using SQLite database (local dev or fallback). Set SUPABASE_URL or USE_SQLITE=false to use Postgres.');
} else {
  // Use Supabase (Postgres)
  const dbUrl = new URL(databaseUrl as string);
  const dbHost = dbUrl.hostname;
  const overrideHost = process.env.SUPABASE_HOST_IPV4;
  const dbPort = parseInt(dbUrl.port || '5432');
  const dbName = dbUrl.pathname.split('/')[1];
  const dbUser = dbUrl.username;
  const dbPassword = dbUrl.password;

  sequelize = new Sequelize({
    host: (overrideHost || dbHost),
    port: dbPort,
    database: dbName,
    username: dbUser,
    password: dbPassword,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Supabase requires this
      },
      // Force IPv4 resolution to avoid ENETUNREACH on IPv6-only routes
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
}

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // For SQLite, sync tables automatically. For Supabase, use migrations
    if (useSQLite) {
      // Temporarily disable sync to avoid migration issues
      // await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
      console.log('✅ SQLite database connection ready (sync disabled)');
    } else {
      console.log('✅ Using Supabase migrations for schema management');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
