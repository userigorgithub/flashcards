const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Card = require('./Card');
const Turn = require('./Turn');
const Deck = require('./Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.cards;
    this.deck;
    this.round;
  }

  start() {
    const cards = prototypeQuestions.map(card => {
      return new Card(card.id, card.question, card.answers, card.correctAnswer)
    });
    this.cards = cards;

    this.deck = new Deck(cards)
    // const deck = new Deck(cards);
    // this.deck = deck;
    this.round = new Round(this.deck)
    // const round = new Round(deck);
    // this.round = round;
    
    this.round.timerStart();
    this.printMessage(deck, round);
    this.printQuestion(round);
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }
}

module.exports = Game;
