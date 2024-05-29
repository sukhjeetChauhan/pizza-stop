export function setLocalStorage(data: any) {
  sessionStorage.setItem('order', JSON.stringify(data))
}

export function getLocalStorage() {
  const item = sessionStorage.getItem('order')
  return item ? JSON.parse(item) : null // or any default value
}

export function removeLocalStorage() {
  sessionStorage.removeItem('order')
}
export function clearSession() {
  sessionStorage.clear()
}
