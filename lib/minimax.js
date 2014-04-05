var ImplementationError = require('./implementationError')

var Minimax = function(setBoard) {
  'use strict';
  this.version = require('../package').version
  this.board = setBoard || ['-', '-', '-', '-', '-', '-', '-', '-', '-']
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
    if (arr[c] === item) {
      count++
    }
  }
  return count
}

Minimax.prototype.occupy = function(pos, player) {
  'use strict';

  pos = player = null
  throw new ImplementationError('occupy')
}

Minimax.prototype.getFreePositions = function() {
  'use strict';

  throw new ImplementationError('getFreePositions')
}

Minimax.prototype.nextPlayer = function(currentPlayer) {
  'use strict';

  currentPlayer = null
  throw new ImplementationError('nextPlayer')
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

    score = newMinimax.alphaBetaSearch(player)(this.config.ply, -Infinity, Infinity, this.nextPlayer(player))

    if (score > biggestValue) {
      biggestValue = score
      result = tryMove
    }

  }
  return { player: player, value: biggestValue, result: result }

}

Minimax.prototype.alphaBetaSearch = function(player) {
  'use strict';

  return function(depth, alpha, beta, currentPlayer) {
    var possMoves = this.getFreePositions()
      , tryMove
      , newMinimax
      , minVal
      , maxVal
      , i

    if (this.terminalState() || depth <= 0 || this.winner(currentPlayer) || this.loser(currentPlayer)) {
      return this.utility(currentPlayer)
    }

    if (currentPlayer === player) {
      for (i = 0; i < possMoves.length; i++) {
        tryMove = possMoves[i]

        newMinimax = new Minimax(this.board.slice(0))
        newMinimax.occupy(tryMove, player)

        minVal = newMinimax.alphaBetaSearch(player)(this.config.ply - 1, alpha, beta, this.nextPlayer(currentPlayer))

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

        newMinimax = new Minimax(this.board.slice(0))
        newMinimax.occupy(tryMove, player)

        maxVal = newMinimax.alphaBetaSearch(player)(this.config.ply - 1, alpha, beta, this.nextPlayer(currentPlayer))

        beta = Math.min(beta, maxVal)

        if (beta <= alpha) {
          break
        }
      }
      return beta

    }
  }.bind(this)
}

Minimax.prototype.terminalState = function() {
  'use strict';

  throw new ImplementationError('terminalState')
}

Minimax.prototype.utility = function(player) {
  'use strict';

  player = null
  throw new ImplementationError('utility')
}

Minimax.prototype.winner = function(player) {
  'use strict';

  player = null
  throw new ImplementationError('winner')
}

Minimax.prototype.loser = function(player) {
  'use strict';

  return this.winner(this.nextPlayer(player))
}

module.exports = Minimax
