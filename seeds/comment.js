const { Comment } = require('../models');

const commentData = [{
        comment_text: "Mortality Gives Meaning To Human Life, Captain.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Computer, erase that entire personal log.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I have no sense of smell.",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "I do not play games.",
        user_id: 4,
        post_id: 4
    },
    {
        comment_text: "Oh, you sound just like a Cardassian.",
        user_id: 5,
        post_id: 5
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;