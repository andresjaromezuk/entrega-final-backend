//Repositories
import { cartRepository } from '../repositories/cart.repository.js'

//Services
import { productService } from './product.service.js'

//Errors
import { NotFoundError } from '../models/errors/notfound.error.js'

class CartService{

    async readOnePopulated(id){
        const cart =  await cartRepository.readOnePopulated(id)
        if(!cart) throw new NotFoundError('Cart') 
        return cart
    }

    async readManyPopulated(){
        return await cartRepository.readManyPopulated()
    }

    async create(){
        return await cartRepository.create()
    }

    async updateOne(criteria, newData){
        const cart = await cartRepository.updateOne(criteria, newData)
        if(!cart) throw new NotFoundError('Cart')
        return cart
    }

    async updateProductInCart(cid, pid, user){

        //Búsqueda de producto (service arroja su error)
        const item = await productService.readOne({_id: pid})
        
        const cart = await cartRepository.readOne(cid)
        if(!cart) throw new NotFoundError('Cart')

        let {products} = cart
        const product = products.find(item => item.product === pid)
        console.log(pid)
        
        if (!product) {
            products.push({
                product: pid,
                quantity: 1
            })
        } else {
            products.map(item =>{
                if(item.product === pid){
                    item.quantity += 1
                }
            })
        }

        const updatedCart= await cartRepository.updateOne({_id:cid},{$set:{products: products, user_id: user._id}} )

        return updatedCart
    }

    async emptyCart(id){
        const cart = await cartRepository.updateOne({_id:id}, {$set:{products: []}})
        return cart
    }

    async deleteProductFromCart(cid, pid){
        const item = await productService.readOne({_id: pid})
        
        const cart = await cartRepository.readOne(cid)
        if(!cart) throw new NotFoundError('Cart')

        let {products} = cart
        products.map(item =>{
            if(item.product === pid){
                if (item.quantity > 0){
                    item.quantity -= 1
                }
            }
        })
        products = products.filter(item => item.quantity !==0)
        const cart_updated = await cartRepository.updateOne({_id:cid},{$set:{products: products}})
        return cart_updated
    }

    async deleteOne(id){
        return await cartRepository.deleteOne(id)
    }
}

export const cartService = new CartService()