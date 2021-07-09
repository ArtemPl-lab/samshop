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
    async load(id){
        const resp = await api.get(`/pages/${id}`);
        if(resp.status === 200){
            const pageContent = {
                content: await resp.json(),
                id
            };
            const pageIndex = this.pages.findIndex(page => page.id === id); 
            if(pageIndex === -1){
                this.pages.push(pageContent);
            } else {
                this.pages[pageIndex] = { ...pageContent };
            }
            return pageContent;
        }
        return false;
    }
    async getPage(id){
        let p = this.pages.find(page => page.id === id);
        if(p) return p.content;
        return (await this.load(id)).content;
    }
    save(id, pageData){
        return api.put(`/pages/${id}`, JSON.stringify(pageData));
    }
}

export default PagesStore;