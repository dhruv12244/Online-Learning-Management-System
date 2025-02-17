
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Enrollment = sequelize.define('Enrollment', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enrollment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'enrollments',
  timestamps: false,
});

module.exports = Enrollment;