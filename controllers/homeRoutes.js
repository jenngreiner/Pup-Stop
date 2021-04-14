const router = require("express").Router();
const { User, Yard, Comment, Appointment } = require("../models");
const withAuth = require("../utils/auth");

//HOMEPAGE
// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN/SIGNUP
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

//PROFILE
// --> /profile
router.get("/profile", withAuth, (req, res) => {
  try {
    res.render("userprofile", {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//RESERVATIONS
// --> /myreservations
router.get("/myreservations", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render("myreservations");
});

//SCHEDULE
// --> /schedule/#
router.get("/schedule/:id", async (req, res) => {
  try {
    console.log("trying get /schedule/:id");
    const scheduleData = await Yard.findByPk(req.params.id, {
      include: [
        {
          model: Appointment,
          attributes: ["datetime", "num_pets"],
        },
      ],
    });

    const schedule = scheduleData.get({ plain: true });

    res.render("yardschedule", {
      ...schedule,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//YARDS
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

//ADDYARD
// --> /addyard
router.get("/addyard", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render("hostcreateaccount");
});

//Add get routes for each feature

module.exports = router;
