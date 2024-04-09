import { randomUUID } from 'crypto'

export class Cart{
    #_id 
    #products
    #user_id
    #status

    static statuses = { INITIALIZED: 'initialized', COMPLETED: 'completed' }

    constructor(
        {_id = randomUUID(),
        status = Cart.statuses.INITIALIZED,
        user_id,
        products}
    ){
        this.#_id = _id
        this.#status = status
        this.#user_id = user_id
        this.#products =  products
    }

    get id(){return this.#_id}  
    get user_id(){return this.#user_id}
    get products(){return this.#products}
    get status(){ return this.#status} 
    
    complete(){
        this.#status = Cart.statuses.COMPLETED
    }
    
    initialized(){
        this.#status = Cart.statuses.INITIALIZED
    }

    toObject(){
        return {
            _id: this.#_id,
            user_id: this.#user_id, 
            products: this.#products,
            status: this.#status
        }
    }

}