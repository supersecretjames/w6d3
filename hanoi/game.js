function Play() {
  this.game = new Game(5);
  this.tower0El = $("#tower0");
  this.tower1El = $("#tower1");
  this.tower2El = $("#tower2");
  this.tower0 = this.game.towers[0];
  this.tower1 = this.game.towers[1];
  this.tower2 = this.game.towers[2];
  this.tower0Button = $("#tower0btn");
  this.tower1Button = $("#tower1btn");
  this.tower2Button = $("#tower2btn");
  this.promptHeader = $("#prompt")
  this.moveArray = [];
};

Play.prototype.drawTowers = function() {
  for (var i = 0; i <this.game.towers.length; i++){
    var tower = $("#tower"+i);
    tower.empty();

    var that = this;
    var counter = 0;
    _.each(this.game.towers[i].discs, function(size) {
      var disc = that.makeDisc(size);
      tower.prepend(disc);
      counter += 1;
    })
    for (counter; counter<5; counter++) {
      var filler = $("<div>")
              .addClass("disc")
              .addClass("filler");
      tower.prepend(filler);
    }
  }
};

Play.prototype.towerClickHandler = function(index) {
  if (!this.moveArray.length && !this.game.towers[index].discs[0]) {
    console.log("bad move")
    return true;// in the case the first (origin) tower is empty, ignore move
  }

  this.moveArray.push(index);
  if (this.moveArray.length == 1) {
    this.promptHeader.text("Select Destination");
  } else if (this.moveArray.length == 2) {
    var fromIndex = this.moveArray[0];
    var toIndex = this.moveArray[1];
    this.moveArray = [];
    if (this.game.moveDisc(fromIndex, toIndex)) {
      this.promptHeader.text("Select Origin");
      this.drawTowers();
    } else {
      this.promptHeader.text("Bad Move, Select New Destination.");
      this.drawTowers();
    }
  }

  if (!this.game.towers[0].discs[0] && !this.game.towers[1].discs[0] ) {
    this.promptHeader.text("You Win! Try Again!");
    p = new Play();
    p.drawTowers();
  }

  return true;
};

Play.prototype.makeDisc = function(size){
  var sizeClass = "d"+size
  var disc = $("<div>")
              .addClass("disc")
              .addClass(sizeClass);
  return disc;
};

$(function () {
  p = new Play();
  p.drawTowers();
  $('#tower0').click(function(){
    p.towerClickHandler(0);
  });
  $('#tower1').click(function(){
    p.towerClickHandler(1);
  });
  $('#tower2').click(function(){
    p.towerClickHandler(2);
  });

});

