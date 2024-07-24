const sequelize = require('../config/connection');

const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');



const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();



// const sequelize = require('../config/connection');
// const { User, Post } = require('../models');

// const userData = require('./userData.json');
// const postData = require('./postData.json');

// const seedDatabase = async () => {
//   try {
//     await sequelize.sync({ force: true });

//     const users = await User.bulkCreate(userData, {
//       individualHooks: true,
//       returning: true,
//     });

//     for (const post of postData) {
//       await Post.create({
//         ...post,
//         userId: users[Math.floor(Math.random() * users.length)].id,
//       });
//     }

//     process.exit(0);

//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1); 
//   }
// };

// seedDatabase();





