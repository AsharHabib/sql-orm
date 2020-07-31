const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"',
        }
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for runtime',
        },
        min: {
          args: 1,
          msg: 'Please provide value greater than 0',
        },
      },
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for releasedate',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after 1895-12-27 for releasedate',
        },
      },
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
    modelName: 'movie',
    freezeTableName: true,
    tableName: 'my_movies_table',
    sequelize
   });

  return Movie;
};