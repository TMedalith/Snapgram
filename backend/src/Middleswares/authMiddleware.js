const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require('mongoose')
const User = require("../Models/user");


module.exports.userVerification = (req, res, next) => {
  const {authorization} = req.headers

  if (!authorization) {
    return res.status(401).json({error:"you must be logged in"})
  }

  const token = authorization.replace("Bearer ", "")

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      return res.status(401).json({error:"you must be logged in"})
    }

    const { _id } = data
    User.findById(_id).then(userData => {
      if(req.url === '/') {
        return res.status(200).json({success: true, user: userData})
      }
      req.user = userData
      next()
    })    
    
  })
}