const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      celular: DataTypes.STRING,
      // senha: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Address, {
      foreignKey: 'user_id',
      as: 'addresses'
    });
    this.hasMany(models.Pack, {
      foreignKey: 'user_id',
      as: 'packs'
    });
    this.belongsToMany(models.Fished, {
      foreignKey: 'user_id',
      through: 'user_fisheds',
      as: 'fisheds'
    });

  }

}

module.exports = User;
