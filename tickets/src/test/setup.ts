import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
declare global {
  var signIn: () => string[];
  }

let mongo: any
beforeAll(async () =>{
  process.env.JWT_KEY = 'binay';
    const   mongo = await MongoMemoryServer.create();
  const mongoUri =  mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async() =>{
    if(mongoose.connection.db){
  const collections = await mongoose.connection.db.collections();
  for(let collection of collections) {
    await collection.deleteMany({})
        }
  }
});

afterAll(async() =>{
    if(mongo ){ 
    await mongo.stop();
    }
  await mongoose.connection.close();
  
});


  global.signIn = () => {
  
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString() ,
      email: 'friday@gmail.com'
    };
    //Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build sesssion Object: { jwt: MY_JWT}
    const session = { jwt: token };

    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
      
    //return a string thats the cookie iwth the encoded data
    return [`session=${base64}`];


    //   const email = "test@test.com";
  //   const password = "password";

  //   const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //       email, password
  //   })
  //   .expect(201);

  //   const cookie = response.get("Set-Cookie");
 
  // if (!cookie) {
  //   throw new Error("Failed to get cookie from response");
  // }
  // return cookie;
  };



  