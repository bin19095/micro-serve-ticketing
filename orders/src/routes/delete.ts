import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError } from '@bin19095/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

    router.delete('/api/orders/:orderId', requireAuth, async ( req: Request, res: Response) =>{
      const { orderId } = req.params;
        // const tickets = await Ticket.find({});
    const order = await Order.findById(orderId).populate('ticket')
    order?.ticket.id;
        if(!order){
            throw new NotFoundError();
        }
        if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizedError();
        }
        order.status = OrderStatus.Cancelled;
        await order.save();
        res.status(204).send(order);//res.status(204).send(order) for deletetion;
        //publishing an devent saying this was cancelled!
        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
          //  version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });
         

    });

export { router as deleteOrderRouter }
