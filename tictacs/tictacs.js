var createLines = function() {
  lines = [];

  for(var i = 0; i < 3; i++){
    line1 = []
    line2 = []
    for(var j = 0; j < 3; j++){
      line1.push([i,j]); // horizontal line
      line2.push([j,i]); // it's corresponding transpose/vertical line
    }
    lines.push(line1);
    lines.push(line2);
  }

  lines.push([[0,0],[1,1],[2,2]]); // add dem diags.
  lines.push([[0,2],[1,1],[2,0]]);
  return lines;
};

var Board = function() {
  var grid = _.times(3, function() {return Array(' ',' ',' ');});
  this.grid = grid;
  this.lines = createLines();
};

var Game = function() {
  this.board = new Board();
  this.currentPlayer = 'X';
};

Board.prototype.won = function() {
  var that = this;
  var winningLines = _.filter(that.lines, function(line){
    return that.checkLine(line);
  });
  console.log(winningLines);
  if (winningLines.length > 0 ) {
    return true;
  }
  return false;
};

Board.prototype.full = function() {
  var that = this;
  return !_.filter(_.flatten(that.grid), function(value) {return value == " "}).length
}

Board.prototype.draw = function() {
  return this.full() && !this.won()
}

Board.prototype.checkLine = function(line) {
  var that = this;
  values = _.map(line, function(pos) {
    return that.grid[pos[0]][pos[1]];
  });

  return (values[0] == values[1] && values[1] == values[2] && values[0] != " ");
};

Board.prototype.validMove = function(move) {
  return this.grid[move[0]][move[1]] == " ";
};

Board.prototype.placePiece = function(move, player) {
  this.grid[move[0]][move[1]] = player;
};

Game.prototype.move = function(move) {
  if (this.board.validMove(move)) {
    this.board.placePiece(move,this.currentPlayer);
    this.currentPlayer = (this.currentPlayer == 'X') ? 'O' : 'X';
    return true;
  }
  return false;
}

Game.prototype.won = function() {
  that.board.won();
}