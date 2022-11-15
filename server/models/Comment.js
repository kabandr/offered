"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate({ User, Offer }) {
      // Comments
      this.belongsTo(Offer, { foreignKey: "offerId" });
      this.belongsTo(User, { as: "author", foreignKey: "userId" });
    }

    toJSON() {
      return {
        ...this.get(),
        offerId: undefined,
        userId: undefined,
      };
    }
  }
  Comment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
