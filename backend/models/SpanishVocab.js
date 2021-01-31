const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/dbConnection");
const EnglishSpanishWord = require("./EnglishSpanishWord");
const SpanishVocab = db.define(
  "SpanishVocab",
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    english_spanish_words_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      primaryKey: true,
      references: {
        model: "english_spanish_words",
        key: "id",
      },
    },
    current_stage: {
      type: DataTypes.ENUM,
      values: [
        "learn",
        "today",
        "tomorrow",
        "2days",
        "week",
        "30days",
        "learned",
      ],
      defaultValue: "learned",
      allowNull: true,
    },
    next_stage: {
      type: DataTypes.ENUM,
      values: [
        "learn",
        "today",
        "tomorrow",
        "2days",
        "week",
        "30days",
        "learned",
        "none",
      ],
      defaultValue: "learned",
      allowNull: true,
    },
    last_answered: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    in_rotation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    in_quiz: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "spanish_vocab",
    timestamps: false,
  }
);

module.exports = SpanishVocab;
