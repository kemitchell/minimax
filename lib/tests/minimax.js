var expect = require('chai').expect

var Minimax = require('../minimax')

describe('Minimax', function() {

  describe('constructor', function() {
    it('set default board with no parameter', function() {
      var m = new Minimax()
      expect(m.board).to.eql(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    })
    it('sets a board from first parameter', function() {
      var m = new Minimax(["-", "-", "X", "-", "O", "-", "-", "-", "-"])
      expect(m.board).to.eql(["-", "-", "X", "-", "O", "-", "-", "-", "-"])
    })
  })

  describe('occupy', function() {
    var m
    beforeEach(function(done) {
      m = new Minimax()
      done()
    })

    it('returns true on position occupied', function() {
      var firstMove, secondMove
      firstMove = m.occupy(1, "X")
      secondMove = m.occupy(1, "X")
      expect(firstMove).to.be.true
      expect(secondMove).to.be.false
    })
  })

  describe('getFreePositions', function() {
    var m
    beforeEach(function(done) {
      m = new Minimax()
      done()
    })

    it('returns 9 at beginning', function(done) {
      expect(m.getFreePositions()).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8])
      expect(m.getFreePositions()).to.have.length(9)
      done()
    })

    it('returns 8 when we occupy one space', function(done) {
      m.occupy(1, "O")
      expect(m.getFreePositions()).to.eql([0, 2, 3, 4, 5, 6, 7, 8])
      expect(m.getFreePositions()).to.have.length(8)
      done()
    })

    it('returns 0 when we occupy all spaces', function(done) {
      m.occupy(0, "O")
      m.occupy(1, "O")
      m.occupy(2, "O")
      m.occupy(3, "O")
      m.occupy(4, "O")
      m.occupy(5, "O")
      m.occupy(6, "O")
      m.occupy(7, "O")
      m.occupy(8, "O")
      m.occupy(9, "O")
      expect(m.getFreePositions()).to.eql([])
      expect(m.getFreePositions()).to.have.length(0)
      done()
    })
  })

  describe('nextPlayer', function() {
    it('nextPlayer returns O for X and X for O', function(done) {
      var m = new Minimax()
      expect(m.nextPlayer("X")).to.equal("O")
      expect(m.nextPlayer("O")).to.equal("X")
      done()
    })
  })

  describe('utility', function() {
    it('should return 0 with default constructor', function(done) {
      var m = new Minimax()
      expect(m.utility.bind(m, "X")).to.throw(Error, /utility not implemented/i)
      expect(m.utility.bind(m, "O")).to.throw(Error, /utility not implemented/i)
      done()
    })

    it('should return 4 for O and -4 for X when O moves onto center', function(done) {
      var m = new Minimax()
      m.occupy(4, "O")
      expect(m.utility.bind(m, "X")).to.throw(Error, /utility not implemented/i)
      expect(m.utility.bind(m, "O")).to.throw(Error, /utility not implemented/i)
      done()
    })

    it('should return 1 for O and -1 for X when X moves onto top-left corner', function(done) {
      var m = new Minimax()
      m.occupy(4, "O")
      m.occupy(0, "X")
      expect(m.utility.bind(m, "X")).to.throw(Error, /utility not implemented/i)
      expect(m.utility.bind(m, "O")).to.throw(Error, /utility not implemented/i)
      done()
    })

  })

  describe('winner/loser', function() {
    it('should throw error about winner logic not implemented', function(done) {
      var m = new Minimax()
      m.occupy(4, "O")
      m.occupy(0, "X")
      m.occupy(5, "O")
      m.occupy(1, "X")
      m.occupy(3, "O")
      expect(m.winner.bind(m, "O")).to.throw(Error, /winner logic/i)
      expect(m.winner.bind(m, "X")).to.throw(Error, /winner logic/i)
      expect(m.loser.bind(m, "X")).to.throw(Error, /winner logic/i)
      expect(m.loser.bind(m, "O")).to.throw(Error, /winner logic/i)
      done()
    })
  })

  describe('search', function() {
    it('Returns the hash output for m.search("O") when O is a winner', function(done) {
      var m = new Minimax()
      expect(m.search.bind(m, "O")).to.throw(Error, /winner logic/i)
      done()
    })
  })

})
