const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');

describe('Turn', function() {

  it('should be a function', function() {
    const turn = new Turn();
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();
    expect(turn).to.be.an.instanceof(Turn);
  });

  it('should have user\'s guess to the question', function() {
    const turn = new Turn('guess');
    expect(turn.userGuess).to.equal('guess');
  });

  it('should have card object for the current card in play', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);
    expect(turn.currentCard).to.deep.equal(card);
   });

  it('should be able to return user\'s guess', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);
    expect(turn.returnGuess()).to.deep.equal('object');
  });

  it('should be able to return a card', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn = new Turn('object', card);
    expect(turn.returnCard()).to.deep.equal(card);
  });

  it('should be able to return true or false indicating if user\'s guess is correct or incorrect', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn1 = new Turn('object', card);
    const turn2 = new Turn('array', card);
    expect(turn1.evaluateGuess()).to.equal(true);
    expect(turn2.evaluateGuess()).to.equal(false);
  });

  it('should be able to return "Correct!" or "Incorrect!" answer if user\'s guess is correct or incorrect', function() {
    const card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const turn1 = new Turn('object', card);
    const turn2 = new Turn('array', card);
    expect(turn1.giveFeedback()).to.equal('Correct!');
    expect(turn2.giveFeedback()).to.equal('Incorrect!');
  });
});
