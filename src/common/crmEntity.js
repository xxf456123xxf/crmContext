    export class crmAttr {
        constructor(Xrm, name) {
            if (!Xrm || !name) {
                return;
            }
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
            const getval = this.attrname.getValue();
            return getval;
        }
        //获取字段值 Lookup返回第一个值
        get() {
            if (!this.attrname) {
                return this;
            }
            const getval = this.attrname.getValue();
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
                this.contname.setDisabled(disabled);
            }
            return this;
        }
        //绑定或触发change
        change(c, a) {
            if (this.attrname) {
                if (typeof(c) == 'function') {
                    this.attrname.addOnChange(c, false);
                    a && this.attrname.fireOnChange();
                } else if (arguments.length === 0) {
                    this.attrname.fireOnChange();
                }
            }
            return this;
        }
        //移除change方法
        removechange(a) {
            if (this.attrname) {
                this.attrname.removeOnChange(a);
            }
            return this;
        }
        //字段必填
        required(a) {
            if (this.attrname) {
                this.attrname.setRequiredLevel(a ? 'required' : 'none');
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
        default (val) {
            if (this.crmEntity.type == 1) {
                this.val(val);
            }
            return this;
        }
        //Lookup字段设置当前登录人
        user() {
            if (this.attrname) {
                let toValue = {};
                toValue.id = this.crmEntity.userid;
                toValue.entityType = 'systemuser';
                toValue.name = this.crmEntity.username;
                this.val([toValue]);
            }
            return this;
        }
        //清除字段
        clear() {
            if (this.attrname) {
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
            return new Promise(function(resolve, reject) {
                this.crmEntity.type == type ? resolve(this) : reject(this);
            });
        }
        error(message) {
            window.console.error(message);
        }
        //保存
        save() {
            return this.crmEntity.save();
        }
    }
    export class crmEntity {
        constructor(Xrm) {
            this.Xrm = Xrm;
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
            this.Xrm.Page.data.refresh()
            //this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
        }
        //禁用或启用窗体所有字段
        disabledAll(state) {
            this.Controls(this.Xrm.Page.ui.controls, 'disabled', state);
        }
        //禁用或启用
        disabled(arr, state) {
            this.Tabs(arr, 'disabled', state)
        }
        //显示
        show(arr) {
            this.Tabs(arr, 'show')
        }
        //隐藏
        hide(arr) {
            this.Tabs(arr, 'hide')
        }
        //是否没必填字段
        isValid() {
            return this.Xrm.Page.data.getIsValid();
        }
        //对tab下的字段控制
        Tabs(arr, handle, state) {
            const Xrm = this.Xrm;
            let conArr = [].concat(arr)
            arr.forEach((item) => {
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
                    this.Controls(sec.controls.get(), handle, state);
                }
            })
            this.Controls(conArr, handle, state);
        }
        Controls(controls, handle, state) {
            controls.forEach((control) => {
                if (typeof control == 'string') {
                    (new crmAttr(this.Xrm, control))[handle](state);
                } else {
                    var controlType = control.getControlType();
                    if (controlType != 'iframe' && controlType != 'webresource' && controlType != 'subgrid') {
                        const disabled = (new crmAttr())[handle].bind({ contname: control });
                        disabled(state);
                    }
                }
            });
        }
        //获取节对象Sections
        getSections(name) {
            const tabs = this.Xrm.Page.ui.tabs.get();
            for (let index in tabs) {
                let tab = tabs[index];
                const section = tab.sections.getFirst((section) => {
                    return section.getName() == name;
                })
                if (section) {
                    return section;
                }
            }
            return null;
        }
    }
