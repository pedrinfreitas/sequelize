const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const User = require('../models/User');
const Address = require('../models/Address');
const Fished = require('../models/Fished');
const Pack = require('../models/Pack');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Fished.init(connection);
Pack.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Fished.associate(connection.models);
Pack.associate(connection.models);

module.exports = connection;