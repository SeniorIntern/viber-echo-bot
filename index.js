const ngrok = require('./get_public_url');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

// Creating the bot with access token, name and avatar
const bot = new ViberBot({
  authToken: '51671da7e267e410-1f5893c6d15df4f-b68b6c86e947b4eb',
  name: 'myechobot',
  avatar: 'https://3de6-27-34-108-199.ngrok.io',
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // Echo's back the message to the client.
  response.send(message);
});

const http = require('http');
const port = process.env.PORT || 8080;
return ngrok
  .getPublicUrl()
  .then((publicUrl) => {
    console.log('Set the new webhook to"', publicUrl);
    http
      .createServer(bot.middleware())
      .listen(port, () => bot.setWebhook(publicUrl));
  })
  .catch((error) => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
  });
