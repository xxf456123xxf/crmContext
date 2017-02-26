/**
 * 子网格操作
 * @module crmGridList
 */
export class crmGridList {
    /**
     *crmGridList 初始化对象
     * @class crmGridList
     * @constructor
    */
    constructor(Sys, name) {
        this.contname = Sys.Application._components[name];
        if(!this.contname) {
            this.logError(`not crmGridList name : ${this.contname}`)
        }
    }
    /**
     * list
     * @property list
     * @type array
     */
    get list() {
        if(!this.contname) {
            return [];
        }
        return this.contname.get_allRecords()
    }
    /**
     * listIds
     * @property listIds
     * @type array
     */
    get listIds() {
        if(!this.contname) {
            return [];
        }
        return this.contname.get_allRecordIds()
    }
    /**
     * count
     * @property count
     * @type int
     */
    get count() {
        if(!this.contname) {
            return 0;
        }
        return this.contname.get_allRecords().length;
    }
    /**
     * getSelectIds
     * @property getSelectIds
     * @type array
     */
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