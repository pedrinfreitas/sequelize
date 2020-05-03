const { Model, DataTypes } = require('sequelize');

class Pack extends Model {
  static init(sequelize) {
    super.init({
      descricao: DataTypes.STRING,
      img: DataTypes.STRING,
      preco: DataTypes.DECIMAL,
      data_pescado: DataTypes.DATE,
      status: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user' 
    });
  }
}

module.exports = Pack;
