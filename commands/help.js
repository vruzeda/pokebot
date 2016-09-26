(function() {

  function help(callback, invalidCommand) {
    var help;

    if (invalidCommand) {
      help = 'I\'m afraid I never heard of "' + invalidCommand + '". How can I help you?\n>>>';
    } else {
      help = 'How can I help you?\n>>>';
    }

    var commands = require('./commands.js');
    for (var i = 0; i < commands.length; ++i) {
      help += commands[i].description + '\n';
    }

    callback(help);
  }

  module.exports = {
    pattern: /^help$/,
    handler: help,
    description: '*prof.oak help* : shows a list of valid commands'
  };

})();
