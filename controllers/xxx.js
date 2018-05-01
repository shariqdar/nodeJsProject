const mongoose = require('mongoose');
const City = require('../models/city');
var result;
exports.getCities = (req, res, next)=>{
    var page = Number(req.params.pageNo);
        page = --page * 10
    City.find({})
        .limit(10)
        .skip(page)
        .exec()
        .then(response =>{
            console.log("checking count",response);
             result ={
                type: 'GET',
                message: 'List of all Cities',
                count: response.length,
                data: response.map(docs=>{
                    return {
                        id: docs._id,
                        name:docs.name,
                        country:docs.country
                    }
                    
                })
                
            }
           // const countQuery = City.find({}).count().exec();
            City.find().count({}, (err,countQuery)=>{

                res.status(200).json({
                    data: result,
                    totalCount: countQuery
                })

            })
            
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })

}

exports.postCity = ( req, res, next)=>{
    const city = new City({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        country: req.body.country
    });
    city.save()
        .then(response =>{
            res.status(201).json({
                message: 'City Saved Successfully'
            })
        })
        .catch(error =>{
            res.status(500).json({
                message: error
            })
        })
}