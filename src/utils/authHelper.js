const authHelper = {
  isAuthenticated() {
    return (
      Object.keys(localStorage).filter(key => key.endsWith('idToken'))
        .length !== 0
    )
  },
}

export default authHelper
