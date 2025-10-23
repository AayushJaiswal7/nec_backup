// models/Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  permission_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  permission_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'permissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Permission;