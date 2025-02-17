
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Enrollment = require('./Enrollment');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'users',
});
User.hasMany(Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;