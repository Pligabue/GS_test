export function setUserId(id) {
    window.localStorage.setItem('id', id)
}

export function getUserId() {
    return window.localStorage.getItem('id')
}

export function clearUserId() {
    window.localStorage.removeItem('id')
}