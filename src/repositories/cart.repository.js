import { cartDao } from "../dao/factory.js";
import { Cart } from "../models/Cart.js";


export class CartRepository{

    async create(){
        const cart = new Cart({
            products: [],
            user_id: ""
        })
        cart.initialized()
        console.log(cart.toObject())
        const cartDto = await cartDao.create(cart.toObject())
        return new Cart(cartDto).toObject()
    }

    async readOne(cid){
        return await cartDao.readOne({_id: cid})
    }
    async readOnePopulated(id){
        return await cartDao.readOnePopulated(id)
    }
    
    async readManyPopulated(){
        return await cartDao.readManyPopulated()
    }

    async updateOne(criteria, newData){
        return await cartDao.updateOne(criteria, newData)
    }

    async deleteOne(id){
        return await cartDao.deleteOne(id)
    }
}

export const cartRepository = new CartRepository()