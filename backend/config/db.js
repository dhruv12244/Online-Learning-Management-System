const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lms_db', 'root', 'Audi@9840', {
  host: 'localhost',
  dialect: 'mysql',  
  logging: false,    
});

module.exports = sequelize;