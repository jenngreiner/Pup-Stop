const router = require("express").Router();
const { Yard } = require("../../models");
const withAuth = require("../../utils/auth");

// --> /api/yards/
router.post("/", withAuth, async (req, res) => {
  try {
    const newYard = await Yard.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newYard);
  } catch (err) {
    res.status(400).json(err);
  }
});

// --> /api/yards/#
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const yardData = await Yard.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!yardData) {
      res.status(404).json({ message: "No Yards found with this id!" });
      return;
    }

    res.status(200).json(yardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --> /api/yards/#
// router.post("/haspets", async (req, res) => {
//   console.log(res);
//   try {
//     const yardData = await Yard.findAll({
//       where: { has_pets: true },
//     });

//     if (!yardData) {
//       res.status(404).json({ message: "No Yards found with this feature!" });
//       return;
//     }

//     res.status(200).json(yardData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
