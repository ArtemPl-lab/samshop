import { makeAutoObservable } from "mobx";
class AccountsStore{
    list = [];
    load = false;
    options = {
        name_filter: '',
        sort: '',
        count: 20,
        offset: 0
    }
    page = 0;
    havePosts = true;
    root
    constructor(rootStore){
        this.root = rootStore;
        makeAutoObservable(this, {
            root: false
        });
        this.loadAccounts();
    }
    async setFilters(key, value){
        this.options = {
            ...this.options,
            [key]: value
        }
        this.list = [];
        this.page = 0;
        this.options.offset = 0;
        this.havePosts = true;
        this.options = {
            ...this.options,
            offset: this.page * this.options.count
        };
        var url = new URL('https://samshop.foxcpp.dev/api/accounts');
        url.search = new URLSearchParams(this.options).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
        });
        if(resp.status == 200){
            const respJson = await resp.json();
            if(respJson.ok){
                this.havePosts = Boolean(respJson.accounts.length)
                this.list = [...new Set(this.list.concat(respJson.accounts).map(JSON.stringify))].map(JSON.parse);
            }
        }
    }
    async deleteUser(id){
        const resp = await fetch(`https://samshop.foxcpp.dev/api/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
        });
        if(resp.status === 200){
            this.list = this.list.filter(user => user.id !== id);
        }
        return resp.status;
    }
    async getUser(id){
        const inStore = this.list.find(account => account.id === id);
        if(inStore) return inStore;
        const resp = await fetch(`https://samshop.foxcpp.dev/api/accounts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
        });
        if(resp.status == 200){
            const respJson = await resp.json();
            this.list.push(respJson);
            this.list = [...new Set(this.list.map(JSON.stringify))].map(JSON.parse);
            return respJson;
        }
        return null;
    }
    async sendUserPassword(id, password){
        const resp = await fetch(`https://samshop.foxcpp.dev/api/accounts/${id}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
            body: JSON.stringify({
                password
            })
        });
        return resp.status;
    }
    async saveUser(user){
        if(user.id){
            const resp = await fetch(`https://samshop.foxcpp.dev/api/accounts/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-SessionID': await this.root.user.getToken()
                },
                body: JSON.stringify(user)
            });
            if(resp.status === 200){
                const userIndex = this.list.findIndex(u => u.id == user.id);
                this.list[userIndex] = {
                    ...user
                };
                if(this.root.user.data && this.root.user.data.id === user.id){
                    this.root.user.data = {
                        ...user
                    }
                }
            }
        }
        else{
            const resp = await fetch(`https://samshop.foxcpp.dev/api/accounts`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-SessionID': await this.root.user.getToken()
                },
                body: JSON.stringify(user)
            });
            if(resp.status == 200){
                const json = await resp.json();
                if(json.id){
                    this.list.push({
                        ...user,
                        id: json.id
                    });
                }
            }
        }
    }
    async loadUserOrders(id){
        const userIndex = this.list.findIndex(u => u.id == id);
        if(userIndex == -1 || this.list[userIndex].load) return;
        this.list[userIndex].load = true;
        const currentOrders = this.list[userIndex].orders || [];
        var url = new URL('https://samshop.foxcpp.dev/api/orders');
        url.search = new URLSearchParams({
            account_id: id,
            count: 20,
            offset: currentOrders.length
        }).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status == 200){
            const { orders } = await resp.json();
            if(orders.length){
                this.list[userIndex].orders = [
                    ...currentOrders,
                    ...orders
                ]
            }
            else{
                this.list[userIndex].ordersLoaded = true;
            }
        }
        this.list[userIndex].load = false;
    }
    async loadUserLists(id){
        const userIndex = this.list.findIndex(u => u.id == id);
        if(userIndex == -1 || this.list[userIndex].load) return;
        this.list[userIndex].load = true;
        const currentLists = this.list[userIndex].lists || [];
        var url = new URL('https://samshop.foxcpp.dev/api/lists');
        url.search = new URLSearchParams({
            account_id: id,
            count: 20,
            offset: currentLists.length
        }).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status == 200){
            const { lists } = await resp.json();
            if(lists.length){
                this.list[userIndex].lists = [
                    ...currentLists,
                    ...lists
                ]
            }
            else{
                this.list[userIndex].listsLoaded = true;
            }
        }
        this.list[userIndex].load = false;
    }
    async deleteList(id){
        for(let i = 0; this.list.length; i++){
            if(this.list[i].lists){
                for(let j = 0; j < this.list[i].lists.length; j++){
                    if(this.list[i].lists[j].id === id){
                        this.list[i].lists = this.list[i].lists.filter(el => el.id !== id);
                        return;
                    }
                }
            }
        }
    }
    async loadAccounts(){
        if(this.load) return;
        this.load = true;
        this.options = {
            ...this.options,
            offset: this.page * this.options.count
        };
        var url = new URL('https://samshop.foxcpp.dev/api/accounts');
        url.search = new URLSearchParams(this.options).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
        });
        if(resp.status == 200){
            const respJson = await resp.json();
            if(respJson.ok){
                this.havePosts = Boolean(respJson.accounts.length)
                this.list = [...new Set(this.list.concat(respJson.accounts).map(JSON.stringify))].map(JSON.parse);
            }
        }
        this.page++;
        this.load = false;
    }
}

export default AccountsStore;