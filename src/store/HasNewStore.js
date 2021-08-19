import { makeAutoObservable } from "mobx";
import api from "../api/api";

class HasNewStore{
    data = {};
    loaded = null;
    constructor(){
        makeAutoObservable(this);
        this.init();
    }
    view(change){
        this.data = {
            ...this.data,
            ...change
        }
    }
    async init(){
        if(this.loaded) return;
        this.loaded = true;
        const res = await api.get('/has_new');
        this.data = await res.json();
    }
}

export default HasNewStore;
