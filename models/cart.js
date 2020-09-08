const fs = require("fs");
const path = require("path");

class Cart {
  static async getCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "cart.json"),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      );
    });
  }
  static async save(cart) {
    console.log('save=====',cart); 
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cart.json"),
        JSON.stringify(cart),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("s");
          }
        }
      );
    });
  }

  static async add(courseItem) {
    const cart = await Cart.getCart();
    console.log('Cart0000',cart);

    const idx = cart.course.findIndex(c=>c.id===courseItem.id)
    const candidat = cart.course[idx]
    if(candidat){
      candidat.count++;
      cart.course[idx] = candidat 
    }else{
      courseItem.count = 1;
      cart.course.push(courseItem)
    }
    cart.price += +courseItem.price

    await Cart.save(cart); 
  }

  static async remove(id){
    const cart = await Cart.getCart()

    const idx = cart.course.findIndex(c=>c.id===id)
    const candidat = cart.course[idx]

    if(candidat.count === 1){
      //remove
      cart.course = cart.course.filter(c=>c.id !== id)
    }else{
      cart.course[idx].count--
    }

    cart.price -= candidat.price;
    await Cart.save(cart)
  }
} 

module.exports = Cart;
