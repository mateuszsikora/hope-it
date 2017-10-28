import { serverUrl } from '../util'

import { loginStore } from '../components/Login'

export function getCurrentUsersPayment() {
  return fetch(serverUrl + `/api/payments/${loginStore.user.email}`, {
      method: 'GET',
    }).then(response=>response.json())
}
