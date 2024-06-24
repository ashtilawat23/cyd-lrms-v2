import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};
const dbName = process.env.MONGO_DB_NAME;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('MongoDB URI not found in environment.');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the database is not
  // repeatedly opened/closed
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}