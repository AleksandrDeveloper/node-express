const { Router, json } = require("express");
const Course = require("../models/course");
const Cart = require("../models/cart");
const router = Router();
const auth = require('../middleware/auth')

function mapCartTo(cart) {
  return cart.map((c) => ({
    ...c.courseId._doc,
    count: c.count,
  }));
}

router.post("/add",auth, async (req, res) => {
  try {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course);

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove/:id",auth, async (req, res) => {
  try {
    await req.user.removeFromCart(req.params.id)
    const user = req.user.populate('cart.items.courseId').execPopulate()

    res.json({Hello:'ffffff'}).redirect('/cart')

    res.redirect('/cart')
  } catch (error) {console.log(error)}
});

router.get("/", auth, async (req, res) => {
  const user = await req.user.populate("cart.items.courseId").execPopulate();

  const courses = mapCartTo(user.cart.items);

  res.render("cart", {
    isCart: true,
    title: "Cart",
    course: courses,
    price: 1000000,
  });
});

module.exports = router;
