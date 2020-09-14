const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/login',async (req,res)=>{
    res.render('auth/login',{
        title:'Auth',
        isLogin:true
    })
})
router.post('/login',async (req,res)=>{
    const user = await User.findById('5f5937b49d049726bc9b263c')
    req.session.user = user 
    req.session.isAuthenticated = true,
    req.session.save(err=>{
        if(err){throw err}
        res.redirect('/')   
    })
    
})
router.get('/logout',async (req,res)=>{ 
    req.session.destroy(()=>{
        res.redirect('/auth/login#login')
    }) 
})


module.exports = router