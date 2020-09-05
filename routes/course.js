const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.getAll()
  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses
  })
}) 

router.get('/:id',async (req, res) => {
  const course = await Course.getById(req.params.id)
  console.log(course);
  res.render('course', {
    title: `Курс ${course.title}`, 
    course
  })
})


router.get('/:id/edit',async(req,res)=>{
  
})

module.exports = router