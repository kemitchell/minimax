var Minimax = function(setBoard) {
  'use strict';

  this.board = setBoard || ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
  this.config = {
    ply: 3
  }
}

Minimax.prototype.count = function(arr, item) {
  'use strict';

  var count = 0
    , c = 0
    , len = arr.length

  for (; c < len;c++) {
    if (arr[c] == item) {
      count++
    }
  }
  return count
}

Minimax.prototype.occupy = function(pos, player) {
  'use strict';

  if (this.board[pos] === "-") {
    this.board[pos] = player
    return true
  }
  return false
}

Minimax.prototype.getFreePositions = function() {
  'use strict';

  var moves = [];
  for (var move = 0; move < this.board.length; move++) {
    if (this.board[move] === "-") {
      moves.push(move)
    }
  }
  return moves
}

Minimax.prototype.nextPlayer = function(currentPlayer) {
  'use strict';

  return (currentPlayer === "X" ? "O" : "X")
}

Minimax.prototype.search = function(player) {
  'use strict';

  var biggestValue = -Infinity
    , possMoves = this.getFreePositions()
    , result
    , tryMove
    , score
    , newMinimax


  for (var i = 0; i < possMoves.length; i++) {
    tryMove = possMoves[i]

    newMinimax = new Minimax(this.board.slice(0))
    newMinimax.occupy(tryMove, player)

    if (newMinimax.winner(player)) {
      return { player: player, value: 1000, result: tryMove }
    }
    if (newMinimax.loser(player)) {
      return { player: player, value: -1000, result: tryMove }
    }

    score = -newMinimax.negaMax(this.config.ply, -Infinity, Infinity, this.nextPlayer(player))

    if (score > biggestValue) {
      biggestValue = score
      result = tryMove
    }

  }
  return { player: player, value: biggestValue, result: result }
}

Minimax.prototype.terminalState = function() {
  'use strict';

  return this.getFreePositions().length === 0
}

Minimax.prototype.utility = function(player) {
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
    if (row.count(player) > 0 && row.count(nextPlyr) === 0)  {
      score += markScore[row.count(player)]
    }
    else if (row.count(nextPlyr) > 0 && row.count(player) === 0)  {
      score -= markScore[row.count(nextPlyr)]
    }
    col = [this.board[r], this.board[r + 3], this.board[r + 6]]
    if (col.count(player) > 0 && col.count(nextPlyr) === 0) {
      score += markScore[col.count(player)]
    }
    else if (col.count(nextPlyr) > 0 && col.count(player) === 0) {
      score -= markScore[col.count(nextPlyr)]
    }
  }

  if (diag1.count(player) > 0 && diag1.count(nextPlyr) === 0) {
    score += markScore[diag1.count(player)]
  }
  else if (diag1.count(nextPlyr) > 0 && diag1.count(player) === 0) {
    score -= markScore[diag1.count(nextPlyr)]
  }

  if (diag2.count(player) > 0 && diag2.count(nextPlyr) === 0) {
    score += markScore[diag2.count(player)]
  }
  else if (diag2.count(nextPlyr) > 0 && diag2.count(player) === 0) {
    score -= markScore[diag2.count(nextPlyr)]
  }
  return score
}

Minimax.prototype.winner = function(player) {
  'use strict';

  var row, col
    , rows = 3
    , cols = 3
    , diag1 = [this.board[0], this.board[4], this.board[8]]
    , diag2 = [this.board[2], this.board[4], this.board[6]]

  for (var r = 0; r < rows; r++) {
    row = this.board.slice(r * rows, (r * rows) + rows)
    if (row.count(player) === rows) {
      return true
    }
  }
  for (var c = 0; c < cols; c++) {
    col = []
    for (var csub = c, iters = 0; csub < this.board.length && iters < 3; iters++, csub += cols) {
      col.push(this.board[csub])
    }
    if (col.count(player) == cols) {
      return true
    }
  }
  if (diag1.count(player) === 3) {
    return true
  }
  if (diag2.count(player) === 3) {
    return true
  }
  return false

}

Minimax.prototype.loser = function(player) {
  'use strict';

  return this.winner(this.nextPlayer(player))
}

module.exports = Minimax
