import { makeAutoObservable } from "mobx";
import api from "../api/api";


class DesignersStore{
    list = []
    constructor(){
        makeAutoObservable(this);
    }
    async load(){
        const resp = await api.get('/admin/catalog/designers');
        if(resp.status === 200){
            const { designers } = await resp.json();
            this.list = this.list.concat(designers);
            return this.list;
        }
    }
    async delete(id){
        const resp = await api.delete(`/admin/catalog/designers/${id}`);
        return resp.status === 200;
    }
    async update(id, data){
        const resp = await api.patch(`/admin/catalog/designers/${id}`, data);
        if(resp.status === 200){
            return await resp.json();
        }
        return false;
    }
    async create(data){
        const resp = await api.post('/admin/catalog/designers', data);
        if(resp.status === 200){
            return await resp.json();
        }
        return false;
    }
    localRemove(id){
        this.list = this.list.filter(des => des.id !== id);

    }
}

export default DesignersStore;