import moongose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import categories from './data/catergories.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/productModel.js'
import Catergory from './models/catergoryModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Catergory.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleCatergories = categories.map(catergory=>{
            return {...catergory, user:adminUser}
        })

        const createdCatergories = await Catergory.insertMany(sampleCatergories)
        

        const sampleProducts = products.map(product=>{

            const cater = createdCatergories.find(catergory=>{
                return product.category === catergory.name
            })

            return {...product, user:adminUser, category:cater}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported')
        process.exit()
    }
    catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        await Catergory.deleteMany()

        console.log('Data Destroyed')
        process.exit()
    }
    catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] == '-d'){
    destroyData()
}else{
    importData()
}