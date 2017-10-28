import { serverUrl } from '../util'

const fixedEmail = 'macio@macio.sex';

export function getCurrentUsersPayment() {
  return fetch(serverUrl + `/api/payments/${fixedEmail}`, {
      method: 'GET',
    }).then(response=>response.json())
}
