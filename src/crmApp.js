import { crmEntity, crmAttr } from './common/crmEntity.js';
export class crmContext {
    constructor(Xrm) {
        this.Xrm = Xrm;
    }
    attr(name) {
        return new crmAttr(this.Xrm, name);
    }
    get entity() {
        return new crmEntity(this.Xrm)
    }
}
window.crmContext = crmContext;
