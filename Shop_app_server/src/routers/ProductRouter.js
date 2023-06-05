import { fetchAllProduct , fetchProductByCategory, fetchProductById, productChildren, productMen, productWomen, saveProduuct } from "../controllers/ProductController.js";
import multer from "multer";
import express from "express";


const ProductRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/images')
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})

ProductRouter.post('/products',upload.single('pImage') , saveProduuct)
ProductRouter.get('/products', fetchAllProduct)  

ProductRouter.get('/products/single/:id', fetchProductById)
ProductRouter.get("/products/:category",fetchProductByCategory)
ProductRouter.get('/products/category/men', productMen)
ProductRouter.get('/products/category/women', productWomen)
ProductRouter.get('/products/category/children', productChildren)
export default ProductRouter