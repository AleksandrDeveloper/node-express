// require module
const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');
const homeRout = require('./routes/home')
const addRout = require('./routes/add')
const courseRoute = require('./routes/course')
// constant var
const app = express()
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs',
})



// Settings 
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.static('public'))


//Routes
app.use(express.urlencoded({extended:true}))
app.use('/',homeRout)
app.use('/add',addRout)
app.use('/courses',courseRoute)




//Server
app.listen(PORT,()=>{ 
    console.log(`Server is port ${PORT}`);
})


