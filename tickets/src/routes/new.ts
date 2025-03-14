import express , { Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@bin19095/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from  '../events/publisher/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';;

const router = express.Router();

router.post('/api/tickets', requireAuth, 
    [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('price').isFloat({ gt: 0}).withMessage('Price must be greater than 0')
],validateRequest, async (req: Request, res: Response) =>{
    const { title, price } = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();
    try {
        await new TicketCreatedPublisher(natsWrapper.client).publish({
          id: ticket.id,
          title: ticket.title,
          price: ticket.price,
          userId: ticket.userId,
          version: ticket.version
        });
      } catch (err) {
        console.error('Error publishing event:', err);
      }
  
          // adding this line to include updatedAt field in the response
  

    
    res.status(201).send(ticket);

});

export { router as createTicketRouter};
