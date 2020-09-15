const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/course')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')
const User = require('./models/user')
const userMiddleware = require('./middleware/user')

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const varMiddleware = require('./middleware/var')

const app = express()
const MONGODB_URL = 'mongodb+srv://aleksDev:O56ZwRXecW9rRjOB@node-1.aytwk.mongodb.net/Node-1?retryWrites=true&w=majority'

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs', 
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
const storeMongo = new MongoStore({
  collection:'session',
  url:MONGODB_URL
})
  

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs') 
app.set('views', 'views') 
app.use(session({
  secret:'some seccret',
  resave:true, 
  saveUninitialized:false,
  store:storeMongo
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use(express.static('public')) 
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start(){
  try {
    await mongoose.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false})

    // const candidat = await User.findOne()
    // if(!candidat){
    //   const userOne = new User({
    //     email:'alesk@mail.ru',
    //     name:'Aleks',
    //     cart:{items:[]}
    //   }) 
    //   await userOne.save()
    // }

    app.listen(3000, () => { console.log(`Server is running on port ${PORT}`) }) 
  } catch (error) { console.log('++++++++++++++++++++++++++++++++++++',error)} 
}


start() 



// app.use(async(req,res,next)=>{
//   try {
//     const user = await User.findById('5f5937b49d049726bc9b263c')
//     req.user = user;
//     next()
//   } catch (error) {  
//     console.log(error);  
//   }
// })
  