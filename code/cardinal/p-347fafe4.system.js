var __spreadArrays=this&&this.__spreadArrays||function(){for(var n=0,e=0,t=arguments.length;e<t;e++)n+=arguments[e].length;for(var r=Array(n),i=0,e=0;e<t;e++)for(var o=arguments[e],s=0,a=o.length;s<a;s++,i++)r[i]=o[s];return r};System.register(["./p-e1460616.system.js","./p-70c3d6e6.system.js","./p-688b053c.system.js"],(function(n){"use strict";var e,t,r,i,o;return{setters:[function(n){e=n.g},function(n){t=n.D;r=n.a},function(n){i=n.n;o=n.c}],execute:function(){n("T",s);function s(n){return function(s,a){var c=s.connectedCallback,f=s.render,u=s.componentWillLoad,p=s.componentDidLoad;s.componentWillLoad=function(){var n=this;var r=e(n);if(!r.hasAttribute(t)){return u&&u.call(n)}};s.componentDidLoad=function(){var n=this;var r=e(n);if(!r.hasAttribute(t)){return p&&p.call(n)}};s.connectedCallback=function(){var o=this;var s=e(o);var f=i(String(a));if(s.hasAttribute(t)){if(!o.componentDefinitions){o.componentDefinitions={definedProperties:[Object.assign(Object.assign({},n),{propertyName:f})]};return c&&c.call(o)}var u=o.componentDefinitions;var p=Object.assign(Object.assign({},n),{propertyName:f});if(u&&u.hasOwnProperty(r)){var l=__spreadArrays(u[r]);l.push(p);u[r]=__spreadArrays(l)}else{u[r]=[p]}o.componentDefinitions=Object.assign({},u)}return c&&c.call(o)};s.render=function(){var n=this;if(!n.componentDefinitions||!(n.componentDefinitions&&n.componentDefinitions[r])){return f&&f.call(n)}var e=n.componentDefinitions[r];if(e){e=e.reverse()}o("psk-send-props",{composed:true,bubbles:true,cancelable:true,detail:e},true)}}}}}}));