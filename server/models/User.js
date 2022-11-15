"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Offer, Comment, User }) {
      // Offers
      this.hasMany(Offer, { foreignKey: "userId", onDelete: "CASCADE" });

      // Comments
      this.hasMany(Comment, { foreignKey: "offerId" });

      // Favorites offers
      this.belongsToMany(Offer, {
        through: "Favorites",
        as: "favorites",
        foreignKey: "userId",
        timestamps: false,
      });

      // Offer Decision
      this.belongsToMany(User, {
        through: "Followers",
        as: "followers",
        foreignKey: "userId",
        timestamps: false,
      });
      this.belongsToMany(User, {
        through: "Followers",
        as: "following",
        foreignKey: "followerId",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.TEXT,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
