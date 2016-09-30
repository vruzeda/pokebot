// This script should be run the https://fastpokemap.se page from your browser's console.
// You have to declare a SLACK_INCOMING_WEBHOOK_INTEGRATION_URL also.

var SLACK_INCOMING_WEBHOOK_INTEGRATION_URL = SLACK_INCOMING_WEBHOOK_INTEGRATION_URL || 'DEFINE IT HERE!';

var wantedList = {
  office : [
    "BULBASAUR",
    "IVYSAUR",
    "VENUSAUR",
    "CHARMANDER",
    "CHARMELEON",
    "CHARIZARD",
    "SQUIRTLE",
    "WARTORTLE",
    "BLASTOISE",
    // "CATERPIE",
    // "METAPOD",
    // "BUTTERFREE",
    // "WEEDLE",
    // "KAKUNA",
    // "BEEDRILL",
    // "PIDGEY",
    // "PIDGEOTTO",
    // "PIDGEOT",
    // "RATTATA",
    // "RATICATE",
    // "SPEAROW",
    // "FEAROW",
    // "EKANS",
    // "ARBOK",
    "PIKACHU",
    "RAICHU",
    "SANDSHREW",
    "SANDSLASH",
    "NIDORAN_FEMALE",
    "NIDORINA",
    "NIDOQUEEN",
    "NIDORAN_MALE",
    "NIDORINO",
    "NIDOKING",
    // "CLEFAIRY",
    // "CLEFABLE",
    "VULPIX",
    "NINETALES",
    "JIGGLYPUFF",
    "WIGGLYTUFF",
    // "ZUBAT",
    // "GOLBAT",
    // "ODDISH",
    // "GLOOM",
    // "VILEPLUME",
    // "PARAS",
    // "PARASECT",
    // "VENONAT",
    // "VENOMOTH",
    "DIGLETT",
    "DUGTRIO",
    "MEOWTH",
    "PERSIAN",
    "PSYDUCK",
    "GOLDUCK",
    "MANKEY",
    "PRIMEAPE",
    "GROWLITHE",
    "ARCANINE",
    "POLIWAG",
    "POLIWHIRL",
    "POLIWRATH",
    "ABRA",
    "KADABRA",
    "ALAKAZAM",
    "MACHOP",
    "MACHOKE",
    "MACHAMP",
    // "BELLSPROUT",
    // "WEEPINBELL",
    // "VICTREEBEL",
    "TENTACOOL",
    "TENTACRUEL",
    "GEODUDE",
    "GRAVELER",
    "GOLEM",
    "PONYTA",
    "RAPIDASH",
    "SLOWPOKE",
    "SLOWBRO",
    "MAGNEMITE",
    "MAGNETON",
    "FARFETCHD",
    "DODUO",
    "DODRIO",
    "SEEL",
    "DEWGONG",
    "GRIMER",
    "MUK",
    "SHELLDER",
    "CLOYSTER",
    "GASTLY",
    "HAUNTER",
    "GENGAR",
    "ONIX",
    "DROWZEE",
    "HYPNO",
    // "KRABBY",
    // "KINGLER",
    "VOLTORB",
    "ELECTRODE",
    "EXEGGCUTE",
    "EXEGGUTOR",
    "CUBONE",
    "MAROWAK",
    "HITMONLEE",
    "HITMONCHAN",
    "LICKITUNG",
    "KOFFING",
    "WEEZING",
    "RHYHORN",
    "RHYDON",
    "CHANSEY",
    "TANGELA",
    "KANGASKHAN",
    "HORSEA",
    "SEADRA",
    // "GOLDEEN",
    // "SEAKING",
    // "STARYU",
    // "STARMIE",
    "MR_MIME",
    "SCYTHER",
    "JYNX",
    "ELECTABUZZ",
    "MAGMAR",
    // "PINSIR",
    "TAUROS",
    "MAGIKARP",
    "GYARADOS",
    "LAPRAS",
    "DITTO",
    // "EEVEE",
    // "VAPOREON",
    // "JOLTEON",
    // "FLAREON",
    "PORYGON",
    "OMANYTE",
    "OMASTAR",
    "KABUTO",
    "KABUTOPS",
    "AERODACTYL",
    "SNORLAX",
    "ARTICUNO",
    "ZAPDOS",
    "MOLTRES",
    "DRATINI",
    "DRAGONAIR",
    "DRAGONITE",
    "MEWTWO",
    "MEW"
  ],
  shopping: [
    // "BULBASAUR",
    // "IVYSAUR",
    // "VENUSAUR",
    // "CHARMANDER",
    // "CHARMELEON",
    // "CHARIZARD",
    // "SQUIRTLE",
    // "WARTORTLE",
    // "BLASTOISE",
    // "CATERPIE",
    // "METAPOD",
    // "BUTTERFREE",
    // "WEEDLE",
    // "KAKUNA",
    // "BEEDRILL",
    // "PIDGEY",
    // "PIDGEOTTO",
    // "PIDGEOT",
    // "RATTATA",
    // "RATICATE",
    // "SPEAROW",
    // "FEAROW",
    // "EKANS",
    // "ARBOK",
    // "PIKACHU",
    // "RAICHU",
    // "SANDSHREW",
    // "SANDSLASH",
    // "NIDORAN_FEMALE",
    // "NIDORINA",
    // "NIDOQUEEN",
    // "NIDORAN_MALE",
    // "NIDORINO",
    // "NIDOKING",
    // "CLEFAIRY",
    // "CLEFABLE",
    // "VULPIX",
    // "NINETALES",
    // "JIGGLYPUFF",
    // "WIGGLYTUFF",
    // "ZUBAT",
    // "GOLBAT",
    // "ODDISH",
    // "GLOOM",
    // "VILEPLUME",
    // "PARAS",
    // "PARASECT",
    // "VENONAT",
    // "VENOMOTH",
    // "DIGLETT",
    // "DUGTRIO",
    // "MEOWTH",
    // "PERSIAN",
    // "PSYDUCK",
    // "GOLDUCK",
    // "MANKEY",
    // "PRIMEAPE",
    // "GROWLITHE",
    // "ARCANINE",
    // "POLIWAG",
    // "POLIWHIRL",
    // "POLIWRATH",
    // "ABRA",
    // "KADABRA",
    // "ALAKAZAM",
    // "MACHOP",
    // "MACHOKE",
    // "MACHAMP",
    // "BELLSPROUT",
    // "WEEPINBELL",
    // "VICTREEBEL",
    // "TENTACOOL",
    // "TENTACRUEL",
    // "GEODUDE",
    // "GRAVELER",
    // "GOLEM",
    // "PONYTA",
    // "RAPIDASH",
    // "SLOWPOKE",
    // "SLOWBRO",
    // "MAGNEMITE",
    // "MAGNETON",
    // "FARFETCHD",
    // "DODUO",
    // "DODRIO",
    // "SEEL",
    // "DEWGONG",
    // "GRIMER",
    // "MUK",
    // "SHELLDER",
    // "CLOYSTER",
    // "GASTLY",
    // "HAUNTER",
    // "GENGAR",
    // "ONIX",
    // "DROWZEE",
    // "HYPNO",
    // "KRABBY",
    // "KINGLER",
    // "VOLTORB",
    // "ELECTRODE",
    // "EXEGGCUTE",
    // "EXEGGUTOR",
    // "CUBONE",
    // "MAROWAK",
    // "HITMONLEE",
    // "HITMONCHAN",
    // "LICKITUNG",
    // "KOFFING",
    // "WEEZING",
    // "RHYHORN",
    // "RHYDON",
    // "CHANSEY",
    // "TANGELA",
    // "KANGASKHAN",
    // "HORSEA",
    // "SEADRA",
    // "GOLDEEN",
    // "SEAKING",
    // "STARYU",
    // "STARMIE",
    // "MR_MIME",
    // "SCYTHER",
    // "JYNX",
    // "ELECTABUZZ",
    // "MAGMAR",
    // "PINSIR",
    // "TAUROS",
    // "MAGIKARP",
    // "GYARADOS",
    // "LAPRAS",
    // "DITTO",
    // "EEVEE",
    // "VAPOREON",
    // "JOLTEON",
    // "FLAREON",
    // "PORYGON",
    // "OMANYTE",
    // "OMASTAR",
    // "KABUTO",
    // "KABUTOPS",
    // "AERODACTYL",
    // "SNORLAX",
    // "ARTICUNO",
    // "ZAPDOS",
    // "MOLTRES",
    // "DRATINI",
    // "DRAGONAIR",
    // "DRAGONITE",
    // "MEWTWO",
    // "MEW"
  ],
  all: [
    //"BULBASAUR",
    // "IVYSAUR",
    "VENUSAUR",
    // "CHARMANDER",
    "CHARMELEON",
    "CHARIZARD",
    //"SQUIRTLE",
    "WARTORTLE",
    "BLASTOISE",
    //"CATERPIE",
    //"METAPOD",
    //"BUTTERFREE",
    //"WEEDLE",
    //"KAKUNA",
    //"BEEDRILL",
    //"PIDGEY",
    //"PIDGEOTTO",
    //"PIDGEOT",
    //"RATTATA",
    //"RATICATE",
    //"SPEAROW",
    //"FEAROW",
    //"EKANS",
    //"ARBOK",
    //"PIKACHU",
    "RAICHU",
    //"SANDSHREW",
    //"SANDSLASH",
    //"NIDORAN_FEMALE",
    //"NIDORINA",
    "NIDOQUEEN",
    //"NIDORAN_MALE",
    //"NIDORINO",
    "NIDOKING",
    //"CLEFAIRY",
    //"CLEFABLE",
    //"VULPIX",
    "NINETALES",
    //"JIGGLYPUFF",
    "WIGGLYTUFF",
    //"ZUBAT",
    //"GOLBAT",
    //"ODDISH",
    //"GLOOM",
    //"VILEPLUME",
    //"PARAS",
    //"PARASECT",
    //"VENONAT",
    //"VENOMOTH",
    //"DIGLETT",
    // "DUGTRIO",
    //"MEOWTH",
    // "PERSIAN",
    //"PSYDUCK",
    //"GOLDUCK",
    //"MANKEY",
    //"PRIMEAPE",
    //"GROWLITHE",
    "ARCANINE",
    //"POLIWAG",
    //"POLIWHIRL",
    //"POLIWRATH",
    //"ABRA",
    //"KADABRA",
    "ALAKAZAM",
    //"MACHOP",
    //"MACHOKE",
    "MACHAMP",
    //"BELLSPROUT",
    //"WEEPINBELL",
    //"VICTREEBEL",
    //"TENTACOOL",
    //"TENTACRUEL",
    //"GEODUDE",
    "GRAVELER",
    "GOLEM",
    //"PONYTA",
    //"RAPIDASH",
    //"SLOWPOKE",
    "SLOWBRO",
    //"MAGNEMITE",
    "MAGNETON",
    "FARFETCHD",
    //"DODUO",
    //"DODRIO",
    "SEEL",
    "DEWGONG",
    //"GRIMER",
    //"MUK",
    "SHELLDER",
    "CLOYSTER",
    //"GASTLY",
    //"HAUNTER",
    "GENGAR",
    //"ONIX",
    "DROWZEE",
    "HYPNO",
    //"KRABBY",
    //"KINGLER",
    //"VOLTORB",
    //"ELECTRODE",
    //"EXEGGCUTE",
    "EXEGGUTOR",
    //"CUBONE",
    //"MAROWAK",
    "HITMONLEE",
    "HITMONCHAN",
    "LICKITUNG",
    //"KOFFING",
    //"WEEZING",
    //"RHYHORN",
    "RHYDON",
    //"CHANSEY",
    //"TANGELA",
    "KANGASKHAN",
    //"HORSEA",
    //"SEADRA",
    //"GOLDEEN",
    //"SEAKING",
    //"STARYU",
    //"STARMIE",
    "MR_MIME",
    //"SCYTHER",
    "JYNX",
    "ELECTABUZZ",
    "MAGMAR",
    //"PINSIR",
    "TAUROS",
    "MAGIKARP",
    "GYARADOS",
    "LAPRAS",
    "DITTO",
    //"EEVEE",
    //"VAPOREON",
    //"JOLTEON",
    //"FLAREON",
    "PORYGON",
    "OMANYTE",
    "OMASTAR",
    "KABUTO",
    "KABUTOPS",
    "AERODACTYL",
    "SNORLAX",
    "ARTICUNO",
    "ZAPDOS",
    "MOLTRES",
    "DRATINI",
    "DRAGONAIR",
    "DRAGONITE",
    "MEWTWO",
    "MEW"
  ]
};

