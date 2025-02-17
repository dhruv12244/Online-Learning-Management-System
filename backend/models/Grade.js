
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'assignments',
      key: 'id'
    }
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'grades',
  timestamps: false
});

module.exports = Grade;