import express from 'express'

import { getCatergories, getProducts, getProductsByCatergory, getProductsById } from '../controllers/productController.js'
const router = express.Router()

// @desc  Fetch all products
// @route GET /api/products
// @access Public
router.get('/products', getProducts)

// @desc  Fetch all product catergories
// @route GET /api/catergories
// @access Public
router.get('/catergories',getCatergories)

// @desc  Fetch all products in Catergory
// @route GET /api/:catergory
// @access Public
router.get('/catergories/:catergory', getProductsByCatergory)


// @desc  Fetch a product
// @route GET /api/products/:id
// @access Public
router.get('/products/:id', getProductsById)

export default router