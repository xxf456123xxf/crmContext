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
    constructor(Sys, Xrm, name) {
        this.Xrm = Xrm;
        this.name = name;
        var Control = this.Xrm.Page.getControl(name);
        var TurboGrid = Control.getGrid();
        if (TurboGrid['$3_1']) {
           //2016处理方式和d365
            this.contname = TurboGrid['$3_1']
        }
        //this.contname = Sys.Application._components[name];
        if(!this.contname) {
            this.logWarn(`not crmGridList name : ${this.contname}`)
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
    addFilter(handle, entityType) {
        var TurboGrid = this.contname;
        var CustomerHandler = null;
        if(typeof TurboGrid.addButtonClickHandler === 'function') {
            CustomerHandler = TurboGrid.addButtonClickHandler.bind(TurboGrid);
            TurboGrid.addButtonClickHandler = () => {
                CustomerHandler();
                var lookup= this.Xrm.Page.getControl('lookup_' + this.name);
                lookup.addPreSearch(function() {
                    var FilterXml = handle.apply(this);
                    lookup.addCustomFilter(FilterXml, entityType);
                })
                TurboGrid.addButtonClickHandler = CustomerHandler;
            }
        }
    }
    /**
     * 自定义子网格
     * @property setParameter
     */
    setParameter(fetchxml) {
        var TurboGrid = this.contname;
        if(typeof TurboGrid.SetParameter === 'function') {
            TurboGrid.SetParameter('fetchxml', fetchxml);
        }
        TurboGrid.refresh();
    }
    logWarn(message) {
        window.console && typeof window.console.warn === 'function' && window.console.warn(message);
    }
    logError(message) {
        window.console && typeof window.console.error === 'function' && window.console.error(message);
    }
}