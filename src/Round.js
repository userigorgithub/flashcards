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
    if (this.calculatePercentCorrect() >= 90) {
      console.log(`** Round over! ** You answered ${Math.round(this.calculatePercentCorrect())}% of the questions correctly and it took ${this.checkTime()} seconds!`);
      return `** Round over! ** You answered ${Math.round(this.calculatePercentCorrect())}% of the questions correctly and it took ${this.checkTime()} seconds!`;
    } else {
      return this.startAgain();
    }
  }

  startAgain(deck, round) {
    this.turns = 0;
    this.incorrectGuesses = [];
    this.returnCurrentCard();
    util.main(this);
    console.log(`Repeat round! You must score 90% or better. You are playing with ${this.deck.countCards()} cards.
-----------------------------------------------------------------------`);
    return `Repeat round! You must score 90% or better. You are playing with ${this.deck.countCards()} cards.
-----------------------------------------------------------------------`;
  }
}

module.exports = Round;
