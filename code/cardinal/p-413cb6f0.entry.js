import{r as s,h as t,g as e}from"./p-1c0c10bb.js";import"./p-c6f22a18.js";import{i}from"./p-637de85b.js";import"./p-1728ead7.js";import{E as r}from"./p-4a6e3791.js";const a=r.PSK_SUB_MENU_EVT;class n extends CustomEvent{constructor(s,t,e){super(s,e),this.getEventType=function(){return a},this.data=t}}const o=class{constructor(t){s(this,t),this.isOpened=!1,this.dropDownHasChildActive=!1,this.somethingChanged=!1,this.isClosed=!0,this.lazyItems=[]}loadSubMenuItems(){if(this.event){let s=new n(this.event,(s,e)=>{if(s)throw new Error(s);let i=[];e.forEach(s=>{i.push(t("stencil-route-link",{url:s.path,activeClass:"active",exact:!1},t("div",{class:"wrapper_container"},t("div",{class:"item_container"},t("span",{class:"icon fa "+s.icon}),t("span",{class:"item_name"},s.name)))))}),this.lazyItems=i},{cancelable:!0,composed:!0,bubbles:!0});this._host.dispatchEvent(s)}}componentDidLoad(){this._host.addEventListener("click",()=>{this.isClosed=!1,this.loadSubMenuItems()})}render(){return this.isClosed?null:this.lazyItems.length?this.lazyItems:t("div",{class:"menu-loader"},"Loading...")}get _host(){return e(this)}};i(o);export{o as event_expandable_renderer}