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
    //pertence a muitos
    // this.belongsToMany(models.User, { 
    //   foreignKey: 'fished_id', 
    //   through: 'user_fisheds',
    //   as: 'users' 
    // });
    this.belongsToMany(models.User, {      
      through: 'user_fisheds',      
      as: 'users',
      foreignKey: 'fished_id'
    });
  }
  
}

module.exports = Fished;