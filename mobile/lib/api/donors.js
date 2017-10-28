import { serverUrl } from './../util';

export function registerDonor({ token, email }) {
  return fetch(serverUrl + '/api/donors', {
    headers: {
      'Content-Type': 'application/json'
    },
    'method': 'POST',
    body: JSON.stringify({
      token,
      email
    })
  })
}