//DAO
import { userDao } from "../dao/factory.js"

//Errors
import {NotFoundError} from '../models/errors/notfound.error.js'
import {ConflictError} from '../models/errors/conflict.error.js'
import { UnprocessableEntityError } from "../models/errors/unprocessable.entity.error.js"

//Repository
import { userRepository } from "../repositories/user.repository.js"

//Services

import {emailService} from './email.service.js'

//DTO
import { UserDto } from "../dto/user.dto.js"

//Utils
import { isValidPassword } from "../utils/encryptor.js"

//Config
import { HOST } from "../config/server.config.js"

class UserService {
    constructor(){}

    async readOne(criteria){
        const user = await userRepository.readOne(criteria)
        if(!user)throw new NotFoundError('User')
        return new UserDto(user).dto()
    }

    async readMany(criteria){
        let users = await userRepository.readMany(criteria)

        users = users.map(user =>{
            return new UserDto(user).dto2()
        })
        return users
    }

    async create(body){
        const user = await userRepository.readOne({email: body.email})
        console.log(user)
        if (user) throw new ConflictError()
        return await userRepository.create(body)
    }

    async resetPassword (body){
        console.log(body)
        const {email, password} = body
        const user = await userRepository.readOne({email: body.email})
        const test = isValidPassword(password, user)
        if(test) throw new UnprocessableEntityError('A new Password is')
        return await userRepository.resetPassword(body)
    }
   
    async checkTimestamp (timestamp){
        const checkTime = Date.now() - timestamp
        if (checkTime> 3600000) throw new Error('Link expirado') 
    }

    async uploadDocument(file, id){
        await userRepository.readOne({_id: id})
        const document = [
            {
                name: file.filename,
                reference: `${HOST}/static/images/documents/${file.filename}`
            }
        ]
        return userRepository.uploadDocument({_id: id},document)
    }

    async setUserToPremium(id, body){
        let user = await userRepository.readOne({_id: id})
        const new_role = body.role    
        const documents = user.documents.length

        if (new_role !== "user" ||  new_role !== "premium" ){
            throw new UnprocessableEntityError("Correct Attribute")
        }

        if (new_role === "premium"){
            if (documents < 3){
                throw new UnprocessableEntityError("Documents")
            }
            user.role = "premium"
        }else if (new_role === "user"){
            user.role = new_role
        }
        user = await userRepository.updateOne({_id: id}, user)
        return user
    }

    async deleteInactiveUsers(){
        const checkTime = Date.now() - 172800000

        const users = await userRepository.readMany({last_connection: { $lt: checkTime } }) 
        
        if (users.length > 0){
            await userRepository.deleteMany({last_connection: { $lt: checkTime }, role: { $ne: "admin" } })
            users.forEach(async function(user){
                await emailService.deletedUser(user.email, "Usuario eliminado", "Tu usuario fue eliminado por falta de uso.")
            })
        } 
    }
    
    async deleteUser(id){
        const user =  await userRepository.deleteOne(id) 
        if (!user){
            throw new NotFoundError('User')
        }
        return user
    }

}

export const userService = new UserService()