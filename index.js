const fs = require('fs');
const tracery = require('tracery-grammar');

const grammarDefinition = JSON.parse(fs.readFileSync('bot.json', 'utf8'));

const generateSong = () => {
  let grammar = tracery.createGrammar(grammarDefinition);
  return grammar.flatten('#origin#');
};

console.log(generateSong());
