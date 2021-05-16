const authHelper = {
  isAuthenticated() {
    return (
      Object.keys(localStorage).filter(key => key.endsWith('userData'))
        .length !== 0
    )
  },
}

export default authHelper
