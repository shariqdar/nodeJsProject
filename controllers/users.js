const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require("mongoose");
const passwordHash = require('password-hash');
exports.login = (req, res, next)=>{
    User.find({email: req.body.email}, '+password')
   // .select('_id, first_name last_name, mobile')
        .exec()
        .then(result => {
            if(!(result.length >= 1)){
                res.status(404).json({
                    message: 'Auth1 Failed'
                })
            }
            if(passwordHash.verify(req.body.password, result[0].password)){
                const token = jwt.sign(
                    {
                        email: result[0].email,
                        id:result[0]._id
                    },
                    process.env.JWT_KEY, 
                    { 
                        expiresIn: '1h'
                    }
                );
                console.log(result)
                const user = {
                    id: result[0]._id,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    mobile: result[0].mobile,
                    email: req.body.email
                }
                //result = result.toObject();
               // delete result.password;
                res.status(200).json({
                    message: 'Auth Successful',
                    user: user,
                    token: token
                });                
            }else{
                res.status(404).json({
                    message: 'Auth2 Failed'
                })
            }
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({
                
                message: 'Internal Server Error'
            })
        })
}

exports.signup = (req, res, next) =>{
    //console.log(req.body.email);
    User.find({email: req.body.email})
        .exec()
        .then(docs =>{
            //console.log("docs",docs.length)
            if(docs.length > 0){
                res.status(409).json({
                    message: 'Email Already Exits'
                });
            }else{
                //console.log(req.body.password);
                var hashedPassword = passwordHash.generate(req.body.password);
                    if(!(passwordHash.isHashed(hashedPassword))){
                        res.status(500).json(err)
                    }else{

                         user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            gender: req.body.gender,
                            mobile: req.body.mobile,
                            email: req.body.email,
                            password: hashedPassword
                        });
                        ////////////////////////////////////
                        
                        ///////////////////////////////////
                        console.log(user.first_name);
                        user
                        .save()
                        .then(result => {
                            const token = jwt.sign(
                                {
                                    email: user.email,
                                    id:user._id
                                },
                                process.env.JWT_KEY, 
                                { 
                                    expiresIn: '1h'
                                }
                            );
                            user = user.toObject();
                           // delete user.gender;
                            delete user.password;
                            res.status(201).json({
                            message:"User Created Successfully",
                            token: token,
                            user: user
                            })
                        })
                        .catch(error=>{
                            res.status(500).json({
                                message:error
                            })
                        })

                    }
            
            }
        })
        .catch(error=>{
            res.status(500).json({
                message:error
            })
        })
    
}

exports.delete_user = (req, res, next)=>{
    User.remove({_id: req.params.userID})
        .exec()
        .then(result=>{
            res.status(200).json({ result: 'User Removed'})
        })
        .catch(error=>{
            res.status(500).json({error: 'error'})
        })
}

exports.get_users = (req, res, next)=>{
    User.find()
        .exec()
        .then(result =>{
            res.status(200).json({
                data:result
            })
        })
        .catch()
        
}