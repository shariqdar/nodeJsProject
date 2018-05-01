const Product = require('../models/product');
const mongoose = require('mongoose');
const Order = require('../models/order');

exports.get_orders = (req, res, next)=>{
    Order.find()
         .select("quantity product id")
         .populate('product','name')
         .exec()
         .then(doc => {
            if(doc){
                res.status(200).json({
                    count: doc.length,
                    orders: doc.map(docs => {
                        return {
                           id: docs.id,
                           product: docs.product,
                           quantity: docs.quantity,
                           request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/'+ docs.id
                            }
                        }
                    
                    })
                });
            }else{
                res.status(404).json({
                    message: 'No Orders Available'
                });
            }
         })
         .catch(error => {

         });
}

exports.add_order = (req, res, next)=>{
    Product.findById(req.body.productID)
        .then(product =>{
            if(!product){
                res.status(404).json({
                    message: 'Product not found',
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productID
            });
            return order.save();
        })
        .then(response =>{
            res.status(201).json({
                message: 'Order placed successfully',
                orderDetails:{
                    id: response.id,
                    product:response.product,
                    quantity:response.quantity

                },
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/orders'+response.id
                }
            });
        })
        .catch(error => {
            res.status(500).json(error)
        });
}

exports.get_order = (req, res, next)=>{
    Order.findById(req.params.orderID)
        .exec()
        .then(response => {
            if(!response){
                res.status(404).json({
                    message: 'Order not Found'
                });
            }
            res.status(200).json({
                id: response.id,
                product: response.product,
                quantity: response.quantity
            });
        })
        .catch(error => {
            res.status(500).json({message: 'Internal Server Error'})
        })
}

exports.delete_order = (req, res, next)=>{
    Order.findById(req.params.orderID)
    .then(order => {
        if(!order){
            res.status(404).json({
                message: 'Order Not Found'
            });
        }
        Order.remove({_id:req.params.orderID})
            .exec()
        
    })
    .then(response =>{
        res.status(200).json({
            message: 'Order Deleted Successfully'
        })

    })
    .catch(error=>{
        res.status(500).json({
            message: error
        });
    })
}