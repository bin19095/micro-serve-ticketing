
import express, { Request, Response } from 'express';
import { currentUser } from '@bin19095/common';
// import { requireAuth } from '../middlewares/require-auth';
const router = express.Router();

router.get('/api/users/currentuser', currentUser,(req: Request, res: Response) => {
  if(req.currentUser){
    res.send({currentUser: req.currentUser});
  }else{
  res.send({currentUser: null})
  }
  //res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter}
