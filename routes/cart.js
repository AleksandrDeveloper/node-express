const {Router, json} = require('express')
const Course = require('../models/course')
const Cart = require('../models/cart')
const router = Router()

router.post('/add', async (req, res) => {
    const courseItem = await Course.getById(req.body.id)
    await Cart.add(courseItem)
    res.redirect('/cart')
})

router.delete('/remove/:id',async(req,res)=>{
   await Cart.remove(req.params.id)
   res.status(200).json(await Cart.getCart())
})


router.get('/', async (req, res) => {
    const cart = await Cart.getCart()
    res.render('cart',{
        isCart:true ,
        title:'Cart',
        course:cart.course,
        price:cart.price,
        id:cart.id
    })
})


module.exports = router 