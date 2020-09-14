const { Router } = require("express");
const router = Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      "user.userId": req.user._id,
    }).populate("user.userId");
 
    res.render("order", {
      isOrder: true,
      title: "Order",
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce((total, c) =>{return total += c.count * c.course.price},0), 
      })),
    });
  } catch (e) {
    console.log(e); 
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();

    const cart = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses: cart,
    });

    await order.save();
    await req.user.clearCart();

    res.redirect("/order");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;