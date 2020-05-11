const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize){
    super.init({
      cep: DataTypes.STRING,
      rua: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      uf: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    //pertence a 1
    this.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user' 
    });
  }
}

module.exports = Address;