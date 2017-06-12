webpackJsonp([1],{

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(363);
	
	var _zen = __webpack_require__(540);
	
	var _Zen = __webpack_require__(541);
	
	var _Zen2 = _interopRequireDefault(_Zen);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapDispatchtoProps = {
	  fetchZen: _zen.fetchZen,
	  clearZen: _zen.clearZen
	};
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    zen: state.zen
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchtoProps)(_Zen2.default);

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = exports.clearZen = exports.receiveZen = undefined;
	
	var _defineProperty2 = __webpack_require__(396);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(287);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _ACTION_HANDLERS;
	
	exports.fetchZen = fetchZen;
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  var handler = ACTION_HANDLERS[action.type];
	
	  return handler ? handler(state, action) : state;
	};
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// ------------------------------------
	// Constants
	// ------------------------------------
	var RECEIVE_ZEN = 'RECEIVE_ZEN';
	var REQUEST_ZEN = 'REQUEST_ZEN';
	var CLEAR_ZEN = 'CLEAR_ZEN';
	
	// ------------------------------------
	// Actions
	// ------------------------------------
	
	function requestZen() {
	  return {
	    type: REQUEST_ZEN
	  };
	}
	
	var avaliableId = 0;
	var receiveZen = exports.receiveZen = function receiveZen(value) {
	  return {
	    type: RECEIVE_ZEN,
	    payload: {
	      text: value,
	      id: avaliableId++
	    }
	  };
	};
	
	var clearZen = exports.clearZen = function clearZen() {
	  return {
	    type: CLEAR_ZEN
	  };
	};
	
	function fetchZen() {
	  return function (dispatch, getState) {
	    if (getState().zen.fetching) return;
	
	    dispatch(requestZen());
	    return fetch('https://api.github.com/zen').then(function (data) {
	      return data.text();
	    }).then(function (text) {
	      return dispatch(receiveZen(text));
	    });
	  };
	}
	
	var actions = exports.actions = {
	  requestZen: requestZen,
	  receiveZen: receiveZen,
	  clearZen: clearZen,
	  fetchZen: fetchZen
	};
	
	// ------------------------------------
	// Action Handlers
	// ------------------------------------
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, REQUEST_ZEN, function (state) {
	  return (0, _extends3.default)({}, state, { fetching: true });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, RECEIVE_ZEN, function (state, action) {
	  return (0, _extends3.default)({}, state, { fetching: false, text: state.text.concat(action.payload) });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, CLEAR_ZEN, function (state) {
	  return (0, _extends3.default)({}, state, { text: [] });
	}), _ACTION_HANDLERS);
	
	// ------------------------------------
	// Reducer
	// ------------------------------------
	var initialState = {
	  fetching: false,
	  text: []
	};

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(394);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _getPrototypeOf = __webpack_require__(311);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(316);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(317);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(321);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(355);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(542);
	
	var _util = __webpack_require__(398);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _config = __webpack_require__(400);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _reactSpinkit = __webpack_require__(545);
	
	var _reactSpinkit2 = _interopRequireDefault(_reactSpinkit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Zen = function (_Component) {
	    (0, _inherits3.default)(Zen, _Component);
	
	    function Zen() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        (0, _classCallCheck3.default)(this, Zen);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Zen.__proto__ || (0, _getPrototypeOf2.default)(Zen)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            index: 1,
	            sendValue: '',
	            enter: {
	                roomid: '',
	                pushUrl: ''
	            },
	            sendStatus: true
	        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }
	
	    (0, _createClass3.default)(Zen, [{
	        key: 'nav',
	
	
	        /**
	         * 切换导航
	         * @param  {Number} index 数字
	         */
	        value: function nav(index) {
	            this.setState({
	                index: index,
	                sendValue: ''
	            });
	        }
	
	        /**
	         * 校验直播房间号或直播地址是否正确
	         * @param  {Obj} checkedParam  参数
	         */
	
	    }, {
	        key: 'valiate',
	        value: function valiate(checkedParam) {
	            if (this.state.sendStatus) {
	                return;
	            }
	            this.setState({
	                sendStatus: true
	            });
	            this.doLogin(checkedParam);
	        }
	
	        /**
	         * 进入直播
	         */
	
	    }, {
	        key: 'enterPlay',
	        value: function enterPlay(key) {
	            if (this.state.sendStatus) {
	                return;
	            }
	            if (!_util2.default.trim(this.state.sendValue)) {
	                alert("输入框不能为空");
	                return;
	            }
	            var param = {};
	            if (this.state.index === 1) {
	                //房间号
	                param.roomid = _util2.default.trim(this.state.sendValue);
	                var reg = /^[0-9]*$/;
	                if (!reg.test(param.roomid)) {
	                    alert('房间号不存在');
	                    return;
	                }
	            } else {
	                //直播流
	                param.pushUrl = _util2.default.trim(this.state.sendValue);
	            }
	            this.valiate(param);
	        }
	        /**
	         * 游客登录
	         */
	
	    }, {
	        key: 'doLogin',
	        value: function doLogin(checkedParam) {
	            var param = {};
	            $.ajax({
	                url: _config2.default.tourist,
	                contentType: "application/x-www-form-urlencoded",
	                type: 'POST',
	                data: param
	            }).done(function (data) {
	                if (data.code === 200) {
	                    //记录登录状态到cookie
	                    _util2.default.setCookie("vAccount", data.ret.username);
	                    _util2.default.setCookie("sid", data.ret.sid);
	                    _util2.default.setCookie("vToken", data.ret.token);
	                    this.getRoomEnter(data.ret.sid, checkedParam);
	                } else {
	                    alert(data.msg);
	                    this.setState({
	                        sendStatus: false
	                    });
	                }
	            }.bind(this)).fail(function (data) {
	                console.error('获取数据失败，请刷新重试！');
	                this.setState({
	                    sendStatus: false
	                });
	            }.bind(this));
	        }
	
	        /**
	         * 观众获取房间看直播
	         * @param  {String} sid session id,用于登录后的各类接口请求校验
	         */
	
	    }, {
	        key: 'getRoomEnter',
	        value: function getRoomEnter(sid, checkedParam) {
	            checkedParam.sid = sid;
	            checkedParam.needRoomAddress = true;
	            $.ajax({
	                url: _config2.default.enter,
	                contentType: "application/x-www-form-urlencoded",
	                type: 'POST',
	                data: checkedParam
	            }).done(function (data) {
	                console.info('dtata', data);
	                if (data.code === 200) {
	                    _util2.default.setCookie("sid", sid);
	                    _util2.default.setCookie("status", data.ret.status);
	                    _util2.default.setCookie("valid", data.ret.valid);
	                    _util2.default.setCookie("hlsPullUrl", data.ret.hlsPullUrl);
	                    _util2.default.setCookie("isTourist", true);
	                    if (data.ret.addr && data.ret.addr[0]) {
	                        _util2.default.setCookie("addr", (0, _stringify2.default)(data.ret.addr));
	                    }
	                    window.location.href = '/?back=' + new Date().getTime() + '&roomid=' + data.ret.roomid;
	                } else {
	                    if (this.state.index === 1) {
	                        if (data.code === 501) {
	                            alert('直播已结束');
	                        } else {
	                            alert('房间号不存在');
	                        }
	                    } else {
	                        if (data.code === 501) {
	                            alert('直播已结束');
	                        } else {
	                            alert('拉流地址不存在');
	                        }
	                    }
	                }
	                this.setState({
	                    sendStatus: false
	                });
	            }.bind(this)).fail(function (data) {
	                console.error('获取数据失败，请刷新重试！');
	                this.setState({
	                    sendStatus: false
	                });
	            }.bind(this));
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event) {
	            this.setState({ sendValue: event.target.value });
	            this.setState({ sendStatus: !event.target.value });
	        }
	        /**
	         * 移开输入框事件
	         */
	
	    }, {
	        key: 'inputBlur',
	        value: function inputBlur() {
	            if (this.interval) {
	                clearInterval(this.interval);
	            }
	        }
	    }, {
	        key: 'focusInput',
	        value: function focusInput() {
	            this.interval = setInterval(function () {
	                document.body.scrollTop = document.body.scrollHeight;
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _util2.default.isWeixin() ? _react2.default.createElement(
	                    'div',
	                    { className: 'm-bg' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'wx' },
	                        _react2.default.createElement(
	                            'p',
	                            { className: 'text' },
	                            '\u9009\u62E9\u5728',
	                            _util2.default.isIos() ? 'Safair' : '浏览器',
	                            '\u4E2D\u6253\u5F00'
	                        )
	                    )
	                ) : _react2.default.createElement(
	                    'div',
	                    { className: 'm-nav' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        _react2.default.createElement('span', { className: 'logo' }),
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'text' },
	                            '\u89C6\u9891\u76F4\u64AD\u89C2\u4F17\u7AEF'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'ul',
	                        { className: 'nav-list' },
	                        _react2.default.createElement(
	                            'li',
	                            { className: this.state.index === 1 ? 'cur' : '', onClick: this.nav.bind(this, 1) },
	                            '\u623F\u95F4\u53F7\u89C2\u770B',
	                            _react2.default.createElement('span', { className: 'line' })
	                        ),
	                        _react2.default.createElement(
	                            'li',
	                            { className: this.state.index === 2 ? 'cur' : '', onClick: this.nav.bind(this, 2) },
	                            '\u62C9\u6D41\u5730\u5740',
	                            _react2.default.createElement('span', { className: 'line' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'box' },
	                        _react2.default.createElement('input', { type: this.state.index === 1 ? 'tel' : 'text', className: 'text-input mt10', placeholder: this.state.index === 1 ? "请输入房间号" : "请输入拉流地址", value: this.state.sendValue, onChange: this.handleChange.bind(this) }),
	                        _react2.default.createElement(
	                            'span',
	                            { href: 'javascript:', className: this.state.sendStatus ? 'btn mt10 disabled-btn' : 'btn mt10', onClick: this.enterPlay.bind(this) },
	                            '\u8FDB\u5165\u76F4\u64AD'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return Zen;
	}(_react.Component);
	
	exports.default = Zen;
	
	
	Zen.propTypes = {
	    zen: _react2.default.PropTypes.object.isRequired
	};

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(543);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(543, function() {
				var newContent = __webpack_require__(543);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, "body{background:#eee}.loading{height:40px;text-align:center}.loading div{display:inline-block}.mt10{margin-top:10px}.m-nav .title{width:100%;height:1.25333rem;background:#238efa}.m-nav .logo{width:.74667rem;height:.53333rem;margin:.37333rem .21333rem 0 .32rem;background:url(" + __webpack_require__(544) + ") no-repeat;background-size:contain}.m-nav .logo,.m-nav .text{display:inline-block;vertical-align:top}.m-nav .text{font-size:17px;line-height:1.25333rem;height:1.25333rem;color:#fff}.m-nav .nav-list{font-size:17px;color:#333;background:hsla(240,7%,97%,.95)}.m-nav .nav-list li{line-height:44px;position:relative;display:inline-block;width:5rem;text-align:center}.m-nav .nav-list .cur .line{position:absolute;bottom:0;left:.90667rem;width:3.2rem;border-bottom:2px solid #238efa}.m-nav .box{margin-top:.56rem}.m-nav .box .text-input{line-height:1.06667rem;width:100%;height:1.06667rem;padding:.26667rem;border-top:.02667rem solid rgba(0,0,0,.2);border-bottom:.02667rem solid rgba(0,0,0,.2);background:#fff}.m-nav .box .btn{font-size:14px;margin:.56rem auto 0;line-height:1.06667rem;display:block;width:9.28rem;height:1.06667rem;text-align:center;color:#fff;border-radius:4px;background:#238efa}.m-nav .box .disabled-btn{background:rgba(35,142,250,.3);border-radius:4px}.m-nav .box .disabled-btn span{opacity:.3}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/src/routes/Zen/components/src/routes/Zen/components/Zen.scss"],"names":[],"mappings":"AAIA,KAAK,eAAmB,CAAI,SAExB,YAAY,iBAEM,CAHtB,aAKQ,oBAAqB,CACxB,MAGD,eAAgB,CACnB,cAGO,WAAW,kBAhBU,kBAmBF,CAL3B,aAUQ,gBAxBqB,iBAAA,oCAAA,mDA8BwB,uBACrB,CAjBhC,0BAQQ,qBAAqB,kBAMF,CAd3B,aAoBQ,eAAe,uBAlCM,kBAAA,UA2CV,CA7BnB,iBAgCQ,eAAe,WAEJ,+BACsB,CAnCzC,oBAqCY,iBAAiB,kBAEC,qBAEG,WAvDJ,iBA2DC,CA7C9B,4BAiDgB,kBAAkB,SACT,eAhEI,aAAA,+BAqEmB,CAvDhD,YA4DQ,iBA1EqB,CAc7B,wBA8DY,uBA5EiB,WA8EN,kBA9EM,kBAAA,0CAkF4B,6CACG,eAChC,CAtE5B,iBAyEY,eAAe,qBACW,uBAxFT,cA2FH,cA3FG,kBAAA,kBAkGC,WAEP,kBACO,kBACS,CAxFvC,0BA2FY,+BAAiC,iBACf,CA5F9B,+BA8FgB,UAAW,CACd","file":"Zen.scss","sourcesContent":["@function pxTorem($px) {\n    //$px为需要转换的字号\n    @return $px / 37.5 * 1rem;\n}\nbody{background: #EEEEEE;}\n.loading {\n    height: 40px;\n\n    text-align: center;\n    div {\n        display: inline-block;\n    }\n}\n.mt10 {\n    margin-top: 10px;\n}\n.m-nav {\n    .title {\n        width: 100%;\n        height: pxTorem(47);\n\n        background: #238efa;\n    }\n    .logo {\n        display: inline-block;\n\n        width: pxTorem(28);\n        height: pxTorem(20);\n        margin: pxTorem(14) pxTorem(8) 0 pxTorem(12);\n\n        vertical-align: top;\n\n        background: url(../assets/logo.png) no-repeat;\n        background-size: contain;\n    }\n    .text {\n        font-size: 17px;\n        line-height: pxTorem(47);\n\n        display: inline-block;\n\n        height: pxTorem(47);\n\n        vertical-align: top;\n\n        color: #fff;\n    }\n    .nav-list {\n        font-size: 17px;\n\n        color: #333;\n        background: rgba(247,247,248,.95);\n        li {\n            line-height: 44px;\n\n            position: relative;\n\n            display: inline-block;\n\n            width: pxTorem(187.5);\n\n            text-align: center;\n        }\n        .cur {\n            .line {\n                position: absolute;\n                bottom: 0;\n                left: pxTorem(34);\n\n                width: pxTorem(120);\n\n                border-bottom: 2px solid #238efa;\n            }\n        }\n    }\n    .box {\n        margin-top: pxTorem(21);\n        .text-input {\n            line-height: pxTorem(40);\n\n            width: 100%;\n            height: pxTorem(40);\n            padding: pxTorem(10);\n\n            border-top: pxTorem(1) solid rgba(0,0,0,0.20);\n            border-bottom: pxTorem(1) solid rgba(0,0,0,0.20);\n            background: #fff;\n        }\n        .btn {\n            font-size: 14px;\n            margin: pxTorem(21) auto 0;\n            line-height: pxTorem(40);\n\n            display: block;\n\n            \n            width: pxTorem(348);\n            height: pxTorem(40);\n            height: pxTorem(40);\n\n            text-align: center;\n\n            color: #fff;\n            border-radius: 4px;\n            background: rgb(35,142,250);\n        }\n        .disabled-btn {\n            background: rgba(35,142,250,0.30);\n            border-radius: 4px;\n            span {\n                opacity: .3;\n            }\n        }\n    }\n}\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 544:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAqhJREFUSA2dlU1IVFEUx2e0RAr7ULAC+6Ag86MiBBOijRBRWKtqEW7aFEGLiCCDRKFVBUVEbQqsaBe0qKQPAicIMoqiKIKKprQWfYiR9qGmr9//dc9jevPGecwffnPPPefcc+fNue9OIhFTnucthlPQC4PwFR7BSaiLWSZ/GsXKoAvGIJfGCRyDonwVk5MlUGAa8XuwyuWNMV6HZ/ADGmE9lIF0NplM7vxnFvDJhmfAlMJYFi6Dbz7ctCTGlnBOrDkLK+G3K/Sa0Z4iaz2xIrjrcnuyEuI4WLzNFdDQnG8NOVUwrGRUkSt/siZXu0XDjKlcBcxP7z5g33DzevOHxynm4FstxVbDN8NMsNgAxSaYx9Ebl3SeenqYQeiGc9RIu1giQbAVfoL0Dq7Cc02QXoeDUBIsCBnE1O8TYD3XIboMfSANwRZ/GcYa+AMqvMNqYTeB6RvGA2iBoA3Yc+EoqHcfQfoMxarDqMO0FyZgBBrkvAJSu23mkovxpRVAt6EG1kIdVMNp+AVPYCscB6kzs46rpS8lXdKG/b7peXMiEre7mIZDsA6uwSh0w0ZXsBlbv5CeclZEnUX4pX5taL2zQ/JfPvGLyszQEewqS8KuhwHQz6ZbJ0v4S0H6rk36QK9AA6hPsxkXwBKQ/wW0gfwjsBz8S4Dcldh3oBx2cxJvMUbJXpOXesIOkHpAF/U80KkLDkdUBeLl8BbUkn1ROfIRKwGdWqldjunwSjP0EDaAnbJabP2EK8IF8XXCfTjgCq/G3g/BLYPdCCmQ3sMMvw7GQngKJv3d6ARq3BTezG2gA3U4M8Z8D6iXKv4FTGkM/+YK/p5wTGWxiuuvSD36BL30JfIyJn8X8S7io4yB8LcyaYJKGILHcIE8XZGFi8I1ha8uYCUbRr5G+Ur9BXvnDrjf2rvOAAAAAElFTkSuQmCC"

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(546);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _objectAssign = __webpack_require__(26);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	__webpack_require__(547);
	
	__webpack_require__(549);
	
	__webpack_require__(551);
	
	__webpack_require__(553);
	
	__webpack_require__(555);
	
	__webpack_require__(557);
	
	__webpack_require__(559);
	
	__webpack_require__(561);
	
	__webpack_require__(563);
	
	__webpack_require__(565);
	
	__webpack_require__(567);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line import/no-extraneous-dependencies
	
	
	var Spinner = function (_React$Component) {
	  _inherits(Spinner, _React$Component);
	
	  function Spinner(props) {
	    _classCallCheck(this, Spinner);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spinner).call(this, props));
	
	    _this.displayName = 'SpinKit';
	    return _this;
	  }
	
	  _createClass(Spinner, [{
	    key: 'render',
	    value: function render() {
	      var _cx;
	
	      var classes = (0, _classnames2.default)((_cx = {
	        'fade-in': !this.props.noFadeIn,
	        spinner: this.props.overrideSpinnerClassName === ''
	      }, _defineProperty(_cx, this.props.overrideSpinnerClassName, !!this.props.overrideSpinnerClassName), _defineProperty(_cx, this.props.className, !!this.props.className), _cx));
	
	      var props = (0, _objectAssign2.default)({}, this.props);
	      delete props.spinnerName;
	      delete props.noFadeIn;
	      delete props.overrideSpinnerClassName;
	      delete props.className;
	
	      var spinnerEl = void 0;
	      switch (this.props.spinnerName) {
	        case 'double-bounce':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'double-bounce ' + classes }),
	            _react2.default.createElement('div', { className: 'double-bounce1' }),
	            _react2.default.createElement('div', { className: 'double-bounce2' })
	          );
	          break;
	        case 'rotating-plane':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: classes }),
	            _react2.default.createElement('div', { className: 'rotating-plane' })
	          );
	          break;
	        case 'wave':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'wave ' + classes }),
	            _react2.default.createElement('div', { className: 'rect1' }),
	            _react2.default.createElement('div', { className: 'rect2' }),
	            _react2.default.createElement('div', { className: 'rect3' }),
	            _react2.default.createElement('div', { className: 'rect4' }),
	            _react2.default.createElement('div', { className: 'rect5' })
	          );
	          break;
	        case 'wandering-cubes':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'wandering-cubes ' + classes }),
	            _react2.default.createElement('div', { className: 'cube1' }),
	            _react2.default.createElement('div', { className: 'cube2' })
	          );
	          break;
	        case 'pulse':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: classes }),
	            _react2.default.createElement('div', { className: 'pulse' })
	          );
	          break;
	        case 'chasing-dots':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: classes }),
	            _react2.default.createElement(
	              'div',
	              { className: 'chasing-dots' },
	              _react2.default.createElement('div', { className: 'dot1' }),
	              _react2.default.createElement('div', { className: 'dot2' })
	            )
	          );
	          break;
	        case 'circle':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'circle-wrapper ' + classes }),
	            _react2.default.createElement('div', { className: 'circle1 circle' }),
	            _react2.default.createElement('div', { className: 'circle2 circle' }),
	            _react2.default.createElement('div', { className: 'circle3 circle' }),
	            _react2.default.createElement('div', { className: 'circle4 circle' }),
	            _react2.default.createElement('div', { className: 'circle5 circle' }),
	            _react2.default.createElement('div', { className: 'circle6 circle' }),
	            _react2.default.createElement('div', { className: 'circle7 circle' }),
	            _react2.default.createElement('div', { className: 'circle8 circle' }),
	            _react2.default.createElement('div', { className: 'circle9 circle' }),
	            _react2.default.createElement('div', { className: 'circle10 circle' }),
	            _react2.default.createElement('div', { className: 'circle11 circle' }),
	            _react2.default.createElement('div', { className: 'circle12 circle' })
	          );
	          break;
	        case 'cube-grid':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'cube-grid ' + classes }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' }),
	            _react2.default.createElement('div', { className: 'cube' })
	          );
	          break;
	        case 'wordpress':
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: classes }),
	            _react2.default.createElement(
	              'div',
	              { className: 'wordpress' },
	              _react2.default.createElement('div', { className: 'inner-circle' })
	            )
	          );
	          break;
	        case 'three-bounce':
	        default:
	          spinnerEl = _react2.default.createElement(
	            'div',
	            _extends({}, props, { className: 'three-bounce ' + classes }),
	            _react2.default.createElement('div', { className: 'bounce1' }),
	            _react2.default.createElement('div', { className: 'bounce2' }),
	            _react2.default.createElement('div', { className: 'bounce3' })
	          );
	      }
	      return spinnerEl;
	    }
	  }]);
	
	  return Spinner;
	}(_react2.default.Component);
	
	Spinner.propTypes = {
	  spinnerName: _react2.default.PropTypes.string.isRequired,
	  noFadeIn: _react2.default.PropTypes.bool,
	  overrideSpinnerClassName: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.string
	};
	
	Spinner.defaultProps = {
	  spinnerName: 'three-bounce',
	  noFadeIn: false,
	  overrideSpinnerClassName: ''
	};
	
	module.exports = Spinner;

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(548);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(548, function() {
				var newContent = __webpack_require__(548);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, "@keyframes fade-in{0%{opacity:0}50%{opacity:0}to{opacity:1}}.fade-in{-webkit-animation:fade-in 2s;-moz-animation:fade-in 2s;-o-animation:fade-in 2s;-ms-animation:fade-in 2s}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/fade-in.css"],"names":[],"mappings":"AAoCA,mBACE,GACI,SAAW,CACd,IAEG,SAAW,CACd,GAEG,SAAW,CACd,CACF,SAGC,6BAA8B,0BACH,wBACF,wBACC,CAC3B","file":"fade-in.css","sourcesContent":["@-webkit-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@-moz-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@-ms-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n.fade-in {\n  -webkit-animation: fade-in 2s;\n  -moz-animation: fade-in 2s;\n  -o-animation: fade-in 2s;\n  -ms-animation: fade-in 2s;\n}\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(550);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(550, function() {
				var newContent = __webpack_require__(550);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".chasing-dots{width:27px;height:27px;position:relative;animation:rotate 2s infinite linear}.dot1,.dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0;background-color:#333;border-radius:100%;animation:bounce 2s infinite ease-in-out}.dot2{top:auto;bottom:0;animation-delay:-1s}@keyframes rotate{to{transform:rotate(1turn);-webkit-transform:rotate(1turn)}}@keyframes bounce{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/chasing-dots.css"],"names":[],"mappings":"AAAA,cACE,WAAY,YACC,kBACM,mCAGoB,CACxC,YAGC,UAAW,WACC,qBACU,kBACH,MACZ,sBACgB,mBACH,wCAGwB,CAC7C,MAGC,SAAU,SACE,mBAEW,CACxB,kBAIC,GACE,wBAA0B,+BACQ,CACnC,CACF,kBAQC,MACE,mBAAsB,0BACQ,CAC/B,IACC,mBAAsB,0BACQ,CAC/B,CACF","file":"chasing-dots.css","sourcesContent":[".chasing-dots {\n  width: 27px;\n  height: 27px;\n  position: relative;\n\n  -webkit-animation: rotate 2.0s infinite linear;\n  animation: rotate 2.0s infinite linear;\n}\n\n.dot1, .dot2 {\n  width: 60%;\n  height: 60%;\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  background-color: #333;\n  border-radius: 100%;\n\n  -webkit-animation: bounce 2.0s infinite ease-in-out;\n  animation: bounce 2.0s infinite ease-in-out;\n}\n\n.dot2 {\n  top: auto;\n  bottom: 0px;\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% { -webkit-transform: scale(0.0) }\n  50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 50% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(552);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(552, function() {
				var newContent = __webpack_require__(552);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".circle-wrapper{width:22px;height:22px;position:relative}.circle{width:100%;height:100%;position:absolute;left:0;top:0}.circle:before{content:\"\";display:block;margin:0 auto;width:20%;height:20%;background-color:#333;border-radius:100%;animation:bouncedelay 1.2s infinite ease-in-out;animation-fill-mode:both}.circle2{transform:rotate(30deg)}.circle3{transform:rotate(60deg)}.circle4{transform:rotate(90deg)}.circle5{transform:rotate(120deg)}.circle6{transform:rotate(150deg)}.circle7{transform:rotate(180deg)}.circle8{transform:rotate(210deg)}.circle9{transform:rotate(240deg)}.circle10{transform:rotate(270deg)}.circle11{transform:rotate(300deg)}.circle12{transform:rotate(330deg)}.circle2:before{animation-delay:-1.1s}.circle3:before{animation-delay:-1s}.circle4:before{animation-delay:-.9s}.circle5:before{animation-delay:-.8s}.circle6:before{animation-delay:-.7s}.circle7:before{animation-delay:-.6s}.circle8:before{animation-delay:-.5s}.circle9:before{animation-delay:-.4s}.circle10:before{animation-delay:-.3s}.circle11:before{animation-delay:-.2s}.circle12:before{animation-delay:-.1s}@keyframes bouncedelay{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/circle.css"],"names":[],"mappings":"AAAA,gBACE,WAAY,YACC,iBACM,CACpB,QAGC,WAAY,YACC,kBACM,OACX,KACD,CACR,eAGC,WAAY,cACG,cACA,UACJ,WACC,sBACW,mBAEH,gDAE6B,wBAGvB,CAC3B,SAE8C,uBAAwB,CAAG,SAC3B,uBAAwB,CAAG,SAC3B,uBAAwB,CAAG,SAC3B,wBAAyB,CAAE,SAC3B,wBAAyB,CAAE,SAC3B,wBAAyB,CAAE,SAC3B,wBAAyB,CAAE,SAC3B,wBAAyB,CAAE,UAC3B,wBAAyB,CAAE,UAC3B,wBAAyB,CAAE,UAC3B,wBAAyB,CAAE,gBAEvB,qBAAsB,CAAE,gBACxB,mBAAsB,CAAE,gBACxB,oBAAsB,CAAE,gBACxB,oBAAsB,CAAE,gBACxB,oBAAsB,CAAE,gBACxB,oBAAsB,CAAE,gBACxB,oBAAsB,CAAE,gBACxB,oBAAsB,CAAE,iBACxB,oBAAsB,CAAE,iBACxB,oBAAsB,CAAE,iBACxB,oBAAsB,CAAE,uBAQzE,UAEE,kBAAsB,CACvB,IAEC,kBAAsB,CACvB,CACF","file":"circle.css","sourcesContent":[".circle-wrapper {\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\n\n.circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 20%;\n  height: 20%;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\n  animation: bouncedelay 1.2s infinite ease-in-out;\n  /* Prevent first frame from flickering when animation starts */\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.circle2  { -webkit-transform: rotate(30deg);  transform: rotate(30deg)  }\n.circle3  { -webkit-transform: rotate(60deg);  transform: rotate(60deg)  }\n.circle4  { -webkit-transform: rotate(90deg);  transform: rotate(90deg)  }\n.circle5  { -webkit-transform: rotate(120deg); transform: rotate(120deg) }\n.circle6  { -webkit-transform: rotate(150deg); transform: rotate(150deg) }\n.circle7  { -webkit-transform: rotate(180deg); transform: rotate(180deg) }\n.circle8  { -webkit-transform: rotate(210deg); transform: rotate(210deg) }\n.circle9  { -webkit-transform: rotate(240deg); transform: rotate(240deg) }\n.circle10 { -webkit-transform: rotate(270deg); transform: rotate(270deg) }\n.circle11 { -webkit-transform: rotate(300deg); transform: rotate(300deg) }\n.circle12 { -webkit-transform: rotate(330deg); transform: rotate(330deg) }\n\n.circle2:before  { -webkit-animation-delay: -1.1s; animation-delay: -1.1s }\n.circle3:before  { -webkit-animation-delay: -1.0s; animation-delay: -1.0s }\n.circle4:before  { -webkit-animation-delay: -0.9s; animation-delay: -0.9s }\n.circle5:before  { -webkit-animation-delay: -0.8s; animation-delay: -0.8s }\n.circle6:before  { -webkit-animation-delay: -0.7s; animation-delay: -0.7s }\n.circle7:before  { -webkit-animation-delay: -0.6s; animation-delay: -0.6s }\n.circle8:before  { -webkit-animation-delay: -0.5s; animation-delay: -0.5s }\n.circle9:before  { -webkit-animation-delay: -0.4s; animation-delay: -0.4s }\n.circle10:before { -webkit-animation-delay: -0.3s; animation-delay: -0.3s }\n.circle11:before { -webkit-animation-delay: -0.2s; animation-delay: -0.2s }\n.circle12:before { -webkit-animation-delay: -0.1s; animation-delay: -0.1s }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0.0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0.0);\n    transform: scale(0.0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(554);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(554, function() {
				var newContent = __webpack_require__(554);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".cube-grid{width:27px;height:27px}.cube{width:33%;height:33%;background:#333;float:left;animation:scaleDelay 1.3s infinite ease-in-out}.spinner .cube:first-child{animation-delay:.2s}.spinner .cube:nth-child(2){animation-delay:.3s}.spinner .cube:nth-child(3){animation-delay:.4s}.spinner .cube:nth-child(4){animation-delay:.1s}.spinner .cube:nth-child(5){animation-delay:.2s}.spinner .cube:nth-child(6){animation-delay:.3s}.spinner .cube:nth-child(7){animation-delay:0s}.spinner .cube:nth-child(8){animation-delay:.1s}.spinner .cube:nth-child(9){animation-delay:.2s}@keyframes scaleDelay{0%,70%,to{transform:scale3D(1,1,1)}35%{transform:scale3D(0,0,1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/cube-grid.css"],"names":[],"mappings":"AAAA,WACE,WAAW,WACC,CACb,MAGC,UAAU,WACC,gBACK,WACL,8CAEqC,CACjD,2BAS4D,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,kBAAqB,CAAG,4BACxB,mBAAqB,CAAG,4BACxB,mBAAqB,CAAG,sBAQnF,UAA0D,wBAAgC,CAAE,IAClC,wBAAgC,CAAE,CAC7F","file":"cube-grid.css","sourcesContent":[".cube-grid {\n  width:27px;\n  height:27px;\n}\n\n.cube {\n  width:33%;\n  height:33%;\n  background:#333;\n  float:left;\n  -webkit-animation: scaleDelay 1.3s infinite ease-in-out;\n  animation: scaleDelay 1.3s infinite ease-in-out;\n}\n\n/*\n * Spinner positions\n * 1 2 3\n * 4 5 6\n * 7 8 9\n */\n\n.spinner .cube:nth-child(1) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n.spinner .cube:nth-child(2) { -webkit-animation-delay: 0.3s; animation-delay: 0.3s  }\n.spinner .cube:nth-child(3) { -webkit-animation-delay: 0.4s; animation-delay: 0.4s  }\n.spinner .cube:nth-child(4) { -webkit-animation-delay: 0.1s; animation-delay: 0.1s  }\n.spinner .cube:nth-child(5) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n.spinner .cube:nth-child(6) { -webkit-animation-delay: 0.3s; animation-delay: 0.3s  }\n.spinner .cube:nth-child(7) { -webkit-animation-delay: 0.0s; animation-delay: 0.0s  }\n.spinner .cube:nth-child(8) { -webkit-animation-delay: 0.1s; animation-delay: 0.1s  }\n.spinner .cube:nth-child(9) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n\n@-webkit-keyframes scaleDelay {\n  0%, 70%, 100% { -webkit-transform:scale3D(1.0, 1.0, 1.0) }\n  35%           { -webkit-transform:scale3D(0.0, 0.0, 1.0) }\n}\n\n@keyframes scaleDelay {\n  0%, 70%, 100% { -webkit-transform:scale3D(1.0, 1.0, 1.0); transform:scale3D(1.0, 1.0, 1.0) }\n  35%           { -webkit-transform:scale3D(1.0, 1.0, 1.0); transform:scale3D(0.0, 0.0, 1.0) }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(556);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(556, function() {
				var newContent = __webpack_require__(556);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".double-bounce{width:27px;height:27px;position:relative}.double-bounce1,.double-bounce2{width:100%;height:100%;border-radius:50%;background-color:#333;opacity:.6;position:absolute;top:0;left:0;animation:bounce 2s infinite ease-in-out}.double-bounce2{animation-delay:-1s}@keyframes bounce{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/double-bounce.css"],"names":[],"mappings":"AAAA,eACE,WAAY,YACC,iBAEM,CACpB,gCAGC,WAAY,YACC,kBACM,sBACI,WACV,kBACM,MACZ,OACC,wCAGoC,CAC7C,gBAIC,mBAAuB,CACxB,kBAQC,MACE,mBAAsB,0BACQ,CAC/B,IACC,mBAAsB,0BACQ,CAC/B,CACF","file":"double-bounce.css","sourcesContent":[".double-bounce {\n  width: 27px;\n  height: 27px;\n\n  position: relative;\n}\n\n.double-bounce1, .double-bounce2 {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #333;\n  opacity: 0.6;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  -webkit-animation: bounce 2.0s infinite ease-in-out;\n  animation: bounce 2.0s infinite ease-in-out;\n}\n\n.double-bounce2 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% { -webkit-transform: scale(0.0) }\n  50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 50% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(558);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(558, function() {
				var newContent = __webpack_require__(558);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".pulse{width:27px;height:27px;background-color:#333;border-radius:100%;animation:scaleout 1s infinite ease-in-out}@keyframes scaleout{0%{transform:scale(0);-webkit-transform:scale(0)}to{transform:scale(1);-webkit-transform:scale(1);opacity:0}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/pulse.css"],"names":[],"mappings":"AAAA,OACE,WAAY,YACC,sBACU,mBAEH,0CAE0B,CAC/C,oBAWC,GACE,mBAAsB,0BACQ,CAC/B,GACC,mBAAsB,2BACQ,SACnB,CACZ,CACF","file":"pulse.css","sourcesContent":[".pulse {\n  width: 27px;\n  height: 27px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: scaleout 1.0s infinite ease-in-out;\n  animation: scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes scaleout {\n  0% { -webkit-transform: scale(0.0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes scaleout {\n  0% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 100% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(560);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(560, function() {
				var newContent = __webpack_require__(560);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".rotating-plane{width:27px;height:27px;background-color:#333;animation:rotateplane 1.2s infinite ease-in-out}@keyframes rotateplane{0%{transform:perspective(120px) rotateX(0deg) rotateY(0deg);-webkit-transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg);-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}to{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/rotating-plane.css"],"names":[],"mappings":"AAAA,gBACE,WAAY,YACC,sBACU,+CAG0B,CAClD,uBASC,GACE,yDAA0D,gEACQ,CACnE,IACC,8DAA+D,qEACQ,CACxE,GACC,iEAAkE,wEACQ,CAC3E,CACF","file":"rotating-plane.css","sourcesContent":[".rotating-plane {\n  width: 27px;\n  height: 27px;\n  background-color: #333;\n\n  -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n  animation: rotateplane 1.2s infinite ease-in-out;\n}\n\n@-webkit-keyframes rotateplane {\n  0% { -webkit-transform: perspective(120px) }\n  50% { -webkit-transform: perspective(120px) rotateY(180deg) }\n  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }\n}\n\n@keyframes rotateplane {\n  0% {\n    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n  } 50% {\n    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n  } 100% {\n    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(562);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(562, function() {
				var newContent = __webpack_require__(562);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".three-bounce>div{width:18px;height:18px;background-color:#333;border-radius:100%;display:inline-block;animation:bouncedelay 1.4s infinite ease-in-out;animation-fill-mode:both}.three-bounce .bounce1{animation-delay:-.32s}.three-bounce .bounce2{animation-delay:-.16s}@keyframes bouncedelay{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/three-bounce.css"],"names":[],"mappings":"AAAA,kBACE,WAAY,YACC,sBACU,mBAEH,qBACE,gDAE2B,wBAGvB,CAC3B,uBAIC,qBAAwB,CACzB,uBAIC,qBAAwB,CACzB,uBAQC,UACE,mBAAsB,0BACQ,CAC/B,IACC,mBAAsB,0BACQ,CAC/B,CACF","file":"three-bounce.css","sourcesContent":[".three-bounce > div {\n  width: 18px;\n  height: 18px;\n  background-color: #333;\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n  animation: bouncedelay 1.4s infinite ease-in-out;\n  /* Prevent first frame from flickering when animation starts */\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.three-bounce .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.three-bounce .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0.0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 40% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(564);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(564, function() {
				var newContent = __webpack_require__(564);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".wandering-cubes{width:27px;height:27px;position:relative}.cube1,.cube2{background-color:#333;width:10px;height:10px;position:absolute;top:0;left:0;animation:cubemove 1.8s infinite ease-in-out}.cube2{animation-delay:-.9s}@keyframes cubemove{25%{transform:translateX(42px) rotate(-90deg) scale(.5);-webkit-transform:translateX(42px) rotate(-90deg) scale(.5)}50%{transform:translateX(42px) translateY(42px) rotate(-179deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-179deg)}50.1%{transform:translateX(42px) translateY(42px) rotate(-180deg);-webkit-transform:translateX(42px) translateY(42px) rotate(-180deg)}75%{transform:translateX(0) translateY(42px) rotate(-270deg) scale(.5);-webkit-transform:translateX(0) translateY(42px) rotate(-270deg) scale(.5)}to{transform:rotate(-1turn);-webkit-transform:rotate(-1turn)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/wandering-cubes.css"],"names":[],"mappings":"AAAA,iBACE,WAAY,YACC,iBACM,CACpB,cAGC,sBAAuB,WACX,YACC,kBACM,MACZ,OACC,4CAGsC,CAC/C,OAIC,oBAAuB,CACxB,oBAUC,IACE,oDAAsD,2DACQ,CAC/D,IAEC,4DAA6D,mEACQ,CACtE,MACC,4DAA6D,mEACQ,CACtE,IACC,mEAAuE,0EACQ,CAChF,GACC,yBAA2B,gCACQ,CACpC,CACF","file":"wandering-cubes.css","sourcesContent":[".wandering-cubes {\n  width: 27px;\n  height: 27px;\n  position: relative;\n}\n\n.cube1, .cube2 {\n  background-color: #333;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  -webkit-animation: cubemove 1.8s infinite ease-in-out;\n  animation: cubemove 1.8s infinite ease-in-out;\n}\n\n.cube2 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n\n@-webkit-keyframes cubemove {\n  25% { -webkit-transform: translateX(22px) rotate(-90deg) scale(0.5) }\n  50% { -webkit-transform: translateX(22px) translateY(22px) rotate(-180deg) }\n  75% { -webkit-transform: translateX(0px) translateY(22px) rotate(-270deg) scale(0.5) }\n  100% { -webkit-transform: rotate(-360deg) }\n}\n\n@keyframes cubemove {\n  25% { \n    transform: translateX(42px) rotate(-90deg) scale(0.5);\n    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n  } 50% {\n    /* Hack to make FF rotate in the right direction */\n    transform: translateX(42px) translateY(42px) rotate(-179deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n  } 50.1% {\n    transform: translateX(42px) translateY(42px) rotate(-180deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n  } 75% {\n    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n  } 100% {\n    transform: rotate(-360deg);\n    -webkit-transform: rotate(-360deg);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(566);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(566, function() {
				var newContent = __webpack_require__(566);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".wave{width:50px;height:27px}.wave>div{background-color:#333;height:100%;width:6px;display:inline-block;animation:stretchdelay 1.2s infinite ease-in-out}.wave .rect2{animation-delay:-1.1s}.wave .rect3{animation-delay:-1s}.wave .rect4{animation-delay:-.9s}.wave .rect5{animation-delay:-.8s}@keyframes stretchdelay{0%,40%,to{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/wave.css"],"names":[],"mappings":"AAAA,MACE,WAAY,WACC,CACd,UAGC,sBAAuB,YACV,UACF,qBACW,gDAG4B,CACnD,aAIC,qBAAuB,CACxB,aAIC,mBAAuB,CACxB,aAIC,oBAAuB,CACxB,aAIC,oBAAuB,CACxB,wBAQC,UACE,qBAAuB,4BACQ,CAChC,IACC,oBAAuB,2BACQ,CAChC,CACF","file":"wave.css","sourcesContent":[".wave {\n  width: 50px;\n  height: 27px;\n}\n\n.wave > div {\n  background-color: #333;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n\n  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n  animation: stretchdelay 1.2s infinite ease-in-out;\n}\n\n.wave .rect2 {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n\n.wave .rect3 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n.wave .rect4 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n\n.wave .rect5 {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n\n@-webkit-keyframes stretchdelay {\n  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }\n  20% { -webkit-transform: scaleY(1.0) }\n}\n\n@keyframes stretchdelay {\n  0%, 40%, 100% {\n    transform: scaleY(0.4);\n    -webkit-transform: scaleY(0.4);\n  } 20% {\n    transform: scaleY(1.0);\n    -webkit-transform: scaleY(1.0);\n  }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(568);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(568, function() {
				var newContent = __webpack_require__(568);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".wordpress{background:#333;width:27px;height:27px;display:inline-block;border-radius:27px;position:relative;animation:inner-circle 1s linear infinite}.inner-circle{display:block;background:#fff;width:8px;height:8px;position:absolute;border-radius:8px;top:5px;left:5px}@keyframes inner-circle{0%{transform:rotate(0);-webkit-transform:rotate(0)}to{transform:rotate(1turn);-webkit-transform:rotate(1turn)}}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/node_modules/react-spinkit/css/wordpress.css"],"names":[],"mappings":"AAAA,WACE,gBAAiB,WACL,YACC,qBACS,mBACF,kBACD,yCAEwB,CAC5C,cAGC,cAAe,gBACE,UACN,WACC,kBACO,kBACA,QACV,QACC,CACX,wBAQC,GAAK,oBAAqB,2BAA6B,CAAE,GAClD,wBAA0B,+BAAkC,CAAE,CACtE","file":"wordpress.css","sourcesContent":[".wordpress {\n  background: #333;\n  width: 27px;\n  height: 27px;\n  display: inline-block;\n  border-radius: 27px;\n  position: relative;\n  -webkit-animation: inner-circle 1s linear infinite;\n  animation: inner-circle 1s linear infinite;\n}\n\n.inner-circle {\n  display: block;\n  background: #fff;\n  width: 8px;\n  height: 8px;\n  position: absolute;\n  border-radius: 8px;\n  top: 5px;\n  left: 5px;\n}\n\n@-webkit-keyframes inner-circle {\n  0% { -webkit-transform: rotate(0); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes inner-circle {\n  0% { transform: rotate(0); -webkit-transform:rotate(0); }\n  100% { transform: rotate(360deg); -webkit-transform:rotate(360deg); }\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ })

});
//# sourceMappingURL=9be5f754daaadbda5907.js.map