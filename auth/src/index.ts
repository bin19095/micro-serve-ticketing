import express from 'express';
import 'express-async-errors' 
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';	
import { currentUserRouter} from './routes/current-user';

import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';
import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';




const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
app.use((req, res, next) =>{
  currentUserRouter});
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter)

app.all('*',  (req, res) => {
   new NotFoundError();
});



app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);


});

const start = async() =>{
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined');
  }
  try{
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  console.log('Connected to MongoDB');
  }catch(err){
    console.error(err);
  }

  app.listen(3000, () =>{
    console.log('Listening on port 3000');
});
};
start();
