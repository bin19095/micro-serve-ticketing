import express from 'express';
import 'express-async-errors' 
import { json } from 'body-parser';
import cookieSession from 'cookie-session';	
import { currentUserRouter} from './routes/current-user';

import { signInRouter } from './routes/signIn';
import {signOutRouter} from './routes/signOut';
import { errorHandler } from './middlewares/error-handler';
import { signUpRouter } from './routes/signUp';

import { NotFoundError } from './errors/not-found-error';



const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
     // No encryption (JWT handles security)
    signed: false, 
    secure: process.env.NODE_ENV !== 'test', // Secure only in production
   // secure: process.env.NODE_ENV !== 'test', // Secure only in production
  })
);
// app.use(( req: express.Request, res: express.Response, next: express.NextFunction) =>{

//   currentUserRouter(req, res, next);
// });
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter)

app.all('*',  (req, res) => {
   new NotFoundError();
});



app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);


});

export { app };
