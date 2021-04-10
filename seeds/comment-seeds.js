const { Comment } = require("../models");

const commentData = [
  {
    body:
      "This is an incredible yard! The grass is green, the sun is shining, and the dogs had a great time!",
    date_created: "2021-03-22",
    user_id: "1",
    yard_id: "2",
  },
  {
    body:
      "Average yard, loud neighbor dogs, but having water available is great!",
    date_created: "2021-03-29",
    user_id: "1",
    yard_id: "3",
  },
  {
    body: "Lots of dead grass, clearly dogs dig a lot of holes here.",
    date_created: "2021-03-15",
    user_id: "3",
    yard_id: "1",
  },
  {
    body: "No shade or water makes this yard very hot for my fluffy pooch.",
    date_created: "2021-03-25",
    user_id: "2",
    yard_id: "1",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
