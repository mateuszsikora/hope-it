import { serverUrl } from './../util';

export function registerDonor({ deviceId, email }) {
  return fetch(serverUrl + '/api/donors', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      deviceId,
      email
    })
  })
}