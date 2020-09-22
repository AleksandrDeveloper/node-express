const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
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
const config = require('./config/index')

const app = express()


const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs', 
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
const storeMongo = new MongoStore({
  collection:'session',
  url:config.MONGODB_URL
})



app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs') 
app.set('views', 'views')
app.use(cookieParser()) 
app.use(session({
  secret:config.secret,
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



async function start(){
  try {
    await mongoose.connect(config.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false})

    app.listen(config.PORT, () => { console.log(`Server is running on port ${config.PORT}`) }) 
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
  