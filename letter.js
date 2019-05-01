var letterGuessed = function(letter)
{
    this.letter = letter.toUpperCase();
    this.letterGuessedCorrectly = false;
    this.showLetter = function() 
    {
        if(this.letterGuessedCorrectly)
        {
            console.log(this.letter);
        }
    else{
        console.log("Thanos: I'm about to snap my fingers!")
    }
    }
}

module.exports = letterGuessed
