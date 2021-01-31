const EnglishSpanishWord = require("../models/EnglishSpanishWord");
const EnglishVocab = require("../models/EnglishVocab");
const SpanishVocab = require("../models/SpanishVocab");

function applyExtraSetup() {
  EnglishSpanishWord.hasMany(EnglishVocab, { as: "english_vocab" });

  EnglishVocab.belongsTo(EnglishSpanishWord, {
    foreignKey: "english_spanish_words_id",
    as: "english_word",
  });

  EnglishSpanishWord.hasMany(SpanishVocab, { as: "spanish_vocab" });

  SpanishVocab.belongsTo(EnglishSpanishWord, {
    foreignKey: "english_spanish_words_id",
    as: "spanish_word",
  });
}


module.exports = { applyExtraSetup };