import assert from 'node:assert/strict'
import {cartService} from '../../services/cart.service.js'
import { connectDB, disconnectDB } from '../../database/mongodb.js'
import { expect, should } from 'chai'

const mockProducts = [{
    "product": "dab750b0-5e49-458c-b99d-2a0003253680",
    "quantity": 3
}]

let mockCart 
  
describe('Product Service', () => {
    before(async () => {
        await connectDB()
        mockCart = await cartService.create()
    })

    after(async () => {
        await disconnectDB()
    })
    
    describe('updateProductInCart', () => {
        it('cart with products', async () => {
        console.log(mockCart)
        const cart = await cartService.updateOne({_id: mockCart._id}, {$set:{products: mockProducts}})
        console.log(cart)
        assert.ok(cart.products.length > 0)
        })
    })
   
    describe('Delete Cart', () => {
        it('Cart deleted', async () => {
        const cartDeleted = await cartService.deleteOne({_id: mockCart._id})
        console.log(cartDeleted)
        expect(cartDeleted._id).to.be.equal(mockCart._id)
        })
    })
})
