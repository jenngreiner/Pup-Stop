const router = require("express").Router();
// const { User } = require('../models');
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    // });

    // const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      // users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/myreservations", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render("myreservations");
});

router.get("/profile", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render("userprofile");
});

router.get("/yard/:id", async (req, res) => {
  // GET
  try {
    const yardData = await Yard.findOne({
      where: {
        id: req.params.id,
      },
      // be sure to include its associated User and Reservation data
      include: [
        {
          model: User,
          attributes: ["id", "fname"],
        },
        {
          model: Appointment,
          attributes: ["id", "datetime"],
        },
      ],
    });
    if (!yardData) {
      res.status(404).json({ message: "No yard found with this id!" });
      return;
    }
    res.render("viewyards");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
