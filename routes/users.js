const router = require('koa-router')()
const User=require('../dbs/models/user')
const  CryptoJS=require('crypto-js') 
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/list', async function (ctx, next) {
  try {
    let result = await User.find()
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

router.post('/adduser',async function(ctx,next){
  console.log(ctx.request.body)
  console.log(CryptoJS.MD5(ctx.request.body.password))
  const user=new User({
    username:ctx.request.body.username,
    password:CryptoJS.MD5(ctx.request.body.password),
    email:ctx.request.body.email
  })
  let code
  try {
    await user.save()
   code=0
  } catch (error) {
    code=1
  }
  ctx.body = {
  code
  }
  
})

router.post('/checklogin',async function(ctx,next){
  // console.log(ctx.request.body)
 let username=ctx.request.body.username;
//  console.log(username)
 let password=CryptoJS.MD5(ctx.request.body.password)
//  console.log(password.toString())
  try {
    
   
    let result = await User.findOne({ 
      username:username,
      password:password.toString()
     })
     
    ctx.body = {
      code: 0,
      data: result
        
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
  
})


router.post('/delete',async function(ctx,next){
  console.log(ctx.request.body)
  try {
      let result = await User.remove({_id:ctx.request.body.id})
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

router.post('/administration',async function(ctx,next){
  console.log(ctx.request.body)
  try {
      let result = await User.update(
        {_id:ctx.request.body.id},
        {role:2}
        )
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


router.post('/enable',async function(ctx,next){
  console.log(ctx.request.body)
  try {
      let result = await User.update(
        {_id:ctx.request.body.id},
        {enable:false}
        )
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
