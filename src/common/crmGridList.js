export class crmGridList {
    constructor(Sys, name) {
        this.contname = Sys.Application._components[name];
        if(!this.contname) {
            this.logError(`not crmGridList name : ${this.contname}`)
        }
    }
    get list() {
        if(!this.contname) {
            return [];
        }
        return this.contname.get_allRecords()
    }
    get listIds() {
        if(!this.contname) {
            return [];
        }
        return this.contname.get_allRecordIds()
    }
    get count() {
        if(!this.contname) {
            return 0;
        }
        return this.contname.get_allRecords().length;
    }
    getSelectIds() {
        if(!this.contname) {
            return [];
        }
        return this.contname.get_selectedIds()
    }
    logError(message) {
        window.console && typeof window.console.error === 'function' && window.console.error(message);
    }
}