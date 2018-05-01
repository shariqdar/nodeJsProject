const Location = require('../models/location');
const mongoose = require('mongoose');

exports.saveLocation = (req, res, next)=>{
    var dd = mongoose.model('Location').aggregate().near({
        near: [req.body.longitude, req.body.latitude],
        distanceField: 50000
      })
      console.log("dd",dd);
    const location = new Location({
        _id: new mongoose.Types.ObjectId,
        user: req.body.user,
            type: req.body.type,
            coordinates: [req.body.latitude,req.body.longitude]
        
      });

    location.save()
    .then(result =>{
        res.status(201).json({
            message:'Coodinates saved successfully',
            dd: dd
        })
    })
    .catch(error =>{
        res.status(500).json({
            message: error
        })
    })
}
exports.deleteLocations = (req, res, next)=>{
    Location.remove({_id:req.params.ID})
        .exec()
        .then(result =>{
                res.status(200).json("success")
        })
        .catch(error =>{
            res.status(500).json("failed")
        })
}
exports.getLocations = ( req, res, next)=>{
    Location.find()
        .exec()
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(error =>{
            res.status(500).json(error)
        })
}