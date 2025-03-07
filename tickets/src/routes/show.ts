import express, { Request, Response}  from 'express';
import { Ticket} from '../models/ticket';
import {NotFoundError} from '@bin19095/common';;
const router = express.Router();

router.get('/api/tickets/:id', async( req: Request, res: Response) => { 
    const ticket = await Ticket.findById(req.params.id);
    console.log('show ticket response', ticket)
    if(!ticket){
        throw new NotFoundError();
    }
    res.send(ticket);

})
export { router as showTicketRouter }
