'use strict';
const {
  Model
} = require('sequelize');

const formatRupiah = require('../helpers/formatRupiah')

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get formatPrice() {
      return formatRupiah(this.price)
    }

    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Genre, { through: 'MovieGenres', foreignKey: 'movie_id' })

      Movie.hasMany(models.Screenshot, { foreignKey: 'movie_id' })

      Movie.belongsToMany(models.User, { through: 'Transactions', foreignKey: 'movie_id' })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cover: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
