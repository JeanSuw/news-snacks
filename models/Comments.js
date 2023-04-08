const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Reference to the user content post id the comment is attach to.
    userPost_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'contentpost',
          key: 'id'
        }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1] // making sure that comments is not empty. Users must add something to make the comment invisible
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
