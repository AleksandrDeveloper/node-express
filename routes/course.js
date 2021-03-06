const { Router } = require("express");
const Course = require("../models/course");
const router = Router();
const auth = require("../middleware/auth");

const csrf = require("csurf");

router.get("/", async (req, res) => {
  const courses = await Course.find()
    .populate("userId", "email name")
    .select("price img title");

  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  res.render("course", {
    title: `Курс ${course.title}`,
    course,
  });
});


router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.findById(req.params.id);

  res.render("courseEdit", {
    course,
  });
});

router.post("/edit", auth, async (req, res) => {
  await Course.findByIdAndUpdate(req.body.id, req.body);

  res.redirect("/courses");
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
