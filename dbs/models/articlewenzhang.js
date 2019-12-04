const mongoose = require('mongoose')
let articleSchema=new mongoose.Schema({
    title:{
        type:String,
       
        require:true
      },

    category:{
        type:String,
   
      },
      content:{
        type:String,
        require:true
      },
      html:{
        type:String,
        require:true
      },
      icon:{
        type:String,
        require:true
      },
     
})

module.exports=mongoose.model('Articlewenzhang',articleSchema)