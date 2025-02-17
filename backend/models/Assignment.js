
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course'); 

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
  },
}, {
  tableName: 'assignments',
  timestamps: true,
});
Course.hasMany(Assignment, { foreignKey: 'course_id' });
Assignment.belongsTo(Course, { foreignKey: 'course_id' });
module.exports = Assignment;