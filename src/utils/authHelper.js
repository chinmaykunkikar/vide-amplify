import { Auth } from 'aws-amplify'

const authHelper = {
  isAuthenticated() {
    if (typeof window == 'undefined') return false
    if (Auth.currentSession().then(authData => authData.idToken))
      return Auth.currentSession().then(authData => authData.idToken)
    else return false
  },
}

export default authHelper