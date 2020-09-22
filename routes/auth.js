const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bycrypt = require("bcrypt");

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Auth",
    isLogin: true,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidat = await User.findOne({ email });
    if (candidat) {
      const areSame = await bycrypt.compare(password,candidat.password);
      if (areSame) {
        req.session.user = candidat; 
        req.session.isAuthenticated = true;

        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      } else {
        res.redirect("/auth/login#login");
      }
    } else {
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.redirect("/auth/login#register");
    } else {
      const hashPas = await bycrypt.hash(password, 10);
      const user = new User({
        email,
        name,
        password: hashPas,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});
module.exports = router;
