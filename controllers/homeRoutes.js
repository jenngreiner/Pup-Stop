const router = require("express").Router();
const { User, Yard, Comment, Appointment } = require("../models");
const withAuth = require("../utils/auth");

//HOMEPAGE
// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
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
router.get("/profile", withAuth, async (req, res) => {
  try {
    console.log("trying get /profile " + req.session.user_id);
    const userData = await User.findByPk(req.session.user_id, {
      exclude: ["password"],
      include: [
        {
          model: Yard,
          attributes: ["city", "state", "name", "description"],
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.render("userprofile", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//RESERVATIONS
// --> /myreservations
router.get("/myreservations", async (req, res) => {
  try {
    console.log("trying get /myreservations" + req.session.user_id);
    const userData = await User.findByPk(req.session.user_id
    , {
      include: [
        {
          model: Appointment,
          attributes: ["datetime", "num_pets", "yard_id"],
        },
      ],
    }
    );
        const user = userData.get({ plain: true });
        const userTwo = { 
          fname: user.fname,
          datetime: user.appointments[0].datetime,
          yardId: user.appointments[0].yard_id,
        }
console.log(userTwo);
    res.render("myreservations", {
      ...userTwo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SCHEDULE
// --> /schedule/#
router.get("/schedule/", async (req, res) => {
  try {
    console.log("asdas trying get /schedule/:id");
    const scheduleData = await Appointment.findAll({
      where: { id: 1 },
      include: [
        {
          model: Yard,
          attributes: ["user_id"],
        },
      ],
    });

    const schedule = scheduleData.get({ plain: true });

    res.render("yardschedule", {
      ...schedule,
      logged_in: req.session.logged_in,
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
    console.log("all yards " + yards);
    // Pass serialized data and session flag into template
    res.render("viewyards", {
      yards,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --> localhost:3001/yard/#
router.get("/yard/:id", async (req, res) => {
  try {
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
      logged_in: req.session.logged_in,
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
  res.render("hostcreateaccount", { logged_in: req.session.logged_in });
});

//Add get routes for each feature
//HASFENCE
// --> /yard/hasfence
router.get("/hasfence", async (req, res) => {
  try {
    // Get all yards where fence is true and JOIN with user data
    const yardData = await Yard.findAll({
      where: { fence: 1 },
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//HASWATER
// --> /yard/haswater
router.get("/haswater", async (req, res) => {
  try {
    // Get all yards where fence is true and JOIN with user data
    const yardData = await Yard.findAll({
      where: { water: 1 },
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUPPYPLAYDATE
// --> /yard/haspets
router.get("/haspets", async (req, res) => {
  try {
    // Get all yards where fence is true and JOIN with user data
    const yardData = await Yard.findAll({
      where: { has_pets: true },
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
