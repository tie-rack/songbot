const fs = require('fs');
const tracery = require('tracery-grammar');

const grammarDefinition = JSON.parse(fs.readFileSync('bot.json', 'utf8'));

const insertBars = (music) => {
  notes = music.match(/\[[^\]]+\S+|\S+/g);
  let res = "|: ";
  count = 0;
  notes.forEach(note => {
    if (note[note.length - 1] === "2") {
      count += 2
    } else {
      count += 1
    }
    res += `${note}`;
    if (count % 4 === 0) {
      res += " ";
    }
    if (count % 8 === 0) {
      res += "| ";
    }
    if (count % 16 === 0) {
      res += "\n";
    }
  })
  res = res.replace(/\|\s+$/, ":|");
  return res;
}

const generateSong = () => {
  let grammar = tracery.createGrammar(grammarDefinition);
  let score = grammar.flatten('#origin#').split("\n");
  let musicIndex = score.length - 1;
  let music = score[musicIndex];
  score[musicIndex] = insertBars(music);
  return score.join("\n");
};

console.log(generateSong());
