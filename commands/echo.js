(function() {

  var utils = require('./utils.js');

  function echo(slackRequest, slackResponse, command) {
    utils.postToSlack(slackResponse, 'Hello there! Welcome to the world of POKEMON!\nMy name is OAK! People call me the POKéMON PROF!\nRight, so your name is ' + slackRequest.body.user_name + '! ...Erm, did you just say "' + command + '"?');
  }

  module.exports = echo;

})();
