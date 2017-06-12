webpackJsonp([2],{

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	
	var _ = __webpack_require__(571);
	
	var _2 = _interopRequireDefault(_);
	
	var _PageNotFound = __webpack_require__(572);
	
	var _PageNotFound2 = _interopRequireDefault(_PageNotFound);
	
	var _reactRouter = __webpack_require__(228);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PageNotFound = function (_Component) {
	  (0, _inherits3.default)(PageNotFound, _Component);
	
	  function PageNotFound() {
	    (0, _classCallCheck3.default)(this, PageNotFound);
	    return (0, _possibleConstructorReturn3.default)(this, (PageNotFound.__proto__ || (0, _getPrototypeOf2.default)(PageNotFound)).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(PageNotFound, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      return _react2.default.createElement(
	        'div',
	        { className: _PageNotFound2.default.container },
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Page not found!!!'
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          _react2.default.createElement(
	            'a',
	            { className: _PageNotFound2.default.link, onClick: props.router.goBack },
	            'Back'
	          )
	        )
	      );
	    }
	  }]);
	  return PageNotFound;
	}(_react.Component);
	
	PageNotFound.propTypes = {
	  router: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRouter.withRouter)(PageNotFound);

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f59f4511d84f12ab97492b43febf6636.jpg";

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(573);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(386)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(573, function() {
				var newContent = __webpack_require__(573);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(385)();
	// imports
	
	
	// module
	exports.push([module.id, ".container{text-align:center}.link{cursor:pointer}", "", {"version":3,"sources":["/Users/smile/Documents/work/playerDemo/src/routes/PageNotFound/components/src/routes/PageNotFound/components/PageNotFound.scss"],"names":[],"mappings":"AAAA,WACE,iBAAkB,CACnB,MAEC,cAAe,CAChB","file":"PageNotFound.scss","sourcesContent":[".container{\n  text-align: center;\n}\n.link{\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
	
	// exports


/***/ })

});
//# sourceMappingURL=754abd1c2304842aaf81.js.map