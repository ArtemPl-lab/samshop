import { makeAutoObservable } from "mobx";
import api from "../api/api";
class ComplationsStore{
    list = [];
    load = false;
    complationsEnd = false;
    root
    constructor(rootStore){
        this.root = rootStore;
        makeAutoObservable(this, {
            root: false
        });
        this.loadComplations();
    }
    async save(cmp){
        await fetch(`https://samshop.foxcpp.dev/api/admin/compilations/${cmp.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
            body: JSON.stringify(cmp)
        });
    }
    async delete(id){
        const res = await fetch(`https://samshop.foxcpp.dev/api/admin/compilations/${id}`, {
            method: 'DELETE',
            headers: {
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(res.ok){
            this.list = this.list.filter(el => el.id !== id);
        }  
    }
    async add(){
        const res = await fetch(`https://samshop.foxcpp.dev/api/admin/compilations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
            body: JSON.stringify({
                "title": `Новая подборка ${this.list.length+1}`,
                "path": "south_russia",
                "description": "...",
                "photo": "/resources/00a3c454-7f99-4e5e-b6bc-960946a91c65"
            })
        });
        if(res.ok){
            const path = (await res.json()).compilation.path;
            this.list.push(await this.getComplation(path))
            // this.list.push();
        }
    }
    async getComplation(path){
        const inStore = this.list.find(comp => comp.path === path);
        if(inStore) return inStore;
        const resp = await fetch(`https://samshop.foxcpp.dev/api/compilations/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status === 200){
            const { compilation } = await resp.json();
            return compilation;
        }
        return null;
    }
    setComplations(cpm){
        this.list = [...cpm];
        this.root.changesStore.addChange('change_cmp', async () => {
            this.list.forEach(async (el, index) => {
                await fetch(`https://samshop.foxcpp.dev/api/admin/compilations/${el.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-SessionID': await this.root.user.getToken()
                    },
                    body: JSON.stringify({
                        ...el,
                        index: index+1
                    })
                });
            })
        })
    }
    async addProduct(cmpId, data){
        const cmpIndex = this.list.findIndex(c => c.id === cmpId);
        if(cmpIndex !== -1){
            const res = await api.post(`/admin/compilations/${cmpId}/goods`, {
                ...data,
                good_id: data.good.id
            });
            if(res.ok){
                this.list[cmpIndex].goods.push(data);
            }
        }
    }
    async removeProduct(cmpId, productId){
        const cmpIndex = this.list.findIndex(c => c.id === cmpId);
        if(cmpIndex !== -1){
            const res = await api.delete(`/admin/compilations/${cmpId}/goods/${productId}`);
            if(res.ok){
                this.list = this.list.map(c => {
                    if(c.id !== cmpId) return c;
                    return {
                        ...c,
                        goods: c.goods.filter(p => p.good.id !== productId)
                    }
                });
            }
        }
    }
    async loadComplations(){
        if(this.load || this.complationsEnd) return;
        this.load = true;
        var url = new URL('https://samshop.foxcpp.dev/api/admin/compilations');
        url.search = new URLSearchParams({
            count: 20,
            offset: this.list.length
        }).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
       let { compilations } = await resp.json();
        if(compilations){
            for(let i = 0; i < compilations.length; i++){
                compilations[i] = await this.getComplation(compilations[i].path);
                // for(let j = 0; j < compilations[i].goods.length; j++){
                //     console.log(compilations[i].goods[j]);
                //     const res = await api.get(`/admin/catalog/goods/${compilations[i].goods[j].good_id}`);
                //     if(res.ok){
                //         const json = await res.json();
                //         if(json){
                //             compilations[i].goods[j] = {
                //                 ...compilations[i].goods[j],
                //                 ...json.good
                //             }
                //             console.log(compilations[i]);
                //         }
                //     }
                // }
            }
        }
       this.list = [...new Set(this.list.concat(compilations).map(JSON.stringify))].map(JSON.parse);
       this.complationsEnd = !compilations.length;
       this.load = false;
    }
    dropGoods(cmpId){
        const cmpIndex = this.list.findIndex(c => c.id === cmpId);
        this.list[cmpIndex] = {
            ...this.list[cmpIndex],
            goods: []
        }

    }
}

export default ComplationsStore;