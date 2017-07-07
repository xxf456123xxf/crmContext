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
	
	/**
	 * crmContext操作
	 * @module crmContext
	 */
	var crmContext = exports.crmContext = function () {
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
	  function crmContext(Xrm, pars) {
	    _classCallCheck(this, crmContext);
	
	    this.Xrm = Xrm;
	    this.pars = pars || {};
	  }
	  /**
	   * 获取crmAttr对象{{#crossLink "crmAttr/getOpts"}}{{/crossLink}}
	   * @method attr
	   * @param  {string} name 字段名
	   * @return {object} crmAttr对象
	   */
	
	
	  _createClass(crmContext, [{
	    key: 'attr',
	    value: function attr(name) {
	      return new _crmEntity.crmAttr(this.Xrm, name);
	    }
	    /**
	    * 获取crmEntity对象
	    * @property entity
	    * @type object
	    */
	
	  }, {
	    key: 'crmGridList',
	
	    /**
	     * 获取crmGridList对象
	     * @method crmGridList
	     * @param  {string} name 子网格名称
	     * @return {object} crmGridList
	     */
	    value: function crmGridList(name) {
	      return new _crmGridList2.crmGridList(this.pars.Sys, this.Xrm, name);
	    }
	  }, {
	    key: 'entity',
	    get: function get() {
	      return new _crmEntity.crmEntity(this.Xrm, this.pars.Sys);
	    }
	    /**
	     * 获取crmProcess对象
	     * @property process
	     * @type object
	     */
	
	  }, {
	    key: 'process',
	    get: function get() {
	      return new _crmProcess.crmProcess(this.Xrm);
	    }
	  }]);
	
	  return crmContext;
	}();
	
	exports.default = crmContext;
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 表单操作
	 * @module Entity
	 */
	var crmAttr = function () {
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
	    function crmAttr(Xrm, name) {
	        _classCallCheck(this, crmAttr);
	
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
	
	
	    _createClass(crmAttr, [{
	        key: 'getValue',
	        value: function getValue() {
	            var getval = null;
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
	        /**
	         * 显示字段
	         * @method show
	         * @return {object} this
	         */
	
	    }, {
	        key: 'show',
	        value: function show() {
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
	
	    }, {
	        key: 'hide',
	        value: function hide() {
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
	
	    }, {
	        key: 'text',
	        value: function text() {
	            if (this.contname) {
	                if (typeof this.attrname.getText == 'function') {
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
	
	    }, {
	        key: 'disabled',
	        value: function disabled(state) {
	            var disabled = 1;
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
	        /**
	         * 移除change事件
	         * @method removechange
	         * @param  {change} change
	         * @return {object} this
	         */
	
	    }, {
	        key: 'removechange',
	        value: function removechange(a) {
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
	
	    }, {
	        key: 'required',
	        value: function required(a) {
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
	        /**
	         * 窗体创建时设置默认值
	         * @method default
	         * @param  {object} val 值
	         * @return {object} this
	         */
	
	    }, {
	        key: 'default',
	        value: function _default(val) {
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
	
	    }, {
	        key: 'setLookup',
	        value: function setLookup(entityType, id, name) {
	            if (this.contname && id) {
	                var toValue = {};
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
	
	    }, {
	        key: 'clear',
	        value: function clear() {
	            if (this.contname && this.val()) {
	                this.val(null);
	            }
	            return this;
	        }
	        /**
	         * 设置焦点
	         * @method focus
	         * @return {object} this
	         */
	
	    }, {
	        key: 'focus',
	        value: function focus() {
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
	        /**
	         * 保存实体
	         * @method save
	         * @return {object} 保存后的事件
	         */
	
	    }, {
	        key: 'save',
	        value: function save(opt) {
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
	        /**
	         * 查找字段带值
	         * @method setByVal
	         * @param  {array} columns 表单字段列
	         * @param  {array} columns1 查找字段列
	         * @param  {function} lookupById 查询方法
	         * @example
	         *      attr('new_productid').setByVal(['new_productname',['ownerid$empty']], ['new_name','ownerid'], request.lookupById) //产品查找产品名称赋值、ownerid为null时不赋值,会触发change事件
	         */
	
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
	                        if (/\$empty$/.test(attrName)) {
	                            attrName = attrName.replace(/\$empty$/, '');
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
	        /**
	         * 添加自定义视图
	         * @method addCustomView
	         * @param  {string}  viewDisplayName 视图名称
	         * @param  {string} fetchXml fetchXML字符串
	         * @param  {array} columns 显示的列
	         * @example
	         *      attr('new_productid').addCustomView('可选产品', fetchXml,['new_name']) //添加自定义视图
	         */
	
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
	
	    }, {
	        key: 'refresh',
	        value: function refresh() {
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
	        /**
	         * 数字字段设置最小值
	         * @method setMin
	         * @param  {int} value 值
	         */
	
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
	
	    }, {
	        key: 'getOpts',
	        value: function getOpts() {
	            return new crmEntityOption(this.contname);
	        }
	        /**
	         * 字段是否编辑
	         * @method isDirty
	         * @return {Boolean}
	         */
	
	    }, {
	        key: 'isDirty',
	        value: function isDirty() {
	            if (this.attrname) {
	                return this.attrname.getIsDirty();
	            }
	            return true;
	        }
	    }]);
	
	    return crmAttr;
	}();
	
	exports.crmAttr = crmAttr;
	
	var crmEntity = exports.crmEntity = function () {
	    /**
	     *crmEntity 初始化对象
	     * @class crmEntity
	     * @constructor
	    */
	    function crmEntity(Xrm, Sys) {
	        _classCallCheck(this, crmEntity);
	
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
	
	
	    _createClass(crmEntity, [{
	        key: 'isowner',
	
	        /**
	        * 判断是否是当前登录人
	        * @method isowner
	        * @return {boolean}
	        * @example
	        *       ent.isowner()
	        */
	        value: function isowner() {
	            return this.userid == new crmAttr(this.Xrm, 'ownerid').val();
	        }
	        /**
	        * 判断是否是手机端
	        * @method isMobile
	        * @return {boolean}
	        * @example
	        *       ent.isMobile()
	        */
	
	    }, {
	        key: 'isMobile',
	        value: function isMobile() {
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
	
	    }, {
	        key: 'save',
	        value: function save(opt) {
	            if (opt) {
	                this.Xrm.Page.data.entity.save(opt);
	                return;
	            }
	            return this.Xrm.Page.data.save();
	        }
	        /**
	         * 刷新Ribbon
	         * @method refRibbon
	         */
	
	    }, {
	        key: 'refRibbon',
	        value: function refRibbon() {
	            return this.Xrm.Page.ui.refreshRibbon();
	        }
	        /**
	         * 刷新实体或刷新列表
	         * @method refresh
	         */
	
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
	        /**
	         * 重新加载实体
	         * @method reload
	         */
	
	    }, {
	        key: 'reload',
	        value: function reload() {
	            var _this5 = this;
	
	            setTimeout(function () {
	                _this5.Xrm.Utility.openEntityForm(_this5.Xrm.Page.data.entity.getEntityName(), _this5.Xrm.Page.data.entity.getId());
	            }, 1);
	        }
	        /**
	         * 禁用或启用窗体所有字段
	         * @method disabledAll
	         * @param  {int} [state=1] 0=启用,1=禁用
	         * @return {object} this
	         */
	
	    }, {
	        key: 'disabledAll',
	        value: function disabledAll(state) {
	            this.Controls(this.Xrm.Page.ui.controls, 'disabled', state);
	        }
	        /**
	         * 禁用或启用窗体部分字段
	         * @method disabled
	         * @param  {array} arr Tab\Sections\Controls
	         * @param  {object} {state=1}
	         * @return {object} this
	         */
	
	    }, {
	        key: 'disabled',
	        value: function disabled(arr, state) {
	            return this.Tabs(arr, 'disabled', state);
	        }
	        /**
	         * 显示窗体部分字段
	         * @method show
	         * @param  {array} arr Tab\Sections\Controls
	         * @return {object} this
	         */
	
	    }, {
	        key: 'show',
	        value: function show(arr) {
	            return this.Tabs(arr, 'show');
	        }
	        /**
	         * 隐藏窗体部分字段
	         * @method hide
	         * @param  {array} arr Tab\Sections\Controls
	         * @return {object} this
	         */
	
	    }, {
	        key: 'hide',
	        value: function hide(arr) {
	            return this.Tabs(arr, 'hide');
	        }
	        /**
	         * 验证窗体必填字段
	         * @method isValid
	         * @return {Boolean}
	         */
	
	    }, {
	        key: 'isValid',
	        value: function isValid() {
	            return this.Xrm.Page.data.getIsValid();
	        }
	        /**
	         * 设置窗体字段value值
	         * @method val
	         * @param  {array} arr Controls
	         * @param  {object} value 值
	         * @return {object} this
	         */
	
	    }, {
	        key: 'val',
	        value: function val(arr, value) {
	            var arrCopy = [].concat(arr);
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
	
	    }, {
	        key: 'Controls',
	        value: function Controls(controls, handle, state) {
	            var _this8 = this;
	
	            var returnArr = [];
	            controls.forEach(function (control) {
	                //手机端创建时new_name会报$K的错误
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
	        /**
	        * 获取实体name
	        *```javascript
	        * ent.name
	        *
	        *```
	        * @property name
	        * @type string
	        */
	
	    }, {
	        key: 'name',
	        get: function get() {
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
	
	    }, {
	        key: 'type',
	        get: function get() {
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
	
	    }, {
	        key: 'userid',
	        get: function get() {
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
	    /**
	    *crmEntityOption 初始化对象(通过crmAttr/getOpts获取)
	    * @class crmEntityOption
	    * @constructor
	    */
	    function crmEntityOption(contname) {
	        _classCallCheck(this, crmEntityOption);
	
	        this.contname = contname;
	        this.attrname = contname.getAttribute();
	        this.options = [].concat(this.attrname.getOptions());
	    }
	    /**
	     * 设置下拉值
	     * @method optVal
	     * @param  {array} arr 下拉值
	     */
	
	
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
	        /**
	         * 移除下拉值
	         * @method remove
	         * @param  {array} arr 下拉值
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(arr) {
	            var _this10 = this;
	
	            var arrs = [].concat(arr);
	            arrs.forEach(function (item) {
	                _this10.contname.removeOption(item);
	            });
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
	
	/**
	 * 业务流程操作
	 * @module crmProcess
	 */
	var crmProcess = exports.crmProcess = function () {
	  /**
	   *crmProcess 初始化对象
	   * @class crmProcess
	   * @constructor
	  */
	  function crmProcess(Xrm) {
	    _classCallCheck(this, crmProcess);
	
	    this.Xrm = Xrm;
	    this.uiProcess = this.Xrm.Page && this.Xrm.Page.ui && this.Xrm.Page.ui.process;
	    this.dataProcess = this.Xrm.Page && this.Xrm.Page.data && this.Xrm.Page.data.process;
	  }
	  /**
	   * @method reflow
	   * @return {[type]}
	   */
	
	
	  _createClass(crmProcess, [{
	    key: "reflow",
	    value: function reflow() {
	      this.uiProcess.reflow.apply(this.uiProcess, arguments);
	    }
	    /**
	     * @method setDisplayState
	     */
	
	  }, {
	    key: "setDisplayState",
	    value: function setDisplayState() {
	      this.uiProcess && this.uiProcess.setDisplayState.apply(this.uiProcess, arguments);
	    }
	    /**
	     * @method setVisible
	     */
	
	  }, {
	    key: "setVisible",
	    value: function setVisible() {
	      this.uiProcess && this.uiProcess.setVisible.apply(this.uiProcess, arguments);
	    }
	    /**
	     * @method addOnStageChange
	     */
	
	  }, {
	    key: "addOnStageChange",
	    value: function addOnStageChange() {
	      this.uiProcess && this.dataProcess.addOnStageChange.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method addOnStageSelected
	     */
	
	  }, {
	    key: "addOnStageSelected",
	    value: function addOnStageSelected() {
	      this.uiProcess && this.dataProcess.addOnStageSelected.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method getActivePath
	     * @return {[type]}
	     */
	
	  }, {
	    key: "getActivePath",
	    value: function getActivePath() {
	      return this.uiProcess && this.dataProcess.getActivePath.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method getActiveProcess
	     * @return {[type]}
	     */
	
	  }, {
	    key: "getActiveProcess",
	    value: function getActiveProcess() {
	      return this.uiProcess && this.dataProcess.getActiveProcess.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method getActiveStage
	     * @return {[type]}
	     */
	
	  }, {
	    key: "getActiveStage",
	    value: function getActiveStage() {
	      return this.uiProcess && this.dataProcess.getActiveStage.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method getEnabledProcesses
	     * @return {[type]}
	     */
	
	  }, {
	    key: "getEnabledProcesses",
	    value: function getEnabledProcesses() {
	      return this.uiProcess && this.dataProcess.getEnabledProcesses.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method moveNext
	     * @return {[type]}
	     */
	
	  }, {
	    key: "moveNext",
	    value: function moveNext() {
	      return this.uiProcess && this.dataProcess.moveNext.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method movePrevious
	     * @return {[type]}
	     */
	
	  }, {
	    key: "movePrevious",
	    value: function movePrevious() {
	      return this.uiProcess && this.dataProcess.movePrevious.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method removeOnStageChange
	     * @return {[type]}
	     */
	
	  }, {
	    key: "removeOnStageChange",
	    value: function removeOnStageChange() {
	      this.uiProcess && this.dataProcess.removeOnStageChange.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method removeOnStageSelected
	     * @return {[type]}
	     */
	
	  }, {
	    key: "removeOnStageSelected",
	    value: function removeOnStageSelected() {
	      this.uiProcess && this.dataProcess.removeOnStageSelected.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method setActiveProcess
	     */
	
	  }, {
	    key: "setActiveProcess",
	    value: function setActiveProcess() {
	      return this.uiProcess && this.dataProcess.setActiveProcess.apply(this.dataProcess, arguments);
	    }
	    /**
	     * @method setActiveStage
	     */
	
	  }, {
	    key: "setActiveStage",
	    value: function setActiveStage() {
	      return this.uiProcess && this.dataProcess.setActiveStage.apply(this.dataProcess, arguments);
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
	
	/**
	 * 子网格操作
	 * @module crmGridList
	 */
	var crmGridList = exports.crmGridList = function () {
	    /**
	     *crmGridList 初始化对象
	     * @class crmGridList
	     * @constructor
	    */
	    function crmGridList(Sys, Xrm, name) {
	        _classCallCheck(this, crmGridList);
	
	        this.Xrm = Xrm;
	        this.name = name;
	        var Control = this.Xrm.Page.getControl(name);
	        var TurboGrid = Control.getGrid();
	        if (TurboGrid['$3_1']) {
	            //2016处理方式和d365
	            this.contname = TurboGrid['$3_1'];
	        }
	        //this.contname = Sys.Application._components[name];
	        if (!this.contname) {
	            this.logWarn('not crmGridList name : ' + this.contname);
	        }
	    }
	    /**
	     * list
	     * @property list
	     * @type array
	     */
	
	
	    _createClass(crmGridList, [{
	        key: 'getSelectIds',
	
	        /**
	         * getSelectIds
	         * @property getSelectIds
	         * @type array
	         */
	        value: function getSelectIds() {
	            if (!this.contname) {
	                return [];
	            }
	            return this.contname.get_selectedIds();
	        }
	    }, {
	        key: 'addFilter',
	        value: function addFilter(handle, entityType) {
	            var _this = this;
	
	            var TurboGrid = this.contname;
	            var CustomerHandler = null;
	            if (typeof TurboGrid.addButtonClickHandler === 'function') {
	                CustomerHandler = TurboGrid.addButtonClickHandler.bind(TurboGrid);
	                TurboGrid.addButtonClickHandler = function () {
	                    CustomerHandler();
	                    var lookup = _this.Xrm.Page.getControl('lookup_' + _this.name);
	                    lookup.addPreSearch(function () {
	                        var FilterXml = handle.apply(this);
	                        lookup.addCustomFilter(FilterXml, entityType);
	                    });
	                    TurboGrid.addButtonClickHandler = CustomerHandler;
	                };
	            }
	        }
	        /**
	         * 自定义子网格
	         * @property setParameter
	         */
	
	    }, {
	        key: 'setParameter',
	        value: function setParameter(fetchxml) {
	            var TurboGrid = this.contname;
	            if (typeof TurboGrid.SetParameter === 'function') {
	                TurboGrid.SetParameter('fetchxml', fetchxml);
	            }
	            TurboGrid.refresh();
	        }
	    }, {
	        key: 'logWarn',
	        value: function logWarn(message) {
	            window.console && typeof window.console.warn === 'function' && window.console.warn(message);
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
	        /**
	         * listIds
	         * @property listIds
	         * @type array
	         */
	
	    }, {
	        key: 'listIds',
	        get: function get() {
	            if (!this.contname) {
	                return [];
	            }
	            return this.contname.get_allRecordIds();
	        }
	        /**
	         * count
	         * @property count
	         * @type int
	         */
	
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