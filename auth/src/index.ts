import express from 'express';
import 'express-async-errors' 
import { json } from 'body-parser';
import { signInRouter } from './routes/sign-In';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter} from './routes/current-user';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter)

app.all('*', async (req, res) => {
   new NotFoundError();
});


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});


 
app.listen(3000, () =>{
    console.log('Listening on port 3000');
});
