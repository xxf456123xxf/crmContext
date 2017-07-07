import { crmEntity, crmAttr } from './common/crmEntity.js';
import { crmProcess } from './common/crmProcess.js';
import { crmGridList } from './common/crmGridList.js';
/**
 * crmContext操作
 * @module crmContext
 */
export class crmContext {
    /**
     *crmContext 初始化对象
     * ```javascript
     *var newCrmContext = new crmContext(window.Xrm, { Sys: window.Sys});
     *var attr = newCrmContext.attr.bind(newCrmContext);
     *var entity = newCrmContext.entity;
     *var process = newCrmContext.process;
     *var crmGridList = newCrmContext.crmGridList.bind(newCrmContext);
     *
     * ```
     * @class crmContext
     * @constructor
     * @param {object} [Xrm]
     * @param {object} [pars] {Sys}
    */
    constructor(Xrm, pars) {
        this.Xrm = Xrm;
        this.pars = pars || {};
    }
    /**
     * 获取crmAttr对象{{#crossLink "crmAttr/getOpts"}}{{/crossLink}}
     * @method attr
     * @param  {string} name 字段名
     * @return {object} crmAttr对象
     */
    attr(name) {
        return new crmAttr(this.Xrm, name);
    }
     /**
     * 获取crmEntity对象
     * @property entity
     * @type object
     */
    get entity() {
        return new crmEntity(this.Xrm, this.pars.Sys)
    }
    /**
     * 获取crmProcess对象
     * @property process
     * @type object
     */
    get process() {
        return new crmProcess(this.Xrm)
    }
    /**
     * 获取crmGridList对象
     * @method crmGridList
     * @param  {string} name 子网格名称
     * @return {object} crmGridList
     */
    crmGridList(name) {
        return new crmGridList(this.pars.Sys, this.Xrm, name)
    }
}
export default crmContext;
// var  c  = { d: crmContext}
// if (typeof exports !== 'undefined') {
//     if (typeof module !== 'undefined' && module.exports) {
//         exports = module.exports = c;
//     }
//     exports.c = c;
// } else {
//     window.c = c;
// }
// if (typeof define === 'function' && define.amd) {
//     define('c', [], function() {
//         return c;
//     });
// }
