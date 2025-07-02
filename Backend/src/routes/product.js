const express = require('express');
const productRouter = express.Router();
const Product = require("../models/Products");
const {userAuth} = require("../middlewares/Auth");
const {validateEditProductData} = require("../utils/validation");

//creating a product
productRouter.post('/create', userAuth , async (req,res)=>{
    try{
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json({message:"Product created successfully", savedProduct})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

//products with pagination

productRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        limit = limit > 50 ? 50 : limit;
        // console.log(page,limit,skip)
        const product = await Product.find().skip(skip).limit(limit);
        res.status(200).json({message:"Prduct fetched successfully" , product})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

// Get product by name of the product
productRouter.get('/find/:name', async (req, res) => {
    try {
        const productName = req.params.name;
        const product = await Product.findOne(
            {name: { $regex: productName, $options: 'i' }}
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({message:"product found successfully", product});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get whole detail of a product

productRouter.get('/findDetail/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: "Product found successfully", product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//updating the proeuct

productRouter.patch('/update/:id',userAuth,async(req,res)=>{

    try{
        if(!validateEditProductData(req)){
            return res.status(400).json({message:"Invalid Edit Request"})
        }

        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(400).json({message:"No Product Found"})
        }

        Object.keys(req.body).every(key => product[key] = req.body[key]);

        await product.save();

        res.status(200).json({message:"Prodcut Updated Successfully", product})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
//deleting a product

productRouter.delete('/delete/:id', userAuth, async(req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(400).json({messsage:"Cannot Delete the project"})
        }
        res.status(200).json({message:"Product Deleted Successfully"})
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
module.exports = productRouter