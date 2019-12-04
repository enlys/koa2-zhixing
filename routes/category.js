const router = require('koa-router')()
const Category=require('../dbs/models/category')


router.prefix('/category')

router.get('/list',  async function (ctx, next) {
    try {
        let result = await Category.find()
        if (result) {
            ctx.body = {
              code: 0,
              list: result
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
    const category=new Category({
        name:ctx.request.body.name,
        brief:ctx.request.body.brief
    })
    let code
    try {
      await category.save()
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
        let result = await Category.remove({_id:ctx.request.body.id})
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


  module.exports = router