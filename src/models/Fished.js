const { Model, DataTypes } = require('sequelize');

class Fished extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      img: DataTypes.STRING,      
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { 
      foreignKey: 'fished_id', 
      through: 'user_fisheds',
      as: 'users' 
    });
  }
}

module.exports = Fished;