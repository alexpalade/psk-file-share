System.register(["./p-e1460616.system.js","./p-84d49431.system.js","./p-2d5d376b.system.js","./p-f1645a56.system.js"],(function(t){"use strict";var i,s,e,r,n,a;return{setters:[function(t){i=t.r;s=t.h;e=t.g},function(t){r=t.A},function(t){n=t.m},function(t){a=t.d}],execute:function(){var o=function(t,i){if(t.charAt(0)=="/"&&i.charAt(i.length-1)=="/"){return i.slice(0,i.length-1)+t}return i+t};var c=t("stencil_route_link",function(){function t(t){i(this,t);this.unsubscribe=function(){return};this.activeClass="link-active";this.exact=false;this.strict=true;this.custom="a";this.match=null}t.prototype.componentWillLoad=function(){this.computeMatch()};t.prototype.computeMatch=function(){if(this.location){this.match=n(this.location.pathname,{path:this.urlMatch||this.url,exact:this.exact,strict:this.strict})}};t.prototype.handleClick=function(t){if(a(t)||!this.history||!this.url||!this.root){return}t.preventDefault();return this.history.push(o(this.url,this.root))};t.prototype.render=function(){var t;var i={class:(t={},t[this.activeClass]=this.match!==null,t),onClick:this.handleClick.bind(this)};if(this.anchorClass){i.class[this.anchorClass]=true}if(this.custom==="a"){i=Object.assign({},i,{href:this.url,title:this.anchorTitle,role:this.anchorRole,tabindex:this.anchorTabIndex,"aria-haspopup":this.ariaHaspopup,id:this.anchorId,"aria-posinset":this.ariaPosinset,"aria-setsize":this.ariaSetsize,"aria-label":this.ariaLabel})}return s(this.custom,Object.assign({},i),s("slot",null))};Object.defineProperty(t.prototype,"el",{get:function(){return e(this)},enumerable:true,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{location:["computeMatch"]}},enumerable:true,configurable:true});return t}());r.injectProps(c,["history","location","root"])}}}));