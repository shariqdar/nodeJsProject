const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const locationRoutes = require('./api/routes/locations');
const cityRoutes = require('./api/routes/cities')
mongoose.connect('mongodb://'+ process.env.MONGO_ATLAS_UN +':'+ process.env.MONGO_ATLAS_PW +'@shopping-shard-00-00-xjlos.mongodb.net:27017,shopping-shard-00-01-xjlos.mongodb.net:27017,shopping-shard-00-02-xjlos.mongodb.net:27017/test?ssl=true&replicaSet=shopping-shard-0&authSource=admin')
//mongoose.connect('mongodb+srv://'+ process.env.MONGO_ATLAS_UN +':'+ process.env.MONGO_ATLAS_PW +'@shopping-xjlos.mongodb.net/test')
app.use(express.static('upload'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/location', locationRoutes);
app.use('/cities', cityRoutes);
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;