//Word depends on the letter constructor. We need to require the letter so it can be used in the word.js
var Letter = require("./Letter");

let Word = function(generatedWord){
    //takes the generated word
    this.generatedWord = generatedWord;
    //Array of letters representing the letters of a random word from the list
    this.letters = [];
    this.spaces = [];
    this.splitWord = function()
    {
        this.letters = this.generatedWord.split("");
        underScores = this.letters.length;
        console.log(this.underscores.join(" "));
    }
this.lettersGenerated = function() {
    for (i=0; i < this.letters.length; i++){
    
    this.letters[i] = new letterGuessed (this.letters[i]);
    this.letters[i].showLetter();

}


}

}
module.exports = Word;
