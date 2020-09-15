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
    password:{
        type:String,
        required:true
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

UserSchema.methods.addToCart = function(course){
    const clonedItems = this.cart.items.concat()
    const idx = clonedItems.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if(idx >= 0){
        clonedItems[idx].count = clonedItems[idx].count+1
    }else{
        clonedItems.push({
            courseId:course._id,
            count:1
        })
    }
 
    this.cart = {items:clonedItems}
    return this.save() 
}


UserSchema.methods.removeFromCart = function(id){
    let cartItemsClone = [...this.cart.items]
    const idx = cartItemsClone.findIndex(c => {
        return c.courseId.toString() === id.toString()
    })
    if(cartItemsClone[idx].count == 1){
        cartItemsClone = cartItemsClone.filter(c=>c.courseId.toString() !== id.toString())
    }else{
        cartItemsClone[idx]--
    }
    this.cart = {items:cartItemsClone}
    return this.save() 
}

UserSchema.methods.clearCart= function(){
    this.cart= {items:[]}
    return this.save()
}
  
 
module.exports = model('User',UserSchema)
 