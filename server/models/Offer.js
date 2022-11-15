"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({ User, Tag, Comment }) {
      
      // Users
      this.belongsTo(User, { foreignKey: "userId", as: "author" });

      // Comments
      this.hasMany(Comment, { foreignKey: "offerId", onDelete: "cascade" });

      // Tag list
      this.belongsToMany(Tag, {
        through: "TagList",
        as: "tagList",
        foreignKey: "offerId",
        timestamps: false,
        onDelete: "cascade",
      });

      // Favorites
      this.belongsToMany(User, {
        through: "Favorites",
        foreignKey: "offerId",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      };
    }
  }
  Offer.init(
    {
      slug: DataTypes.STRING,
      candidate: DataTypes.STRING,
      role: DataTypes.TEXT,
      compensation: DataTypes.TEXT,
      equity: DataTypes.TEXT,
      benefits: DataTypes.TEXT,
      terms: DataTypes.TEXT,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Offer",
    },
  );
  return Offer;
};
