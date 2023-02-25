const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const FoodModel = require('./models/Food')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://sdshaheer:sdshaheer@cluster0.ociaxgh.mongodb.net/food?retryWrites=true&w=majority',{
    useNewUrlParser:true,
})

app.post('/insert',async(req,res) =>{

    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName:foodName,daysSinceIAte:days})

    try{
        await food.save()
        res.send('data sended')
    }
    catch(err){
        console.log('error')
    }
})

app.get('/read',async(req,res) =>{

    FoodModel.find({},(err,result) => {
        if(err){
            res.send(err)
        }
        res.send(result)
    })

    
})

app.put('/update',async(req,res) =>{

    const newFoodName = req.body.newFoodName
    const id = req.body.id

    try{
        await FoodModel.findById(id,(err,updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save()
        })
    }
    catch(err){
        console.log('error')
    }
})

app.delete('/delete/:id',async(req,res) =>{

    const id = req.params.id

    try{
        await FoodModel.findByIdAndRemove(id).exec()
    }
    catch(err){
        console.log('error')
    }
})

app.listen(3001,() =>{
    console.log('server running on port 3001...')
})