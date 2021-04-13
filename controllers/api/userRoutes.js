const router = require("express").Router();
const { User } = require("../../models");

// --> /api/users/login
router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // console.log("logged in successfully");
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// --> /api/users/post
router.post("/post", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      try {
        const newUser = await User.create(req.body);
        console.log("user created");

        req.session.save(() => {
          req.session.user_id = newUser.id;
          req.session.logged_in = true;

          res.status(200).json(newUser);
        });
      } catch (err) {
        res.status(400).json(err);
      }
      return;
    } else {
      // Create session variables based on the logged in user
      document.location.replace("/login");
      // return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
  return;
});

module.exports = router;
