import assert from 'assert/strict'
import supertest from 'supertest'

import mongoose from 'mongoose'

import { MONGODB_CNX_STR } from '../config/mongodb.config.js'
import { HOST } from '../config/server.config.js'

const baseUrl = `${HOST}`

const requester = supertest(baseUrl)

const mockUser = {
    "firstName":"Usuario 7",
    "lastName": "Apellido 7",
    "age": "77",
    "password": "12345",
    "email": "usuario7@mail.com",
    "role": "user"
}

let jwt

describe('Pruebas funcionales', () => {

    describe('Usuarios', ()=> {
    
        describe('Creación de usuario', ()=>{
            it('Obtención de JWT', async ()=>{
                const {body} = await requester.post('/api/users/register').send(mockUser)
                jwt = body.payload
                assert.ok(jwt.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))
            })
        })
        
        describe('Logueo de usuario', ()=>{
            it('Obtención de JWT', async ()=>{
                const {body} = await requester
                .post('/api/sessions/login')
                .send(mockUser)
                jwt = body.payload
                assert.ok(jwt.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'))
            })
        })
      
        describe('Obtención de perfil de usuario', ()=>{
            it('Datos de usuario registrado', async ()=>{
                console.log(jwt)
                const {body} = await requester
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${jwt}`)
                assert.ok(body?.payload?._id)
            })
        })
    })
})