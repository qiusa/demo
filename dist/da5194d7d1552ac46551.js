webpackJsonp([5],{253:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(29),l=u(n),o=r(30),a=u(o),i=r(31),d=u(i),c=r(33),f=u(c),s=r(32),p=u(s),h=r(7),m=u(h),v=r(55),_=function(e){function t(e){(0,a.default)(this,t);var r=(0,f.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));return r.redirect=r.redirect.bind(r),r}return(0,p.default)(t,e),(0,d.default)(t,[{key:"redirect",value:function(){this.props.router.push("/form")}},{key:"render",value:function(){var e=this.props.location;return m.default.createElement("div",null,m.default.createElement("h1",null,"Path: ",m.default.createElement(v.Link,{to:"/form"},e.pathname)),m.default.createElement("div",null,m.default.createElement("button",{onClick:this.redirect},"Go")))}}]),t}(h.Component);_.propTypes={location:m.default.PropTypes.object.isRequired,router:m.default.PropTypes.object.isRequired},t.default=(0,v.withRouter)(_)}});