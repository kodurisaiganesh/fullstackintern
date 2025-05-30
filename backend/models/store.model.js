module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("store", {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: true
      }
    });
  
    return Store;
  };
  