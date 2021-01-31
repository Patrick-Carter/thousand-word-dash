const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: '164.90.146.27',
    dialect: 'mysql'
  });

  module.exports = sequelize;
