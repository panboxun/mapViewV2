//封装token  tokenKey是字段(如username) token是值
export function setToken(tokenKey,token){
    return localStorage.setItem(tokenKey, token);
}

export function getToken(tokenKey){
    return localStorage.getItem(tokenKey);
}

export function removeToken(tokenKey){
    return localStorage.removeItem(tokenKey);
}