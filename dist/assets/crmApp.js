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
	        key: 'entity',
	        get: function get() {
	            return new _crmEntity.crmEntity(this.Xrm, this.pars.Sys);
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
	            var getval = this.attrname.getValue();
	            return getval;
	        }
	        //获取字段值 Lookup返回第一个值
	
	    }, {
	        key: 'get',
	        value: function get() {
	            if (!this.attrname) {
	                return this;
	            }
	            var getval = this.attrname.getValue();
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
	                this.contname.setDisabled(disabled);
	            }
	            return this;
	        }
	        //绑定或触发change
	
	    }, {
	        key: 'change',
	        value: function change(c, a) {
	            if (this.attrname) {
	                if (typeof c == 'function') {
	                    this.attrname.addOnChange(c, false);
	                    a && this.attrname.fireOnChange();
	                } else if (arguments.length === 0) {
	                    this.attrname.fireOnChange();
	                }
	            }
	            return this;
	        }
	        //移除change方法
	
	    }, {
	        key: 'removechange',
	        value: function removechange(a) {
	            if (this.attrname) {
	                this.attrname.removeOnChange(a);
	            }
	            return this;
	        }
	        //字段必填
	
	    }, {
	        key: 'required',
	        value: function required(a) {
	            if (this.attrname) {
	                this.attrname.setRequiredLevel(a ? 'required' : 'none');
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
	            if (this.attrname) {
	                var toValue = {};
	                toValue.id = this.crmEntity.userid;
	                toValue.entityType = 'systemuser';
	                toValue.name = this.crmEntity.username;
	                this.val([toValue]);
	            }
	            return this;
	        }
	        //清除字段
	
	    }, {
	        key: 'clear',
	        value: function clear() {
	            if (this.attrname) {
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
	            window.console.error(message);
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
	            return arr;
	        }
	        //查找字段带值 ，表单字段列，查找字段列，查询的数据
	
	    }, {
	        key: 'setByVal',
	        value: function setByVal(columns, columns1, lookupById) {
	            var _this = this;
	
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
	                        var attr = attrs.attributes[column1Arr[i]];
	                        attr !== null && new crmAttr(_this.Xrm, columnArr[i]).setTypeVal(attr);
	                    }
	                });
	            }
	            return this;
	        }
	        //待完善，有问题
	
	    }, {
	        key: 'setTypeVal',
	        value: function setTypeVal(attr) {
	            var value = attr.value;
	            if (this.attrname) {
	                switch (attr.type) {
	                    case 'a:OptionSetValue':
	                        this.val(value);
	                        break;
	                    case 'a:EntityReference':
	                        var toValue = {};
	                        toValue.id = attr.guid;
	                        toValue.entityType = attr.logicalName;
	                        toValue.name = attr.name;
	                        this.val([toValue]);
	                        break;
	                    case 'a:EntityCollection':
	                        this.val(value);
	                        break;
	                    case 'a:Money':
	                        this.val(value);
	                        break;
	                    case 'a:AliasedValue':
	                        this.val(value);
	                        break;
	                    case 'c:int':
	                        this.val(value);
	                        break;
	                    case 'c:decimal':
	                        this.val(value);
	                        break;
	                    case 'c:dateTime':
	                        this.val(value);
	                        break;
	                    case 'c:boolean':
	                        this.val(value);
	                        break;
	                    default:
	                        this.val(value);
	                }
	            }
	            return this;
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
	            this.Sys && this.Sys.Application._components.crmGrid && this.Sys.Application._components.crmGrid.refresh();
	            this.Xrm.Page.data && this.Xrm.Page.data.refresh();
	            //this.Xrm.Utility.openEntityForm(this.Xrm.Page.data.entity.getEntityName(), this.Xrm.Page.data.entity.getId())
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            var _this2 = this;
	
	            setTimeout(function () {
	                _this2.Xrm.Utility.openEntityForm(_this2.Xrm.Page.data.entity.getEntityName(), _this2.Xrm.Page.data.entity.getId());
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
	            this.Tabs(arr, 'disabled', state);
	        }
	        //显示
	
	    }, {
	        key: 'show',
	        value: function show(arr) {
	            this.Tabs(arr, 'show');
	        }
	        //隐藏
	
	    }, {
	        key: 'hide',
	        value: function hide(arr) {
	            this.Tabs(arr, 'hide');
	        }
	        //是否没必填字段
	
	    }, {
	        key: 'isValid',
	        value: function isValid() {
	            return this.Xrm.Page.data.getIsValid();
	        }
	        //对tab下的字段控制
	
	    }, {
	        key: 'Tabs',
	        value: function Tabs(arr, handle, state) {
	            var _this3 = this;
	
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
	                        _this3.Sections(tab.sections.get(), handle, state);
	                    }
	                }
	            });
	            this.Sections(conArr, handle, state);
	        }
	        //对Sections下的字段控制
	
	    }, {
	        key: 'Sections',
	        value: function Sections(sections, handle, state) {
	            var _this4 = this;
	
	            var conArr = [].concat(sections);
	            sections.forEach(function (section) {
	                var sec = section;
	                if (typeof sec === 'string') {
	                    sec = _this4.getSections(section) || sec;
	                }
	                if (typeof sec !== 'string') {
	                    var index = conArr.indexOf(section);
	                    index > -1 && conArr.splice(index, 1);
	                    _this4.Controls(sec.controls.get(), handle, state);
	                }
	            });
	            this.Controls(conArr, handle, state);
	        }
	    }, {
	        key: 'Controls',
	        value: function Controls(controls, handle, state) {
	            var _this5 = this;
	
	            controls.forEach(function (control) {
	                if (typeof control == 'string') {
	                    new crmAttr(_this5.Xrm, control)[handle](state);
	                } else {
	                    var controlType = control.getControlType();
	                    if (controlType != 'iframe' && controlType != 'webresource' && controlType != 'subgrid') {
	                        var disabled = new crmAttr()[handle].bind({ contname: control });
	                        disabled(state);
	                    }
	                }
	            });
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

/***/ }
/******/ ]);
//# sourceMappingURL=crmApp.js.map