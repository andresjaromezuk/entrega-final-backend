import { Router } from 'express'
import { handlePost, handleGet } from '../../controllers/ticket.controller.js'
import {apiUserLogged, apiAdminAccess} from '../../middleware/authorization.js'
import passport from 'passport'

export const ticketRouter = Router()

ticketRouter.get('/', 
passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
apiUserLogged,
handleGet)

ticketRouter.get('/:id',
passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
apiUserLogged, 
handleGet)

ticketRouter.post('/', 
passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }),
apiUserLogged, 
handlePost)