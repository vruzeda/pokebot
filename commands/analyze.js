(function() {

  var utils = require('./utils.js');
  var gamedata = require('./gamedata.js');
  var Pokemon = require('./pokemon.js');

  function parseParameters(command) {
    var input = command.match(/^(\w+) (\d+) (\d+) (\d+) ([nyNY]) (\d+)$/);
    if (!input) return undefined;
    params = input.slice(1);
    return {
      name:         params[0],
      cp:           Number.parseInt(params[1]),
      hp:           Number.parseInt(params[2]),
      dustPrice:    Number.parseInt(params[3]),
      poweredUp:    (params[4].toLowerCase() === 'y'),
      trainerLevel: Number.parseInt(params[5]),
    };
  }

  function parsePokemon(params) {
    var index = gamedata.findPokemonIndexByName(params.name);
    if (index) {
      var pokemon = new Pokemon(index, params.cp, params.hp, params.dustPrice, params.poweredUp, params.trainerLevel);
      return pokemon;
    }
  }

  function analyze(slackRequest, slackResponse, command) {
    if (command === "help") {
      utils.postToSlack(slackResponse,
        "Here's the data I need to analyze your Pokémon:\n" +
        "```  analyze PokemonName CP HP DustPrice PoweredUp?(Y/N) TrainerLevel```");
      return;
    }

    var params = parseParameters(command);
    if (params) {
      var pokemon = parsePokemon(params);
      if (pokemon) {
        var message = "";
        message += "Hmm... Here's my analysis of your *" + pokemon.name + "*, " + slackRequest.body.user_name + ":\n";
        if (pokemon.hasNoPossibleIVs()) {
          message += "I have absolutely no clue! Maybe the data you provided is incorrect?\n";

        } else if (pokemon.hasSingleIVMatch()) {
          var ivs = pokemon.getSingleIVMatch();
          message += "I'm sure that your " + pokemon.name + " level is " + pokemon.level + ".\n";
          message += "The IVs are: " + ivs.atk + " ATK, " + ivs.def + " DEF and " + ivs.sta + " STA. ";
          message += "That's a " + pokemon.getIVPerfectionMaxStr() + " IV perfection rate!\n";
          if (pokemon.getIVPerfectionMax() == 1.0) {
            message += "Wow! You got yourself a *100% perfect IV " + pokemon.name + "*! Well ain't you lucky!\n";
          } else {
            message += "With 100% perfect IV, your " + pokemon.name + " would have " + pokemon.getPerfectCP() + " CP!\n";
          }
          message += "It has potential to reach " + pokemon.getPowerUpCP() + " CP when powered up.\n";
          if (pokemon.hasEvolution()) {
            message += "And when it evolves to " + pokemon.getEvolutionName() + ", it might reach up to " + pokemon.getMaxedCP() + " CP!\n";
          }

        } else {
          message += "It seems that your " + pokemon.name + " level is likely between " + Math.floor(pokemon.levelMin) + " and " + Math.ceil(pokemon.levelMax) + ".\n";
          message += "Regarding IVs, there's " + pokemon.getPossibleIVsCount() + " possible combinations, ";
          message += "with perfection rate ranging from " + pokemon.getIVPerfectionMinStr() + " to " + pokemon.getIVPerfectionMaxStr() + ".\n";
        }
        message += "That is all. I hope this analysis was useful for you!";
        utils.postToSlack(slackResponse, message);

      } else {
        utils.postToSlack(slackResponse, "I'm afraid I never heard of a Pokémon called " + params.name + ", " + slackRequest.body.user_name + "!");
      }
    } else {
      utils.postToSlack(slackResponse, "Sorry, but I'm not sure what you mean, " + slackRequest.body.user_name + ".");
    }
  }

  module.exports = analyze;

})();