var coords = {
  office   : [-22.866190993927944, -47.02234268188477],
  shopping : [-22.863511940386083, -47.02307224273682],
};

var encounterList = {};

var nests = {
  ':catraca:'     : [-22.864658, -47.022038],
  'construcao'    : [-22.867203, -47.020778],
  ':nest-corp:'   : [-22.866269, -47.021449],
  ':nest-dpedro:' : [-22.865265, -47.020751],
  'gym'           : [-22.863567, -47.023277],
  'hotel'         : [-22.866862, -47.022467],
  'ip'            : [-22.866638, -47.021753],
  ':nest-rita:'   : [-22.865086, -47.022178],
  'p2'            : [-22.865483, -47.022037],
  'p3'            : [-22.865911, -47.021683],
  ':nest-p4:'     : [-22.866076, -47.021334],
  'plaza'         : [-22.865844, -47.023630],
  ':nest-sbucks:' : [-22.864548, -47.022652],
  'viena'         : [-22.862890, -47.023721]
};

function scanLocations() {
  for (var location in coords) {
    scan(location);
  }
}

function scan(location) {
  console.log("### Scanning " + location);

  var api = "https://api.fastpokemap.se/?key=allow-all&ts=0&lat=" + coords[location][0] + "&lng=" + coords[location][1];

  $.ajax({dataType: "json", url: api, timeout: 50000}).done(function(data) {
    if (data.result) {
      processPokemons(location, data.result);
    } else {
      scan(location);
    }
  }).fail(function() {
    scan(location);
  });
}

