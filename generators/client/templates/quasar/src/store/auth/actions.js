export function login (context, data) {
  context.commit('setAccount', data)
}

export function logout (context) {
  context.commit('setAccount', null)
  sessionStorage.removeItem('id_token')
}
