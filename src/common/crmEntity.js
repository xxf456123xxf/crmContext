/**
 * 表单操作
 * @module Entity
 */
export class crmAttr {
    /**
     *crmAttr 初始化对象
     * @class crmAttr
     * @param {object} [Xrm]
     * @param {object} [name]
     * @constructor
    */
   /**
    * getAttribute对象
    * @property attrname
    * @type object
    */
   /**
    * getControl对象
    * @property contname
    * @type object
    */
    constructor(Xrm, name) {
        if (!Xrm || !name) {
            return;
        }
        this.Xrm = Xrm;
        this.name = name;
        this.attrname = Xrm.Page.getAttribute(this.name);
        this.contname = Xrm.Page.getControl(this.name);
        this.crmEntity = new crmEntity(Xrm);
        if (!this.contname) {
            this.contname = Xrm.Page.ui.tabs.get(this.name);
        }
        if (!this.attrname && !this.contname) {
            this.error('not found ' + this.name);
        }
    }
    /**
       * 获取字段值
       * @method getValue
       * @return {object} value
       * @example
       *     attr('new_name').getValue();
       */
    getValue() {
        let getval = null
        if (this.attrname) {
            getval = this.attrname.getValue();
        }
        return getval;
    }
    /**
     * 获取字段值 Lookup返回第一个值
     * @method get
     * @return {object} value
     */
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
    /**
     * 设置和获取值
     * @method val
     * @param  {object} val 设置值
     * @optional
     * @return {object} this 获取值
     * @example
     *      attr('new_name').val() //获取值
     *      attr('new_name').val('名称') //设置值并设置成始终提交 不触发chagne事件
     */
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
    /**
     * 显示字段
     * @method show
     * @return {object} this
     */
    show() {
        if (this.contname) {
            this.contname.setVisible(!0);
        }
        return this;
    }
    /**
     * 隐藏字段
     * @method hide
     * @return {object} this
     */
    hide() {
        if (this.contname) {
            this.contname.setVisible(!1);
        }
        return this;
    }
    /**
     * 获取属性name|text值
     * @method text
     * @return {string}
     * @example
     *      attr('ownerid').text() //owneridname
     */
    text() {
        if (this.contname) {
            if(typeof this.attrname.getText == 'function') {
                return this.attrname.getText();
            }
            var obj = this.attrname.getValue();
            if (Array.isArray(obj)) {
                return obj[0].name;
            }
            return obj;
        }
        return null;
    }
    /**
     * 禁用
     * @method disabled
     * @param  {int} [state=1] 0=启用，1=禁用
     * @required
     * @return {object} this
     * @example
     *      attr('new_name').disabled() //禁用
     *      attr('new_name').disabled(0) //启用
     */
    disabled(state) {
        let disabled = 1;
        if (this.contname) {
            if (state != undefined) {
                disabled = state;
            }
            typeof this.contname.setDisabled === 'function' && this.contname.setDisabled(disabled);
        }
        return this;
    }
    /**
     * 绑定或触发change事件
     * @method  change
     * @param  {function} change 触发事件
     * @param  {int} isChange 为1时触发
     * @return {object} this
     * @example
     *      attr('new_name').change() //触发change事件
     *      attr('new_name').change(this.nameChange) //绑定change事件
     *      attr('new_name').change(this.nameChange, 1) //绑定change事件并触发
     */
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
    /**
     * 移除change事件
     * @method removechange
     * @param  {change} change
     * @return {object} this
     */
    removechange(a) {
        if (this.contname) {
            this.contname.getAttribute().removeOnChange(a);
        }
        return this;
    }
    /**
     * 字段必填
     * @method required
     * @param  {int} a 0=none,1=required
     * @return {object} this
     * @example
     *      attr('new_name').required() //必填
     *      attr('new_name').required(0) //不必填
     */
    required(a) {
        if (this.attrname) {
            this.attrname.setRequiredLevel(a != 0 ? 'required' : 'none');
        }
        return this;
    }
    /**
     * 提交模式
     * @method mode
     * @param  {int} modetype  1=always,0=never
     * @return {object} this
     * @example
     *      attr('new_name').mode() //始终提交字段值
     *      attr('new_name').mode(0) //不提交字段值
     */
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
    /**
     * 窗体创建时设置默认值
     * @method default
     * @param  {object} val 值
     * @return {object} this
     */
    default(val) {
        if (this.crmEntity.type == 1) {
            this.val(val);
        }
        return this;
    }
    /**
     * Lookup字段设置当前登录人
     * @method user
     * @return {object} this
     */
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
    /**
     * 设置lookup 值
     * @method setLookup
     * @param  {string} entityType
     * @param  {guid} id
     * @param  {string} name
     * @return {object} [this]
     * @example
     *      attr('ownerid').setLookup('systemuser','guid','管理员') //设置查找字段值
     */
    setLookup(entityType, id, name) {
        if (this.contname && id) {
            let toValue = {};
            toValue.id = id.toUpperCase();
            toValue.entityType = entityType;
            toValue.name = name || '';
            this.val([toValue]);
        }
        return this;
    }
    /**
     * 清除字段值
     * @method clear
     * @return {object} this
     * @example
     *      attr('new_name').clear() //清除字段值
     */
    clear() {
        if (this.contname &&　this.val()) {
            this.val(null);
        }
        return this;
    }
    /**
     * 设置焦点
     * @method focus
     * @return {object} this
     */
    focus() {
        if (this.contname) {
            this.contname.setFocus();
        }
        return this;
    }
    /**
     * 判断窗体类型
     * @method type
     * @param  {int} type 窗体类型
     * @return {object} this
     */
    type(type) {
        this.crmEntity.type != type && (this.contname = this.attrname = null)
        return this;
    }
    error(message) {
        window.console && typeof window.console.error === 'function' && window.console.error(message);
    }
    /**
     * 保存实体
     * @method save
     * @return {object} 保存后的事件
     */
    save(opt) {
        return this.crmEntity.save(opt);
    }
    /**
     * @method option
     * @param  {array} arr
     * @param  {string} handle attr方法名
     * @param  {object} state 值
     * @return {object}
     * @example
     *      attr('new_name').option({ 'tab1': '100000000', 'tab2': '100000000', 'tab3': '100000001' }, 'hide').show() //new_name值为100000000时显示tab1、tab2，为100000001显示tab3
     */
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
    /**
     * 查找字段带值
     * @method setByVal
     * @param  {array} columns 表单字段列
     * @param  {array} columns1 查找字段列
     * @param  {function} lookupById 查询方法
     * @example
     *      attr('new_productid').setByVal(['new_productname',['ownerid$empty']], ['new_name','ownerid'], request.lookupById) //产品查找产品名称赋值、ownerid为null时不赋值,会触发change事件
     */
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
                    if (/\$empty$/.test(attrName)) {
                        attrName = attrName.replace(/\$empty$/, '');
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
    /**
     * 添加自定义视图
     * @method addCustomView
     * @param  {string}  viewDisplayName 视图名称
     * @param  {string} fetchXml fetchXML字符串
     * @param  {array} columns 显示的列
     * @example
     *      attr('new_productid').addCustomView('可选产品', fetchXml,['new_name']) //添加自定义视图
     */
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
    /**
     *添加自定义查询条件
     * @method addFilter
     * @param  {function} handle 返回filterXML
     * @param  {string} entityType 可不传
     * @example
     *      productCustomFilter = function() {
     *           return '<filter type=\'and\'><condition attribute=\'new_name\' operator=\'like\' value=\'%产品%\' /></filter>';
     *      }
     *      attr('new_productid').addFilter(productCustomFilter) //产品视图添加filter条件
     *
     */
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
                toValue.id = attr.guid.toUpperCase();
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
    /**
     * 刷新字段值
     * @method refresh
     * @return {object} this
     */
    refresh() {
        if (this.contname) {
            typeof this.contname.refresh === 'function' && this.contname.refresh();
        }
        return this;
    }
    /**
     * 数字字段设置最大值
     * @method setMax
     * @param  {int} value 值
     */
    setMax(value) {
        if (this.attrname) {
            var attribute = this.attrname._attribute;
            var setmax = attribute.set_max;
            typeof setmax === 'function' &&
                (setmax.apply(attribute, [value]))
        }
        return this
    }
    /**
     * 数字字段设置最小值
     * @method setMin
     * @param  {int} value 值
     */
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
    /**
     * 获取crmEntityOption对象
     * @method getOpts
     * @return {object} 返回下拉值操作对象
     * @example
     *      var types = attr('new_type').getOpts()
     *      types.optVal([100000000]) //只显示下拉值100000000
     *      types.optVal([100000001]) //只显示下拉值100000001
     *      types.remove([100000001]) //移除下拉值100000001
     */
    getOpts() {
        return new crmEntityOption(this.contname);
    }
    /**
     * 字段是否编辑
     * @method isDirty
     * @return {Boolean}
     */
    isDirty() {
        if (this.attrname) {
            return this.attrname.getIsDirty();
        }
        return true;
    }
}
export class crmEntity {
    /**
     *crmEntity 初始化对象
     * @class crmEntity
     * @constructor
    */
    constructor(Xrm, Sys) {
        this.Xrm = Xrm;
        this.Sys = Sys;
    }
    /**
    * 获取实体Id
    *```javascript
    * ent.id
    *
    *```
    * @property id
    * @type guid
    */
    get id() {
        return this.Xrm.Page.data.entity.getId();
    }
    /**
    * 获取实体name
    *```javascript
    * ent.name
    *
    *```
    * @property name
    * @type string
    */
    get name() {
        return this.Xrm.Page.data.entity.getEntityName();
    }
    /**
    * 获取窗体类型
    *```javascript
    * ent.type
    *
    *```
    * @property type
    * @type string
    */
    get type() {
        return this.Xrm.Page.ui.getFormType();
    }
    /**
    * 获取登录人id
    *```javascript
    *ent.userid
    *
    *```
    * @property userid
    * @type guid
    */
    get userid() {
        return this.Xrm.Page.context.getUserId();
    }
    /**
    * 获取登录人name
    *```javascript
    * ent.username
    *
    * @property username
    * @type string
    */
    get username() {
        return this.Xrm.Page.context.getUserName();
    }
    /**
    * 判断是否是当前登录人
    * @method isowner
    * @return {boolean}
    * @example
    *       ent.isowner()
    */
    isowner() {
        return this.userid == new crmAttr(this.Xrm, 'ownerid').val();
    }
     /**
    * 判断是否是手机端
    * @method isMobile
    * @return {boolean}
    * @example
    *       ent.isMobile()
    */
    isMobile() {
        return this.Xrm.Page.context.client.getClient() == 'Mobile';
    }
    /**
     * 保存
     * @method save
     * @return {object} 保存成功后事件
     * @example
     *      ent.save().then(function() {
     *          //保存之后执行
     *      })
     */
    save(opt) {
        if(opt) {
            this.Xrm.Page.data.entity.save(opt);
            return;
        }
        return this.Xrm.Page.data.save();
    }
    /**
     * 刷新Ribbon
     * @method refRibbon
     */
    refRibbon() {
        return this.Xrm.Page.ui.refreshRibbon();
    }
    /**
     * 刷新实体或刷新列表
     * @method refresh
     */
    refresh() {
        setTimeout(() => {
            this.Sys && this.Sys.Application._components.crmGrid && this.Sys.Application._components.crmGrid.refresh();
            this.Xrm.Page.data && this.Xrm.Page.data.refresh();
        }, 50);
        //this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
    }
    /**
     * 重新加载实体
     * @method reload
     */
    reload() {
        setTimeout(() => {
            this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
        }, 1)
    }
    /**
     * 禁用或启用窗体所有字段
     * @method disabledAll
     * @param  {int} [state=1] 0=启用,1=禁用
     * @return {object} this
     */
    disabledAll(state) {
        this.Controls(this.Xrm.Page.ui.controls, 'disabled', state);
    }
    /**
     * 禁用或启用窗体部分字段
     * @method disabled
     * @param  {array} arr Tab\Sections\Controls
     * @param  {object} {state=1}
     * @return {object} this
     */
    disabled(arr, state) {
        return this.Tabs(arr, 'disabled', state)
    }
    /**
     * 显示窗体部分字段
     * @method show
     * @param  {array} arr Tab\Sections\Controls
     * @return {object} this
     */
    show(arr) {
        return this.Tabs(arr, 'show')
    }
    /**
     * 隐藏窗体部分字段
     * @method hide
     * @param  {array} arr Tab\Sections\Controls
     * @return {object} this
     */
    hide(arr) {
        return this.Tabs(arr, 'hide')
    }
    /**
     * 验证窗体必填字段
     * @method isValid
     * @return {Boolean}
     */
    isValid() {
        return this.Xrm.Page.data.getIsValid();
    }
    /**
     * 设置窗体字段value值
     * @method val
     * @param  {array} arr Controls
     * @param  {object} value 值
     * @return {object} this
     */
    val(arr, value) {
        const arrCopy = [].concat(arr);
        return this.Controls(arrCopy, 'val', value);
    }
    /**
     * Tabs控制
     * @method Tabs
     * @param  {array} arr Tab\Sections\Controls
     * @param  {string} handle crmAttr方法名
     * @param  {object} state 方法参数
     * @example
     *      ent.Tabs(['tab1','tab1_section_1','new_name'], 'disabled').hide() //禁用并隐藏
     */
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
    /**
     * Sections控制
     * @method Sections
     * @param  {array} arr Sections\Controls
     * @param  {string} handle crmAttr方法名
     * @param  {object} state 方法参数
     * @return {object} this
     * @example
     *      ent.Tabs(['tab1_section_1','new_name'], 'disabled').hide() //禁用并隐藏
     */
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
        return new crmEntityHandle(this.Xrm, sections);
    }
    /**
     * Controls控制
     * @method Controls
     * @param  {array} arr Controls
     * @param  {string} handle crmAttr方法名
     * @param  {object} state 方法参数
     * @return {object} this
     * @example
     *      ent.Controls(['new_name'], 'disabled').hide() //禁用并隐藏
     */
    Controls(controls, handle, state) {
        var returnArr = [];
        controls.forEach((control) => {
            //手机端创建时new_name会报$K的错误
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
     /**
     *crmEntityOption 初始化对象(通过crmAttr/getOpts获取)
     * @class crmEntityOption
     * @constructor
    */
    constructor(contname) {
        this.contname = contname;
        this.attrname = contname.getAttribute();
        this.options = [].concat(this.attrname.getOptions());
    }
    /**
     * 设置下拉值
     * @method optVal
     * @param  {array} arr 下拉值
     */
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
    /**
     * 移除下拉值
     * @method remove
     * @param  {array} arr 下拉值
     */
    remove(arr) {
        var arrs = [].concat(arr)
        arrs.forEach(item => {
            this.contname.removeOption(item)
        })
    }
}
