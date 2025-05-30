module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          len: {
            args: [2, 60],
            msg: "Name must be between 2 and 60 characters."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exists."
        },
        validate: {
          isEmail: {
            msg: "Must be a valid email."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters long."
          }
        }
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM("normal-user", "store-owner", "system-admin"),
        allowNull: false,
        defaultValue: "normal-user",
        set(value) {
          if (value === "User") {
            this.setDataValue("role", "normal-user");
          } else if (value === "Store Owner") {
            this.setDataValue("role", "store-owner");
          } else {
            this.setDataValue("role", value);
          }
        }
      }
    },
    {
      tableName: "Users",
      underscored: true,
      timestamps: true
    }
  );

  return User;
};
