var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('Hello') <0) {
    // In case a message is not present, or if our message does not have the word Hello in it, do nothing and return an empty response
    return res.end()
  }

  // We are here so we have received a message containing the word "Hello".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with "Welcome to Fidyall!"
  
  axios.post('https://api.telegram.org/bot619310930:AAG1G0wg-uSaelcaUQqmm6wAb7egzf_YHoY/sendMessage', {
    chat_id: message.chat.id,
    text: 'Welcome to Fidyall!'
  })
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});
