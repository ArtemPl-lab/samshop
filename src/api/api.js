import { getCookie } from '../helpers/cookie';

class API{
    address
    constructor(address){
        this.address = address;
    }
    post(path, body){
        return fetch(`${this.address}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': getCookie('token')
            },
            body: JSON.stringify(body)
        });
    }
    get(path, params = {}){
        let query = this.address+path;
        if(Object.keys(params).length){
            query+=`?${this.objectToUrl(params)}`
        }
        return fetch(query, {
            method: 'GET',
            headers: {
                'X-SessionID': getCookie('token')
            },
        });
    }
    put(path, body){
        return fetch(`${this.address}${path}`, {
            method: 'PUT',
            headers: {
                'X-SessionID': getCookie('token'),

            },
            body: body
        });
    }
    delete(path){
        return fetch(`${this.address}${path}`, {
            method: 'DELETE',
            headers: {
                'X-SessionID': getCookie('token'),
            }
        })
    }
    patch(path, data){
        return fetch(`${this.address}${path}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': getCookie('token'),
            },
            body: JSON.stringify(data)
        });
    }
    uploadMedia(file){
        if(!file) return;
        return fetch(`${this.address}/resources`, {
            method: 'PUT',
            headers: {
                'X-SessionID': getCookie('token'),
                
            },
            body: file
        });
    }
    downloadMedia(id){
        return this.get(`${id}`).then(res => res.blob());
    }
    objectToUrl(params){
        var esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }
}

export default new API('https://samshop.foxcpp.dev/api');