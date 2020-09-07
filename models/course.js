const uuid = require('uuid/')
const fs = require('fs')
const path = require('path')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuid.v4()
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve('f')
          }
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
 
  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(c => c.id === id)
  }

  static async updata(data){
    console.log(data);
     const course = await Course.getAll()

     const idx = course.findIndex(i=>i.id === data.id)
     console.log(idx); 
     course[idx] = data

     return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(course),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve('f')
          }
        }
      )
    })

  }
}

module.exports = Course