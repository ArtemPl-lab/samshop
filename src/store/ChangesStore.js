import { makeAutoObservable } from "mobx";
class ChangesStore{
    hasChanges = false;
    changes = [];
    constructor(){
        makeAutoObservable(this);
    }
    addChange(slug, callback){
        if(!slug || !callback) throw "Передал не все аргументы в addChange";
        this.changes = this.changes.filter(c => c.slug !== slug);
        this.changes.push({
            slug,
            callback
        });
        this.hasChanges = true;
    }
    removeChange(slug){
        if(!slug) throw "Передал не все аргументы в removeChange";
        this.changes = this.changes.filter(c => c.slug !== slug);
        if(!this.changes.length) this.hasChanges = false;
    }
    async saveChanges(){
        if(!this.hasChanges) return;
        this.changes.forEach(c => c.callback());
        this.hasChanges = false;
    }
}

export default ChangesStore;