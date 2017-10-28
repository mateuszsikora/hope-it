import FCM from 'fcm-push';

const {config} = require('electrode-confippet');
const serverKey = config.serverKey;
const fcm = new FCM(serverKey);

module.exports = (title, body, token) => {
  const message = {
    to: token,
    notification: {
      title,
      body,
      sound: 'default',
      priority: 'high',
      show_in_foreground: true
    }
  };

  fcm.send(message)
    .then((response) => {
      console.log("Successfully sent with response: ", response);
    })
    .catch((err) => {
      console.log("Something has gone wrong!");
      console.error(err);
    })
};
