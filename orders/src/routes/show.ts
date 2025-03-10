import express, { Request, Response}  from 'express';
//import { Ticket} from '../models/ticket';
import {NotFoundError} from '@bin19095/common';;
const router = express.Router();

router.get('/api/orders/:id', async( req: Request, res: Response) => { 
    //const ticket = await Ticket.findById(req.params.id);
    //console.log('show ticket response', ticket)
        res.send({});

})
export { router as showOrderRouter }
