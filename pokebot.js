(function() {

  var bodyParser = require('body-parser');
  var express = require('express');

  var variables = require('./variables.js');

  var echo = require('./commands/echo.js');
  var utils = require('./commands/utils.js');

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  app.post('/trigger', function (slackRequest, slackResponse) {
    if (slackRequest.body.token === variables.SLACK_TOKEN) {
      var command = slackRequest.body.text.substr(slackRequest.body.trigger_word.length).replace(/\s+/g, ' ').trim();

      var parsed = false;
      parsed = parsed || utils.parseCommand(slackRequest, slackResponse, command, /^(.*)$/, echo);
    }
  });

  app.listen(8001, function () {
    console.log('senseibot app listening on port 8001!');
    console.log('variables: ' + JSON.stringify(variables));
  });

}());
