const express=require('express')
const route= express.Router()
const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userController = require("../controlles/userController")
// create user
route.post('/register',userController.register)
route.post('/login',userController.login)
route.post('/forgetpassword',userController.forgetpassword)
route.post('/reset-password',userController.resetPassword)

// get one user
route.get('/user/:id',(req,res,next)=>{
    db.User.findOne({where:{id:req.params.id},include:[db.Product]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})
//get all users
route.get('/users',(req,res,next)=>{
    db.User.findAll({include:[db.Product]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(40).send(err))
})
//update
route.patch('/user/:id',(req,res,next)=>{
    db.User.update({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(4000).send(err))
})
//supprimer
route.delete('/user/:id',(req,res,next)=>{
    db.User.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})
module.exports = route