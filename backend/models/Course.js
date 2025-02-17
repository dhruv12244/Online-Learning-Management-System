
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Enrollment = require('./Enrollment');
const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  student_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  enrollment_deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'active', 'completed'),
    defaultValue: 'upcoming',
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
}, {
  tableName: 'courses',
  timestamps: true, 
  underscored: true, 
});
Course.hasMany(Enrollment, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });


module.exports = Course;