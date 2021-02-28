export function isAuthenticated (state) {
  return state.account != null
}

export function hasRoleAdmin (state) {
  return state.account && state.account.authorities.includes('ROLE_ADMIN')
}
