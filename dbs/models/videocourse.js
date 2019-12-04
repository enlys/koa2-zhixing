const mongoose = require('mongoose')
let videocourseSchema=new mongoose.Schema({
    title:{
        type:String,
       
        require:true
      },

    category:{
        type:String,
   
      },
      content:[{
        subheading:String,
        itemvideo:String
      }],
      brief:{
        type:String,
        require:true
      },
      icon:{
        type:String,
        require:true
      },
     
})

module.exports=mongoose.model('Videocourse',videocourseSchema)