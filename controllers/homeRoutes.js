const router = require("express").Router();
const { User, Yard, Comment, Appointment } = require("../models");
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

// --> localhost:3001/yard
router.get("/yard", async (req, res) => {
  try {
    // Get all yards and JOIN with user data
    const yardData = await Yard.findAll({
      include: [
        {
          model: User,
          attributes: ["fname", "lname"],
        },
      ],
    });

    // Serialize data so the template can read it
    const yards = yardData.map((yard) => yard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("viewyards", {
      yards,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --> localhost:3001/yard/#
router.get("/yard/:id", async (req, res) => {
  try {
    console.log("trying get /yard/:id");
    const yardData = await Yard.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["fname", "lname"],
        },
      ],
    });
    const yard = yardData.get({ plain: true });
    res.render("yard", {
      ...yard,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
