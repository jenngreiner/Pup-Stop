const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    fname: "Sal",
    lname: "Douglas",
    email: "sal@hotmail.com",
    password: "password12345",
  },
  {
    fname: "Lernantino",
    lname: "Smith",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    fname: "Amiko",
    lname: "Santos",
    email: "amiko2k20@aol.com",
    password: "password12345",
  },
  {
    fname: "Jordan",
    lname: "Michael",
    email: "jordan99@msn.com",
    password: "password12345",
  },
];

// const seedUsers = () => User.bulkCreate(userData);

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

module.exports = seedUsers;
