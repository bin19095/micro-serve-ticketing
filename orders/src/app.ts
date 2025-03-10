import express from 'express';
import 'express-async-errors' 
import { json } from 'body-parser';
import cookieSession from 'cookie-session';	

import { errorHandler, NotFoundError, currentUser } from '@bin19095/common';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
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
app.use(currentUser);

app.use(newOrderRouter)
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);



app.all('*',  (req, res) => {
   new NotFoundError();
});



app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);


});

export { app };
