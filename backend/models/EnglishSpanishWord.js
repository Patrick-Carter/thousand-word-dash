const { Sequelize, DataTypes, Op } = require("sequelize");
const db = require("../util/dbConnection");
const EnglishVocab = require("./EnglishVocab");
const SpanishVocab = require("./SpanishVocab");

const EnglishSpanishWord = db.define(
  "EnglishSpanishWord",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    english_word: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spanish_word: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "english_spanish_words",
    timestamps: false,
  }
);



module.exports = EnglishSpanishWord;
