import { makeAutoObservable } from "mobx";
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
            }
        }
       this.list = [...new Set(this.list.concat(compilations).map(JSON.stringify))].map(JSON.parse);
       console.log( {...this.list} );
       this.complationsEnd = !compilations.length;
       this.load = false;
    }
}

export default ComplationsStore;