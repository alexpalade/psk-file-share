System.register(["./p-e1460616.system.js"],(function(e){"use strict";var t;return{setters:[function(e){t=e.g}],execute:function(){e("C",s);var n=/@import.*?["']([^"']+)["'].*?;/g;var r={};var o={};var u;function i(e,t){if(!o[e]){o[e]=new Promise((function(e,o){if(n.exec(t)){t.replace(n,(function(n,u){if(!r[u]){r[u]=c(u)}r[u].then((function(r){e(t.replace(n,r))})).catch(o)}))}else{e(t)}}))}return o[e]}function c(e){return new Promise((function(t,n){fetch(e).then((function(e){if(e.ok){return t(e.text())}n({url:e.url,status:e.status,statusText:e.statusText})}))}))}function s(){return function(e){var n=e.componentWillLoad;e.getInnerContent=function(e){var n=t(this);if(n[e]){var r=n.querySelector("style");if(r){var o=n[e].replace(r.outerHTML,"");n[e]=r.outerHTML;return o}return n[e]}else{console.error(e+" is not a property")}};e.componentWillLoad=function(){var e=this;var o=t(this);if(!o){return n&&n.call(this)}else{var s=function(t){var u=o.tagName.toLowerCase();return new Promise((function(s){var a="/themes/"+t+"/components/"+u+"/"+u+".css";var f=o.shadowRoot?o.shadowRoot:o;if(!r[a]){r[a]=new Promise((function(e,t){c(a).then((function(t){e(t)})).catch(t)}))}r[a].then((function(e){i(a,e).then((function(e){var t=document.createElement("style");t.innerHTML=e;f.prepend(t)}))})).catch((function(e){console.log("Request on resource "+e.url+" ended with status: "+e.status+" ("+e.statusText+")")})).finally((function(){s(n&&n.call(e))}))}))};if(!u){return new Promise((function(e){var t=new CustomEvent("getThemeConfig",{bubbles:true,cancelable:true,composed:true,detail:function(t,n){if(t){return console.log(t)}u=n;s(u).then((function(){e()}))}});o.dispatchEvent(t)}))}else{return s(u)}}}}}}}}));