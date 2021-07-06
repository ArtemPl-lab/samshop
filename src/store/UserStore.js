import { makeAutoObservable } from "mobx";
import { getCookie, setCookie } from '../helpers/cookie';
class UserStore{
    data = null;
    token = '';
    load = true;
    constructor(){
        makeAutoObservable(this);
        this.getData();
    }
    async fetchToken(){
        const session = await fetch('https://samshop.foxcpp.dev/api/sessions', {
            method: 'POST'
        });
        const { sid } = await session.json();
        if(!sid) throw "Backend error";
        this.token = sid;
        setCookie('token', sid);
        return this.token;
    }
    async getToken(){
        const cookieToken = getCookie('token');
        if(!this.token){
            if(!cookieToken) return await this.fetchToken();
            else this.token = cookieToken;
        }
        return this.token;
    }
    async getData(){
        this.load = true;
        const resp = await fetch('https://samshop.foxcpp.dev/api/accounts/self', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.getToken()
            }
        });
        if(resp.status === 200){
            const user = await resp.json();
            if(user.admin) this.data = {...user};
        }
        this.load = false;
    }
    async authentication({...args}){
        this.load = true;
        const resp = await fetch('https://samshop.foxcpp.dev/api/sessions/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.fetchToken()
            },
            body: JSON.stringify(args)
        });
        if(resp.status === 200){
            this.getData();
        }
    }
}

export default UserStore;