const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const Game = require('../src/Game');

describe('Game', () => {

  let card1;
  let card2;
  let card3;
  let cards;
  let deck;
  let round;
  let game;

  beforeEach(() => {

    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ["array", "object", "function"], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ["mutator method", "accessor method", "iteration method"], 'mutator method');
    cards = [card1, card2, card3];
    deck = new Deck(cards);
    round = new Round(deck);
    game = new Game(round);
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', () => {
    expect(game).to.be.an.instanceof(Game);
  });

  it('should store cards', () => {
    game.start();
    expect(game.cards[1]).to.be.an.instanceof(Card);
  });

  it('should create a new deck', () => {
    game.start();
    expect(game.deck).to.be.an.instanceof(Deck);
  });

  it('should create a new round', () => {
    game.start();
    expect(game.round).to.be.an.instanceof(Round);
  });
});
