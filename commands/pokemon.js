(function() {

  var gamedata = require('./gamedata.js');

  function Pokemon(index, cp, hp, dustPrice, poweredUp, trainerLevel, level) {
    this.index      = index;
    this.hp         = hp;
    this.cp         = cp;
    this.dustPrice  = dustPrice;
    this.poweredUp  = poweredUp;

    var baseData    = gamedata.pokemonData[index];
    this.name       = baseData.name;
    this.baseAtk    = baseData.atk;
    this.baseDef    = baseData.def;
    this.baseSta    = baseData.sta;
    this.evoIndex   = baseData.evoIndex;

    this.trainerLevel = trainerLevel;

    if (level) {
      this.level = level;
      this.possibleIVs = this.deduceIVs();
    } else {
      this.deduceLevel();
      this.possibleIVs = this.deduceIVsForLevelRange();
    }
  }

  Pokemon.prototype.hasEvolution = function() {
    return this.evoIndex !== null;
  }

  Pokemon.prototype.getEvolutionName = function() {
    if (!this.hasEvolution()) return this.name;
    return gamedata.pokemonData[this.evoIndex].name;
  }

  Pokemon.prototype.hasNoPossibleIVs = function() {
    return this.possibleIVs.length == 0;
  }

  Pokemon.prototype.hasSingleIVMatch = function() {
    return this.possibleIVs.length == 1;
  }

  Pokemon.prototype.getSingleIVMatch = function() {
    if (this.hasSingleIVMatch())
      return this.possibleIVs[0];
  }

  Pokemon.prototype.getPossibleIVsCount = function() {
    return this.possibleIVs.length;
  }

  Pokemon.prototype.isValidHP = function() {
    // Check if HP is between expected range
    var minHP = this.getHP( 0);
    var maxHP = this.getHP(15);
    return ( this.hp >= minHP && this.hp <= maxHP );
  }

  Pokemon.prototype.isValidIV = function(atk, def, sta) {
    var cp = this.getCP( atk, def, sta );
    if (cp != this.cp) return false;

    return true;
  }

  Pokemon.prototype.deduceLevel = function() {
    for ( var i = 0; i < gamedata.levelsByStardust.length; i++ ) {
      if ( this.dustPrice == gamedata.levelsByStardust[i].cost ) {
        this.levelMin = gamedata.levelsByStardust[i].level;
        this.levelMax = gamedata.levelsByStardust[i+1].level - 0.5;
        break;
      }
    }
  }

  Pokemon.prototype.deduceStamina = function() {
    var guesses = [];
    for ( var i = 0; i < 16; i++ ) {
      if ( this.getHP(i) == this.hp ) {
        guesses.push(i); 
      }
    }
    return guesses;
  }

  Pokemon.prototype.deduceIVsForLevelRange = function() {
    var limit = this.levelMax;
    if (!this.poweredUp) limit = Math.min(limit, this.trainerLevel); 

    var possibleIVs = [];
    var matchedLevel = null;
    for (var lv = this.levelMin; lv <= limit; lv += this.poweredUp ? 0.5 : 1 ) {
      this.level = lv;
      var deduced = this.deduceIVs();
      matchedLevel = (deduced.length > 0) ? this.level : matchedLevel;
      possibleIVs = possibleIVs.concat(deduced);
    }
    this.level = matchedLevel || this.level;
    return possibleIVs;
  }

  Pokemon.prototype.deduceIVs = function() {
    // Try to find possible values for Stamina
    var possibleSta = this.deduceStamina();
    if ( possibleSta.length == 0 ) return [];

    // Check possible IVs combinations
    var possibleIVs = [];
    for (sta of possibleSta) {
      for (var def = 0; def < 16; def++) {
        for (var atk = 0; atk < 16; atk++) {
          if (this.isValidIV(atk, def, sta)) {
            possibleIVs.push( {
              atk: atk,
              def: def,
              sta: sta
            });
          }
        }
      }
    }
    return possibleIVs;
  }

  Pokemon.prototype.totalAtk = function( iv ) {
    return ( this.baseAtk + iv ) * this.getCPMultiplier();
  }

  Pokemon.prototype.totalDef = function( iv ) {
    return ( this.baseDef + iv ) * this.getCPMultiplier();
  }

  Pokemon.prototype.totalSta = function( iv ) {
    return ( this.baseSta + iv ) * this.getCPMultiplier();
  }

  Pokemon.prototype.getCP = function( atk, def, sta ) {
    return Math.max( 10, Math.floor(
      0.1 *
                this.totalAtk( atk )        *
      Math.pow( this.totalDef( def ), 0.5 ) *
      Math.pow( this.totalSta( sta ), 0.5 )
    ));
  }

  Pokemon.prototype.getHP = function( sta ) {
    return Math.max( 10, Math.floor( this.totalSta(sta) ) ); 
  }

  Pokemon.prototype.getCPMultiplier = function() {
    return gamedata.getCPMultiplier(this.level);
  }

  Pokemon.prototype.getIVPerfectionRate = function(ivs) {
    return (ivs.atk + ivs.def + ivs.sta) / 45;
  }

  Pokemon.prototype.getIVPerfectionMin = function() {
    if (this.possibleIVs.length == 0) return null;
    var minimum = 1.0;
    for (ivs of this.possibleIVs) {
      minimum = Math.min(minimum, this.getIVPerfectionRate(ivs));
    }
    return minimum;
  }

  Pokemon.prototype.getIVPerfectionMax = function() {
    if (this.possibleIVs.length == 0) return null;
    var maximum = 0.0;
    for (ivs of this.possibleIVs) {
      maximum = Math.max(maximum, this.getIVPerfectionRate(ivs));
    }
    return maximum;
  }

  Pokemon.prototype.getIVPerfectionMinStr = function() {
    var value = this.getIVPerfectionMin();
    value = Math.round(value * 100);
    return value + "%";
  }

  Pokemon.prototype.getIVPerfectionMaxStr = function() {
    var value = this.getIVPerfectionMax();
    value = Math.round(value * 100);
    return value + "%";
  }

  Pokemon.prototype.getPerfectCP = function() {
    var multiplier = this.getCPMultiplier();
    return Math.floor(
      0.1 *
               (this.baseAtk + 15) * multiplier       *
      Math.pow((this.baseDef + 15) * multiplier, 0.5) *
      Math.pow((this.baseSta + 15) * multiplier, 0.5)
    );
  }

  Pokemon.prototype.getPowerUpCP = function() {
    if (!this.hasSingleIVMatch()) return null;
    var ivs = this.getSingleIVMatch();
    var cappedLevel = Math.min(40.5, this.trainerLevel + 1.5);
    var multiplier  = gamedata.getCPMultiplier(cappedLevel);
    return Math.floor(
      0.1 *
               (this.baseAtk + ivs.atk) * multiplier       *
      Math.pow((this.baseDef + ivs.def) * multiplier, 0.5) *
      Math.pow((this.baseSta + ivs.sta) * multiplier, 0.5)
    );
  }

  Pokemon.prototype.getMaxedCP = function() {
    if (!this.hasEvolution()) return null;
    if (!this.hasSingleIVMatch()) return null;
    var evoBase = gamedata.pokemonData[this.evoIndex];
    var ivs = this.getSingleIVMatch();
    var cappedLevel = Math.min(40.5, this.trainerLevel + 1.5);
    var multiplier  = gamedata.getCPMultiplier(cappedLevel);
    return Math.floor(
      0.1 *
               (evoBase.atk + ivs.atk) * multiplier       *
      Math.pow((evoBase.def + ivs.def) * multiplier, 0.5) *
      Math.pow((evoBase.sta + ivs.sta) * multiplier, 0.5)
    );
  }

  module.exports = Pokemon;

})();