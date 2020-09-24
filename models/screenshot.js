'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Screenshot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Screenshot.belongsTo(models.Movie, { foreignKey: 'movie_id' })
    }
  };
  Screenshot.init({
    name: DataTypes.STRING,
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Screenshot',
  });
  return Screenshot;
};
