function Play() {
  this.game = new Game();
}

Play.prototype.renderBoard = function(){
  var boardDiv = $("#board");
  boardDiv.empty();

  _.each(this.game.board.grid, function(row, rIndex, grid) {
    var rowDiv = $("<div>")
                .addClass("row")
                .attr("id", "row"+rIndex);

    boardDiv.append(rowDiv);

    _.each(row, function(square, sIndex, row){
      var squareDiv = $("<div>")
                      .addClass("square")
                      .attr("id", "square"+rIndex+sIndex)
                      .html(square);
      $("#row"+rIndex).append(squareDiv);
    });
  })
};

Play.prototype.setHeader = function(msg) {
  $('#header').html(msg);
};

Play.prototype.clickHelper = function(x,y) {
  var coords = [x,y]
  $("#square"+x+y).click(function() {
        console.log(coords);
        console.log(p.game.move(coords));
        if (p.game.board.won()) {
          p.setHeader(p.game.currentPlayer + " Lost, Play Again!")
          p = new Play();
        } else if (p.game.board.draw()) {
          p.setHeader("The Game is a Draw, You Both Lose. Play Again!")
          p = new Play();
        } else {
          p.setHeader("Current Player: " + p.game.currentPlayer);
        }
        p.renderBoard();
        p.bindClicks();
  });
};

Play.prototype.bindClicks = function () {

  for(var y = 0; y <3; y++) {
    for(var x = 0; x <3; x++) {
      p.clickHelper(x,y);
    }
  }
};

$(function () {
  p = new Play();
  p.renderBoard();
  p.bindClicks();
});

