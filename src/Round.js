const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currentTurn;
    this.startTime;
  }

  returnCurrentCard() {
    return this.deck.cards[this.turns];
  }

  takeTurn(guess) {
    this.currentTurn = new Turn(guess, this.returnCurrentCard());
    this.turns++;
    if (!this.currentTurn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentTurn.currentCard.id);
    }
    return this.currentTurn.giveFeedback();
  }

  timer() {
    this.startTime = Date.now();
  }

  checkTime() {
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  calculatePercentCorrect() {
    return (100 - (this.incorrectGuesses.length / this.turns) * 100);
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly and it took ${this.checkTime()} seconds!`);
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly and it took ${this.checkTime()} seconds!`;
  }
}

module.exports = Round;
