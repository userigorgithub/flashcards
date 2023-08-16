const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Game = require('../src/Game');
const util = require('../src/util');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
    this.currentTurn;
    this.startTime;
    this.endTime;
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
    if (!this.returnCurrentCard()) {
      this.timerEnd();
    }
    return this.currentTurn.giveFeedback();
  }

  timerStart() {
    this.startTime = Date.now();
  }

  timerEnd() {
    this.endTime = Date.now();
  }

  checkTime() {
    let timeInSeconds = (this.endTime - this.startTime) / 1000;
    let minutes = Math.round(timeInSeconds / 60);
    let seconds = Math.round(timeInSeconds % 60);
    if (minutes > 0) {
      return `${minutes} minute(s) and ${seconds} second(s)`
    } else {
      return `${seconds} seconds`
    }
  }

  calculatePercentCorrect() {
    return (100 - (this.incorrectGuesses.length / this.turns) * 100);
  }

  endRound() {
    if (this.calculatePercentCorrect() >= 90) {
      console.log(`** Round over! ** You answered ${Math.round(this.calculatePercentCorrect())}% of the questions correctly and it took ${this.checkTime()}!`);
      return `** Round over! ** You answered ${Math.round(this.calculatePercentCorrect())}% of the questions correctly and it took ${this.checkTime()}!`;
    } else {
      return this.startAgain();
    }
  }

  startAgain(deck, round) {
    this.turns = 0;
    this.incorrectGuesses = [];
    this.returnCurrentCard();
    util.main(this);
    console.log(`Repeat round! You must score 90% or higher.
-----------------------------------------------------------------------`);
    return `Repeat round! You must score 90% or higher.
-----------------------------------------------------------------------`;
  }
}

module.exports = Round;
