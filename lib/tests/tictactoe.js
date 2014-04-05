/* global describe, it, beforeEach */
'use strict';

var expect = require('chai').expect

var TicTacToe = require('../tictactoe')

describe('TicTacToe', function() {

  describe('constructor', function() {
    it('set default board with no parameter', function() {
      var m = new TicTacToe()
      expect(m.board).to.eql(['-', '-', '-', '-', '-', '-', '-', '-', '-'])
    })
    it('sets a board from first parameter', function() {
      var m = new TicTacToe(['-', '-', 'X', '-', 'O', '-', '-', '-', '-'])
      expect(m.board).to.eql(['-', '-', 'X', '-', 'O', '-', '-', '-', '-'])
    })
  })

  describe('occupy', function() {
    var m
    beforeEach(function(done) {
      m = new TicTacToe()
      done()
    })

    it('returns true on position occupied', function() {
      var firstMove, secondMove
      firstMove = m.occupy(1, 'X')
      secondMove = m.occupy(1, 'X')
      expect(firstMove).to.be.true
      expect(secondMove).to.be.false
    })
  })

  describe('getFreePositions', function() {
    var m
    beforeEach(function(done) {
      m = new TicTacToe()
      done()
    })

    it('returns 9 at beginning', function(done) {
      expect(m.getFreePositions()).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8])
      expect(m.getFreePositions()).to.have.length(9)
      done()
    })

    it('returns 8 when we occupy one space', function(done) {
      m.occupy(1, 'O')
      expect(m.getFreePositions()).to.eql([0, 2, 3, 4, 5, 6, 7, 8])
      expect(m.getFreePositions()).to.have.length(8)
      done()
    })

    it('returns 0 when we occupy all spaces', function(done) {
      m.occupy(0, 'O')
      m.occupy(1, 'O')
      m.occupy(2, 'O')
      m.occupy(3, 'O')
      m.occupy(4, 'O')
      m.occupy(5, 'O')
      m.occupy(6, 'O')
      m.occupy(7, 'O')
      m.occupy(8, 'O')
      m.occupy(9, 'O')
      expect(m.getFreePositions()).to.eql([])
      expect(m.getFreePositions()).to.have.length(0)
      done()
    })
  })

  describe('nextPlayer', function() {
    it('nextPlayer returns O for X and X for O', function(done) {
      var m = new TicTacToe()
      expect(m.nextPlayer('X')).to.equal('O')
      expect(m.nextPlayer('O')).to.equal('X')
      done()
    })
  })

  describe('utility', function() {
    it('should return 0 with default constructor', function(done) {
      var m = new TicTacToe()
      expect(m.utility('X')).to.equal(0)
      expect(m.utility('O')).to.equal(0)
      done()
    })

    it('should return 4 for O and -4 for X when O moves onto center', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      expect(m.utility('X')).to.equal(-4)
      expect(m.utility('O')).to.equal(4)
      done()
    })

    it('should return 1 for O and -1 for X when X moves onto top-left corner', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      expect(m.utility('X')).to.equal(-1)
      expect(m.utility('O')).to.equal(1)
      done()
    })

    it('should return 1 for O and -1 for X when X moves onto top-left corner', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      expect(m.utility('X')).to.equal(-11)
      expect(m.utility('O')).to.equal(11)
      done()
    })

    it('should return 1 for O and -1 for X when X moves onto top-left corner', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      expect(m.utility('X')).to.equal(-1)
      expect(m.utility('O')).to.equal(1)
      done()
    })

    it('should return 1 for O and -1 for X when X moves onto top-left corner', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.utility('X')).to.equal(-992)
      expect(m.utility('O')).to.equal(992)
      done()
    })

  })
  describe('winner/loser', function() {
    it('should declare O the winner, X the loser', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.winner('O')).to.be.true
      expect(m.winner('X')).to.be.false
      expect(m.loser('X')).to.be.true
      expect(m.loser('O')).to.be.false
      done()
    })
  })
  describe('winnerWhere', function() {
    it('should return [3, 5] for O\'s win', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.winnerWhere('O')).to.eql([3, 5])
      done()
    })
    it('should return [-1, -1] for X\'s non-win', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.winnerWhere('X')).to.eql([-1, -1])
      done()
    })
  })

  describe('search', function() {
    it('Returns the hash output for m.search(\'O\') when O is a winner', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.search('O')).to.eql({ player: 'O', value: 1000, result: 2 })
      done()
    })
  })

  describe('negaMax', function() {
    it('tests out valuing for negaMax', function(done) {
      var m = new TicTacToe()
      m.occupy(4, 'O')
      m.occupy(0, 'X')
      m.occupy(5, 'O')
      m.occupy(1, 'X')
      m.occupy(3, 'O')
      expect(m.negaMax(3, -Infinity, Infinity, 'O')).to.eql(992)
      done()
    })
  })
})
