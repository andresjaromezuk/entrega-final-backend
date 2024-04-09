import { ticketDao } from "../dao/factory.js";
import { Ticket } from "../models/Ticket.js";


export class TicketRepository{

    async save({amount, user, products_to_ticket, purchaser}){
        const ticket = new Ticket({
            amount,
            user_id: user._id,
            products: products_to_ticket,
            purchaser: purchaser 
        })
        ticket.complete()
        const ticketDto = await ticketDao.create(ticket.toObject())
        return new Ticket(ticketDto).toObject()
    }

    async readOnePopulated(id){
        return await ticketDao.readOnePopulated(id)
    }
    
    async readMany(query){
        return await ticketDao.readMany(query)
    }
}

export const ticketRepository = new TicketRepository()