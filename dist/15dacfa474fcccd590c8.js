webpackJsonp([3],{147:function(e,t,u){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(){return{type:s}}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments[1],u=i[t.type];return u?u(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.PLUS=void 0;var o=u(46),a=n(o);t.plus=r,t.default=l;var s=t.PLUS="PLUS",i=(t.actions={plus:r},(0,a.default)({},s,function(e){return e+1})),f=0},241:function(e,t,u){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=u(29),l=n(r),o=u(30),a=n(o),s=u(31),i=n(s),f=u(33),p=n(f),d=u(32),c=n(d),v=u(7),_=n(v),y=function(e){function t(){return(0,a.default)(this,t),(0,p.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,c.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.interval=setInterval(this.props.plus,1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props.elapse;return _.default.createElement("h1",null,"Seconds Elapsed: ",e)}}]),t}(v.Component);t.default=y,y.propTypes={elapse:_.default.PropTypes.number.isRequired,plus:_.default.PropTypes.func.isRequired}},242:function(e,t,u){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=u(71),l=u(147),o=u(241),a=n(o),s={plus:l.plus},i=function(e){return{elapse:e.elapse}};t.default=(0,r.connect)(i,s)(a.default)}});