/* global describe, it, beforeEach */
'use strict';

var expect = require('chai').expect

var Minimax = require('../minimax')
  , ImplementationError = require('../implementationError')

describe('Minimax', function() {

  describe('constructor', function() {
    it('set default board with no parameter', function() {
      var m = new Minimax()
      expect(m.board).to.eql(['-', '-', '-', '-', '-', '-', '-', '-', '-'])
    })
    it('sets a board from first parameter', function() {
      var m = new Minimax(['-', '-', 'X', '-', 'O', '-', '-', '-', '-'])
      expect(m.board).to.eql(['-', '-', 'X', '-', 'O', '-', '-', '-', '-'])
    })
  })

  describe('occupy', function() {
    var m
    beforeEach(function(done) {
      m = new Minimax()
      done()
    })

    it('returns true on position occupied', function(done) {
      expect(m.occupy.bind(m, [1, 'X'])).to.throw(ImplementationError, /occupy not implemented/)
      done()
    })
  })

  describe('getFreePositions', function() {
    var m
    beforeEach(function(done) {
      m = new Minimax()
      done()
    })

    it('returns 9 at beginning', function(done) {
      expect(m.getFreePositions.bind(m)).to.throw(ImplementationError, /getFreePositions not implemented/)
      done()
    })

    it('returns 8 when we occupy one space', function(done) {
      expect(m.occupy.bind(m, [1, 'O'])).to.throw(ImplementationError, /occupy not implemented/)
      done()
    })

  })

  describe('nextPlayer', function() {
    it('nextPlayer returns O for X and X for O', function(done) {
      var m = new Minimax()
      expect(m.nextPlayer.bind(m, 'X')).to.throw(ImplementationError, /nextPlayer not implemented/)
      done()
    })
  })

  describe('utility', function() {
    it('should return 0 with default constructor', function(done) {
      var m = new Minimax()
      expect(m.utility.bind(m, 'X')).to.throw(ImplementationError, /utility not implemented/i)
      expect(m.utility.bind(m, 'O')).to.throw(ImplementationError, /utility not implemented/i)
      done()
    })

  })

  describe('winner/loser', function() {
    it('should throw error about winner logic not implemented', function(done) {
      var m = new Minimax()
      expect(m.winner.bind(m, 'O')).to.throw(ImplementationError)
      done()
    })
  })

  describe('search', function() {
    it('returns the hash output for m.search(\'O\') when O is a winner', function(done) {
      var m = new Minimax()
      expect(m.search.bind(m, 'O')).to.throw(ImplementationError)
      done()
    })
  })

})
