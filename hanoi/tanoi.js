function Tower(discs) {
  var discs = discs || []
  this.discs = discs;
};

function Game(size) {
  discs = _.range(1, size + 1).reverse();

  this.towers = [new Tower(discs), new Tower(), new Tower()];
};

Tower.prototype.legalMove = function(disc) {
  if (!this.discs.length) {return true;};
  return disc < _.last(this.discs);
};

Tower.prototype.addDisc = function(disc) {
  if (this.legalMove(disc)) {
    this.discs.push(disc);
    return true;
  } else {
    return false;
  }
};

Tower.prototype.removeDisc = function() {
  return this.discs.pop();
};

Game.prototype.moveDisc = function(fromTowerIndex, toTowerIndex) {
  fromTower = this.towers[fromTowerIndex];
  toTower = this.towers[toTowerIndex];

  disc = fromTower.removeDisc();

  if (toTower.addDisc(disc)) {
    return true;
  }
  else {
    fromTower.addDisc(disc);
    return false;
  }
};

Game.prototype.isTowerEmpty = function(towerIndex) {
  !this.towers[towerIndex].discs[0];
};



console.log("HEY ITS WORKING2")