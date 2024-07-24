const { Post } = require('../models');

const postData = [
    {
        title: "Android Information",
        content: "0.68 Seconds Sir. For An Android, That Is Nearly An Eternity.",
        user_id: 1
    },
    {
        title: "We need the Romulans!",
        content: "A guilty conscience is a small price to pay for the safety of the Alpha Quadrant, so I will learn to live with it. Because I can live with it. I can live with it.",
        user_id: 2
    },
    {
        title: "Occupational reflections.",
        content: "There's very little justice in the Cardassian occupation of Bajor.",
        user_id: 3

    },
    {
        title: "Baseball slogans.",
        content: "Death to the opposition!",
        user_id: 4
    },
    {
        title: "Reflections on the Romulans.",
        content: "They have denied the possibility of ancient contact for decades because they cannot stand the idea of Bajor having interstellar flight before they did.",
        user_id: 5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;