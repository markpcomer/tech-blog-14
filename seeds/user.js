//After models are completed I moved into making proper seed files. I ensured they are labeled with lowercased format; This helps to load examples into the database//

const { User } = require('../models');

const userData =
[
  {
    "username": "Data",
    "email": "data@enterprised.com",
    "password": "androidsrule9876"
  },
  {
    "username": "Benjaminsisko",
    "email": "bsisko@ds9.com",
    "password": "defiantdestroys1234"
  },
  {
    "username": "Odo",
    "email": "dontcallmeashapeshifter@ds9.com",
    "password": "ilikekira"
  },
  {
    "username": "Worf",
    "email": "qapla@ds9.com",
    "password": "matzoballsoup"
  },
  {
    "username": "Kira",
    "email": "kira@bajor.com",
    "password": "runabout5678"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;