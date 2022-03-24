const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.currentCard = this.deck.cards[0];
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currentTurn;
  }

  returnCurrentCard() {
    return this.currentCard;
  }

  takeTurn(guess) {
    this.currentTurn = new Turn(guess, this.returnCurrentCard());
    this.turns++;
    if (!this.currentTurn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentCard.id);
    }
    return this.currentTurn.giveFeedback();
  }

  calculatePercentCorrect() {
    return (100 - (this.incorrectGuesses.length / this.turns) * 100);
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`);
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
  }
}

module.exports = Round;
