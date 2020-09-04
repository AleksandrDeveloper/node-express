const uuid = require('uuid')
const fs = require('fs')
const path = require('path');
const { rejects } = require('assert');



class Course{
    constructor(title,price,img){
        this.title = title;
        this.price= price;
        this.img = img;
        this.id = uuid.v4()
    }
    createCourse(){
        return {
            title:this.title,
            price:this.price,
            img:this.img,
            id:this.id
        }
    }
    async save(){
        const course = await Course.getAll();
        course.push(this.createCourse())
        

        return new Promise((resolve,reject)=>{
            fs.writeFile(
                path.join(__dirname,'..','data','course.json'),
                JSON.stringify(course),
                err=>{
                    if(err){rejects(err)}
                    else{
                        resolve()
                    }
                }
            )
        })
    }

    static getAll(){
        return new Promise((resolve,reject)=>{
            fs.readFile(
                path.join(__dirname,'..','data','course.json'),
                'utf-8',
                (err,data)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(JSON.parse(data))
                    }
                }
            )
        }) 
    }
} 

module.exports = Course;