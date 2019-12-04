const mongoose = require('mongoose')
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
      },
      password:{
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true
      },
      enable:{
        type:Boolean,
        default:true
      },
      role:{
        type:Number,
        default:1
       
      }
})

module.exports=mongoose.model('Userzx',userSchema)