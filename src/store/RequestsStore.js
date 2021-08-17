import { makeAutoObservable } from "mobx";
class RequestsStore{
    list = [];
    load = false;
    hasRequests = {
        orders: true,
        partnerships: true
    };
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
    }
    changeRequest(request){
        const reqIndex = this.list.findIndex(r => r.id === request.id);
        this.list[reqIndex] = {
            ...request
        };
        this.root.changesStore.addChange(`reauest${request.id}`, async ()=>{

        });
    }
    async removeRequest(id){
        const req = this.list.find(r => r.id === id);
        var url;
        switch(req.type){
            case "orders":
                url = `https://samshop.foxcpp.dev/api/orders?oneclick=true`
                break;
            case "partnerships":
                url = `https://samshop.foxcpp.dev/api/designer_partnerships/${id}`
                break;
        }
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status === 200){
            this.list = this.list.filter(req => req.id !== id);
        }
    }
    async loadRequests(type){
        console.log("in view");
        if(this.load || !this.hasRequests[type]) return;
        this.load = true;
        let requests = [];
        const params = new URLSearchParams({
            count: 20,
            offset: this.list.filter(req => req.type === type).length,
            oneclick: true
        }).toString();
        var url;
        switch(type){
            case "orders":
                url = new URL('https://samshop.foxcpp.dev/api/orders');
                break;
            case "partnerships":
                url = new URL('https://samshop.foxcpp.dev/api/designer_partnerships');
                break;
        }
        url.search = params;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status === 200){
            const req = (await resp.json())[type];
            requests = req.map(r => ({...r, type}));
            this.hasRequests[type] = requests.length !== 0;
            this.list = [...new Set(this.list.concat(requests).map(JSON.stringify))].map(JSON.parse);
        }
        this.load = false;
    }
}

export default RequestsStore;