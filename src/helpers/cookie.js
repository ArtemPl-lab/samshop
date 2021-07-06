export const getCookie = cookieName => {
    const cookie = document.cookie.split(';').map(cookie => cookie.trim().split('=')).find(el => el[0] === cookieName);
    if(!cookie) return null;
    return cookie[1];
}
export const setCookie = (name, value) => {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/;`;
}