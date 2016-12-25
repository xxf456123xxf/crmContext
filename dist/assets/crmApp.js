/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.crmContext = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _crmEntity = __webpack_require__(1);
	
	var _crmProcess = __webpack_require__(2);
	
	var _crmGridList2 = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var crmContext = exports.crmContext = function () {
	    function crmContext(Xrm, pars) {
	        _classCallCheck(this, crmContext);
	
	        this.Xrm = Xrm;
	        this.pars = pars || {};
	    }
	
	    _createClass(crmContext, [{
	        key: 'attr',
	        value: function attr(name) {
	            return new _crmEntity.crmAttr(this.Xrm, name);
	        }
	    }, {
	        key: 'crmGridList',
	        value: function crmGridList(name) {
	            return new _crmGridList2.crmGridList(this.pars.Sys, name);
	        }
	    }, {
	        key: 'entity',
	        get: function get() {
	            return new _crmEntity.crmEntity(this.Xrm, this.pars.Sys);
	        }
	    }, {
	        key: 'process',
	        get: function get() {
	            return new _crmProcess.crmProcess(this.Xrm);
	        }
	    }]);
	
	    return crmContext;
	}();
	
	window.crmContext = crmContext;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var crmAttr = function () {
	    function crmAttr(Xrm, name) {
	        _classCallCheck(this, crmAttr);
	
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
	
	
	    _createClass(crmAttr, [{
	        key: 'getValue',
	        value: function getValue() {
	            var getval = null;
	            if (this.attrname) {
	                getval = this.attrname.getValue();
	            }
	            return getval;
	        }
	        //获取字段值 Lookup返回第一个值
	
	    }, {
	        key: 'get',
	        value: function get() {
	            if (!this.attrname) {
	                return this;
	            }
	            var getval = this.attrname.getValue() || {};
	            if (Array.isArray(getval)) {
	                return getval.length > 0 ? getval[0] : {};
	            }
	            return getval;
	        }
	        //设置和获取值  lookup获取Id
	
	    }, {
	        key: 'val',
	        value: function val(v) {
	            var obj = null;
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
	
	    }, {
	        key: 'show',
	        value: function show() {
	            if (this.contname) {
	                this.contname.setVisible(!0);
	            }
	            return this;
	        }
	        //隐藏
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (this.contname) {
	                this.contname.setVisible(!1);
	            }
	            return this;
	        }
	        //禁用
	
	    }, {
	        key: 'disabled',
	        value: function disabled() {
	            var disabled = 1;
	            if (this.contname) {
	                if (arguments[0] != undefined) {
	                    disabled = arguments[0];
	                }
	                typeof this.contname.setDisabled === 'function' && this.contname.setDisabled(disabled);
	            }
	            return this;
	        }
	        //绑定或触发change
	
	    }, {
	        key: 'change',
	        value: function change(c, a) {
	            var _this = this;
	
	            if (this.contname) {
	                if (typeof c == 'function') {
	                    this.contname.getAttribute().addOnChange(c, false);
	                    a && setTimeout(function () {
	                        _this.contname.getAttribute().fireOnChange();
	                    }, 200);
	                } else if (arguments.length === 0) {
	                    this.contname.getAttribute().fireOnChange();
	                }
	            }
	            return this;
	        }
	        //移除change方法
	
	    }, {
	        key: 'removechange',
	        value: function removechange(a) {
	            if (this.contname) {
	                this.contname.getAttribute().removeOnChange(a);
	            }
	            return this;
	        }
	        //字段必填
	
	    }, {
	        key: 'required',
	        value: function required(a) {
	            if (this.attrname) {
	                this.attrname.setRequiredLevel(a != 0 ? 'required' : 'none');
	            }
	            return this;
	        }
	        //提交模式 默认设置成always, 对字段赋值会调用
	
	    }, {
	        key: 'mode',
	        value: function mode(m) {
	            if (this.attrname) {
	                var modestr = 'always';
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
	
	    }, {
	        key: 'default',
	        value: function _default(val) {
	            if (this.crmEntity.type == 1) {
	                this.val(val);
	            }
	            return this;
	        }
	        //Lookup字段设置当前登录人
	
	    }, {
	        key: 'user',
	        value: function user() {
	            if (this.contname) {
	                var toValue = {};
	                toValue.id = this.crmEntity.userid;
	                toValue.entityType = 'systemuser';
	                toValue.name = this.crmEntity.username;
	                this.val([toValue]);
	            }
	            return this;
	        }
	    }, {
	        key: 'setLookup',
	        value: function setLookup(entityType, id, name) {
	            if (this.contname) {
	                var toValue = {};
	                toValue.id = id;
	                toValue.entityType = entityType;
	                toValue.name = name || '';
	                this.val([toValue]);
	            }
	            return this;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            if (this.contname) {
	                this.val(null);
	            }
	            return this;
	        }
	        //设置焦点
	
	    }, {
	        key: 'focus',
	        value: function focus() {
	            if (this.contname) {
	                this.contname.setFocus();
	            }
	            return this;
	        }
	        // 当前提示类型判断
	
	    }, {
	        key: 'type',
	        value: function type(_type) {
	            this.crmEntity.type != _type && (this.contname = this.attrname = null);
	            return this;
	        }
	    }, {
	        key: 'error',
	        value: function error(message) {
	            window.console && typeof window.console.error === 'function' && window.console.error(message);
	        }
	        //保存
	
	    }, {
	        key: 'save',
	        value: function save() {
	            return this.crmEntity.save();
	        }
	    }, {
	        key: 'option',
	        value: function option(obj, handle, state) {
	            var arr = [];
	            var value = this.val();
	            for (var key in obj) {
	                var valArr = [].concat(obj[key]).map(function (item) {
	                    return item * 1;
	                });
	                new crmEntity(this.Xrm).Tabs(key, handle, state);
	                if (valArr.indexOf(value) > -1) {
	                    arr.push(key);
	                }
	            }
	            return new crmEntityHandle(this.Xrm, arr);
	        }
	        //查找字段带值 ，表单字段列，查找字段列，查询的数据
	
	    }, {
	        key: 'setByVal',
	        value: function setByVal(columns, columns1, lookupById) {
	            var _this2 = this;
	
	            var columnArr = [].concat(columns);
	            var column1Arr = [].concat(columns1);
	            if (this.attrname) {
	                var value = this.getValue();
	                if (!value) {
	                    this.crmEntity.Controls(columnArr, 'clear');
	                    return this;
	                }
	                lookupById(value, column1Arr).then(function (res, attrs) {
	                    for (var i = 0; i < columnArr.length; i++) {
	                        var attrName = columnArr[i];
	                        if (/_a$/.test(attrName)) {
	                            attrName = attrName.replace(/_a$/, '');
	                            if (new crmAttr(_this2.Xrm, attrName).val()) {
	                                continue;
	                            }
	                        }
	                        var attr = attrs.attributes[column1Arr[i]];
	                        attr !== null && new crmAttr(_this2.Xrm, attrName).setTypeVal(attr);
	                    }
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'addCustomView',
	        value: function addCustomView(viewDisplayName, fetchXml, columns) {
	            if (this.contname && [1, 2].indexOf(this.crmEntity.type) > -1) {
	                var entityName = this.contname.get_dataContext().get_lookupTypeNames().split(':')[0];
	                var columnsStr = columns.map(function (item) {
	                    return '<cell name=\'' + item + '\' width=\'300\' />';
	                }).join('');
	                var layoutXml = '<grid name=\'resultset\' object=\'10\' jump=\'' + entityName + 'id\' select=\'1\' icon=\'1\' preview=\'1\'><row name=\'result\' id=\'' + entityName + 'id\'>' + columnsStr + '</row></grid>';
	                this.contname.addCustomView('{00000000-0000-0000-0000-000000000001}', entityName, viewDisplayName, fetchXml, layoutXml, 1);
	            }
	            return this;
	        }
	    }, {
	        key: 'addFilter',
	        value: function addFilter(handle, entityType) {
	            var _this3 = this;
	
	            if (typeof handle === 'function') {
	                this.addPreSearch(function () {
	                    var customFilter = handle();
	                    _this3.addCustomFilter(customFilter, entityType);
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'addPreSearch',
	        value: function addPreSearch(handle) {
	            if (this.contname) {
	                this.contname.addPreSearch(handle);
	            }
	            return this;
	        }
	    }, {
	        key: 'addCustomFilter',
	        value: function addCustomFilter(fetchXmlFilter, entityType) {
	            if (this.contname) {
	                this.contname.addCustomFilter(fetchXmlFilter, entityType);
	            }
	            return this;
	        }
	        //待完善，有问题
	
	    }, {
	        key: 'setTypeVal',
	        value: function setTypeVal(attr) {
	            var value = null;
	            if (attr) {
	                value = attr.value;
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
	                        var toValue = {};
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
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            if (this.contname) {
	                typeof this.contname.refresh === 'function' && this.contname.refresh();
	            }
	            return this;
	        }
	    }, {
	        key: 'setMax',
	        value: function setMax(value) {
	            if (this.attrname) {
	                var attribute = this.attrname._attribute;
	                var setmax = attribute.set_max;
	                typeof setmax === 'function' && setmax.apply(attribute, [value]);
	            }
	            return this;
	        }
	    }, {
	        key: 'setMin',
	        value: function setMin(value) {
	            if (this.attrname) {
	                var attribute = this.attrname.ttribute;
	                var setmin = attribute.set_min;
	                typeof setmin === 'function' && setmin.apply(attribute, [value]);
	            }
	            return this;
	        }
	    }, {
	        key: 'getOpts',
	        value: function getOpts() {
	            return new crmEntityOption(this.contname);
	        }
	    }]);
	
	    return crmAttr;
	}();
	
	exports.crmAttr = crmAttr;
	
	var crmEntity = exports.crmEntity = function () {
	    function crmEntity(Xrm, Sys) {
	        _classCallCheck(this, crmEntity);
	
	        this.Xrm = Xrm;
	        this.Sys = Sys;
	    }
	    //获取实体Id 属性
	
	
	    _createClass(crmEntity, [{
	        key: 'isowner',
	
	        //判断是否是当前登录人 属性
	        value: function isowner() {
	            return this.userid == new crmAttr(this.Xrm, 'ownerid').val();
	        }
	        //保存
	
	    }, {
	        key: 'save',
	        value: function save() {
	            return this.Xrm.Page.data.save();
	        }
	        //刷新按钮
	
	    }, {
	        key: 'refRibbon',
	        value: function refRibbon() {
	            return this.Xrm.Page.ui.refreshRibbon();
	        }
	        //刷新实体
	
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            var _this4 = this;
	
	            setTimeout(function () {
	                _this4.Sys && _this4.Sys.Application._components.crmGrid && _this4.Sys.Application._components.crmGrid.refresh();
	                _this4.Xrm.Page.data && _this4.Xrm.Page.data.refresh();
	            }, 50);
	            //this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            var _this5 = this;
	
	            setTimeout(function () {
	                _this5.Xrm.Utility.openEntityForm(_this5.Xrm.Page.data.entity.getEntityName(), _this5.Xrm.Page.data.entity.getId());
	            }, 1);
	        }
	        //禁用或启用窗体所有字段
	
	    }, {
	        key: 'disabledAll',
	        value: function disabledAll(state) {
	            this.Controls(this.Xrm.Page.ui.controls, 'disabled', state);
	        }
	        //禁用或启用
	
	    }, {
	        key: 'disabled',
	        value: function disabled(arr, state) {
	            return this.Tabs(arr, 'disabled', state);
	        }
	        //显示
	
	    }, {
	        key: 'show',
	        value: function show(arr) {
	            return this.Tabs(arr, 'show');
	        }
	        //隐藏
	
	    }, {
	        key: 'hide',
	        value: function hide(arr) {
	            return this.Tabs(arr, 'hide');
	        }
	        //是否没必填字段
	
	    }, {
	        key: 'isValid',
	        value: function isValid() {
	            return this.Xrm.Page.data.getIsValid();
	        }
	    }, {
	        key: 'val',
	        value: function val(arr, state) {
	            var arrCopy = [].concat(arr);
	            return this.Controls(arrCopy, 'val', state);
	        }
	        //对tab下的字段控制
	
	    }, {
	        key: 'Tabs',
	        value: function Tabs(arr, handle, state) {
	            var _this6 = this;
	
	            var Xrm = this.Xrm;
	            var arrCopy = [].concat(arr);
	            var conArr = [].concat(arr);
	            arrCopy.forEach(function (item) {
	                var tab = Xrm.Page.ui.tabs.get(item);
	                if (tab) {
	                    var index = conArr.indexOf(item);
	                    index > -1 && conArr.splice(index, 1);
	                    if (handle === 'hide' || handle === 'show') {
	                        var disabled = new crmAttr()[handle].bind({ contname: tab });
	                        disabled(state);
	                    } else {
	                        _this6.Sections(tab.sections.get(), handle, state);
	                    }
	                }
	            });
	            this.Sections(conArr, handle, state);
	            return new crmEntityHandle(this.Xrm, arr);
	        }
	        //对Sections下的字段控制
	
	    }, {
	        key: 'Sections',
	        value: function Sections(sections, handle, state) {
	            var _this7 = this;
	
	            var conArr = [].concat(sections);
	            sections.forEach(function (section) {
	                var sec = section;
	                if (typeof sec === 'string') {
	                    sec = _this7.getSections(section) || sec;
	                }
	                if (typeof sec !== 'string') {
	                    var index = conArr.indexOf(section);
	                    index > -1 && conArr.splice(index, 1);
	                    if (sec.controls.get().length != 0) {
	                        _this7.Controls(sec.controls.get(), handle, state);
	                    }
	                    // else {
	                    //     (new crmAttr()[handle]).apply({contname:sec}, [state])
	                    // }
	                }
	            });
	            this.Controls(conArr, handle, state);
	        }
	    }, {
	        key: 'Controls',
	        value: function Controls(controls, handle, state) {
	            var _this8 = this;
	
	            var returnArr = [];
	            controls.forEach(function (control) {
	                if (typeof control == 'string') {
	                    new crmAttr(_this8.Xrm, control)[handle](state);
	                } else {
	                    var controlType = control.getControlType();
	                    if (controlType != 'iframe' && controlType != 'webresource' && controlType != 'subgrid') {
	                        returnArr.push(new crmAttr(_this8.Xrm, control.getName())[handle](state));
	                    } else {
	                        new crmAttr()[handle].apply({ contname: control }, [state]);
	                    }
	                }
	            });
	            return returnArr;
	        }
	        //获取节对象Sections
	
	    }, {
	        key: 'getSections',
	        value: function getSections(name) {
	            var tabs = this.Xrm.Page.ui.tabs.get();
	            for (var index in tabs) {
	                var tab = tabs[index];
	                var section = tab.sections.getFirst(function (sec) {
	                    return sec.getName() == name;
	                });
	                if (section) {
	                    return section;
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this.Xrm.Page.data.entity.getId();
	        }
	        //获取实体name 属性
	
	    }, {
	        key: 'name',
	        get: function get() {
	            return this.Xrm.Page.data.entity.getEntityName();
	        }
	        //获取实体类型 属性
	
	    }, {
	        key: 'type',
	        get: function get() {
	            return this.Xrm.Page.ui.getFormType();
	        }
	        //获取登录人id  属性
	
	    }, {
	        key: 'userid',
	        get: function get() {
	            return this.Xrm.Page.context.getUserId();
	        }
	        //获取登录人name 属性
	
	    }, {
	        key: 'username',
	        get: function get() {
	            return this.Xrm.Page.context.getUserName();
	        }
	    }]);
	
	    return crmEntity;
	}();
	//内部类
	
	
	var crmEntityHandle = exports.crmEntityHandle = function () {
	    function crmEntityHandle(Xrm, attrs) {
	        _classCallCheck(this, crmEntityHandle);
	
	        this.Xrm = Xrm;
	        this.attrs = attrs;
	    }
	    //禁用或启用
	
	
	    _createClass(crmEntityHandle, [{
	        key: 'disabled',
	        value: function disabled(state) {
	            this.Tabs('disabled', state);
	            return this;
	        }
	        //显示
	
	    }, {
	        key: 'show',
	        value: function show() {
	            this.Tabs('show');
	            return this;
	        }
	        //隐藏
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.Tabs('hide');
	            return this;
	        }
	        //对tab下的字段控制
	
	    }, {
	        key: 'Tabs',
	        value: function Tabs(handle, state) {
	            return new crmEntity(this.Xrm).Tabs(this.attrs, handle, state);
	        }
	    }]);
	
	    return crmEntityHandle;
	}();
	
	var crmEntityOption = exports.crmEntityOption = function () {
	    function crmEntityOption(contname) {
	        _classCallCheck(this, crmEntityOption);
	
	        this.contname = contname;
	        this.attrname = contname.getAttribute();
	        this.options = [].concat(this.attrname.getOptions());
	    }
	
	    _createClass(crmEntityOption, [{
	        key: 'optVal',
	        value: function optVal(arrs) {
	            var _this9 = this;
	
	            if (Array.isArray(arrs)) {
	                var value = this.attrname.getValue();
	                this.contname.clearOptions();
	                this.options.forEach(function (item) {
	                    if (arrs.indexOf(item.value * 1) >= 0) {
	                        _this9.contname.addOption({ text: item.text, value: item.value });
	                    }
	                });
	                this.attrname.setValue(value);
	            }
	        }
	    }]);

	    return crmEntityOption;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var crmProcess = exports.crmProcess = function () {
	    function crmProcess(Xrm) {
	        _classCallCheck(this, crmProcess);
	
	        this.Xrm = Xrm;
	        this.uiProcess = this.Xrm.Page && this.Xrm.Page.ui && this.Xrm.Page.ui.process;
	        this.dataProcess = this.Xrm.Page && this.Xrm.Page.data && this.Xrm.Page.data.process;
	    }
	
	    _createClass(crmProcess, [{
	        key: "reflow",
	        value: function reflow() {
	            this.uiProcess.reflow.apply(this.uiProcess, arguments);
	        }
	    }, {
	        key: "setDisplayState",
	        value: function setDisplayState() {
	            this.uiProcess.setDisplayState.apply(this.uiProcess, arguments);
	        }
	    }, {
	        key: "setVisible",
	        value: function setVisible() {
	            this.uiProcess.setVisible.apply(this.uiProcess, arguments);
	        }
	    }, {
	        key: "addOnStageChange",
	        value: function addOnStageChange() {
	            this.dataProcess.addOnStageChange.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "addOnStageSelected",
	        value: function addOnStageSelected() {
	            this.dataProcess.addOnStageSelected.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "getActivePath",
	        value: function getActivePath() {
	            return this.dataProcess.getActivePath.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "getActiveProcess",
	        value: function getActiveProcess() {
	            return this.dataProcess.getActiveProcess.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "getActiveStage",
	        value: function getActiveStage() {
	            return this.dataProcess.getActiveStage.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "getEnabledProcesses",
	        value: function getEnabledProcesses() {
	            return this.dataProcess.getEnabledProcesses.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "moveNext",
	        value: function moveNext() {
	            return this.dataProcess.moveNext.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "movePrevious",
	        value: function movePrevious() {
	            return this.dataProcess.movePrevious.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "removeOnStageChange",
	        value: function removeOnStageChange() {
	            this.dataProcess.removeOnStageChange.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "removeOnStageSelected",
	        value: function removeOnStageSelected() {
	            this.dataProcess.removeOnStageSelected.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "setActiveProcess",
	        value: function setActiveProcess() {
	            return this.dataProcess.setActiveProcess.apply(this.dataProcess, arguments);
	        }
	    }, {
	        key: "setActiveStage",
	        value: function setActiveStage() {
	            return this.dataProcess.setActiveStage.apply(this.dataProcess, arguments);
	        }
	    }]);

	    return crmProcess;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var crmGridList = exports.crmGridList = function () {
	    function crmGridList(Sys, name) {
	        _classCallCheck(this, crmGridList);
	
	        this.contname = Sys.Application._components[name];
	        if (!this.contname) {
	            this.logError('not crmGridList name : ' + this.contname);
	        }
	    }
	
	    _createClass(crmGridList, [{
	        key: 'getSelectIds',
	        value: function getSelectIds() {
	            if (!this.contname) {
	                return [];
	            }
	            return this.contname.get_selectedIds();
	        }
	    }, {
	        key: 'logError',
	        value: function logError(message) {
	            window.console && typeof window.console.error === 'function' && window.console.error(message);
	        }
	    }, {
	        key: 'list',
	        get: function get() {
	            if (!this.contname) {
	                return [];
	            }
	            return this.contname.get_allRecords();
	        }
	    }, {
	        key: 'listIds',
	        get: function get() {
	            if (!this.contname) {
	                return [];
	            }
	            return this.contname.get_allRecordIds();
	        }
	    }, {
	        key: 'count',
	        get: function get() {
	            if (!this.contname) {
	                return 0;
	            }
	            return this.contname.get_allRecords().length;
	        }
	    }]);

	    return crmGridList;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=crmApp.js.map