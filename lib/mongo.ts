// lib/mongo.ts
import { MongoClient, Db, ServerApiVersion } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDB(): Promise<{ client: MongoClient; db: Db }> {
  if (client && db) return { client, db };

  const uri = process.env.MONGODB_URI;
  console.log(uri);
  if (!uri) throw new Error("MONGODB_URI is not defined");

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db("job-task"); // Your DB name
  return { client, db };
}
