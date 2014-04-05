Array.prototype.count = function(item) {
  'use strict';
  var count = 0
  for (var c = 0; c < this.length;c++) {
    if (this[c] == item)
      count++
  }
  return count
}

var Minimax = function(setBoard) {
  'use strict';

  this.board = setBoard || ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
  this.config = {
    ply: 3
  }
}

Minimax.prototype.occupy = function(board, pos, player) {
  'use strict';

  if (board[pos] === "-") {
    board[pos] = player
    return true
  }
  return false
}

Minimax.prototype.getFreePositions = function(board) {
  'use strict';

  var moves = [];
  for (var move = 0; move < board.length; move++) {
    if (board[move] === "-") {
      moves.push(move)
    }
  }
  return moves
}

Minimax.prototype.nextPlayer = function(currentPlayer) {
  'use strict';

  return (currentPlayer === "X" ? "O" : "X")
}

Minimax.prototype.alphaBetaSearch = function(board, player) {
  'use strict';

  var biggestValue = -Infinity
    , possMoves = this.getFreePositions(board)
    , newBoard = board.slice(0)
    , result
    , tryMove
    , score

  for (var i = 0; i < possMoves.length; i++) {
    tryMove = possMoves[i]

    newBoard[tryMove] = player

    if (this.winner(newBoard, player)) {
      return { player: player, value: 1000, result: tryMove }
    }
    if (this.loser(newBoard, player)) {
      return { player: player, value: -1000, result: tryMove }
    }

    // abs = minValue(newBoard, this.config.ply, -Infinity,Infinity, this.nextPlayer(player), player)
    score = -this.negaMax(newBoard, this.config.ply, -Infinity, Infinity, this.nextPlayer(player))

    if (score > biggestValue) {
      biggestValue = score
      result = tryMove
    }
    newBoard[tryMove] = "-"
  }
  return { player: player, value: biggestValue, result: result }
}

Minimax.prototype.terminalTest = function(board) {
  'use strict';

  return this.getFreePositions(board).length === 0
}

Minimax.prototype.utility = function(board, player) {
  'use strict';

  // 0 1 2
  // 3 4 5
  // 6 7 8
  var score = 0
    , markScore = [0, 1, 10, 1000]
    , diag1 = [board[0], board[4], board[8]]
    , diag2 = [board[2], board[4], board[6]]

  for (var row, col, r = 0; r < 3; r++) {
    row = board.slice(r * 3, (r * 3) + 3)
    if (row.count(player) > 0 && row.count(this.nextPlayer(player)) === 0)  {
      score += markScore[row.count(player)]
    }
    else if (row.count(this.nextPlayer(player)) > 0 && row.count(player) === 0)  {
      score -= markScore[row.count(this.nextPlayer(player))]
    }
    col = [board[r], board[r + 3], board[r + 6]]
    if (col.count(player) > 0 && col.count(this.nextPlayer(player)) === 0) {
      score += markScore[col.count(player)]
    }
    else if (col.count(this.nextPlayer(player)) > 0 && col.count(player) === 0) {
      score -= markScore[col.count(this.nextPlayer(player))]
    }
  }

  if (diag1.count(player) > 0 && diag1.count(this.nextPlayer(player)) === 0) {
    score += markScore[diag1.count(player)]
  }
  else if (diag1.count(this.nextPlayer(player)) > 0 && diag1.count(player) === 0) {
    score -= markScore[diag1.count(this.nextPlayer(player))]
  }

  if (diag2.count(player) > 0 && diag2.count(this.nextPlayer(player)) === 0) {
    score += markScore[diag2.count(player)]
  }
  else if (diag2.count(this.nextPlayer(player)) > 0 && diag2.count(player) === 0) {
    score -= markScore[diag2.count(this.nextPlayer(player))]
  }
  return score
}

Minimax.prototype.negaMax = function(state, depth, alpha, beta, player) {
  if (this.terminalTest(state) || depth <= 0 || this.winner(state, player) || this.loser(state, player)) {
    return this.utility(state, player)
  }
  var possMoves = this.getFreePositions(state)
    , newBoard = state.slice(0)
    , tryMove
    , val

  for (var i = 0; i < possMoves.length; i++) {
    tryMove = possMoves[i]

    newBoard[tryMove] = player

    val = -this.negaMax(newBoard, depth - 1, -beta, -alpha, this.nextPlayer(player))

    if (val >= beta) {
      return val
    }

    alpha = Math.max(val, alpha)
    newBoard[tryMove] = 0
  }
  return alpha
}

Minimax.prototype.winnerWhere = function(board, player) {
  var row, col
    , rows = 3
    , cols = 3
    , diag1 = [board[0], board[4], board[8]]
    , diag2 = [board[2], board[4], board[6]]

  for (var r = 0; r < rows; r++) {
    row = board.slice(r * rows, (r * rows) + rows)
    if (row.count(player) === 3) {
      return [r * rows, (r * rows) + rows - 1]
    }
  }
  for (var c = 0; c < cols; c++) {
    col = []
    for (var csub = c, iters = 0; csub < board.length && iters < 3; iters++, csub += cols) {
      col.push(board[csub])
    }
    if (col.count(player) == 3) {
      return [c, c + (cols * (3 - 1))]
    }
  }
  if (diag1.count(player) === 3) {
    return [0, 8]
  }
  if (diag2.count(player) === 3) {
    return [2, 6]
  }
  return [-1, -1]
}

Minimax.prototype.winner = function(board, player) {
  var result = this.winnerWhere(board, player)
  return (result[0] !== -1 && result[1] !== -1)
}

Minimax.prototype.loser = function(board, player) {
  'use strict';
  return this.winner(board, this.nextPlayer(player))
}


module.exports = Minimax
