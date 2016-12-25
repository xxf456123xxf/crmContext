export class crmAttr {
    constructor(Xrm, name) {
        if (!Xrm || !name) {
            return;
        }
        this.Xrm = Xrm;
        this.name = name;
        this.attrname = Xrm.Page.getAttribute(name);
        this.contname = Xrm.Page.getControl(name);
        this.crmEntity = new crmEntity(Xrm);
        if (!this.contname) {
            this.contname = Xrm.Page.ui.tabs.get(name);
        }
        if (!this.attrname && !this.contname) {
            this.error('not found ' + this.name);
        }
    }
        //获取字段值 crm方法
    getValue() {
        let getval = null
        if (this.attrname) {
            getval = this.attrname.getValue();
        }
        return getval;
    }
        //获取字段值 Lookup返回第一个值
    get() {
        if (!this.attrname) {
            return this;
        }
        const getval = this.attrname.getValue() || {};
        if (Array.isArray(getval)) {
            return getval.length > 0 ? getval[0] : {}
        }
        return getval;
    }
        //设置和获取值  lookup获取Id
    val(v) {
        let obj = null;
        if (!this.attrname) {
            return this;
        }
        obj = this.attrname[arguments.length > 0 ? 'setValue' : 'getValue'](v);
        if (Array.isArray(obj)) {
            obj = obj[0].id;
        }
        if (arguments.length > 0) {
            this.mode();
        }
        return arguments.length === 0 ? obj : this;
    }
        //显示
    show() {
        if (this.contname) {
            this.contname.setVisible(!0);
        }
        return this;
    }
        //隐藏
    hide() {
        if (this.contname) {
            this.contname.setVisible(!1);
        }
        return this;
    }
        //禁用
    disabled() {
        let disabled = 1;
        if (this.contname) {
            if (arguments[0] != undefined) {
                disabled = arguments[0];
            }
            typeof this.contname.setDisabled === 'function' && this.contname.setDisabled(disabled);
        }
        return this;
    }
        //绑定或触发change
    change(c, a) {
        if (this.contname) {
            if (typeof(c) == 'function') {
                this.contname.getAttribute().addOnChange(c, false);
                a && setTimeout(() => {
                    this.contname.getAttribute().fireOnChange();
                }, 200)
            } else if (arguments.length === 0) {
                this.contname.getAttribute().fireOnChange();
            }
        }
        return this;
    }
        //移除change方法
    removechange(a) {
        if (this.contname) {
            this.contname.getAttribute().removeOnChange(a);
        }
        return this;
    }
        //字段必填
    required(a) {
        if (this.attrname) {
            this.attrname.setRequiredLevel(a != 0 ? 'required' : 'none');
        }
        return this;
    }
        //提交模式 默认设置成always, 对字段赋值会调用
    mode(m) {
        if (this.attrname) {
            let modestr = 'always';
            switch (m) {
            case 1:
                modestr = 'always';
                break;
            case 0:
                modestr = 'never';
                break;
            default:
                break;
            }
            this.attrname.setSubmitMode(modestr);
        }
        return this;
    }
        // 默认值
    default(val) {
        if (this.crmEntity.type == 1) {
            this.val(val);
        }
        return this;
    }
    //Lookup字段设置当前登录人
    user() {
        if (this.contname) {
            let toValue = {};
            toValue.id = this.crmEntity.userid;
            toValue.entityType = 'systemuser';
            toValue.name = this.crmEntity.username;
            this.val([toValue]);
        }
        return this;
    }
    setLookup(entityType, id, name) {
        if (this.contname) {
            let toValue = {};
            toValue.id = id;
            toValue.entityType = entityType;
            toValue.name = name || '';
            this.val([toValue]);
        }
        return this;
    }
    clear() {
        if (this.contname) {
            this.val(null);
        }
        return this;
    }
        //设置焦点
    focus() {
        if (this.contname) {
            this.contname.setFocus();
        }
        return this;
    }
        // 当前提示类型判断
    type(type) {
        this.crmEntity.type != type && (this.contname = this.attrname = null)
        return this;
    }
    error(message) {
        window.console && typeof window.console.error === 'function' && window.console.error(message);
    }
        //保存
    save() {
        return this.crmEntity.save();
    }
    option(obj, handle, state) {
        var arr = [];
        var value = this.val();
        for (var key in obj) {
            var valArr = [].concat(obj[key]).map(item => {
                return item * 1
            })
            new crmEntity(this.Xrm).Tabs(key, handle, state);
            if (valArr.indexOf(value) > -1) {
                arr.push(key);
            }
        }
        return new crmEntityHandle(this.Xrm, arr);
    }
        //查找字段带值 ，表单字段列，查找字段列，查询的数据
    setByVal(columns, columns1, lookupById) {
        const columnArr = [].concat(columns);
        const column1Arr = [].concat(columns1);
        if (this.attrname) {
            var value = this.getValue();
            if (!value) {
                this.crmEntity.Controls(columnArr, 'clear');
                return this;
            }
            lookupById(value, column1Arr).then((res, attrs) => {
                for (var i = 0; i < columnArr.length; i++) {
                    let attrName = columnArr[i];
                    if (/_a$/.test(attrName)) {
                        attrName = attrName.replace(/_a$/, '');
                        if ((new crmAttr(this.Xrm, attrName)).val()) {
                            continue;
                        }
                    }
                    let attr = attrs.attributes[column1Arr[i]];
                    attr !== null && (
                        (new crmAttr(this.Xrm, attrName)).setTypeVal(attr)
                    )
                }
            })
        }
        return this
    }
    addCustomView(viewDisplayName, fetchXml, columns) {
        if (this.contname && [1, 2].indexOf(this.crmEntity.type) > -1) {
            const entityName = this.contname.get_dataContext().get_lookupTypeNames().split(':')[0];
            const columnsStr = columns.map(item => {
                return `<cell name='${item}' width='300' />` }).join('');
            const layoutXml = `<grid name='resultset' object='10' jump='${entityName}id' select='1' icon='1' preview='1'><row name='result' id='${entityName}id'>${columnsStr}</row></grid>`;
            this.contname.addCustomView('{00000000-0000-0000-0000-000000000001}', entityName, viewDisplayName, fetchXml, layoutXml, 1);
        }
        return this;
    }
    addFilter(handle, entityType) {
        if (typeof handle === 'function') {
            this.addPreSearch(() => {
                let customFilter = handle();
                this.addCustomFilter(customFilter, entityType) })
        }
        return this;
    }
    addPreSearch(handle) {
        if (this.contname) {
            this.contname.addPreSearch(handle);
        }
        return this;
    }
    addCustomFilter(fetchXmlFilter, entityType) {
        if (this.contname) {
            this.contname.addCustomFilter(fetchXmlFilter, entityType);
        }
        return this;
    }
        //待完善，有问题
    setTypeVal(attr) {
        let value = null;
        if (attr) {
            value = attr.value
        }
        if (this.attrname) {
            if (!attr) {
                this.val(value).change();
                return this;
            }
            switch (attr.type) {
            case 'a:OptionSetValue':
                this.val(value).change();
                break;
            case 'a:EntityReference':
                let toValue = {};
                toValue.id = attr.guid;
                toValue.entityType = attr.logicalName;
                toValue.name = attr.name;
                this.val([toValue]).change();
                break;
            case 'a:EntityCollection':
                this.val(value).change();
                break;
            case 'a:Money':
                this.val(value).change();
                break;
            case 'a:AliasedValue':
                this.val(value).change();
                break;
            case 'c:int':
                this.val(value).change();
                break;
            case 'c:decimal':
                this.val(value).change();
                break;
            case 'c:dateTime':
                this.val(value).change();
                break;
            case 'c:boolean':
                this.val(value).change();
                break;
            default:
                this.val(value).change();
            }
        }
        return this;
    }
    refresh() {
        if (this.contname) {
            typeof this.contname.refresh === 'function' && this.contname.refresh();
        }
        return this;
    }
    setMax(value) {
        if (this.attrname) {
            var attribute = this.attrname._attribute;
            var setmax = attribute.set_max;
            typeof setmax === 'function' &&
                (setmax.apply(attribute, [value]))
        }
        return this
    }
    setMin(value) {
        if (this.attrname) {
            var attribute = this.attrname.
            ttribute;
            var setmin = attribute.set_min;
            typeof setmin === 'function' &&
                (setmin.apply(attribute, [value]))
        }
        return this
    }
    getOpts() {
        return new crmEntityOption(this.contname);
    }
}
export class crmEntity {
    constructor(Xrm, Sys) {
        this.Xrm = Xrm;
        this.Sys = Sys;
    }
        //获取实体Id 属性
    get id() {
        return this.Xrm.Page.data.entity.getId();
    }
        //获取实体name 属性
    get name() {
        return this.Xrm.Page.data.entity.getEntityName();
    }
        //获取实体类型 属性
    get type() {
        return this.Xrm.Page.ui.getFormType();
    }
        //获取登录人id  属性
    get userid() {
        return this.Xrm.Page.context.getUserId();
    }
        //获取登录人name 属性
    get username() {
        return this.Xrm.Page.context.getUserName();
    }
        //判断是否是当前登录人 属性
    isowner() {
        return this.userid == new crmAttr(this.Xrm, 'ownerid').val();
    }
        //保存
    save() {
        return this.Xrm.Page.data.save();
    }
        //刷新按钮
    refRibbon() {
        return this.Xrm.Page.ui.refreshRibbon();
    }
        //刷新实体
    refresh() {
        setTimeout(() => {
            this.Sys && this.Sys.Application._components.crmGrid && this.Sys.Application._components.crmGrid.refresh();
            this.Xrm.Page.data && this.Xrm.Page.data.refresh();
        }, 50);
        //this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
    }
    reload() {
        setTimeout(() => {
            this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
        }, 1)
    }
        //禁用或启用窗体所有字段
    disabledAll(state) {
        this.Controls(this.Xrm.Page.ui.controls, 'disabled', state);
    }
        //禁用或启用
    disabled(arr, state) {
        return this.Tabs(arr, 'disabled', state)
    }
        //显示
    show(arr) {
        return this.Tabs(arr, 'show')
    }
        //隐藏
    hide(arr) {
        return this.Tabs(arr, 'hide')
    }
        //是否没必填字段
    isValid() {
        return this.Xrm.Page.data.getIsValid();
    }
    val(arr, state) {
        const arrCopy = [].concat(arr);
        return this.Controls(arrCopy, 'val', state);
    }
        //对tab下的字段控制
    Tabs(arr, handle, state) {
        const Xrm = this.Xrm;
        const arrCopy = [].concat(arr);
        let conArr = [].concat(arr)
        arrCopy.forEach((item) => {
            let tab = Xrm.Page.ui.tabs.get(item);
            if (tab) {
                const index = conArr.indexOf(item);
                index > -1 && conArr.splice(index, 1);
                if (handle === 'hide' || handle === 'show') {
                    const disabled = (new crmAttr())[handle].bind({ contname: tab });
                    disabled(state);
                } else {
                    this.Sections(tab.sections.get(), handle, state)
                }
            }
        })
        this.Sections(conArr, handle, state);
        return new crmEntityHandle(this.Xrm, arr);
    }
        //对Sections下的字段控制
    Sections(sections, handle, state) {
        let conArr = [].concat(sections)
        sections.forEach((section) => {
            let sec = section;
            if (typeof sec === 'string') {
                sec = this.getSections(section) || sec;
            }
            if (typeof sec !== 'string') {
                const index = conArr.indexOf(section);
                index > -1 && conArr.splice(index, 1);
                if (sec.controls.get().length != 0) {
                    this.Controls(sec.controls.get(), handle, state);
                }
                // else {
                //     (new crmAttr()[handle]).apply({contname:sec}, [state])
                // }
            }
        })
        this.Controls(conArr, handle, state);
    }
    Controls(controls, handle, state) {
        var returnArr = [];
        controls.forEach((control) => {
            if (typeof control == 'string') {
                (new crmAttr(this.Xrm, control))[handle](state);
            } else {
                var controlType = control.getControlType();
                if (controlType != 'iframe' && controlType != 'webresource' && controlType != 'subgrid') {
                    returnArr.push((new crmAttr(this.Xrm, control.getName())[handle](state)));
                } else {
                    (new crmAttr()[handle]).apply({ contname: control }, [state])
                }
            }
        });
        return returnArr;
    }
        //获取节对象Sections
    getSections(name) {
        const tabs = this.Xrm.Page.ui.tabs.get();
        for (let index in tabs) {
            let tab = tabs[index];
            const section = tab.sections.getFirst((sec) => {
                return sec.getName() == name;
            })
            if (section) {
                return section;
            }
        }
        return null;
    }
}
//内部类
export class crmEntityHandle {
    constructor(Xrm, attrs) {
        this.Xrm = Xrm;
        this.attrs = attrs;
    }
        //禁用或启用
    disabled(state) {
        this.Tabs('disabled', state)
        return this;
    }
        //显示
    show() {
        this.Tabs('show')
        return this;
    }
        //隐藏
    hide() {
        this.Tabs('hide')
        return this;
    }
        //对tab下的字段控制
    Tabs(handle, state) {
        
        return new crmEntity(this.Xrm).Tabs(this.attrs, handle, state)
    }
}
export class crmEntityOption {
    constructor(contname) {
        this.contname = contname;
        this.attrname = contname.getAttribute();
        this.options = [].concat(this.attrname.getOptions());
    }
    optVal(arrs) {
        if (Array.isArray(arrs)) {
            const value = this.attrname.getValue();
            this.contname.clearOptions();
            this.options.forEach((item) => {
                if (arrs.indexOf(item.value * 1) >= 0) {
                    this.contname.addOption({ text: item.text, value: item.value })
                }
            })
            this.attrname.setValue(value);
        }
    }
}
