import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  console.log(process.env.NODE_ENV)
  process.env.JWT_SECRET = "secret";
  try {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections()!;

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.close();
    await mongo.stop();
  }
});

export const signin = async () =>  {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie ;
};
