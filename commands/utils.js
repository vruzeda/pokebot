(function() {

  function parseCommand(slackRequest, slackResponse, command, regex, commandFunction) {
    var match = command.match(regex);
    if (match) {
      commandFunction.apply(this, [slackRequest, slackResponse].concat(match.slice(1)));
    }
    return !!match;
  }

  function postToSlack(slackResponse, text) {
    slackResponse.send('{"text": ' + JSON.stringify(text) + '}');
  }

  module.exports = {
    parseCommand: parseCommand,
    postToSlack: postToSlack
  };

}());
