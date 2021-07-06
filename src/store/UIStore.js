import { makeAutoObservable } from "mobx";
class UIStore{
    initialData = {};
    constructor(){
        makeAutoObservable(this);
    }
}

export default UIStore;