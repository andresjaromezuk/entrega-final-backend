import { randomUUID } from 'crypto'

import { UnprocessableEntityError } from './errors/unprocessable.entity.error.js'

export class User{
    #_id
    #email 
    #password 
    #firstName 
    #lastName 
    #age 
    #cartId 
    #role
    #documents
    #last_connection 

    constructor(
        {_id = randomUUID(),
        email,  
        password,
        firstName,
        lastName,
        age, 
        cartId= null,  
        role= "user", 
        documents= [], 
        last_connection = null  }
    ){    
        this.email= email 
        this.password= password 
        this.firstName= firstName 
        this.lastName= lastName 
        this.age= age 
        this.#cartId= cartId 
        this.#role= role
        this.#documents= documents
        this.#last_connection= last_connection
    }
   
    get _id() {this.#_id}
    get email() {this.#email} 
    get password() {this.#password} 
    get firstName() {this.#firstName} 
    get lastName() {this.#lastName} 
    get age() {this.#age} 
    get cartId() {this.#cartId} 
    get role() {this.#role}
    get documents() {this.#documents}
    get last_connection() {this.#last_connection} 
    
    
    set email (value){
        if(!value){
            throw new UnprocessableEntityError('Email')
        }
        this.#email = value
    } 
    set password (value){
        if(!value){
            throw new UnprocessableEntityError('Password')
        }
        this.#password = value
    } 
    set firstName (value){
        if(!value){
            throw new UnprocessableEntityError('Firstname')
        }
        this.#firstName = value
    } 
    set lastName (value){
        if(!value){
            throw new UnprocessableEntityError('Lastname')
        }
        this.#lastName = value
    } 
    set age (value){
        if(!value){
            throw new UnprocessableEntityError('Age')
        }
        this.#age = value
    } 
    

    toObject(){
        return {
            _id: this.#_id,
            email: this.#email, 
            password: this.#password, 
            firstName: this.#firstName, 
            lastName: this.#lastName, 
            age: this.#age, 
            cartId: this.#cartId, 
            role: this.#role,
            documents: this.#documents,
            last_connection: this.#last_connection
        }
    }

}