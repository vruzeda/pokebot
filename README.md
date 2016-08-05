# pokebot

pokebot is reactive bot for Slack whose purpose is to help us play Pokemon GO.

## Supported commands

pokebot supports the following commands:

- `pokebot <something>`: He'll echo whatever you say to him.

Notice that pokebot's commands are case sensitive, unless implemented otherwise.

## Feature roadmap

Check the [Issues section](https://github.com/vruzeda/pokebot/issues) for future improvements.

## Technologies

This bot is written in JavaScript to run in NodeJS.

The original version is running in NodeJS v6.3.0.

### Setup

You need to install NodeJS - this is not covered here.

After cloning the project, you need to run `npm install` to get the projects dependencies.

### Running

Currently, the bot runs on port 8001 (this should be extracted to a variable for easier customization), so make sure this port is available and opened to the world.

To run it, execute:

```
> node pokebot.js
```

### Testing

You should be able to test it doing a POST with some required data. For example, using `curl`:

```
> curl --data "token=<Your Slack's bot's token>&trigger_word=<Your trigger word>&text=<Your trigger word> <Your command>&user_name=<Your username>" http://localhost:8001/trigger
```
