const router = require('koa-router')()
const Video=require('../dbs/models/videocourse')

router.prefix('/video')


router.post('/list',  async function (ctx, next) {
    let pageNum=parseInt( ctx.request.body.pageNum);
    let pageSize=parseInt( ctx.request.body.pageSize);
   try {
    let count=await Video.count()
  
    let data=await Video.find().skip((pageNum - 1) * pageSize).limit(pageSize)
    if (data&&count) {
        ctx.body = {
          code: 0,
          totalCount: count,
          data:data
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
  } catch (e) {
    ctx.body = {
      code: -1,
      list: {}
    }
  }
  })





router.post('/add',async function(ctx,next){
    console.log(ctx.request.body)
    const video=new Video({
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      category: ctx.request.body.category,
      icon: ctx.request.body.icon,
      brief: ctx.request.body.brief
    })
    let code
    try {
      await video.save()
     code=0
    } catch (error) {
      code=1
    }
    ctx.body = {
    code
    }
    
  })



  router.post('/delete',async function(ctx,next){
    console.log(ctx.request.body)
    try {
        let result = await Video.remove({_id:ctx.request.body.id})
        if (result) {
            ctx.body = {
              code: 0,
              data: result
            }
          } else {
            ctx.body = {
              code: -1,
              data: []
            }
          }
      } catch (e) {
        ctx.body = {
          code: -1,
          list: {}
        }
      }
    
  })


  
  router.get('/item',async function(ctx,next){
    console.log(ctx.request.query)
    try {
        let result = await Video.findOne({_id:ctx.request.query.id})
        if (result) {
            ctx.body = {
              code: 0,
              data: result
            }
          } else {
            ctx.body = {
              code: -1,
              data: []
            }
          }
      } catch (e) {
        ctx.body = {
          code: -1,
          data: {}
        }
      }
    
  })

  module.exports = router