import { apiUrl } from '../util'

const fixedEmail = 'macio@macio.sex';

export function getCurrentUsersPayment() {
  return fetch(apiUrl + `/payments/${fixedEmail}`, {
      method: 'GET',
    }).then(response=>response.json())
}
