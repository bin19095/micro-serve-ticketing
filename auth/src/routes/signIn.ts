import express, {Request, Response, NextFunction} from 'express';
import {  body } from 'express-validator';
import jwt from 'jsonwebtoken';	

import { Password } from '../services/password';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')	
],validateRequest, 
( req: Request, res: Response) => {
    res.send('Hi SingIn Here!');
    console.log('INside singining')
    // const { email, password } = req.body;
    // console.log('testing')

    // const existingUser = await User. findOne({ email});
    // if(!existingUser){
    //    throw new BadRequestError('Invalid credentials');
    // }
    // const passwordsMatch = await Password.compare(
    //     existingUser.password, 
    //     password);
    //     if(!passwordsMatch){
    //         throw new BadRequestError('Invalid credentials');
    //     }
    
    // // res.send('Hi there!');
    //         if(!process.env.JWT_KEY){
    //             throw new Error('Error creating JWT')
    //         }
    //             const userJwt = jwt.sign({
    //                 id: existingUser.id,
    //                 email: existingUser.email
    //             }, process.env.JWT_KEY!);
                
    
    //         //Store it on session Object\
    //         req.session = {
    //             jwt: userJwt
    //         }
    //         res.status(200).send(existingUser);

});

export { router as signInRouter };
