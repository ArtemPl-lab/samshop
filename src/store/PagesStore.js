import { makeAutoObservable } from "mobx";
import api from "../api/api";
class PagesStore{
    pages = []
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
    }
    load(id){
        return api.get(`/pages/${id}`);
    }
    save(id, pageData){
        return api.put(`/pages/${id}`, JSON.stringify(pageData));
    }
}

export default PagesStore;