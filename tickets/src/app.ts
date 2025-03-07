import express from 'express';
import 'express-async-errors' 
import { json } from 'body-parser';
import cookieSession from 'cookie-session';	
import  { createTicketRouter } from './routes/new';
import { errorHandler, NotFoundError, currentUser } from '@bin19095/common';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
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
app.use(createTicketRouter)
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);



app.all('*',  (req, res) => {
   new NotFoundError();
});



app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);


});

export { app };