function processPokemons(location, result) {
  console.log("### Got " + result.length + " results for " + location);

  for (var i = 0; i < result.length; i++) {
    var spawn = result[i];

    // Parse the spawn results and get some useful info.
    if (spawn.spawn_point_id != undefined) {
      if (spawn.expiration_timestamp_ms <= 0) {
        spawn.expiration_timestamp_ms = Date.now() + 930000;
      }
      spawn.type = "spawn";
    } else if (spawn.lure_info != undefined) {
      spawn.encounter_id = spawn.lure_info.encounter_id;
      spawn.pokemon_id = spawn.lure_info.active_pokemon_id;
      spawn.expiration_timestamp_ms = spawn.lure_info.lure_expires_timestamp_ms;
      spawn.type = "lure";
    } else {
      spawn.type = "nearby";
    }
  }

  // Prioritize pokemons with longest lifespam
  result.sort(function(spawn1, spawn2) {
    return spawn2.expiration_timestamp_ms - spawn1.expiration_timestamp_ms;
  });

  for (var i = 0; i < result.length; ++i) {
    var spawn = result[i];
    var lifespam = spawn.expiration_timestamp_ms - Date.now();

    if (lifespam > 0) {
      var wanted = false;
      var tag;

      if (wantedList.all.indexOf(spawn.pokemon_id) >= 0) {
        wanted = true;
        tag = ' <!here>';
      } else if (wantedList[location].indexOf(spawn.pokemon_id) >= 0) {
        wanted = true;
        tag = '';
      }

      encounterList[location] = encounterList[location] || [];

      if (wanted && encounterList[location].indexOf(spawn.encounter_id) == -1) {
        encounterList[location].push(spawn.encounter_id);
        (function(location, encounterId, lifespam) {
          setTimeout(function() {
            var index = encounterList[location].indexOf(encounterId);
            encounterList[location].splice(index, 1);
          }, lifespam);
        })(location, spawn.encounter_id, spawn.expiration_timestamp_ms - Date.now());

        var emoji = ":pkm-" + spawn.pokemon_id.toLowerCase() + ":";
        emoji = emoji.replace(/nidoran_female/, "nidoranf");
        emoji = emoji.replace(/nidoran_male/, "nidoranm");
        emoji = emoji.replace(/mr_mime/, "mrmime");

        var closestNest = '';
        var closestNestDistance = Infinity;

        for (var nest in nests) {
          var nestDistance = distance(nests[nest], [spawn.latitude, spawn.longitude]);

          if (closestNestDistance > nestDistance) {
            closestNestDistance = nestDistance;
            closestNest = nest;
          }
        }

        var msg = "<https://fastpokemap.se/#" + spawn.latitude + "," + spawn.longitude + "|" + emoji + "> found ";
        if (spawn.type == "spawn") {
          msg += "in ";
        } else if (spawn.type == "lure") {
          msg += "lured in ";
        } else if (spawn.type == "nearby") {
          msg += "near ";
        }

        msg += location + " (close to " + closestNest + ")";

        var lifespam = Math.floor((spawn.expiration_timestamp_ms - Date.now()) / 1000);
        var lifespamMinutes = Math.floor(lifespam / 60);
        var lifespamSeconds = lifespam % 60;

        msg += " (" + lifespamMinutes + ":" + ((lifespamSeconds < 10) ? '0' : '') + lifespamSeconds + " remaining)" + tag;

        $.post(SLACK_INCOMING_WEBHOOK_INTEGRATION_URL, "payload={\"text\" : " + JSON.stringify(msg) + "}");
      }
    }
  }

  console.log("### Wait 2 minutes");

  // Schedule the next scan.
  setTimeout(function() {
    scan(location);
  }, 2 * 60 * 1000);
}

function distance(coords1, coords2) {
  return Math.sqrt(Math.pow(coords1[0] - coords2[0], 2) + Math.pow(coords1[1] - coords2[1], 2));
}

scanLocations();
