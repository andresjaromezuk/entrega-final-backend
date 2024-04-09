import { Schema, model } from 'mongoose'
import { MongooseDao } from './mongoose.dao.js'

const ticketSchema = new Schema({
  _id: { type: String },
  code: { type: String },
  purchase_datatime: { type: String },
  amount: { type: Number },
  purchaser: { type: String },
  user_id: { type: String },
  products: [{product:{type: String, ref: 'products', required: true }, quantity:{type: Number, required: true}}],
  status:{ type: String }
}, {
  strict: 'throw',
  versionKey: false,
  statics: {},
  methods: {}
})

const dbTickets = model('tickets', ticketSchema)

class TicketDaoMongoose extends MongooseDao{
  constructor(model){
    super(model)
  }

  async readOnePopulated(id){
    const cart = await super.readOnePopulated({_id: id}, 'products.product')
    return cart
  }
  
  async readManyPopulated(criteria){
    const cart = await super.readManyPopulated(criteria, 'products.product')
    return cart
  }

}

export const ticketDaoMongoose = new TicketDaoMongoose(dbTickets)