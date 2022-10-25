import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'
import Catergory from '../models/catergoryModel.js'

const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).limit(10).sort({createdAt:-1})
    res.json(products)
}
)

const getCatergories = asyncHandler(async(req,res)=>{
    const catergories = await Catergory.find({})
    res.json(catergories)
}
)

const getProductsByCatergory = asyncHandler(async(req,res)=>{
    const catergory = req.params.catergory
    const products = {}
    const category = await Catergory.findById(catergory)
    

    if(category){

        products['catergory'] = category.name
        const products_arr = await Product.find({category:catergory})
        products['products'] = products_arr
        res.json(products)

    }else{

        res.status(404)
        throw new Error('Catergory not found')

    }
}
)

const getProductsById = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const product = await Product.findById(id).populate('category')

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
}
)

export {
    getProducts,
    getProductsById,
    getCatergories,
    getProductsByCatergory
}