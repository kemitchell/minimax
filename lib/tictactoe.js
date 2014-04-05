var util = require('util')
  , Minimax = require('./minimax')

var TicTacToe = function(setBoard) {
  'use strict';

  Minimax.call(this)

  this.board = setBoard || ['-', '-', '-', '-', '-', '-', '-', '-', '-']
  this.config = {
    ply: 3
  }
}

util.inherits(TicTacToe, Minimax)

TicTacToe.prototype.occupy = function(pos, player) {
  'use strict';

  if (this.board[pos] === '-') {
    this.board[pos] = player
    return true
  }
  return false
}

TicTacToe.prototype.getFreePositions = function() {
  'use strict';

  var moves = []

  for (var move = 0; move < this.board.length; move++) {
    if (this.board[move] === '-') {
      moves.push(move)
    }
  }
  return moves
}

TicTacToe.prototype.nextPlayer = function(currentPlayer) {
  'use strict';

  return (currentPlayer === 'X' ? 'O' : 'X')
}

TicTacToe.prototype.search = function(player) {
  'use strict';

  var biggestValue = -Infinity
    , possMoves = this.getFreePositions()
    , result
    , tryMove
    , score
    , newTicTacToe


  for (var i = 0; i < possMoves.length; i++) {
    tryMove = possMoves[i]

    newTicTacToe = new TicTacToe(this.board.slice(0))
    newTicTacToe.occupy(tryMove, player)

    if (newTicTacToe.winner(player)) {
      return { player: player, value: 1000, result: tryMove }
    }
    if (newTicTacToe.loser(player)) {
      return { player: player, value: -1000, result: tryMove }
    }

    score = newTicTacToe.negaMax(this.config.ply, -Infinity, Infinity, this.nextPlayer(player))

    if (score > biggestValue) {
      biggestValue = score
      result = tryMove
    }

  }
  return { player: player, value: biggestValue, result: result }

}
TicTacToe.prototype.alphaBetaSearch = function(player) {
  'use strict';

  return function(depth, alpha, beta, currentPlayer) {
    var possMoves = this.getFreePositions()
      , tryMove
      , newTicTacToe
      , minVal
      , maxVal
      , i

    if (this.terminalState() || depth <= 0 || this.winner(currentPlayer) || this.loser(currentPlayer)) {
      return this.utility(currentPlayer)
    }

    if (currentPlayer === player) {
      for (i = 0; i < possMoves.length; i++) {
        tryMove = possMoves[i]

        newTicTacToe = new TicTacToe(this.board.slice(0))
        newTicTacToe.occupy(tryMove, player)

        minVal = newTicTacToe.alphaBetaSearch(player)(this.config.ply - 1, alpha, beta, this.nextPlayer(currentPlayer))

        alpha = Math.max(alpha, minVal)

        if (alpha >= beta) {
          break
        }
      }
      return alpha
    }
    else {
      for (i = 0; i < possMoves.length; i++) {
        tryMove = possMoves[i]

        newTicTacToe = new TicTacToe(this.board.slice(0))
        newTicTacToe.occupy(tryMove, player)

        maxVal = newTicTacToe.alphaBetaSearch(player)(this.config.ply - 1, alpha, beta, this.nextPlayer(currentPlayer))

        beta = Math.min(beta, maxVal)

        if (beta <= alpha) {
          break
        }
      }
      return beta

    }
  }.bind(this)
}

TicTacToe.prototype.terminalState = function() {
  'use strict';

  return this.getFreePositions().length === 0
}

TicTacToe.prototype.utility = function(player) {
  'use strict';

  // 0 1 2
  // 3 4 5
  // 6 7 8
  var score = 0
    , markScore = [0, 1, 10, 1000]
    , diag1 = [this.board[0], this.board[4], this.board[8]]
    , diag2 = [this.board[2], this.board[4], this.board[6]]
    , nextPlyr = this.nextPlayer(player)

  for (var row, col, r = 0; r < 3; r++) {
    row = this.board.slice(r * 3, (r * 3) + 3)
    if (this.count(row, player) > 0 && this.count(row, nextPlyr) === 0)  {
      score += markScore[this.count(row, player)]
    }
    else if (this.count(row, nextPlyr) > 0 && this.count(row, player) === 0)  {
      score -= markScore[this.count(row, nextPlyr)]
    }
    col = [this.board[r], this.board[r + 3], this.board[r + 6]]
    if (this.count(col, player) > 0 && this.count(col, nextPlyr) === 0) {
      score += markScore[this.count(col, player)]
    }
    else if (this.count(col, nextPlyr) > 0 && this.count(col, player) === 0) {
      score -= markScore[this.count(col, nextPlyr)]
    }
  }

  if (this.count(diag1, player) > 0 && this.count(diag1, nextPlyr) === 0) {
    score += markScore[this.count(diag1, player)]
  }
  else if (this.count(diag1, nextPlyr) > 0 && this.count(diag1, player) === 0) {
    score -= markScore[this.count(diag1, nextPlyr)]
  }

  if (this.count(diag2, player) > 0 && this.count(diag2, nextPlyr) === 0) {
    score += markScore[this.count(diag2, player)]
  }
  else if (this.count(diag2, nextPlyr) > 0 && this.count(diag2, player) === 0) {
    score -= markScore[this.count(diag2, nextPlyr)]
  }
  return score
}


TicTacToe.prototype.negaMax = function(depth, alpha, beta, player) {
  'use strict';

  if (this.terminalState() || depth <= 0 || this.winner(player) || this.loser(player)) {
    return this.utility(player)
  }
  var possMoves = this.getFreePositions()
    , newTicTacToe
    , tryMove
    , val

  for (var i = 0; i < possMoves.length; i++) {
    tryMove = possMoves[i]

    newTicTacToe = new TicTacToe(this.board.slice(0))
    newTicTacToe.occupy(tryMove, player)

    val = -newTicTacToe.negaMax(depth - 1, -beta, -alpha, this.nextPlayer(player))

    if (val >= beta) {
      return val
    }

    alpha = Math.max(val, alpha)

    // newBoard[tryMove] = 0
  }
  return alpha
}

TicTacToe.prototype.winnerWhere = function(player) {
  'use strict';

  var row, col
    , rows = 3
    , cols = 3
    , diag1 = [this.board[0], this.board[4], this.board[8]]
    , diag2 = [this.board[2], this.board[4], this.board[6]]

  for (var r = 0; r < rows; r++) {
    row = this.board.slice(r * rows, (r * rows) + rows)
    if (this.count(row, player) === rows) {
      return [r * rows, (r * rows) + rows - 1]
    }
  }
  for (var c = 0; c < cols; c++) {
    col = []
    for (var csub = c, iters = 0; csub < this.board.length && iters < 3; iters++, csub += cols) {
      col.push(this.board[csub])
    }
    if (this.count(col, player) === cols) {
      return [c, c + (cols * (3 - 1))]
    }
  }
  if (this.count(diag1, player) === 3) {
    return [0, 8]
  }
  if (this.count(diag2, player) === 3) {
    return [2, 6]
  }
  return [-1, -1]
}

TicTacToe.prototype.winner = function(player) {
  'use strict';

  var result = this.winnerWhere(player)
  return (result[0] !== -1 && result[1] !== -1)
}

TicTacToe.prototype.loser = function(player) {
  'use strict';

  return this.winner(this.nextPlayer(player))
}

module.exports = TicTacToe
