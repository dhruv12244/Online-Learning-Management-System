const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./User');
const Assignment = require('./Assignment');
const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',  
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'assignments', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: true,  
  },
  grade: {
    type: DataTypes.STRING,  
    allowNull: true  
  },
  submitted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  
  },
}, {
  tableName: 'submissions',
  timestamps: false, 
});
Submission.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Submission.belongsTo(Assignment, { foreignKey: 'assignment_id' });
Assignment.hasMany(Submission, { foreignKey: 'assignment_id' });

module.exports = Submission;