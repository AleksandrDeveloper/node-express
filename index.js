const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/course')
const cartRoutes = require('./routes/cart')
const mongoose = require('mongoose')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public')) 
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000


async function start(){
  try {
    const url = 'mongodb+srv://aleksDev:O56ZwRXecW9rRjOB@node-1.aytwk.mongodb.net/Node-1?retryWrites=true&w=majority'
    await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
    app.listen(3000, () => { 
      console.log(`Server is running on port ${PORT}`)
    }) 
  } catch (error) { 
    console.log('error++',error);
  } 
}


start()
//O56ZwRXecW9rRjOB
// mongodb+srv://aleksDev:<O56ZwRXecW9rRjOB>@node-1.aytwk.mongodb.net/<node1>?retryWrites=true&w=majority