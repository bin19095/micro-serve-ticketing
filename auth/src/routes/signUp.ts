import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('email' + email + 'password ' + password)
  try {
        
    const { email, password } = req.body;
    console.log('email' + email + 'password ' + password);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = new User({ email, password });
        await user.save();

        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }

        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY
        );

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    } catch (err) {
        console.error('Error during signup:', err);
        if (err instanceof BadRequestError) {
            res.status(400).send({ errors: [{ message: err.message }] });
        } else {
            console.error(err);
            res.status(500).send({ errors: [{ message: 'Internal Server Error' }] });
        }
    }
  }
);

export { router as signUpRouter };
