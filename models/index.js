module.exports = {
  User: require("./user"),
  Yard: require("./yard"),
  Comment: require("./comment"),
  Appointment: require("./appointment"),
};

// const User = require("./User");
// const Yard = require("./Yard");
// const Comment = require("./Comment");
// const Appointment = require("./Appointment");

// //YARD <--> USER
// // Yard belongsTo User
// Yard.belongsTo(User, {
//   foreignKey: "user_id",
// });

// // User hasOne Yard
// User.hasOne(Yard, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// // APPOINTMENT <--> YARD,USER
// // Appointment belongsTo User
// Appointment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// // User have many Appointment
// User.hasMany(Appointment, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// // Appointment belongsTo Yard
// Appointment.belongsTo(Yard, {
//   foreignKey: "yard_id",
// });

// // Yard have many Appointment
// Yard.hasMany(Appointment, {
//   foreignKey: "yard_id",
//   onDelete: "CASCADE",
// });

// // COMMENT <--> YARD, USER
// // Comment belongsTo User
// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// // User have many Comment
// User.hasMany(Comment, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// // Comment belongsTo Yard
// Comment.belongsTo(Yard, {
//   foreignKey: "yard_id",
// });

// // Yard have many Comment
// Yard.hasMany(Comment, {
//   foreignKey: "yard_id",
//   onDelete: "CASCADE",
// });

// module.exports = { User, Yard, Appointment, Comment };
