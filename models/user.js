'use strict';
const {
  Model
} = require('sequelize');

const { encrypt } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get full_name() {
      return `${this.first_name} ${this.last_name}`
    }

    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role_id' })

      User.belongsToMany(models.Movie, { through: 'Transactions', foreignKey: 'customer_id' })
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => {
    if (!user.last_name) {
      user.last_name = user.first_name
    }

    user.password = encrypt(user.password)
  });

  return User;
};
