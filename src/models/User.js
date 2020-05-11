const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      celular: DataTypes.STRING,
      senha: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    //tem muitos
    this.hasMany(models.Address, {
      foreignKey: 'user_id',
      as: 'addresses'
    });
    
    //tem muitos
    // this.hasMany(models.Pack, {
    //   foreignKey: 'user_id',
    //   as: 'packs'
    // });

    //pertence a muitos
    // this.belongsToMany(models.Fished, {
    //   foreignKey: 'user_id',
    //   through: 'user_fisheds',
    //   as: 'fisheds',
    // });
    this.belongsToMany(models.Fished, {      
      through: 'user_fisheds',      
      as: 'fisheds',
      foreignKey: 'user_id'
    });

  }

}

module.exports = User;
