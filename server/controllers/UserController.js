const User = require('../models/user');
const jwt = require('jsonwebtoken');
const FB = require('fb');

module.exports = {
  signin: (req,res) => {
    FB.api('me', { fields: ['id', 'name','email'], access_token: req.body.accessToken }, function (response) {
      User.findOne({
        email: response.email
      },(err, data) => {
        if (data) {
          const token = jwt.sign({ _id: data._id }, 'secret');
          res.status(200).json({
            message: "Success SignIn",
            data,
            token
          })
        } else {
          let user = new User({
            name: response.name,
            email: response.email,
            fbId: response.id
          });
          user.save((err,data) => {
            if (err) {
              res.status(500).json({
                message: "Something Went Wrong",
                err
              });
            }
            const token = jwt.sign({ _id: data._id }, 'secret');
            res.status(200).json({
              message: "Success SignIn",
              data,
              token
            });
          });
        }
      });
    });
  },
  getProfile: function(req,res) {
    User.findOne({_id: req.user._id},function(err,data) {
      if(err) res.status(500).json(err)
      res.status(200).json({ message: "Success Read Profile", data })
    })
  },
  getSpecificProfile: function(req,res) {
    User.findOne({_id: req.params.id},function(err,data) {
      if(err) res.status(500).json(err)
      res.status(200).json({ message: "Success Read Profile", data })
    })
  },
  getAllUser: function(req,res) {
    User.find({},function(err,data) {
      if(err) res.status(500).json(err)
      res.status(200).json({ message: "Success Read All User", data })
    })
  },
  updateProfile: (req,res) => {
    User.findOne({_id: req.user._id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
        const  { name , description  } = req.body;
        let input = { name, description };
        User.findOneAndUpdate({_id:req.user._id},input,{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Update Profile",
            data
          });
        });
    })
  },
};
