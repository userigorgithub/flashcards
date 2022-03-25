const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {

  let card1;
  let card2;
  let card3;
  let cards;
  let deck;
  let round;

  beforeEach(() => {

    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ["mutator method", "accessor method", "iteration method"], 'mutator method');
    cards = [card1, card2, card3];
    deck = new Deck(cards);
    round = new Round(deck);
  });

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should have cards in a deck', () => {
    expect(round.deck).to.equal(deck);
  });

  it('should have a current card being played', () => {
    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should be able to have turns', () => {
    expect(round.turns).to.equal(0);
  });

  it('should store incorrect guesses in an array via id', () => {
    expect(round.incorrectGuesses.length).to.equal(0);
    round.takeTurn('function');
    expect(round.incorrectGuesses.length).to.equal(1);
  });

  it('should be able to have a new turn instance and update turns count', () => {
    expect(round.turns).to.equal(0);
    round.takeTurn('object');
    expect(round.currentTurn).to.be.an.instanceOf(Turn);
    expect(round.turns).to.equal(1);
  });

  it('should update card after turn', () => {
    expect(round.returnCurrentCard()).to.equal(card1);
    round.takeTurn();
    expect(round.returnCurrentCard()).to.equal(card2);
  });

  it('should tell if guess was correct or incorrect', () => {
    expect(round.takeTurn('object')).to.equal('Correct!');
    expect(round.takeTurn('function')).to.equal('Incorrect!');
  });

  it('should calculate and return the percentage of correct guesses', () => {
    round.takeTurn('object');
    round.takeTurn('function');
    expect(round.calculatePercentCorrect()).to.equal(50);
  });

  it('should print the message to the console with % of correct answers', () => {
    round.takeTurn('object');
    round.takeTurn('function');
    expect(round.endRound()).to.equal(`** Round over! ** You answered ${round.calculatePercentCorrect()}% of the questions correctly!`)
  });
});
