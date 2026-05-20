import app from '../../cms-backend/src/app';
import { connectDatabase } from '../../cms-backend/src/config/database';

let dbInitPromise: Promise<void> | null = null;

const ensureDatabase = async (): Promise<void> => {
  if (!dbInitPromise) {
    dbInitPromise = connectDatabase();
  }
  await dbInitPromise;
};

const handler = async (req: any, res: any) => {
  await ensureDatabase();
  return app(req, res);
};

export default handler;
