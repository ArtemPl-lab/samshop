import AccountsStore from "./AccountsStore";
import ChangesStore from "./ChangesStore";
import ComplationsStore from "./ComplationsStore";
import DesignersStore from "./DesignersStore";
import OrderStore from "./OrdersStore";
import PagesStore from "./PagesStore";
import RequestsStore from "./RequestsStore";
import UIStore from "./UIStore";
import UserStore from "./UserStore";

class RootStore{
    constructor(){
        this.uiStore = new UIStore(this);
        this.user = new UserStore(this);
        this.orders = new OrderStore(this);
        this.changesStore = new ChangesStore(this);
        this.accounts = new AccountsStore(this);
        this.requests = new RequestsStore(this);
        this.compilations = new ComplationsStore(this);
        this.pages = new PagesStore(this);
        this.designers = new DesignersStore(this);
    }
}

export default RootStore;
