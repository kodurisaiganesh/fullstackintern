module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("rating", {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comment: {
        type: DataTypes.STRING(400),
        allowNull: true
      }
    });
  
    return Rating;
  };
  