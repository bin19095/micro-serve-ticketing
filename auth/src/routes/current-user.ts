import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
const router = express.Router();


type UserPayload = {
    id: string;
    email: string;
}
  

router.get('/api/users/currentuser', (req, res) => {
    // if (!req.session?.jwt) {
    //     return res.send({ currentUser: null });
    // }
    // try {
    //     const payload = jwt.verify(
    //         req.session.jwt,
    //         process.env.JWT_KEY!
    //     ) as UserPayload;
    //     return res.send({ currentUser: payload });
    // } catch (err) {
    //     return res.send({ currentUser: null });
    // }
    res.send('Hi there!');

});

export { router as currentUserRouter };
