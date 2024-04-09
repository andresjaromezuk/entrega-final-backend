import { userDao } from "../dao/factory.js";
import {User} from '../models/User.js'

class UserRepository{
    constructor(){}

    async readOne(criteria){
        return userDao.readOne(criteria)
    }
    
    async readMany(criteria){
        return userDao.readMany(criteria)
    }

    async uploadDocument(id, document){
        return await userDao.uploadDocument(id, document)
    }

    async updateOne(criteria, newData){
        return await userDao.updateOne(criteria, newData)
    }
    
    async deleteMany(criteria){
        return await userDao.deleteMany(criteria)
    }
   
    async deleteOne(criteria){
        return await userDao.deleteOne(criteria)
    }
    
    async resetPassword(body){
        return await userDao.resetPassword(body)
    }
    
    async create(body){
        const {email, password, firstName, lastName, age} = body
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            age,
        })
        const userDto =  await userDao.create(user.toObject())
        return new User(userDto).toObject()
    }
    

}

export const userRepository = new UserRepository()