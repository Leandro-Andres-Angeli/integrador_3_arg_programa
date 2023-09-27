const express = require('express');
const Sequelize = require('Sequelize');
const dotenv = require('dotenv');
dotenv.config();
const {
  DBUSER: username,
  PASSWORD: password,
  PORT: port,
  HOST: host,
  DATABASE: dbName,
} = process.env;
const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});
module.exports = sequelize;
