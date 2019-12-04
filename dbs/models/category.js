const mongoose = require('mongoose')
let categorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
      },
      brief:{
        type:String,
        require:true
      },
     
})

module.exports=mongoose.model('Category',categorySchema)