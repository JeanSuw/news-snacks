const sequelize = require('../config/connection');
const { User, ContentPost, Comments } = require('../models');

const userData = require('./userData.json');
const contentPostData = require('./contentPostData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- USERS SEEDS -----\n");
  await ContentPost.bulkCreate(contentPostData, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- POST SEEDS -----\n");
  await Comments.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- COMMENTS SEEDS -----\n");
  process.exit(0);
};

seedDatabase();