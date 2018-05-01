const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');

exports.get_products = (req, res, next)=>{

    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs =>{
        if(docs.length > 0){
            const response = {
                count: docs.length,
                products: docs.map(doc =>{
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/'+ doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }else{
            res.status(404).json({message: 'No Entries Found'});
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({ message:error});
    })
}

exports.add_product = (req, res, next)=>{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result =>{
            res.status(201).json({
                message: 'Product created successfully',
                product: {
                    name: product.name,
                    price: product.price,
                    id: product._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+product._id
                    }
                }
            });
        })
        .catch(error=> {
            res.status(500).json({
                message: 'Handling POST request to products failed',
                error: error
            });
        });

}

exports.get_product = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .select("name price _id productImage")
        .exec()
        .then(doc => {          
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({
                    message: 'No Record found aganist ID'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error});
        })
}

exports.update_product = (req, res, next)=>{
    const id = req.params.productID;
    const updateOps = {};
    //console.log(req.body)
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id}, { $set: updateOps })
        .exec()
        .then( result =>{
            res.status(200).json({
                message: 'Update successfull',
                id: id,
                updatedFields: updateOps,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            })
        })
        .catch(error=>{
            res.status(500).json({message: error})
        });
}

exports.delete_product = (req, res, next) =>{
    const id = req.params.productID;
       Product.findById(id)
        .exec()
        .then(docs=>{
            if(docs){
                Product.remove({_id: id})
                .exec()
                .then( result =>{
                    res.status(200).json({
                        message: 'Product deleted successfully',
                        id: id
                    });
                })
                .catch(error =>{
                    console.log(error);
                    res.status(500).json({message: error})
                })
            }else{
                res.status(404).json({
                    message: 'Product not found'
                });
            }

        })
        .catch(error =>{
            res.status(500).json({message: error})
        })
    
}