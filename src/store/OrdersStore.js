import { makeAutoObservable } from "mobx";
class OrderStore{
    orders = [];
    load = false;
    ordersLoaded = false;
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
        this.loadOrders();
    }
    async getOrder(id){
        const inStore = this.orders.find(order => order.id === id);
        if(inStore) return inStore;
        const resp = await fetch(`https://samshop.foxcpp.dev/api/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            },
        });
        if(resp.status == 200){
            const { order } = await resp.json();
            this.orders.push(order);
            this.orders = [...new Set(this.orders.map(JSON.stringify))].map(JSON.parse);
            return order;
        }
        return null;
    }
    async loadOrders(){
        if(this.ordersLoaded || this.load) return;
        this.load = true;
        var url = new URL('https://samshop.foxcpp.dev/api/orders');
        url.search = new URLSearchParams({
            count: 20,
            offset: this.orders.length
        }).toString();
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-SessionID': await this.root.user.getToken()
            }
        });
        if(resp.status === 200){
            const { orders } = await resp.json();
            if(!orders.length){
                this.ordersLoaded = true;
                return;
            }
            this.orders = [...new Set(this.orders.concat(orders).map(JSON.stringify))].map(JSON.parse);
            this.load = false;
        }
    }

    searchByNumber(number){
        
    }
    addOrder(order){
        
    }
    removeOrder(){

    }
    changeOrder(){

    }
}

export default OrderStore;