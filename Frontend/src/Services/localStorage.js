const storeToken = (token) => {
    localStorage.setItem('token', token)
    // localStorage.setItem('token', JSON.stringify(value)) if value is a object mean more than one key value
}

const getToken = () => {
    let token = localStorage.getItem('token')
    return token;
    // to access a object we have json.parse
    // return JSON.parse(token)
}

const removeToken = (token) => { // here value is name of the token key
    localStorage.removeItem(token)
}
export { storeToken, getToken, removeToken }