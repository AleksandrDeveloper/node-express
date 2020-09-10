const { Schema,model } = require("mongoose")

const UserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    cart:{
        items:[
            {
                count:{
                    type:Number,
                    required:true,
                    default:1
                },
                courseId:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'Course'
                }
            }
        ]
    }
})
 

module.exports = model('User',UserSchema)
