import { ticketService } from "../services/ticket.service.js";
export async function handleGet(req, res, next){
    try {
        req.logger.http(`Ticket - handleGet: ${req.method} en ${req.url}`)
        let ticket
        if(req.params.id){
            ticket = await ticketService.readOne({_id: req.params.id})
        }else{
            ticket = await ticketService.readMany(req.user)
        }
        res['successfullGet'](ticket)
    } catch (error) {
        req.logger.error(`Error en ticket handleGet: ${error.message}`)
        next(error)
    }
}

export async function handlePost(req, res, next){
    try {
        req.logger.http(`Ticket - handlePost: ${req.method} en ${req.url}`)
        req.logger.info(`Body: ${JSON.stringify(req.body)}`)
        const ticket = await ticketService.create(req.body)
        console.log(ticket)
        res['successfullPost'](ticket)
        //return res.status(200).json({status: "Success", payload: ticket})
    } catch (error) {
        req.logger.error(`Error en ticket handlePost: ${error.message}`)
        next(error)
    }
}