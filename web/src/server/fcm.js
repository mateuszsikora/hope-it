import FCM from 'fcm-push';

const {config} = require('electrode-confippet');
const serverKey = config.serverKey;
const fcm = new FCM(serverKey);

module.exports = (title, body, token) => {
  const message = {
    to: token,
    collapse_key: 'your_collapse_key',
    data: {
      your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
      title: 'Title of your push notification',
      body: 'Body of your push notification'
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
