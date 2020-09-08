const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find() 

  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses
  })
}) 

router.get('/:id',async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.render('course', {
    title: `Курс ${course.title}`, 
    course
  })
})


router.get('/:id/edit',async(req,res)=>{
  if(!req.query.allow){
    return res.redirect('/')
  }
  const course = await Course.findById(req.params.id)

  res.render('courseEdit',{
      course 
  })
})

router.post('/edit',async(req,res)=>{
  await Course.findByIdAndUpdate(req.body.id,req.body)

  res.redirect('/courses')
})

module.exports = router