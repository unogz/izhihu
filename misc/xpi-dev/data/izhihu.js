// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.10.13
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @icon         http://ilovezhihu.duapp.com/logo.png
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2.10 @2013-9-10|# 改进「首页」：增加「首页分栏」模式、修正额外「收起」按钮|# 改进「右舷评论」：为特性「关闭时自动卷屏至对应条目」提供可选开关|# 改进「快速收藏」：增加操作状态指示|#修复「快速屏蔽」
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==

var version='2.10.13';
var updateDate='2014-6-11';

var bGreasemonkeyServiceDefined = false;

window.iZhihuX = 1;
try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.onclick=function(){return window;};
        return dummyElem.onclick ();
    } ) ();
}

if(typeof window.$ === "undefined"){
/*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
}
/*!
 * Casper is a navigation utility for PhantomJS.
 *
 * Documentation: http://casperjs.org/
 * Repository:    http://github.com/n1k0/casperjs
 *
 * Copyright (c) 2011-2012 Nicolas Perriault
 *
 * Part of source code is Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*global console escape exports NodeList window*/

(function(exports) {
    "use strict";

    exports.create = function create(options) {
        return new this.ClientUtils(options);
    };

    /**
     * Casper client-side helpers.
     */
    exports.ClientUtils = function ClientUtils(options) {
        /*jshint maxstatements:40*/
        // private members
        var BASE64_ENCODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var BASE64_DECODE_CHARS = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        );
        var SUPPORTED_SELECTOR_TYPES = ['css', 'xpath'];

        // public members
        this.options = options || {};
        this.options.scope = this.options.scope || document;
        /**
         * Clicks on the DOM element behind the provided selector.
         *
         * @param  String  selector  A CSS3 selector to the element to click
         * @return Boolean
         */
        this.click = function click(selector) {
            return this.mouseEvent('click', selector);
        };

        /**
         * Decodes a base64 encoded string. Succeeds where window.atob() fails.
         *
         * @param  String  str  The base64 encoded contents
         * @return string
         */
        this.decode = function decode(str) {
            /*jshint maxstatements:30 maxcomplexity:30 */
            var c1, c2, c3, c4, i = 0, len = str.length, out = "";
            while (i < len) {
                do {
                    c1 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 === -1);
                if (c1 === -1) {
                    break;
                }
                do {
                    c2 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 === -1);
                if (c2 === -1) {
                    break;
                }
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 === 61)
                    return out;
                    c3 = BASE64_DECODE_CHARS[c3];
                } while (i < len && c3 === -1);
                if (c3 === -1) {
                    break;
                }
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 === 61) {
                        return out;
                    }
                    c4 = BASE64_DECODE_CHARS[c4];
                } while (i < len && c4 === -1);
                if (c4 === -1) {
                    break;
                }
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        };

        /**
         * Echoes something to casper console.
         *
         * @param  String  message
         * @return
         */
        this.echo = function echo(message) {
            console.log("[casper.echo] " + message);
        };

        /**
         * Base64 encodes a string, even binary ones. Succeeds where
         * window.btoa() fails.
         *
         * @param  String  str  The string content to encode
         * @return string
         */
        this.encode = function encode(str) {
            /*jshint maxstatements:30 */
            var out = "", i = 0, len = str.length, c1, c2, c3;
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                    out += BASE64_ENCODE_CHARS.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                    out += BASE64_ENCODE_CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                    out += BASE64_ENCODE_CHARS.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                out += BASE64_ENCODE_CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += BASE64_ENCODE_CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += BASE64_ENCODE_CHARS.charAt(c3 & 0x3F);
            }
            return out;
        };

        /**
         * Checks if a given DOM element exists in remote page.
         *
         * @param  String  selector  CSS3 selector
         * @return Boolean
         */
        this.exists = function exists(selector) {
            try {
                return this.findAll(selector).length > 0;
            } catch (e) {
                return false;
            }
        };

        /**
         * Fetches innerText within the element(s) matching a given CSS3
         * selector.
         *
         * @param  String  selector  A CSS3 selector
         * @return String
         */
        this.fetchText = function fetchText(selector) {
            var text = '', elements = this.findAll(selector);
            if (elements && elements.length) {
                Array.prototype.forEach.call(elements, function _forEach(element) {
                    text += element.textContent || element.innerText;
                });
            }
            return text;
        };

        /**
         * Fills a form with provided field values, and optionnaly submits it.
         *
         * @param  HTMLElement|String  form  A form element, or a CSS3 selector to a form element
         * @param  Object              vals  Field values
         * @return Object                    An object containing setting result for each field, including file uploads
         */
        this.fill = function fill(form, vals) {
            /*jshint maxcomplexity:8*/
            var out = {
                errors: [],
                fields: [],
                files:  []
            };
            if (!(form instanceof HTMLElement) || typeof form === "string") {
                this.log("attempting to fetch form element from selector: '" + form + "'", "info");
                try {
                    form = this.findOne(form);
                } catch (e) {
                    if (e.name === "SYNTAX_ERR") {
                        out.errors.push("invalid form selector provided: '" + form + "'");
                        return out;
                    }
                }
            }
            if (!form) {
                out.errors.push("form not found");
                return out;
            }
            for (var name in vals) {
                if (!vals.hasOwnProperty(name)) {
                    continue;
                }
                var field = this.findAll('[name="' + name + '"]', form);
                var value = vals[name];
                if (!field || field.length === 0) {
                    out.errors.push('no field named "' + name + '" in form');
                    continue;
                }
                try {
                    out.fields[name] = this.setField(field, value);
                } catch (err) {
                    if (err.name === "FileUploadError") {
                        out.files.push({
                            name: name,
                            path: err.path
                        });
                    } else if(err.name === "FieldNotFound") {
                        out.errors.push('Form field named "' + name + '" was not found.');
                    } else {
                        out.errors.push(err.toString());
                    }
                }
            }
            return out;
        };

        /**
         * Finds all DOM elements matching by the provided selector.
         *
         * @param  String            selector  CSS3 selector
         * @param  HTMLElement|null  scope     Element to search child elements within
         * @return NodeList|undefined
         */
        this.findAll = function findAll(selector, scope) {
            scope = scope || this.options.scope;
            try {
                var pSelector = this.processSelector(selector);
                if (pSelector.type === 'xpath') {
                    return this.getElementsByXPath(pSelector.path, scope);
                } else {
                    return scope.querySelectorAll(pSelector.path);
                }
            } catch (e) {
                this.log('findAll(): invalid selector provided "' + selector + '":' + e, "error");
            }
        };

        /**
         * Finds a DOM element by the provided selector.
         *
         * @param  String            selector  CSS3 selector
         * @param  HTMLElement|null  scope     Element to search child elements within
         * @return HTMLElement|undefined
         */
        this.findOne = function findOne(selector, scope) {
            scope = scope || this.options.scope;
            try {
                var pSelector = this.processSelector(selector);
                if (pSelector.type === 'xpath') {
                    return this.getElementByXPath(pSelector.path, scope);
                } else {
                    return scope.querySelector(pSelector.path);
                }
            } catch (e) {
                this.log('findOne(): invalid selector provided "' + selector + '":' + e, "error");
            }
        };

        /**
         * Downloads a resource behind an url and returns its base64-encoded
         * contents.
         *
         * @param  String  url     The resource url
         * @param  String  method  The request method, optional (default: GET)
         * @param  Object  data    The request data, optional
         * @return String          Base64 contents string
         */
        this.getBase64 = function getBase64(url, method, data) {
            return this.encode(this.getBinary(url, method, data));
        };

        /**
         * Retrieves string contents from a binary file behind an url. Silently
         * fails but log errors.
         *
         * @param   String   url     Url.
         * @param   String   method  HTTP method.
         * @param   Object   data    Request parameters.
         * @return  String
         */
        this.getBinary = function getBinary(url, method, data) {
            try {
                return this.sendAJAX(url, method, data, false);
            } catch (e) {
                if (e.name === "NETWORK_ERR" && e.code === 101) {
                    this.log("getBinary(): Unfortunately, casperjs cannot make cross domain ajax requests", "warning");
                }
                this.log("getBinary(): Error while fetching " + url + ": " + e, "error");
                return "";
            }
        };

        /**
         * Retrieves total document height.
         * http://james.padolsey.com/javascript/get-document-height-cross-browser/
         *
         * @return {Number}
         */
        this.getDocumentHeight = function getDocumentHeight() {
            return Math.max(
                Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
                Math.max(document.body.clientHeight, document.documentElement.clientHeight)
            );
        };

        /**
         * Retrieves bounding rect coordinates of the HTML element matching the
         * provided CSS3 selector in the following form:
         *
         * {top: y, left: x, width: w, height:, h}
         *
         * @param  String  selector
         * @return Object or null
         */
        this.getElementBounds = function getElementBounds(selector) {
            try {
                var clipRect = this.findOne(selector).getBoundingClientRect();
                return {
                    top:    clipRect.top,
                    left:   clipRect.left,
                    width:  clipRect.width,
                    height: clipRect.height
                };
            } catch (e) {
                this.log("Unable to fetch bounds for element " + selector, "warning");
            }
        };

        /**
         * Retrieves the list of bounding rect coordinates for all the HTML elements matching the
         * provided CSS3 selector, in the following form:
         *
         * [{top: y, left: x, width: w, height:, h},
         *  {top: y, left: x, width: w, height:, h},
         *  ...]
         *
         * @param  String  selector
         * @return Array
         */
        this.getElementsBounds = function getElementsBounds(selector) {
            var elements = this.findAll(selector);
            var self = this;
            try {
                return Array.prototype.map.call(elements, function(element) {
                    var clipRect = element.getBoundingClientRect();
                    return {
                        top:    clipRect.top,
                        left:   clipRect.left,
                        width:  clipRect.width,
                        height: clipRect.height
                    };
                });
            } catch (e) {
                this.log("Unable to fetch bounds for elements matching " + selector, "warning");
            }
        };

        /**
         * Retrieves information about the node matching the provided selector.
         *
         * @param  String|Object  selector  CSS3/XPath selector
         * @return Object
         */
        this.getElementInfo = function getElementInfo(selector) {
            var element = this.findOne(selector);
            var bounds = this.getElementBounds(selector);
            var attributes = {};
            [].forEach.call(element.attributes, function(attr) {
                attributes[attr.name.toLowerCase()] = attr.value;
            });
            return {
                nodeName: element.nodeName.toLowerCase(),
                attributes: attributes,
                tag: element.outerHTML,
                html: element.innerHTML,
                text: element.innerText,
                x: bounds.left,
                y: bounds.top,
                width: bounds.width,
                height: bounds.height,
                visible: this.visible(selector)
            };
        };

        /**
         * Retrieves a single DOM element matching a given XPath expression.
         *
         * @param  String            expression  The XPath expression
         * @param  HTMLElement|null  scope       Element to search child elements within
         * @return HTMLElement or null
         */
        this.getElementByXPath = function getElementByXPath(expression, scope) {
            scope = scope || this.options.scope;
            var a = document.evaluate(expression, scope, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (a.snapshotLength > 0) {
                return a.snapshotItem(0);
            }
        };

        /**
         * Retrieves all DOM elements matching a given XPath expression.
         *
         * @param  String            expression  The XPath expression
         * @param  HTMLElement|null  scope       Element to search child elements within
         * @return Array
         */
        this.getElementsByXPath = function getElementsByXPath(expression, scope) {
            scope = scope || this.options.scope;
            var nodes = [];
            var a = document.evaluate(expression, scope, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < a.snapshotLength; i++) {
                nodes.push(a.snapshotItem(i));
            }
            return nodes;
        };

        /**
         * Retrieves the value of a form field.
         *
         * @param  String  inputName  The for input name attr value
         * @return Mixed
         */
        this.getFieldValue = function getFieldValue(inputName) {
            function getSingleValue(input) {
                try {
                    type = input.getAttribute('type').toLowerCase();
                } catch (e) {
                    type = 'other';
                }
                if (['checkbox', 'radio'].indexOf(type) === -1) {
                    return input.value;
                }
                // single checkbox or… radio button (weird, I know)
                if (input.hasAttribute('value')) {
                    return input.checked ? input.getAttribute('value') : undefined;
                }
                return input.checked;
            }
            function getMultipleValues(inputs) {
                type = inputs[0].getAttribute('type').toLowerCase();
                if (type === 'radio') {
                    var value;
                    [].forEach.call(inputs, function(radio) {
                        value = radio.checked ? radio.value : value;
                    });
                    return value;
                } else if (type === 'checkbox') {
                    var values = [];
                    [].forEach.call(inputs, function(checkbox) {
                        if (checkbox.checked) {
                            values.push(checkbox.value);
                        }
                    });
                    return values;
                }
            }
            var inputs = this.findAll('[name="' + inputName + '"]'), type;
            switch (inputs.length) {
                case 0:  return null;
                case 1:  return getSingleValue(inputs[0]);
                default: return getMultipleValues(inputs);
            }
        };

        /**
         * Retrieves a given form all of its field values.
         *
         * @param  String  selector  A DOM CSS3/XPath selector
         * @return Object
         */
        this.getFormValues = function getFormValues(selector) {
            var form = this.findOne(selector);
            var values = {};
            var self = this;
            [].forEach.call(form.elements, function(element) {
                var name = element.getAttribute('name');
                if (name && !values[name]) {
                    values[name] = self.getFieldValue(name);
                }
            });
            return values;
        };

        /**
         * Logs a message. Will format the message a way CasperJS will be able
         * to log phantomjs side.
         *
         * @param  String  message  The message to log
         * @param  String  level    The log level
         */
        this.log = function log(message, level) {
            console.log("[casper:" + (level || "debug") + "] " + message);
        };

        /**
         * Dispatches a mouse event to the DOM element behind the provided selector.
         *
         * @param  String   type     Type of event to dispatch
         * @param  String  selector  A CSS3 selector to the element to click
         * @return Boolean
         */
        this.mouseEvent = function mouseEvent(type, selector) {
            var elem = this.findOne(selector);
            if (!elem) {
                this.log("mouseEvent(): Couldn't find any element matching '" + selector + "' selector", "error");
                return false;
            }
            try {
                var evt = document.createEvent("MouseEvents");
                var center_x = 1, center_y = 1;
                try {
                    var pos = elem.getBoundingClientRect();
                    center_x = Math.floor((pos.left + pos.right) / 2),
                    center_y = Math.floor((pos.top + pos.bottom) / 2);
                } catch(e) {}
                evt.initMouseEvent(type, true, true, window, 1, 1, 1, center_x, center_y, false, false, false, false, 0, elem);
                // dispatchEvent return value is false if at least one of the event
                // handlers which handled this event called preventDefault;
                // so we cannot returns this results as it cannot accurately informs on the status
                // of the operation
                // let's assume the event has been sent ok it didn't raise any error
                elem.dispatchEvent(evt);
                return true;
            } catch (e) {
                this.log("Failed dispatching " + type + "mouse event on " + selector + ": " + e, "error");
                return false;
            }
        };

        /**
         * Processes a selector input, either as a string or an object.
         *
         * If passed an object, if must be of the form:
         *
         *     selectorObject = {
         *         type: <'css' or 'xpath'>,
         *         path: <a string>
         *     }
         *
         * @param  String|Object  selector  The selector string or object
         *
         * @return an object containing 'type' and 'path' keys
         */
        this.processSelector = function processSelector(selector) {
            var selectorObject = {
                toString: function toString() {
                    return this.type + ' selector: ' + this.path;
                }
            };
            if (typeof selector === "string") {
                // defaults to CSS selector
                selectorObject.type = "css";
                selectorObject.path = selector;
                return selectorObject;
            } else if (typeof selector === "object") {
                // validation
                if (!selector.hasOwnProperty('type') || !selector.hasOwnProperty('path')) {
                    throw new Error("Incomplete selector object");
                } else if (SUPPORTED_SELECTOR_TYPES.indexOf(selector.type) === -1) {
                    throw new Error("Unsupported selector type: " + selector.type);
                }
                if (!selector.hasOwnProperty('toString')) {
                    selector.toString = selectorObject.toString;
                }
                return selector;
            }
            throw new Error("Unsupported selector type: " + typeof selector);
        };

        /**
         * Removes all DOM elements matching a given XPath expression.
         *
         * @param  String  expression  The XPath expression
         * @return Array
         */
        this.removeElementsByXPath = function removeElementsByXPath(expression) {
            var a = document.evaluate(expression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < a.snapshotLength; i++) {
                a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i));
            }
        };

        /**
         * Performs an AJAX request.
         *
         * @param   String   url     Url.
         * @param   String   method  HTTP method (default: GET).
         * @param   Object   data    Request parameters.
         * @param   Boolean  async   Asynchroneous request? (default: false)
         * @return  String           Response text.
         */
        this.sendAJAX = function sendAJAX(url, method, data, async) {
            var xhr = new XMLHttpRequest(),
                dataString = "",
                dataList = [];
            method = method && method.toUpperCase() || "GET";
            xhr.open(method, url, !!async);
            this.log("sendAJAX(): Using HTTP method: '" + method + "'", "debug");
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            if (method === "POST") {
                if (typeof data === "object") {
                    for (var k in data) {
                        dataList.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k].toString()));
                    }
                    dataString = dataList.join('&');
                    this.log("sendAJAX(): Using request data: '" + dataString + "'", "debug");
                } else if (typeof data === "string") {
                    dataString = data;
                }
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.send(method === "POST" ? dataString : null);
            return xhr.responseText;
        };

        /**
         * Sets a field (or a set of fields) value. Fails silently, but log
         * error messages.
         *
         * @param  HTMLElement|NodeList  field  One or more element defining a field
         * @param  mixed                 value  The field value to set
         */
        this.setField = function setField(field, value) {
            /*jshint maxcomplexity:99 */
            var logValue, fields, out;
            value = logValue = (value || "");
            if (field instanceof NodeList) {
                fields = field;
                field = fields[0];
            }
            if (!(field instanceof HTMLElement)) {
                var error = new Error('Invalid field type; only HTMLElement and NodeList are supported');
                error.name = 'FieldNotFound';
                throw error;
            }
            if (this.options && this.options.safeLogs && field.getAttribute('type') === "password") {
                // obfuscate password value
                logValue = new Array(value.length + 1).join("*");
            }
            this.log('Set "' + field.getAttribute('name') + '" field value to ' + logValue, "debug");
            try {
                field.focus();
            } catch (e) {
                this.log("Unable to focus() input field " + field.getAttribute('name') + ": " + e, "warning");
            }
            var nodeName = field.nodeName.toLowerCase();
            switch (nodeName) {
                case "input":
                    var type = field.getAttribute('type') || "text";
                    switch (type.toLowerCase()) {
                        case "color":
                        case "date":
                        case "datetime":
                        case "datetime-local":
                        case "email":
                        case "hidden":
                        case "month":
                        case "number":
                        case "password":
                        case "range":
                        case "search":
                        case "tel":
                        case "text":
                        case "time":
                        case "url":
                        case "week":
                            field.value = value;
                            break;
                        case "checkbox":
                            if (fields.length > 1) {
                                var values = value;
                                if (!Array.isArray(values)) {
                                    values = [values];
                                }
                                Array.prototype.forEach.call(fields, function _forEach(f) {
                                    f.checked = values.indexOf(f.value) !== -1 ? true : false;
                                });
                            } else {
                                field.checked = value ? true : false;
                            }
                            break;
                        case "file":
                            throw {
                                name:    "FileUploadError",
                                message: "File field must be filled using page.uploadFile",
                                path:    value
                            };
                        case "radio":
                            if (fields) {
                                Array.prototype.forEach.call(fields, function _forEach(e) {
                                    e.checked = (e.value === value);
                                });
                            } else {
                                out = 'Provided radio elements are empty';
                            }
                            break;
                        default:
                            out = "Unsupported input field type: " + type;
                            break;
                    }
                    break;
                case "select":
                case "textarea":
                    field.value = value;
                    break;
                default:
                    out = 'Unsupported field type: ' + nodeName;
                    break;
            }

            // firing the `change` and `input` events
            ['change', 'input'].forEach(function(name) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(name, true, true);
                field.dispatchEvent(event);
            });

            // blur the field
            try {
                field.blur();
            } catch (err) {
                this.log("Unable to blur() input field " + field.getAttribute('name') + ": " + err, "warning");
            }
            return out;
        };

        /**
         * Checks if a given DOM element is visible in remote page.
         *
         * @param  String  selector  CSS3 selector
         * @return Boolean
         */
        this.visible = function visible(selector) {
            try {
                var comp,
                    el = this.findOne(selector);

                if (el) {
                    comp = window.getComputedStyle(el, null);
                    return comp.visibility !== 'hidden' && comp.display !== 'none' && el.offsetHeight > 0 && el.offsetWidth > 0;
                }
                return false;
            } catch (e) {
                return false;
            }
        };
    };
})(typeof exports === "object" ? exports : window);

//拖动, 用法 $('目标的css selector').drags({handler:'拖动对象的css selector'})
//http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
(function($) {
  $.fn.drags = function(opt) {
    opt = $.extend({
      handler: "",
      cursor: "move"
    }, opt);

    if(opt.handler === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handler);
    }

    return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
      if(opt.handler === "") {
        var $drag = $(this).addClass('draggable');
      } else {
        var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
        $('.draggable').offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function() {
          $(this).removeClass('draggable').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function() {
      if(opt.handler === "") {
        $(this).removeClass('draggable');
      } else {
        $(this).removeClass('active-handle').parent().removeClass('draggable');
      }
    });
  }
})(unsafeWindow.$);
(function($){var i=function(e){if(!e)var e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()};$.fn.checkbox=function(f){try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}var g={cls:'jquery-checkbox',empty:'empty.png'};g=$.extend(g,f||{});var h=function(a){var b=a.checked;var c=a.disabled;var d=$(a);if(a.stateInterval)clearInterval(a.stateInterval);a.stateInterval=setInterval(function(){if(a.disabled!=c)d.trigger((c=!!a.disabled)?'disable':'enable');if(a.checked!=b)d.trigger((b=!!a.checked)?'check':'uncheck')},10);return d};return this.each(function(){var a=this;var b=h(a);if(a.wrapper)a.wrapper.remove();a.wrapper=$('<span class="'+g.cls+'"><span class="mark"><img src="'+g.empty+'" /></span></span>');a.wrapperInner=a.wrapper.children('span:eq(0)');a.wrapper.hover(function(e){a.wrapperInner.addClass(g.cls+'-hover');i(e)},function(e){a.wrapperInner.removeClass(g.cls+'-hover');i(e)});b.css({position:'absolute',zIndex:-1,visibility:'hidden'}).after(a.wrapper);var c=false;if(b.attr('id')){c=$('label[for='+b.attr('id')+']');if(!c.length)c=false}if(!c){c=b.closest?b.closest('label'):b.parents('label:eq(0)');if(!c.length)c=false}if(c){c.hover(function(e){a.wrapper.trigger('mouseover',[e])},function(e){a.wrapper.trigger('mouseout',[e])});c.click(function(e){b.trigger('click',[e]);i(e);return false})}a.wrapper.click(function(e){b.trigger('click',[e]);i(e);return false});b.click(function(e){i(e)});b.bind('disable',function(){a.wrapperInner.addClass(g.cls+'-disabled')}).bind('enable',function(){a.wrapperInner.removeClass(g.cls+'-disabled')});b.bind('check',function(){a.wrapper.addClass(g.cls+'-checked')}).bind('uncheck',function(){a.wrapper.removeClass(g.cls+'-checked')});$('img',a.wrapper).bind('dragstart',function(){return false}).bind('mousedown',function(){return false});if(window.getSelection)a.wrapper.css('MozUserSelect','none');if(a.checked)a.wrapper.addClass(g.cls+'-checked');if(a.disabled)a.wrapperInner.addClass(g.cls+'-disabled')})}})(unsafeWindow.jQuery);
/*
 * JQuery URL Parser plugin, v2.2.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */ 

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD available; use anonymous module
		if ( typeof jQuery !== 'undefined' ) {
			define(['jquery'], factory);	
		} else {
			define([], factory);
		}
	} else {
		// No AMD available; mutate global vars
		if ( typeof jQuery !== 'undefined' ) {
			factory(jQuery);
		} else {
			factory();
		}
	}
})(function($, undefined) {
	
	var tag2attr = {
			a       : 'href',
			img     : 'src',
			form    : 'action',
			base    : 'href',
			script  : 'src',
			iframe  : 'src',
			link    : 'href'
		},
		
		key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query
		
		aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability
		
		parser = {
			strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
			loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		},
		
		toString = Object.prototype.toString,
		
		isint = /^[0-9]+$/;
	
	function parseUri( url, strictMode ) {
		var str = decodeURI( url ),
		res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
		uri = { attr : {}, param : {}, seg : {} },
		i   = 14;
		
		while ( i-- ) {
			uri.attr[ key[i] ] = res[i] || '';
		}
		
		// build query and fragment parameters		
		uri.param['query'] = parseString(uri.attr['query']);
		uri.param['fragment'] = parseString(uri.attr['fragment']);
		
		// split path and fragement into segments		
		uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');     
		uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
		
		// compile a 'base' domain attribute        
		uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';      
		  
		return uri;
	};
	
	function getAttrName( elm ) {
		var tn = elm.tagName;
		if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
		return tn;
	}
	
	function promote(parent, key) {
		if (parent[key].length == 0) return parent[key] = {};
		var t = {};
		for (var i in parent[key]) t[i] = parent[key][i];
		parent[key] = t;
		return t;
	}

	function parse(parts, parent, key, val) {
		var part = parts.shift();
		if (!part) {
			if (isArray(parent[key])) {
				parent[key].push(val);
			} else if ('object' == typeof parent[key]) {
				parent[key] = val;
			} else if ('undefined' == typeof parent[key]) {
				parent[key] = val;
			} else {
				parent[key] = [parent[key], val];
			}
		} else {
			var obj = parent[key] = parent[key] || [];
			if (']' == part) {
				if (isArray(obj)) {
					if ('' != val) obj.push(val);
				} else if ('object' == typeof obj) {
					obj[keys(obj).length] = val;
				} else {
					obj = parent[key] = [parent[key], val];
				}
			} else if (~part.indexOf(']')) {
				part = part.substr(0, part.length - 1);
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
				// key
			} else {
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
			}
		}
	}

	function merge(parent, key, val) {
		if (~key.indexOf(']')) {
			var parts = key.split('['),
			len = parts.length,
			last = len - 1;
			parse(parts, parent, 'base', val);
		} else {
			if (!isint.test(key) && isArray(parent.base)) {
				var t = {};
				for (var k in parent.base) t[k] = parent.base[k];
				parent.base = t;
			}
			set(parent.base, key, val);
		}
		return parent;
	}

	function parseString(str) {
		return reduce(String(str).split(/&|;/), function(ret, pair) {
			try {
				pair = decodeURIComponent(pair.replace(/\+/g, ' '));
			} catch(e) {
				// ignore
			}
			var eql = pair.indexOf('='),
				brace = lastBraceInKey(pair),
				key = pair.substr(0, brace || eql),
				val = pair.substr(brace || eql, pair.length),
				val = val.substr(val.indexOf('=') + 1, val.length);

			if ('' == key) key = pair, val = '';

			return merge(ret, key, val);
		}, { base: {} }).base;
	}
	
	function set(obj, key, val) {
		var v = obj[key];
		if (undefined === v) {
			obj[key] = val;
		} else if (isArray(v)) {
			v.push(val);
		} else {
			obj[key] = [v, val];
		}
	}
	
	function lastBraceInKey(str) {
		var len = str.length,
			 brace, c;
		for (var i = 0; i < len; ++i) {
			c = str[i];
			if (']' == c) brace = false;
			if ('[' == c) brace = true;
			if ('=' == c && !brace) return i;
		}
	}
	
	function reduce(obj, accumulator){
		var i = 0,
			l = obj.length >> 0,
			curr = arguments[2];
		while (i < l) {
			if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
			++i;
		}
		return curr;
	}
	
	function isArray(vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	}
	
	function keys(obj) {
		var keys = [];
		for ( prop in obj ) {
			if ( obj.hasOwnProperty(prop) ) keys.push(prop);
		}
		return keys;
	}
		
	function purl( url, strictMode ) {
		if ( arguments.length === 1 && url === true ) {
			strictMode = true;
			url = undefined;
		}
		strictMode = strictMode || false;
		url = url || window.location.toString();
	
		return {
			
			data : parseUri(url, strictMode),
			
			// get various attributes from the URI
			attr : function( attr ) {
				attr = aliases[attr] || attr;
				return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
			},
			
			// return query string parameters
			param : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
			},
			
			// return fragment parameters
			fparam : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
			},
			
			// return path segments
			segment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.path;
				} else {
					seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.path[seg];                    
				}
			},
			
			// return fragment segments
			fsegment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.fragment;                    
				} else {
					seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.fragment[seg];                    
				}
			}
	    	
		};
	
	};
	
	if ( typeof $ !== 'undefined' ) {
		
		$.fn.url = function( strictMode ) {
			var url = '';
			if ( this.length ) {
				url = $(this).attr( getAttrName(this[0]) ) || '';
			}    
			return purl( url, strictMode );
		};
		
		$.url = purl;
		
	} else {
		window.purl = purl;
	}

});


(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2),e=w.isFunction(t);return w.map(n,function(n){return(e?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t,r){return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.findWhere=function(n,t){return w.where(n,t,!0)},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var k=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=k(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var F=function(n,t,r,e){var u={},i=k(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return F(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return F(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i},w.bind=function(n,t){if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));var r=o.call(arguments,2);return function(){return n.apply(t,r.concat(o.call(arguments)))}},w.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},w.bindAll=function(n){var t=o.call(arguments,1);return 0===t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=I(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return I(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),"function"!=typeof/./&&(w.isFunction=function(n){return"function"==typeof n}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return n===void 0},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};M.unescape=w.invert(M.escape);var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(S[n],function(t){return M[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=++N+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){var e;r=w.defaults({},r,w.templateSettings);var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(B,function(n){return"\\"+q[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,w);var c=function(n){return e.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},w.chain=function(n){return w(n).chain()};var D=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
/**
 * @class Utils 辅助类
 */
function utils(){
};

var cfgDefault = {
    'comment_sidebar': true
  , 'answer_orderByTime': false
  , 'AuthorList':false
  , 'ShowComment':true
  , 'HomeLayout':false
  , 'QuickFavo':true
  , 'QuickFavoPinned':{}
  , 'AuthorRear':false
  , 'HomeNoti':false
  , 'QuickBlock':false
  , 'Noti7':true
  , 'HomeFeedsColumns':false
  , 'RightComment_AutoScrollPageWhenClosing':true
};
  
/**
 * 读取配置
 */
utils.getCfg = function(key){
  if(!key)return false;
  var cfg = _.extend(cfgDefault, this.getValue('izhihu',cfgDefault));
  return key ? cfg[key] : cfg;
};

utils.setCfg = function(key,value){
  if(!key)return;
  var cfg = _.extend(cfgDefault, this.getValue('izhihu',cfgDefault));
  cfg[key]=value;
  this.setValue('izhihu',cfg);
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue){
    var v=unsafeWindow.localStorage[key];
    if(v)
        return JSON.parse(v);
    else
        return defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value){
  unsafeWindow.localStorage[key] = JSON.stringify(value);
};

/**
 * 删除存储
 */
utils.deleteValue = function(key){
  return delete unsafeWindow.localStorage[key];
};

utils.transferOldCfg=function(){
    var oldHomeLayout = unsafeWindow.localStorage['izh_HomeLayout']
      , oldAuthorList = unsafeWindow.localStorage['izh_AuthorList']
      , oldShowComment = unsafeWindow.localStorage['izh_ShowComment']
      , oldQuickFavo = unsafeWindow.localStorage['izh_QuickFavo']
      , oldAuthorRear = unsafeWindow.localStorage['izh_AuthorRear']
      , oldHomeNoti = unsafeWindow.localStorage['izh_HomeNoti']
    ;
    if(oldHomeLayout){
        izhHomeLayout=oldHomeLayout;
        unsafeWindow.localStorage.removeItem('izh_HomeLayout');
        this.setCfg('HomeLayout',izhHomeLayout);
    }
    if(oldAuthorList){
        izhAuthorList=oldAuthorList;
        unsafeWindow.localStorage.removeItem('izh_AuthorList');
        this.setCfg('AuthorList',izhAuthorList);
    }
    if(oldShowComment){
        izhRightComment=oldShowComment;
        unsafeWindow.localStorage.removeItem('izh_ShowComment');
        this.setCfg('ShowComment',izhRightComment);
    }
    if(oldQuickFavo){
        izhQuickFavo=oldQuickFavo;
        unsafeWindow.localStorage.removeItem('izh_QuickFavo');
        this.setCfg('QuickFavo',izhQuickFavo);
    }
    if(oldAuthorRear){
        izhAuthorRear=oldAuthorRear;
        unsafeWindow.localStorage.removeItem('izh_AuthorRear');
        this.setCfg('AuthorRear',izhAuthorRear);
    }
    if(oldHomeNoti){
        izhHomeNoti=oldHomeNoti;
        unsafeWindow.localStorage.removeItem('izh_HomeNoti');
        this.setCfg('HomeNoti',izhHomeNoti);
    }

};


/**
 * @method formatStr
 *
 * 格式化字符串模版,支持2种格式:
 *
 *     formatStr("i can speak {language} since i was {age}",{language:'javascript',age:10});
 *     formatStr("i can speak {0} since i was {1}",'javascript',10);
 *
 * 如果不希望被转义,则用两个括号,如: `formatStr("i can speak {0} since i was {{1}",'javascript',10);`
 *
 */
utils.formatStr = function(tpl,obj){
  obj = typeof obj === 'object' ? obj : Array.prototype.slice.call(arguments, 1);
  return tpl.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n){
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return obj[n];
  });
};

utils.getParamInQuery=function(queryStr,paramName){
    var param=paramName+'='
      , start=queryStr.indexOf(param)+param.length
      , end=queryStr.indexOf('&',start);
    return end<start?queryStr.substring(start):queryStr.substring(start,end);
};

utils.observeDOMAttrModified = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].type == 'attributes' )
                    callback(mutations[0]);
            });
            obs.observe( obj, { attributes:true });
        }else if( eventListenerSupported ){
            obj.addEventListener('DOMAttrModified', callback, false);
        }
    }
})();

utils.observeDOMNodeAdded = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                mutations.forEach(function(mutation) {
                    console.log(mutation.type);
                    callback(mutation);
                  });    
            });
            obs.observe( obj, { childList:true });
        }else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
        }
    }
})();

//console.log((new Date()).getTime());

var $ = window.$;
var _ = this._;
var purl = window.purl||$.url;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var url = purl();
var page = url.segment(1);

var pageIs={}
  , $win=$(unsafeWindow)
  , _doc=unsafeWindow.document
  , $body=$(_doc.body)
  , _path=window.frameElement?window.frameElement.src.replace(/https?:\/\/www.zhihu.com/,''):url.data.attr['path']
  , css=''
  , $h=$('head')
  , $s=$('<style type="text/css"></style>')
  , iPathAnswers=_path.indexOf('/answers')
  , iPathCollection=_path.indexOf('/collection')
;
pageIs.Home='/'==_path;
pageIs.Answer=0<_path.indexOf('/answer/');
pageIs.Question=!pageIs.Answer&&0==_path.indexOf('/question/');
pageIs.Answers=0<iPathAnswers&&_path.substr(iPathAnswers)=='/answers';
pageIs.Collection=0==iPathCollection;
pageIs.Debuts=0==_path.indexOf('/debuts/');
pageIs.MyCollection=0==_path.indexOf('/collections/mine');

//主入口
window.addEventListener('load', function(){
    console.log('iZhihu '+version+' started.');
    //console.log(window.iZhihu);
    //console.log((new Date()).getTime());
}, false);

var i=0
  , $user=$('.zu-top-nav-userinfo')//user_avater
  , z=$user.length?$user.attr('href'):''
  , $banner=$body.children().first()
  , $main=$('[role=main]')//main
  , css_AuthorListItemA='padding:0 10px 0 0;'
  , css_AuthorListItemA_name='padding:0 5px;'
  , cbemptyimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=';
;
window.iZhihu = {
    $win:$win
  , $body:$body
  , $main:$main
  , config:_.extend(cfgDefault, utils.getValue('izhihu',cfgDefault))
};
var izhHomeLayout = window.iZhihu.config['HomeLayout']
  , izhAuthorList = window.iZhihu.config['AuthorList']
  , izhRightComment = window.iZhihu.config['ShowComment']
  , izhQuickFavo = window.iZhihu.config['QuickFavo']
  , izhAuthorRear = window.iZhihu.config['AuthorRear']
  , izhHomeNoti = window.iZhihu.config['HomeNoti']
  , izhQuickBlock = window.iZhihu.config['QuickBlock']
;

utils.transferOldCfg();
$body.attr({
    'izhHomeLayout' : izhHomeLayout?'1':''
  , 'izhAuthorList' : izhAuthorList?'1':''
  , 'izhRightComment' : izhRightComment?'1':''
  , 'izhQuickFavo' : izhQuickFavo?'1':''
  , 'izhAuthorRear' : izhAuthorRear?'1':''
  , 'izhHomeNoti' : izhHomeNoti?'1':''
  , 'izhQuickBlock' : izhQuickBlock?'1':''
});

var _QuickBlock = new QuickBlock(window.iZhihu)
  , _QuickFavo = new QuickFavo(window.iZhihu)
  , _Comment = new Comment(window.iZhihu)
  , _Noti7 = new Noti7(window.iZhihu)
  , _Answer = new Answer(window.iZhihu)
;

css+=['.t_showframe{padding:10px 10px 10px 10px;background:#f0f0f0;border:1px solid #fff;box-shadow:2px 5px 15px #333;border-radius:10px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:10px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:10px}#iZhihu_rtjddiv{width:650px;height:437px}#iZhihu_setdiv{width:600px;height2:295px}.t_setdiv{padding-bottom:10px;background:#fcfcfc;width:100%;height:100%}.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-radius-topleft:10px;border-radius-topright:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_set_ft{font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-weight:bold !important;text-shadow:none !important;margin-top:15px !important}.t_set_ft a{text-decoration:none;color:#000}.t_setbtn{border:1px solid black;padding:2px;cursor:pointer;background:#fff;color:#0080c0}.t_setftbtn span{padding:2px 10px 2px 10px !important}.t_rtjdbtn{background:#0080c0 !important;color:#fff !important}.t_rtjdtxtpos{padding-top:5px}.t_rtjdchk{vertical-align:middle;margin-top:-2px;margin-bottom:1px}#iZhihu_rthint{font-family:Arial,sans-serif,瀹�� !important;font-size:16px !important;font-weight:bold;padding:5px 10px 5px 10px;position:fixed;top:20px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;display:inline-block;opacity:0.7}.t_rthint_n{color:#fff !important;background:#000 !important}.t_rthint_f{background:#880000 !important;color:#ffffdd !important}.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}.t_jchkbox .mark{display:inline}.t_jchkbox img{vertical-align:middle;width:45px;height:15px}.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}.t_jchkbox img{background-position:0 0}.t_jchkbox-hover img{background-position:0 -15px}.t_jchkbox-checked img{background-position:0 -30px}.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}.t_jchkbox-disabled img{background-position:0 -60px}.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}.t_jradbox{display:inline;font-size:16px;line-height:16px;padding-right:3px;cursor:pointer;cursor:hand}.t_jradbox .mark{display:inline}.t_jradbox img{vertical-align:middle;width:16px;height:16px}.t_jradbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAMAAABMUIWcAAAAA3NCSVQICAjb4U/gAAABoVBMVEX////7+/v5+fn4+Pj39/f29vb19fX09PTz8/Py8vPx8fHw8PDv7+/u7u7t7e3s7Ozq6uro6Ojm5ubl5eXk5OTi4uLg4ODf39+26vXb2/zb2/3a2v3c3NzZ2fbZ2fjI3vTY2NjX1/LX19fU1ebU1NTT09PQ0NDOzs6k2PCh1v+x0fHKysrIyMiqzfDGxsbCwsLAwMCWyO6lw+G9vb2Nw/i6urqZwNabv+K4uLi3t7eYu920tLSzs7ODu/SysrKEtuisrKyIstyLstJ3su6mpqZ+rNt/p890qONrquiKo8hup9+cnJxkpOVuoNJfoeRunMlindhZneGTk5ORkZpTmd9RlttVldSLi4uLi5N8jZ5yi76GhpRZjsSGhoZ9h5N/gbZMjtBgiLGCgoqBgYFXh71Gis5/f397e3t7e4I+hMpleY11dXVLea9YeJlwcHBMcJQ1csNpaWlBb5xoaG5jY2NCZIY0ZZZYWZ4rY7ZLXJ9PUphUVFRHVWQkWKwhT6VATFkbRZw0RFUWOJIiNkkWJjcXGBoTFSAUFRYOERUJDBEBAQEtwLhRAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAu1JREFUSInNlGtXElEUhimssIsIhIXUigydbBRJwCDESjAvqCEqYxeQRAZR85KXMMW4mMH51Z19Zk/M4Uvap561hrXemWctDnu/jM7+F3QXEBzza8i8A245VvaQFQcTVlw6ZGAJhLVgGzKyxoR94Toi7oJw7L+HDB8zYUu8iYhbNsp+0IEE9202nc22IRgRIQfCbqAbCewyISN0IUIShC2/G/FvMEHq7kC6JRByvj7EJzMh7jQhzjgIGU8P4kkyIdqlHtIRBUFyq4d0S0yIWNQ5mCMgxIU7iBBVziAaECEOc5B8VsQnsTmIuQ0kJ4LAZ1iW4QFiUPbD5Ytss8HSzz17c9YKAql3aZ8/JvWHIDxZ/qZwTj6yB8vfFWqQqXA0+YiRIudH8PzowyBjnWUqVOaeAYM1slkBoZJ9A7ytk8MKE0qLP8rv+/tPyMliCSZZyZerX8bGyqScr7BJni6sk9rLSfLrxcIpCKX8Aam/+0xqM/kSE4pzs2ekeka+zs4VmZBNs3yYzipCYW4iViekOjExWwDhNJtYhZxIZE8VYTYc3ib1mXBYEYrpWIx+yadYLF1kws50KBSqbtOP6R0QCompqanqAf1IFJiwGurt7X1Or97QKgib416v9xW9vOObTEgN3UeGUjCH1OhTZDR1wT7Y1f23NvWh9dJ9+FfB6BtBfEa4xWcqBK3q/8IaBIHPVBgxXUEsTOAzFQIWPWL2d1L4rOvs9JiuIWYPCHymgtukvkBMAyDwmQou0y3E5AKBz1QQ228g7SIIfKaCYFQPZewBgc9U6DGov9vgBIHPcAbLVcTcB3PgM52DxeNDPBYQ+AzL0quvHL2yHy5fbt0BKWJvzlrBnMm025uztg+SHOD6wLKmD4Ic5/qg5EYfDFJG0PYBM/TB+jri1OuH5RHsA5dZH1yy1NaRkW6rfdBmpQ9RORKVxUYfNFnpw92kLEc0fdBk7IMoJ03aPjSy2oeIi+/Dn6z2oaWpDy3/Ux9+AyHcPO1jtxhjAAAAAElFTkSuQmCC") no-repeat}.t_jradbox img{background-position:0 0}.t_jradbox-hover img{background-position:-16px 0}.t_jradbox-checked img{background-position:0 -16px}.t_jradbox-checked .t_jradbox-hover img{background-position:-16px -16px}.t_jradbox-disabled img{background-position:0 -32px}.t_jradbox-checked .t_jradbox-disabled img{background-position:0 -48px}#izh_updatediv{width:400px;height:315px}.t_upbtn{background:#0080c0 !important;color:#fff !important}.t_upinfo{height:120px !important;vertical-align:text-top !important}#izh_updatediv th{border-right:2px solid #fcfcfc !important}#izh_updatediv tfoot td{border:none !important;border-top:2px solid #fcfcfc !important;font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-style:normal !important;text-shadow:none !important}.t_txtshow{text-align:center;background:#0080c0;color:#f0f0f0;user-select:none;-moz-user-select:none}.t_frshow{font-size:1.2em;position:fixed;z-index:99999;top:45px;width:200px;opacity:0.9;cursor:pointer}.t_tbox{padding:10px;position:relative;border:1px solid #f0f0f0;line-height:20px;*height:1%;width:200px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:7px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:7px}.t_tbox s{position:absolute;top:-20px;left:160px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #f0f0f0 transparent;border-style:dashed dashed solid dashed;border-width:10px}.t_tbox i{position:absolute;top:-9px;left:-10px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #0080c0 transparent;border-style:dashed dashed solid dashed;border-width:10px}@media screen and (-webkit-min-device-pixel-ratio:0){#iZhihu_rtjddiv{height:417px}#iZhihu_setdiv{height2:295px}#izh_updatediv{height:315px}}'
     ,''].join('\n');
if(pageIs.Question&&izhAuthorList){
    css+=['div.uno{position:absolute;left:0;border:1px solid #0771C1;border-right-width:0;border-top-right-radius:6px}'
         ,'div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}'
         ,'div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}'
         ,'div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}'
         ,'div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}'
         ,'div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}'
         ,'div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}'
         ,'div.uno ul li a{display:block;}div.uno li a.sel{text-decoration:none;}'
         ,'div.uno ul li a{'+css_AuthorListItemA+'}'
         ,'div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}'
         ,'div.uno li a span.name{text-align:right;display:block;'+css_AuthorListItemA_name+'background-color:#fff;}div.uno li a.sel span.name{color:#fff;background-color:#0771C1;}'
         ,'div.uno li a span.name.noname{color:#000;}'
         ,'div.uno li a span.name.collapsed{color:#999999;}'
         ,'div.uno li a span.name.friend{font-style:italic;}'
         ,'div.uno li span.hp{background-color:#999999;position:relative;float:right;margin-top:-2px;line-height:2px;height:2px;}'
         ,'div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}'
         ,'div.uno a.sel table.plus{}div.uno a.sel table.plus td{}'
         ,'div.uno li a span.func{text-align:center;}'
         ,'div.izh-answer-preview{position:fixed;margin-top:1px;background-color:#fff;border:1px solid #0771C1;border-top-width:22px;border-top-right-radius:6px;box-shadow:5px 5px 5px #777;}'
         ,'div.izh-answer-preview .zm-editable-content{top:0;bottom:0;left:0;right:0;overflow-y:auto;padding:10px;}'
         ,'div.izh-answer-preview img.zm-list-avatar{position:absolute;right:10px;top:-35px;border:1px solid #0771C1;border-radius:6px;}'
         ,'div.izh-answer-preview span.comment{position:absolute;top:-18px;line-height:18px;border-top-right-radius:3px;background-color:#fff;padding:0 5px;}'
         ,''].join('\n');
}
css+=['.z-icon-izh-fold{background-position:-173px -107px;width:15px;height:15px;}'
     ,''].join('\n');
css+=['.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}'
     ,'.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-top-left-radius:6px;border-top-right-radius:6px}'
     ,'.t_set_tb th,.t_set_tb td{padding:8px;background:#e7f3f9;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}'
     ,'.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}'
     ,'.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}'
     ,'.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}'
     ,'.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}'
     ,'.t_jchkbox .mark{display:inline}'
     ,'.t_jchkbox img{vertical-align:middle;width:45px;height:15px}'
     ,'.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}'
     ,'.t_jchkbox img{background-position:0 0}'
     ,'.t_jchkbox-hover img{background-position:0 -15px}'
     ,'.t_jchkbox-checked img{background-position:0 -30px}'
     ,'.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}'
     ,'.t_jchkbox-disabled img{background-position:0 -60px}'
     ,'.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}'
     ,'.t_set_tb td{white-space:nowrap;}'
     ,'.t_set_tb td .icon-help{float:right;}'
     ,''].join('\n');
css+=['.izh_boxShadow{box-shadow: 5px 5px 3px 0px #999 !important;}'
     ,'#zh-question-meta-wrap.izh_noBorder{border-bottom-color:transparent !important;}'
     ,'#zh-question-filter-wrap.izh_noBorder{border-top-color:transparent !important;}'
     ,'a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}'
     ,'a.izh-button .zg-icon{opacity:0.5;}'
     ,'a.izh-button.on .zg-icon{opacity:1;}'
     ,'a.izh-button.off{color:#eee;}'
     ,'a.izh-button.off .zg-icon{opacity:0.2;}'
     ,'.izh-feeds-filter{}'
     ,'.izh-feeds-filter .izh-feeds-filter-option{opacity:0.5;color:#999999;padding-left:5px;text-decoration:none;cursor:pointer;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option i{background-position:-183px -4px;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option.on{opacity:1;color:#225599;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option.on i{background-position:-183px -24px;}'
     ,''].join('\n');
if(izhHomeLayout){
    css +=  ['#zh-question-list { padding-left:30px!important }'
            ,'#zh-main-feed-fresh-button { margin-left:-30px!important }'
            ,'.feed-item {'
            ,'    border-bottom:1px solid #EEE!important;'
            ,'    margin-top:-1px!important'
            ,'}'
            ,'.feed-item .avatar { display:none!important }'
            ,''
            ,'.feed-main,.feed-item.combine { margin-left:0!important }'
            ,'.feed-item-q { margin-left:-30px!important;padding-left:0!important }'
            ,''
            ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-a .zm-comment-box { max-width:602px!important }'
            ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }'
            ,''
            ,'.zm-tag-editor,'
            ,'#zh-question-title,'
            ,'#zh-question-detail,'
            ,'#zh-question-meta-wrap,'
            ,'.zh-answers-title,'
            ,'#zh-question-filter-wrap {'
            ,'    margin-left:-32px!important'
            ,'}'
            ,''
            ,'#zh-question-log-page-wrap .zm-tag-editor,'
            ,'#zh-question-log-page-wrap #zh-question-title {'
            ,'    margin-left:0 !important'
            ,'}'
            ,''
            ,'.zh-answers-title,'
            ,'#zh-question-filter-wrap {'
            ,'    border-bottom:1px solid #EEE!important;'
            ,'    z-index:1000!important'
            ,'}'
            ,''
            ,'#zh-question-meta-wrap {'
            ,'    margin-bottom:0!important;'
            ,'    padding-bottom:10px!important;'
            ,'    border-bottom:1px solid #EEE!important'
            ,'}'
            ,''
            ,'#zh-question-answer-wrap { margin-top:-1px!important }'
            ,''
            ,'#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }'
            ,'.zu-question-collap-title { border-top:1px solid #EEE!important }'
            ,'#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }'
            ,''
            ,'.zu-autohide,'
            ,'.zm-comment-op-link,'
            ,'.zm-side-trend-del,'
            ,'.unpin {'
            ,'    visibility:visible!important;'
            ,'    opacity:0;'
            ,'}'
            ,'.feed-item:hover .zu-autohide,'
            ,'.zm-item-answer .zu-autohide,'
            ,'.zm-item-comment:hover .zm-comment-op-link,'
            ,'.zm-side-trend-row:hover .zm-side-trend-del,'
            ,'.zm-side-nav-li:hover .unpin {'
            ,'    opacity:1;'
            ,'}'
            ,'.zm-item-vote-count:hover,.zm-votebar button:hover{'
            ,'    background:#a6ce56!important;'
            ,'    color:#3E5E00 !important'
            ,'}'
            ,''
            ,'a,a:hover,'
            ,'i,'
            ,'.zu-autohide,'
            ,'.zm-votebar button,'
            ,'.zm-item-comment:hover .zm-comment-op-link,'
            ,'.zm-comment-op-link,'
            ,'.zm-side-trend-row:hover .zm-side-trend-del,'
            ,'.zm-side-trend-del,'
            ,'.zm-side-nav-li,'
            ,'.zu-main-feed-fresh-button,'
            ,'.zg-icon,'
            ,'.zm-side-nav-li:hover .zg-icon,'
            ,'.zm-side-nav-li:hover i,'
            ,'.unpin,'
            ,'.zm-side-nav-li:hover .unpin {'
            ,'    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'}'
            ,''
            ,'h3{ line-height:25px }'
            ,'.zu-footer-inner {padding:15px 0!important}'
            ,'.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}'
            ,'.zm-side-list-content{clear:both}'
            ,'.unpin{ display:inline-block!important }'
           ,''].join('\n');
}

var css_comment='';
if(pageIs.Home||pageIs.Question||pageIs.Answer){
    css_comment = window.iZhihu.Comment.css;
}

if(window.iZhihu.QuickFavo){
    css += window.iZhihu.QuickFavo.css;
}
if(window.iZhihu.QuickBlock){
    css += window.iZhihu.QuickBlock.css;
}
if(window.iZhihu.Noti7){
    css += window.iZhihu.Noti7.css;
    window.iZhihu.Noti7.enhance();
}
var heads = _doc.getElementsByTagName("head");
if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.id = "izhCSS_main";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node); 
    if(css_comment!=''){
        node = _doc.createElement("style")
        node.type = "text/css";
        node.id = "izhCSS_comment";
        node.appendChild(_doc.createTextNode(css_comment));
        heads[0].appendChild(node);
    }
}

if(!$('.modal-dialog-bg').length){
    $body.append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="z-index:85;opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

window.iZhihu.getItem=function($c){
    var $item=$(null);
    if($c && $c.length){ 
        var $itemMeta=$c.closest('.zm-item-meta');
        if ($itemMeta.is('.feed-meta') || $itemMeta.parent().is('.feed-meta')){
            $item=$c.closest('.feed-item');
            $item.attr('data-aid', $item.children('meta[itemprop=answer-id]').attr('content'))
        }else if($itemMeta.is('.answer-actions')){
            $item=$c.closest('.zm-item-answer,.feed-item');
        }else{
            $item=$itemMeta.prev();
        }
    }
    return $item;
};

/**
 * @class Answer
 */
function Answer(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.Answer = this;

    this._e=null;
    this.ppWidth=0;
    this.ppHeight=400;

  	this.processAnswer=function($a,$pp,bAuthorRear,bAuthorList){
        if(!$a||!$a.length)return;
        if($a.attr('izh_processed')=='1')return;
        var selCollapse='.meta-item[name=collapse]'
          , $meta=$a.find('.zm-item-meta')
          , $author=$a.find('.zm-item-answer-author-info')
          , $favo=$a.find('.meta-item[name=favo]')
          , $fold=!$a.has('.zh-summary > .toggle-expand').length?null:$('<button/>',{
                'class':'down izh-button fold'
              , html:'收起'
              , click:function(){
                    var $vote=$(this).closest('.zm-votebar')
                      , $answer=$vote.is('.goog-scrollfloater-floating')?null:$vote.closest('.feed-item')
                      , $fold=$answer==null?iZhihu.Answer.$Fold:$answer.find('.zm-item-meta:first '+selCollapse)
                    ;
                    if($fold&&$fold.length){
                        iZhihu.Answer.$Folding=$vote.closest('.entry-body');
                        $fold.get(0).click();
                    }
              	}
            })
          , $vote=$a.find('.zm-votebar')
        ;
        if($vote.length){
            $vote.append($fold).bind('DOMNodeRemoved',function(event){
                var $vote=$(event.target);
                if($vote.is('.zm-votebar')){
                    iZhihu.Answer.$Fold=$vote.closest('.feed-item').find('.zm-item-meta:first '+selCollapse);
                }
            });
        	if($author)$author.find('[name=collapse]').hide();
        	$a.find('.feed-main .entry-body [name=collapse]').hide();
        }
        $meta.find(selCollapse).click(function(){
            if(!iZhihu.Answer.$Folding)return;
            var scrollObj=window.iZhihu4CRX?document.body:document.documentElement
              , $meta=$(this).closest('.feed-meta')
              , $answer=$meta.prev()
              , scrollTop=iZhihu.Answer.$Folding.children('.zm-votebar').length?scrollObj.scrollTop
                      :($answer.closest('.feed-item').offset().top-iZhihu.$body.children().first().height())
            ;
        	scrollTop+=$answer.outerHeight();
            var $summary=$answer.find('.zh-summary').show()
              , offset=0;
            scrollTop-=$summary.outerHeight();
            $summary.hide();
            if(!$answer.find('.zm-item-vote-info.empty').length)
                offset=1;
            if($answer.prev().is(':hidden'))offset+=2;
            $(scrollObj).scrollTop(scrollTop+offset);
            iZhihu.Answer.$Folding=null;
        });
        if(iZhihu.QuickBlock){
            // Region: 快速屏蔽
            var $voteInfo=$('.zm-item-vote-info',$a);
            if($('[name=more]',$voteInfo).length){
                $voteInfo.parent().bind('DOMNodeInserted',function(event){
                    iZhihu.QuickBlock.addQuickBlock($(event.target),iZhihu.QuickBlock);
                });
            }
            // Region end
        }
        if($author.length){//relocatePersonInfo
            if(bAuthorRear){
                $author.css({
                    'textAlign':'right'
                });
                if($a.is('.feed-item')){
                    $a.find('.entry-body .zm-item-answer-detail .zm-item-rich-text')
                        .append($author.hide()).bind('DOMNodeInserted',function(event){
                            var $c=$(event.target);
                            if($c.is('.zm-editable-content')){
                                $(this).children('.zm-item-answer-author-info')
                                    .insertBefore($c.children('.answer-date-link-wrap'))
                                    .css({
                                        'position':'absolute'
                                      , 'right':0
                                    }).show();
                            }
                        });
                }else{
                    $author.insertBefore($meta);
                }
            }
            $author=$author.children().first().children().eq(1);
            if ($pp && bAuthorList){
                // Region: 回答目录项
                var collapsed=$a.attr('data-collapsed')=='1'
                  , $ppla=$('<a>',{
                            href:'#answer-'+$a.attr('data-aid')
                          , target:'_self'
                          , style:css_AuthorListItemA
                        })
                  , $ppl=$('<li>').append($ppla)
                  , $uno=iZhihu.$unoAnswers
                if(collapsed){
                    $ppl.appendTo($pp)
                }else{
                    $ppl.insertBefore($uno.$endOfLastA)
                }
                if($a.attr('data-isowner')=='1'){
                    iZhihu.Answer._e=$a.get(0);
                    $ppla.append('<span class="me"></span>');
                }
                var nameCSS='name';
                if($a.attr('data-isfriend')=='1'){
                    nameCSS+=' friend';
                }
                if(collapsed){
                    nameCSS+=' collapsed'
                }
                if(!$author.length){
                    nameCSS+=' noname';
                }
                $('<span>',{
                    'class':nameCSS
                  , html:!$author.length?'匿名用户':$author.html()
                  , style:css_AuthorListItemA_name
                }).appendTo($ppla);
                if ($ppl.width()>iZhihu.Answer.ppWidth)
                    iZhihu.Answer.ppWidth=$ppl.width();
                // Region end
                // Region: 回答篇幅指示
                var nHP=Math.ceil($('.zm-editable-content',$a).text().length/100);
                $('<span>',{
                    'class':'hp'
                }).css({'width':nHP*10,'margin-left':-nHP*10}).appendTo($ppla);
                // Region end
                $ppla.mouseover(function(){
                    var $frm=$(this.parentNode.parentNode.parentNode)
                      , $uno=iZhihu.$unoAnswers
                    $(this).addClass('sel');
                    if(iZhihu.Answer._e){
                        $uno.children('.meT').css('display',0>iZhihu.Answer._e.offsetTop-$frm.scrollTop()?'':'none');
                        $uno.children('.meB').css('display',$frm.height()<iZhihu.Answer._e.offsetTop-$frm.scrollTop()+iZhihu.Answer._e.offsetHeight?'':'none');
                    }
                    // Region: 回答预览
                    var nam=$('span.name',this);
                    if(!nam.length)return;
                    var aid=$(this).attr('href').replace('#answer-','')
                      , prv=$uno.next('.izh-answer-preview')
                      , top=$(this).position().top+$uno.position().top
                      , sel='.zm-item-answer[data-aid='+aid+'] > .zm-item-rich-text'
                      , ctx=nam.is('.collapsed')?'#zh-question-collapsed-wrap':'#zh-question-answer-wrap'
                      , div=$(sel,ctx)
                      , htm=div.html()
                      , cmt=$('.zm-item-meta > .zu-question-answer-meta-comment',div.parent())
                    ;
                    if(!prv.length){
                        prv=$('<div>',{
                                'class':div.class
                            })
                            .addClass('izh-answer-preview').width(div.width()+22)
                            .mouseover(function(){$uno.mouseover();$('li a[href=#'+$(this).attr('data-aid')+']',$uno).addClass('sel');$(this).show();})
                            .mouseout(function(){$uno.mouseout();$('li a[href=#'+$(this).attr('data-aid')+']',$uno).removeClass('sel');$(this).hide();})
                            .click(function(){$('li a[href=#'+$(this).attr('data-aid')+']',$uno)[0].click();})
                            .insertAfter($uno)
                        ;
                    }
                    if(prv.attr('data-aid')!=aid){
                        prv.attr('data-aid',aid).html(htm).find('a').attr('onclick','return false;');
                        if($('span.me',this).length)
                            prv.find('a.zu-edit-button').remove();
                        if(!nam.hasClass('noname'))
                            $('img.zm-list-avatar',div.parent()).clone().appendTo(prv);
                        var t=cmt.text(),i=t.indexOf('条评论');
                        if(cmt.length&&i>0)
                            $('<span>',{'class':'comment',html:t.substring(0,i)}).prepend(cmt.children('i').clone()).appendTo(prv);
                    }
                    var th=div.height()+33
                      , maxTop=$uno.position().top+12
                      , contentPosition='';
                    if(maxTop+th<$win.height()){
                        if(top+th<$win.height()){
                            prv.css({'top':top>maxTop?top:maxTop,'bottom':''});
                        }else{
                            prv.css({'top':'','bottom':0});
                        }
                    }else{
                        prv.css({'top':maxTop,'bottom':0});
                        contentPosition='absolute';
                    }
                    prv.css({'left':$uno.width()}).show().children().first().css('position',contentPosition);
                    // Region end
                }).mouseout(function(){
                    $(this).removeClass('sel');
                    var $uno=$(this.parentNode.parentNode.parentNode.parentNode);
                    $uno.next().hide();
                }).click(function(){$(this).mouseout();
                iZhihu.$unoAnswers.css('left',9-iZhihu.$unoAnswers.width());});
                if(iZhihu.Answer._e==$a.get(0)){
                    iZhihu.Answer._e=$ppla.get(0);
                }
            }
        }

        if(iZhihu.QuickFavo)
            iZhihu.QuickFavo.addQuickFavo($favo,$a);

        $meta.bind('DOMNodeInserted',function(event){
            iZhihu.Comment.processComment($(event.target));
        });
        
        iZhihu.Comment.processCommentButton($a);

        var $cm=$('.zm-comment-box',$a);
        if($cm.length && $cm.is(':visible')){
        	var focusName = iZhihu.Comment.scrollFocusCommentOnPageLoad($cm);
    
            iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
                iZhihu.Comment.processComment($cm, focusName);
            });
        }
        
        $a.attr('izh_processed','1');
    };

    return this;
}

/**
 * @class Comment
 */
function Comment(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.Comment = this;

    var css_comment={
            'background-color':'#fff'
          , 'outline':'none'
          , 'z-index':'9999'
          , 'border-radius':'0 6px 0 0'
          , 'position':'absolute'
          , 'visibility':'hidden'
          , 'top':-70
        }
    ;
    this.RightComment = iZhihu.config['ShowComment'];
    this.AutoScrollPageWhenClosing = iZhihu.config['RightComment_AutoScrollPageWhenClosing'];
    if (!this.RightComment){
        this.css = 
            ['.zm-comment-box.empty .izh-button-cc{display:none;}'
            ,''].join('\n');
    } else {
        this.css = 
            ['.mention-popup{z-index:10000 !important;}'
            ,'.zm-item-meta .meta-item.toggle-comment{display:block;float:right;margin-left:7px !important;}'
            ,'.zm-comment-box{position:absolute;margin-top:0;}'
            ,'.zm-comment-box .icon-spike{display:none !important;}'
            ,'.zm-comment-box > .zm-comment-box-ft{position:absolute;top:0;left:0;right:0;}'
            ,'.zm-comment-box.empty{padding-top:10px !important;}'
            ,'.zm-comment-box > .zm-comment-form{margin:15px !important;}'
            ,'.zm-comment-box.empty > .zm-comment-form{bottom:25px;}'
            ,'.zm-comment-box > .zm-comment-form .zm-comment-editable{position:absolute;bottom:60px;top:0;left:0;right:0;overflow:auto;}'
            ,'.zm-comment-box.empty > .zm-comment-form .zm-comment-editable{bottom:25px;}'
            ,'.zm-comment-box > .zm-comment-form .zm-command{position:absolute;left:0;right:0;bottom:40px;}'
            ,'.zm-comment-box.empty > .zm-comment-form .zm-command{bottom:10px;}'
            ,'.zm-comment-box [class^=izh-buttons-cm]{position:absolute;top:70px;}'
            ,'.zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:30px;z-index:10;}'
            ,'.zm-comment-box .izh-buttons-cm-L{left:0;}'
            ,'.zm-comment-box .izh-buttons-cm-L > a{margin-right:7px;}'
            ,'.zm-comment-box .izh-buttons-cm-R{right:1em;}'
            ,'.zm-comment-box .izh-buttons-cm-R > a{margin-left:7px;}'
            ,'.zm-comment-box a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}'
            ,'.zm-comment-box a.izh-button .zg-icon{opacity:0.5;}'
            ,'.zm-comment-box a.izh-button.on .zg-icon{opacity:1;}'
            ,'.zm-comment-box a.izh-button.off{color:#eee;}'
            ,'.zm-comment-box a.izh-button.off .zg-icon{opacity:0.2;}'
            //,'.zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:7px;}'
            ,'.zm-comment-box.empty .zm-comment-list{visibility:hidden;}'
            ,'.zm-comment-box .zm-comment-list .zm-item-comment[izh_hilight]{background-color:rgb(255,255,160);}'
            ,'.zm-comment-box .izh-button.on .zg-icon-comment-like{background-position:-222px -79px;}'
            ,'.zm-comment-box .izh-button .z-icon-fold{height:6px;}'
            ,''].join('\n');
        iZhihu.$win.load(function(){
            var iZhihu=window.iZhihu;
            iZhihu.$win.scroll(function(event){
                if(iZhihu.Comment.Opening&&!iZhihu.Comment.PageNotScroll){
                    var animate=true;
                    iZhihu.Comment.box($(iZhihu.Comment.Opening),true,animate);
                }
            });
        
            iZhihu.$win.resize(function(event){
                if(iZhihu.Comment.Opening){
                    var $cm=$(iZhihu.Comment.Opening);
                    iZhihu.Comment.Opening = null;
                    iZhihu.Comment.close(null,$cm);
                    iZhihu.Comment.open(null,$cm);
                }
            });
            if(iZhihu.ScrollTop){
                document.body.scrollTop=iZhihu.ScrollTop;
            }
        });
    }
    this.processCommentButton = function($a){
        if(iZhihu.Comment.RightComment){
            var $bc=$a.find('.meta-item.toggle-comment');
            $bc.prependTo($bc.parent());
        }
    };
    this.scrollFocusCommentOnPageLoad = function($cm){
        if(!iZhihu.Comment.RightComment)return;
        var focusName=url.data.attr.fragment;
        if(!focusName||focusName=='')return;
    	if(window.iZhihu4CRX){
            var $icm2C=$cm.find('.zm-comment-list .zm-item-comment a.zg-anchor-hidden[name="'+focusName+'"]').parent()
              , offsetTop=$icm2C.length?$icm2C.offset().top:0
            ;if(offsetTop){document.body.scrollTop=offsetTop;}
    	}
        return focusName;
    };
    
    this.metaScrollToViewBottom = function($itemMeta,funcAfterScroll,always,animate){
        if(!iZhihu.Comment.RightComment || !iZhihu.Comment.AutoScrollPageWhenClosing){
            if(funcAfterScroll){funcAfterScroll();}
            return;
        }
        if(typeof always === 'undefined')always=true;//if false, scrolling only when the .zm-item-meta out of visible range
        if(typeof animate === 'undefined')animate=false;//if false, scrolling instantly
        if(always)$itemMeta.children('.zm-comment-box').css('position','fixed');
        var winHeight=iZhihu.$win.height()
          , scrollObj=window.iZhihu4CRX?document.body:document.documentElement
          , scrollTopNow=scrollObj.scrollTop
          , navHeight=iZhihu.$body.children().first().height()
          , bar=$('.zu-global-notify.zu-global-notify-info:visible')
          , barHeight=!bar.length?0:bar.outerHeight()
          , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTopNow>barHeight?0:barHeight-scrollTopNow))+navHeight
          , maxHeight=winHeight-baseTop
          , metaHeight=$itemMeta.innerHeight()
          , offsetTop=$itemMeta.offset().top
          , offsetBottom=offsetTop+metaHeight
          , $item=iZhihu.getItem($itemMeta)
          , itemHeight=$item.innerHeight()
          , offsetTopA=$item.offset().top
          , offsetBottomA=offsetTopA+itemHeight
          , scrollTopEnd=itemHeight>maxHeight?offsetBottom-winHeight:(offsetTopA<=scrollTopNow?offsetTopA-baseTop:offsetBottom-winHeight)
        ;
        if(!always){
            always=offsetTop<scrollTopNow+baseTop||offsetBottom>scrollTopNow+winHeight-baseTop;
        }
        if(always){
            iZhihu.ScrollTop=scrollTopEnd;
            if(animate){
                $(scrollObj).animate({'scrollTop':scrollTopEnd},funcAfterScroll);
        	}else{
                $(scrollObj).scrollTop(scrollTopEnd);
                if(funcAfterScroll){funcAfterScroll();}
        	}
        }else{
            if(funcAfterScroll){funcAfterScroll();}
        }
    };
    this.box = function($cm,keepSize,animate){if(!$cm||!$cm.length)return;
        $cm.stop();
        if(typeof keepSize === 'undefined')keepSize=false;
        if(typeof animate === 'undefined')animate=false;
        var winHeight=iZhihu.$win.height()
          , th=keepSize?parseInt($cm.attr('izh_cmHeight')):0
          , scrollTop=(document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop
          , navHeight=iZhihu.$body.children().first().height()
          , bar=$('.zu-global-notify.zu-global-notify-info:visible')
          , barHeight=!bar.length?0:bar.outerHeight()
          , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTop>barHeight?0:barHeight-scrollTop))+navHeight
          , minHeight=112
          , maxHeight=winHeight-baseTop-35
          , tooSmall=maxHeight<minHeight
          , $meta=$cm.closest('.zm-item-meta')
          , metaHeight=2*$meta.height()-$meta.innerHeight()
          , offsetTop=scrollTop-$meta.offset().top
          , offsetBottom=-offsetTop-winHeight
        ;if(tooSmall)maxHeight=minHeight;
        if(!th||isNaN(th)){
            var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo(document.body).show()
              , $l=$t.children('.zm-comment-list')
            ;
            if(!$cm.is('.empty')&&$l.children().length>0)$l.css({'position':'absolute','height':'','top':'','bottom':''});
            th=$l.height();
            th+=th==0?minHeight:100;
            $t.remove();$t=null;//console.log(th);
            $cm.css('height',th<=minHeight?minHeight:(th<maxHeight?th-100:maxHeight-80));
        }
        var target={},other={'height':''};
        $cm.attr('izh_cmHeight',th).css({'display':'','visibility':'visible','position':'absolute'});
        if(th<=maxHeight){
            var top=-offsetTop-70,fixHeight=(th<=minHeight?-1:7);
            if(!tooSmall&&top+th>winHeight){
                target={'top':-offsetBottom-th-metaHeight+fixHeight,'bottom':offsetBottom};
            }else{
                offsetTop+=((!tooSmall)&&top>baseTop?top:baseTop);
                target={'top':offsetTop,'bottom':-offsetTop-th-metaHeight+fixHeight};
            }
            $cm.filter('.empty').find('.zm-comment-form .zm-comment-editable').css({'bottom':''});
        }else{
            target={'top':offsetTop+baseTop,'bottom':offsetBottom};
            $cm.filter('.empty').find('.zm-comment-form .zm-comment-editable').css({'bottom':'20px'});
        }
        if(animate){
            $cm.animate(target,function(){$cm.css(other);});
        }else{
            $cm.css($.extend(target,other));
        }
        $cm;
    };
    this.open = function($ac,$cm,icmFocus){// if $ac is null, just re-sizing and re-locating comment-box
        var noCommentOpening = iZhihu.Comment.Opening == null;
        iZhihu.Comment.Opening = $cm.attr('izh-opening','1').css({'display':'none'}).get(0);
        $('.zm-comment-box:visible:not([izh-opening=1])')
            .each(function(i,e){
                $(e).css('visibility','hidden').closest('.zm-item-meta').find('.toggle-comment')[0].click();
            });
        var winWidth=iZhihu.$win.width()
          , mcLeft=iZhihu.$main.offset().left
          , $ct=$cm.closest('.zu-main-content-inner')
          , ctMarginL=parseInt($ct.css('margin-left'))
          , ctWidth=$ct.width()+ctMarginL
          , ctLeft=$ct.offset().left-ctMarginL
          , $meta=$cm.closest('.zm-item-meta')
          , mtWidth=$meta.innerWidth()
          , minWidth=iZhihu.$main.width()-ctWidth
          , cmWidth=mtWidth
          , maxWidth=winWidth-ctWidth
          , o=function(){
                $cm.attr('opened','1');
        		if(!$ac){
                    iZhihu.Comment.box($cm);
                    return;
        		}
                var currTop=_doc.body.scrollTop
                  , $n=$ac.next(),$n=$n.length?$n:$ac.parent().next()
                  , t=$ac.offset().top-iZhihu.$main.offset().top
                  , b=$ac.offset().top-iZhihu.$main.offset().top
                  , w=$ac.width()
                  , inAnswer=$ac.is('.zm-item-answer')
                  , inQuestion=$ac.is('#zh-question-detail')
                  , $questionMeta=$('#zh-question-meta-wrap')//question_meta
                  , h=inQuestion?$questionMeta.offset().top+$questionMeta.height()+parseInt($questionMeta.css('padding-bottom'))-iZhihu.$main.offset().top
                                     :$ac.height()+parseInt($ac.css('padding-bottom'))+parseInt($n.css('padding-top'))
                ;
                if(!$ac.find('.izh_tape_a,.izh_tape_b').length)
                    $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
                if(!$cm)$cm=$ac.find('.zm-comment-box');
                if($cm.length){
                    if(!$cm.attr('tabindex')){
                        $cm.attr('tabindex','-1').focus();
                    }
                    if(inQuestion){
                        $('#izh_QuestionShadow').css({
                            'height':h
                          , 'margin-bottom':-h
                        }).show();
                        $questionMeta.next(':visible').andSelf().addClass('izh_noBorder');
                    }else{
                        $ac.addClass('izh_boxShadow');
                    }
                    $ac.find('.izh_tape_a').css({
                        'position':'absolute'
                      , 'width':1
                      , 'height':h
                      , 'top':0
                      , 'margin-left':w-1
                      , 'z-index':'10000'
                      , 'background-color':'#fff'
                    }).show();
        
                    iZhihu.Comment.box(
                        $cm.css({'left':mtWidth-1}).attr('izh_inQuestion',inQuestion?'1':'0').removeAttr('izh-opening')
                    );
                    
                    $('.mention-popup').attr('data-aid',$ac.attr('data-aid'));
                }else{
                    $ac.find('.zu-question-answer-meta-comment')[0].click();
                }
                $ac.find('.izh_tape_b').css({
                    'position':'absolute'
                  , 'width':1
                  , 'height':h
                  , 'top':0
                  , 'margin-left':w
                  , 'z-index':'9998'
                  , 'background-color':'#eee'
                }).show();
                //$ac.css('border-color','#999999');
                //$n.css('border-color','#999999');
                $('.zh-backtotop').css('visibility','hidden');
                iZhihu.$body.scrollTop(currTop);
                if(icmFocus){
                    var $icm=$(icmFocus).attr('izh_hilight','1')
                      , $list=$icm.closest('.zm-comment-list');
                    $list.scrollTop(icmFocus.offsetTop-$list.get(0).offsetTop);
                    iZhihu.Comment.HiLightItem=icmFocus;
                    iZhihu.Comment.HiLightColor='rgb(255,255,160)';
                    $icm.click(function(){
                        var iZhihu=window.iZhihu;
                        if(iZhihu&&iZhihu.Comment.HiLightItem){
                            $(iZhihu.Comment.HiLightItem).removeAttr('izh_hilight');
                        }
                    });
                }
            };

        if(maxWidth>549)maxWidth=549;
        if(cmWidth>maxWidth)
            cmWidth=maxWidth;
        if(cmWidth<minWidth)
            cmWidth=minWidth;
        $cm.addClass('izh_boxShadow').css($.extend(css_comment,{'width':cmWidth-9}));
        //if(!$cm.is('.empty'))
            $cm.css({'padding':'100px 0px 0px 7px'});
        $('i.zm-comment-bubble',$cm).hide();
        if(noCommentOpening){
            var cmWidthOver=cmWidth-winWidth
              , shiftLeft=cmWidthOver+ctWidth+ctLeft
            ;
            if(shiftLeft>0){
                if(shiftLeft>ctLeft){shiftLeft=mcLeft;}
                else if(cmWidthOver>0){shiftLeft-=cmWidthOver;}
            }
            if(shiftLeft<0){shiftLeft=0;}
            if(shiftLeft && $ac){
                $ct.css({'position':'relative','left':0}).animate({left:-shiftLeft},o);
            }else{
                $ct.css({'position':'relative','left':-shiftLeft});
                o();
            }
        }else{
            o();
        }	
    };
    this.close = function($ac,$cm){
        if(!$cm)$cm=$ac.find('.zm-comment-box');
        var $ct=$cm.closest('.zu-main-content-inner');
        var o=function(){
            $(this).css('position','');
            if(!$ac)return;
            var $n=$ac.next()
              , $n=$n.length?$n:$ac.parent().next()
              , inQuestion=$ac.is('#zh-question-detail');
            if(!$ac){return;}
            if(inQuestion){
                $('#izh_QuestionShadow').hide();
                $('#zh-question-meta-wrap').next(':visible').andSelf().removeClass('izh_noBorder');
            }else{
                $ac.removeClass('izh_boxShadow');
            }
            //$ac.css('border-color','#DDDDDD');
            //$n.css('border-color','#DDDDDD');
            $('.izh_tape_a:visible,.izh_tape_b:visible').hide();
            $('.zh-backtotop').css('visibility','visible');
        };

        if(iZhihu.Comment.Opening == $cm.get(0)){
            iZhihu.Comment.Opening = null;
            $ct.animate({left:0},o);
        }else{
            if(!$ac){$ct.css({left:0});}
            o();
        }
        
    };
    this.processComment = function($cm,focusName){
        var loading=false;
        if($cm.is('.zm-comment-spinner')){
            $cm=$cm.closest('.zm-comment-box');
            loading=true;
        }
        if(!$cm.is('.zm-comment-box'))return;
        var $item=iZhihu.getItem($cm);
        if(iZhihu.Comment.RightComment&&loading){
            var cmLeft=$item.width()-1;
            $cm.css({'left':cmLeft,'width':216,'z-index':'10000'});
        }
        if($cm.filter('.zm-comment-box').has('.zm-comment-list').length){
/* Collections for comment
            $cm.find('.zm-comment-editable').bind('DOMNodeInserted',function(event){
                var $c=$(event.target),$cm=$c.closest('.zm-comment-box');
                if($c.is('a.member_mention')){
                    if($cm.children('.izh_collections').length<=0){
                        $('<div class="izh_collections">loading...</div>').bind('mouseover',function(){
                            $(this).show();
                        }).bind('mouseout',function(){
                            $(this).hide();
                        }).appendTo($cm);
                    }
                    $c.bind('mouseover',function(){
                        var $ce=$(this).closest('.zm-comment-editable'),$cm=$(this).closest('.zm-comment-box');
                        $cm.children('.izh_collections').css({
                            'bottom':$(this).height()-$(this).position().top-1
                          , 'left':$(this).position().left
                        }).show();
                        $.post('http://www.zhihu.com'+$(this).attr('href')+'/collections'
                          , $.param({_xsrf:$('input[name=_xsrf]').val()})
                          , function(result,status,xhr){
                                console.log(result);
                            });
                    });
                    $c.bind('mouseout',function(){
                        var $ce=$(this).closest('.zm-comment-editable'),$cm=$(this).closest('.zm-comment-box');
                        $cm.children('.izh_collections').hide();
                    });
                }
            });
*/
            if(iZhihu.Comment.RightComment){
                $cm.closest('.zm-item-meta').find('.toggle-comment').click(function(event){
                    var $openedBy=$(this)
                      , $ac=$openedBy.closest('.zm-item-meta')
                      , $cm=($ac.parent().is('.zm-item-meta.feed-meta')?$ac.parent():$ac).find('.zm-comment-box').css('visibility','hidden')
                    ;
                    if($cm.length){
                        var $item=iZhihu.getItem($cm);
                        if($cm.is(':hidden')){
                            iZhihu.Comment.open($item,$cm);
                        }else{
                            iZhihu.Comment.close($item,$cm);
                        }
                    }
                });
            }
            //if($cm.is('.empty')) return;
            var $list=$cm.find('.zm-comment-list');
            $list.bind('DOMNodeInserted',function(event){
            //utils.observeDOMNodeAdded($list[0],function(event){
            	/*if(!event.addedNodes)return;
                console.log('Nodes '+event.addedNodes.length+' inserted');
            	for(var i=0;i<event.addedNodes.length;i++){
            		var $icm=$(event.addedNodes[i]);
                }*/
                var $icm=$(event.target).filter('.zm-item-comment,.zm-comment-form');
                if(!$icm.length)return;
                var $list=$(this)
                  , $cm=$list.closest('.zm-comment-box:visible');
                if($icm.is('.zm-item-comment')){
                    //console.log($icm);
                    if(iZhihu.QuickBlock){
                        //console.log('Adding QuickBlock');
                        iZhihu.QuickBlock.addQuickBlockInOneComment($icm);
                    }
                    if(iZhihu.Comment.RightComment){
                        $list.css('height','100%');
                        $icm.show().bind('DOMNodeRemoved',function(event){
                            var $icm=$(event.target);
                            if(!$icm.is('.zm-item-comment'))return;
                            var $list=$icm.hide().closest('.zm-comment-list')
                              , $cm=$list.closest('.zm-comment-box:visible');
                            if($cm.length){
                                //console.log('Refreshing comment list');
                                if($list.children().length==1){
                                    $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                                }
                                iZhihu.Comment.box($cm,false,false);
                            }
                        });
    
                        if($cm.length){
            	            var countNow=$list.children().length
                        	  , countAll=parseInt($cm.attr('data-count'))
                              , countRest=countAll-countNow
                              , notAll=$(this).has('.load-more').length
                        	;
                            if((!notAll)&&countRest>1){
                            	return;
                            }
                            //console.log('Refreshing comment list');
                            $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).show();
                            iZhihu.Comment.box($cm,false,false);
                            if(notAll||countRest<0)$list.scrollTop($icm.get(0).offsetTop);
                        }
                    }
                }else if($icm.is('.zm-comment-form')){
                    if(iZhihu.Comment.RightComment){
                        if($cm.length){
                            var $rcm=$icm;
                            $icm=$rcm.closest('.zm-item-comment');
                            $rcm.find('a.zm-comment-close.zm-command-cancel').click(function(event){
                                var $rcm=$(this).closest('.zm-comment-form').hide()
                                  , $cm=$rcm.closest('.zm-comment-box:visible');
                                if($cm.length){
                                    iZhihu.Comment.box($cm,false,false);
                                }
                            });
                            $rcm.parent().find('a.reply.zm-comment-op-link').click(function(event){
                                var $rcm=$(this).closest('.zm-comment-content-wrap').children('.zm-comment-form').toggle()
                                  , $icm=$(this).closest('.zm-item-comment')
                                  , $list=$icm.closest('.zm-comment-list')
                                  , $cm=$list.closest('.zm-comment-box:visible');
                                if($cm.length){
                                    iZhihu.Comment.box($cm,false,false);
                                    if($rcm.is(':visible'))$list.scrollTop($icm.get(0).offsetTop-$list.get(0).offsetTop);
                                    $rcm.toggle();
                                }
                            });
                            iZhihu.Comment.box($cm,false,false);
                            $list.scrollTop($icm.get(0).offsetTop-$list.get(0).offsetTop);
                        }
                    }
                }
            });
            var cmClose=function(event,alsoScrollToViewBottom){
                    var $cm=$(this).closest('.zm-comment-box');
                		if($(this).is('[name=closeform]')&&(!$cm.is('.empty')))return;
                    var $item=iZhihu.getItem($cm)//.attr('tabindex','-1').focus().removeAttr('tabindex')
                      , $itemMeta=$cm.closest('.zm-item-meta')
                      , alsoScroll=this.getAttribute('izh-alsoScrollToViewBottom')||''
                      , scrollTop=(document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop
                    ;
                    if(alsoScroll!=='1'){
                        $itemMeta.find('.toggle-comment')[0].click();
                        setTimeout(function(){
                            document.body.scrollTop=scrollTop;
                            document.documentElement.scrollTop=scrollTop;
                        },100);
                        return;
                    }
                    iZhihu.Comment.metaScrollToViewBottom($itemMeta,function(){
                        $itemMeta.find('.toggle-comment')[0].click();
                    },false,true);
                }
              , $btnCC=$('<a>',{
                    'class':'zu-question-answer-meta-comment izh-button-cc'
                  , href:'javascript:void(0);'
                  , html:'收起'
                  , click:cmClose
                  , 'data-tip':'s$t$收起评论并跳转至所属回答'
                })
              , $buttonsL=$('<div>',{
                	'class':'izh-buttons-cm-L'
                }).prependTo($cm)
              , $buttonsR=$('<div>',{
                	'class':'izh-buttons-cm-R'
                })
            ;
            if(iZhihu.Comment.RightComment){
                $cm.children('.zm-comment-form').find('[name=closeform]').click(cmClose);
                $btnCC.clone(true).css({
                    'background-image': 'url("/static/img/sprites-1.8.2.png")'
                  , 'background-position': '-261px -62px'
                  , 'background-repeat': 'no-repeat'
                  , 'display': 'inline-block'
                  , 'width': 15
                  , 'height': 15
                  , 'position': 'absolute'
                  , 'left': 0
                  , 'top': 0
                  , 'z-index': '10000'
                }).attr('data-tip','s$l$收起评论').html('').prependTo($cm)
                $buttonsR.prependTo($cm);
                if($list.children().length==0){
                    $buttonsR.hide();
                }
                $btnCC.css({
                    'float':'left'
                  , 'margin-left':7
                }).attr('izh-alsoScrollToViewBottom','1').prepend('<i class="z-icon-izh-fold"/>').prependTo($buttonsL);
                $('<a>',{
                    'class':'izh-button izh-back-top'
                  , 'data-tip':'s$l$返回顶部'
                  , href:'javascript:void(0);'
                  , html:'<i class="zg-icon z-icon-fold"></i>'
                  , click:function(){
                        $(this.parentNode).nextAll('.zm-comment-list').scrollTop(0);
                    }
                }).add('<a>',{
                    'class':'izh-button izh-show-good'
                  , 'data-tip':'s$l$人气妙评'
                  , href:'javascript:void(0);'
                  , html:'<i class="zg-icon zg-icon-comment-like"></i>'
                  , click:function(){
                       var $e=$(this)
                         , $c=$e.closest('.zm-comment-box')
                         , $l=$c.find('.zm-comment-list')
                         , $n=$l.find('.zm-item-comment').has('span.like-num.nil')
                       ;
                       if($e.hasClass('on')){
                           $e.attr('scrollTop_showgood',$l[0].scrollTop);
                           $n.show();
                           iZhihu.Comment.box($c,false,false);
                           $e.removeClass('on');
                           var scrollTop = parseInt($e.attr('scrollTop'));
                           if(!isNaN(scrollTop))
                               $l.scrollTop(scrollTop);
                       }else{
                           $e.attr('scrollTop',$l[0].scrollTop);
                           $n.hide();
                           iZhihu.Comment.box($c,false,false);
                           $e.addClass('on');
                           var scrollTop = parseInt($e.attr('scrollTop_showgood'));
                           if(!isNaN(scrollTop))
                               $l.scrollTop(scrollTop);
                       }
                    }
                }).css({
                    'float':'right'
                }).appendTo($buttonsR);

                iZhihu.Comment.PageNotScroll = true;
                $list.scroll(function(){
                    var $e=$(this)
                      , $b=$e.closest('.zm-comment-box').find('.izh-back-top')
                    ;
                    if($e.height() < this.scrollTop){
                        $b.removeClass('off');
                    }else{
                        $b.addClass('off');
                    }
                }).scroll();
                iZhihu.Comment.PageNotScroll = false;

                var icmFocus=null;
                    $list.css({
                        'height':$cm.is('.empty')?'':'100%'
                      , 'overflow':'auto'
                    });
                $list.children('.zm-item-comment').each(function(i,e){
                    var $icm=$(e);
                    $icm.bind('DOMNodeRemoved',function(event){
                        var $icm=$(event.target);
                        if(!$icm.is('.zm-item-comment'))return;
                        var $cm=$icm.hide().closest('.zm-comment-box:visible');
                        if($cm.length){
                            if($(this).closest('.zm-comment-list').children().length==1){
                                $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                            }
                            iZhihu.Comment.box($cm,false,false);
                        }
                    });
                    $icm.find('span.like-num').each(function(i,e){
                        var tip=e.getAttribute('data-tip').replace('s$r$','s$l$');
                        if(tip!='')e.setAttribute('data-tip',tip);
                    });
                    if (!icmFocus&&focusName&&focusName!=''
                        && $icm.children('a.zg-anchor-hidden[name="'+focusName+'"]').length){
                        icmFocus=$icm.get(0);
                    }
                });
                iZhihu.Comment.open($item,$cm,icmFocus);
                utils.observeDOMNodeAdded($cm.children('.zm-comment-form').children('.zm-comment-editable')[0],function(event){
                    var $e=$(event.target)
                      , $f=$e.closest('.zm-comment-form')
                      , $l=$f.prev('.zm-comment-list')
                      , $c=$f.closest('.zm-comment-box[opened=1]')
                      , ch=$c.height()
                      , winHeight=iZhihu.$win.height()
                      , scrollTop=document.documentElement.scrollTop+document.body.scrollTop
                      , navHeight=iZhihu.$body.children().first().height()
                      , bar=$('.zu-global-notify.zu-global-notify-info:visible')
                      , barHeight=!bar.length?0:bar.outerHeight()
                      , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTop>barHeight?0:barHeight-scrollTop))+navHeight
                      , minHeight=112
                      , maxHeight=winHeight-baseTop-35
                    ;
                    if(!$c.length)return;
                    if(!$c.is('.empty')&&$l.children().length>0){
                        lh=$l.height();
                    }else{
                        lh=0;
                    }
                    var $t=$e.clone().appendTo(document.body)
                    	    .css({'position':'absolute','z-index':'-1','width':$e.width(),'min-height':22})
                      , eh=$t.height()
                      , h=Math.max(eh,lh)+(lh==0?90:100)
                    ;
                    $t.remove();$t=null;
                    if(isNaN(ch)||ch!=h){
                        $c.attr('izh_cmHeight',h);
                        iZhihu.Comment.box($c,true,false);
                    }
                    if(!$f.is('.expanded')&&event.addedNodes.length){
                        $f.css({'height':'','bottom':''});
                    }else{
                        eh+=30;
                        $f.css(lh==0||eh>ch?{'height':'','bottom':25}:{'height':eh,'bottom':''});
                    }
                });
            }else{
                $btnCC.prepend('<i class="z-icon-fold"/>')
                .css({
                    'position':'absolute'
                  , 'cursor':'pointer'
                  , 'margin-left':-1
                  , 'left':0
                  , 'background-color':'#fbfbfb'
                  , 'padding':'2px 5px'
                  , 'bottom':-22
                  , 'border':'1px solid #ddd'
                  , 'border-radius':'4px'
                }).insertBefore($cm.find('.zm-comment-box-ft'));
            }
            if(iZhihu.QuickBlock){
                iZhihu.QuickBlock.addQuickBlockInCommentList($buttonsL);
            }
        }
    };

    return this;
}

/**
 * @class Noti7
 */
function Noti7(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['Noti7']) {
        return null;
    }
    iZhihu.Noti7 = this;
    
    this.$noti7 = $('#zh-top-nav-live-new');
    this.$frame = $('.zm-noti7-frame',this.$noti7);
    this.$content = $('.zm-noti7-content-body',this.$noti7);
    this.$footer = $('.zm-noti7-popup-footer',this.$noti7);
    this.$tab = $('.zm-noti7-popup-tab-container','#zh-top-nav-live-new-inner');

    this.css = 
        ['#zh-top-nav-live-new .zm-noti7-popup-footer a[unreadonly="1"]{color:#225599 !important;text-shadow:0 0 1px #225599;}'
        ,''].join('\n');
    this.enhance = function(){
        iZhihu.Noti7.$tab.find('.zm-noti7-popup-tab-item').each(function(i,e){
            utils.observeDOMAttrModified(e,function(event){
                var $e=$(event.target);
                if($e.is('.zm-noti7-popup-tab-item.current')){
                	var currentClass=$e.attr('class')
                	  , $bFilterRead=$('.izh-filter-read',iZhihu.Noti7.$footer);
                	if(currentClass!=$bFilterRead.attr('currentClass')){
                	    $bFilterRead.attr({'unreadOnly':'','currentClass':currentClass});
                	}
                }
            });
        });
        iZhihu.Noti7.$footer.append(
            $('<a>',{
                'class':'izh-filter-read'
              , html:'隐藏已读'
              , href:'javascript:void(0);'
              , 'unreadOnly':''
              , click:function(){
                    var unreadOnly=this.getAttribute('unreadOnly')=='1'
                      , $contentVisible=iZhihu.Noti7.$content.filter(':visible')
                      , $scroller=$contentVisible.closest('.zh-scroller-inner')
                      , $items=$contentVisible.find('.zm-noti7-content-item')
                    ;
                    unreadOnly=!unreadOnly;
                    this.setAttribute('unreadOnly',unreadOnly?'1':'');
                    if(unreadOnly){
                        $scroller.attr('scrollTop',$scroller[0].scrollTop);
                        $items.not('.unread').hide();
                        var scrollTop = parseInt($scroller.attr('scrollTop_unread'));
                        if(!isNaN(scrollTop))
                            $scroller.scrollTop(scrollTop);
                    }else{
                        $scroller.attr('scrollTop_unread',$scroller[0].scrollTop);
                        $items.not('.unread').show();
                        var scrollTop = parseInt($scroller.attr('scrollTop'));
                        if(!isNaN(scrollTop))
                            $scroller.scrollTop(scrollTop);
                    }
                }
              
            })
        );
    };

    return this;
}

/**
 * @class QuickBlock
 */
function QuickBlock(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['QuickBlock']) {
        return null;
    }
    iZhihu.QuickBlock = this;
    
/*
    var css_QuickBlock = {
            'background-position':'-146px -202px'
          , 'width':16
          , 'height':16
      	}
    ;
*/
    this.Pending = {Users:',',Count:0};
    this.Blocking = {Users:',',Count:0};
    this.Unfollowed = {Users:',',Count:0};
    this.Refollowed = {Users:',',Count:0};
    this.css = 
        ['.izh_blockCart{background-color:#0771C1;position:fixed;right:0;z-index:9;padding:0 30px 0 60px;border:1px solid #0771C1;border-left-width:10px;border-top-left-radius:6px;}'
        ,'.izh_blockCart .do{color:#fff;text-align:center;display:block;margin:2px;min-width:80px;width:100%;height:20px;}'
        ,'.izh_blockCart.pending .do:after{text-decoration:blink;color:red;}'
        ,'.izh_blockCart .do:after{position:relative;content:attr(izh_num2B);}'
        ,'.izh_blockCart .do .button{color:#fff;}'
        ,'.izh_blockCart .frame{overflow-y:auto;overflow-x:hidden;position:absolute;top:25px;bottom:0;left:0;right:0;background-color:#fff;padding-top:5px;}'
        ,'.izh_blockCart .list{display:block;margin:2px;width:100%;padding-right:5px;}'
        ,'.izh_blockCart .list .rel{border-width:0 2px;border-style:solid;border-color:#fff;width:24px;height:18px;}'
        ,'.izh_blockCart .list.i_fo .rel{border-left-color:#259;background-position:-120px -184px;}'
        ,'.izh_blockCart .list.fo_i .rel{border-right-color:#259;background-position:-120px -164px;}'
        ,'.izh_blockCart .list.i_fo.fo_i .rel{background-position:-78px -200px;}'
        ,'.izh_blockCart .user2B{display:block;margin:2px 0;padding:0 40px 0 60px;}'
        ,'.izh_blockCart .user2B i.zg-icon{display:block;position:absolute;right:0;margin-top:5px;}'
        ,'.izh_blockCart .user2B .name{display:block;color:#fff;background-color:#000;white-space:nowrap;padding:2px 5px;border-radius:3px;}'
        ,'.izh_blockCart .list .user2B.unfo .name{background-color:#f00;}'
        ,'.izh_blockCart .user2B .del{display:block;position:absolute;margin-left:-4.5em;}'
        ,'.izh_blockCart .user2B i.say{display:block;position:absolute;margin-left:-44px;border-radius:6px 6px 0 6px;border:1px solid #999;padding:0 5px 0 3px;}'
        ,'.izh_blockCart .user2B i.say_1{display:block;position:absolute;margin-left:-10px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-bottom:1px solid #999;}'
        ,'.izh_blockCart .user2B i.say_2{display:block;position:absolute;margin-left:-9px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-radius:0 0 0 6px;border:1px solid #999;border-width:0 0 1px 1px}'
        ,'.izh-quick-block{position:absolute;text-align:center;width:4em;margin-top:1.5em;white-space:nowrap;}'
        ,'.izh-quick-block [class^=izh-quick-block]{position:absolute;display:block;white-space:nowrap;}'
        ,'.izh-quick-block:after{content:attr(izh_num2B);margin-top:1em;display:block;}'
        ,'.zm-comment-hd .izh-quick-block-pend{position:absolute;left:0;top:40px;}'
        ,''
        ].join('\n');
    this.unblockAll = function(){
        $('.blocked-users > .item-card').each(function(i,e){
            var uid=$(e).attr('data-id');
            $.post('http://www.zhihu.com/settings/unblockuser',$.param({
                _xsrf:$('input[name=_xsrf]').val()
              , uid:uid
            }),function(r){console.log(r);});
        });
	  };
	  this.doUnfollow = function(){
        var $e = iZhihu.QuickBlock.Users2BBQ.shift()
        if(typeof $e === 'undefined') return

        var uid=$e.attr('uid');
        $.post('http://www.zhihu.com/node/MemberFollowBaseV2'
          , $.param({
                method:'unfollow_member'
              , params:JSON.stringify({'hash_id':uid})
              , _xsrf:$('input[name=_xsrf]').val()
              })
          , function(r){
                  var query=decodeURIComponent(this.data)
                    , params=utils.getParamInQuery(query,'params')
                  ;
                  eval('params='+params);console.log(params);
                  var bid='fb-'+params.hash_id
                    , who=bid+','
                    , unfollowed=iZhihu.QuickBlock.Unfollowed
                    , refollowed=iZhihu.QuickBlock.Refollowed
                    , $cartDIV=$('#izh_blockCart')
                    , $user=$cartDIV.find('.user2B[uid='+params.hash_id+']')
                    , $list=$user.closest('.list')
                  ;
                  $user.prependTo($list.next().next());
                  if(unfollowed.Users.indexOf(','+who)<0)
                      unfollowed.Users += who;
                  if(refollowed.Users.indexOf(','+who)>=0)
                      refollowed.Users = refollowed.replace(','+who,',');
            }
        ).always(function(data, textStatus, jqXHR){
            iZhihu.QuickBlock.doUnfollow()
        });
	  };
    this.doQuickBlock = function(){
        var $e = iZhihu.QuickBlock.Users2BBQ.shift()
        if(typeof $e === 'undefined') return

        var blocking = iZhihu.QuickBlock.Blocking
          , href = $e.attr('href')
          , who = href.split('/').pop()+','
        ;
        if(typeof blocking === 'undefined' || !blocking){
            blocking = iZhihu.QuickBlock.Blocking = { Users:',', Count:0 };
        }else if(blocking.Users.indexOf(','+who) >= 0){
            return; // Already blocking
        }
        var $cartDIV=$('#izh_blockCart');
        $cartDIV.addClass('blocking');
        blocking.Users += who;
        blocking.Count ++;
        $.post('http://www.zhihu.com'+href+'/block',$.param({
            action:'add'
          , _xsrf:$('input[name=_xsrf]').val() 
        }),function(r){
            var href=this.url.replace('http://www.zhihu.com','').replace('/block','')
              , userID=href.split('/').pop()
              , who=','+userID+','
              , blocking=iZhihu.QuickBlock.Blocking
            ;

            if(0==--blocking.Count)$cartDIV.removeClass('pending');
    
            if(blocking.Users.indexOf(who) < 0)
                return; // No this user in pending
              
            blocking.Users = blocking.Users.replace(who,',');
            $('#izh_blockCart .user2B[href="'+href+'"]').find('.del')[0].click();
            $('a[href$="'+href+'"]').css('text-decoration','line-through');
        }).always(function(data, textStatus, jqXHR){
            iZhihu.QuickBlock.doQuickBlock()
        });
  	};
  	this.resizeBlockCart = function($cartDIV){
        var $temp=$cartDIV.clone().attr('id','').css({'height':'','position':'absolute','bottom':'','z-index':'-1'}).appendTo(iZhihu.$body).show();
        $temp.find('.frame').css({'position':'static','top':'','bottom':'','left':'','right':'','overflow':''});
        var h=$temp.height();
        $temp.remove();
        $temp=null;
        if(h+iZhihu.$main.offset().top<iZhihu.$win.height()){
            $cartDIV.css({'height':h,'bottom':''});
        }else{
        	$cartDIV.css({'height':'','bottom':0});
        }
    };
    this.in2BlockCart = function(){
        var $e = iZhihu.QuickBlock.Users2B.shift()
        if (typeof $e === 'undefined') return

        var pending = iZhihu.QuickBlock.Pending
          , href = $e.attr('href')
          , username = href.split('/').pop()
          , who = username+','
        ;
        if( typeof pending === 'undefined' || !pending){
            pending = iZhihu.QuickBlock.Pending = { Users:',', Count:0 };
        }else if(pending.Users.indexOf(','+who) >= 0){
            return; // Already pending
        }

        var $cartDIV=$('#izh_blockCart');
        if(!$cartDIV.length){
            $cartDIV=$('<div id="izh_blockCart"class="izh_blockCart">').css({
                'top':iZhihu.$main.offset().top
            }).append(
                $('<div>',{
                    'class':'do'
                  , 'izh_num2B':0
                  , 'title':'下为「候审」列表\n点击左上角可收起/展开\n数字为人犯总数（红色表示仍有人犯正待入列）'
                }).append(
                    $('<a>',{
                        'class':'button delAll'
                      , href:'javascript:void(0);'
                      , html:'大赦'
                      , title:'清空「候审」列表'
                      , click:function(){
                          var $cartDIV=$('#izh_blockCart');
                          $cartDIV.css('bottom','').find('.list').empty();
                          $(this.parentNode).attr('izh_num2B','0');
                          $cartDIV.css('height','');
                      }
                    }).css({
                        'display':'block'
                      , 'position':'absolute'
                      , 'left':24
                    })
                ).append(
                    $('<input>',{
                        'class':'unfo'
                      , href:'javascript:void(0);'
                      , type:'checkbox'
                      , title:'选中后，将我关注之人标出，改以放逐（取消关注）论处'
                      , click:function(){
                          var $cartDIV=$(this.parentNode.parentNode)
                            , $users=$('.frame .list.i_fo .user2B',$cartDIV)
                            , $action=$('.action',this.parentNode);
                          if(this.checked){
                              $users.addClass('unfo');
                              $action.html('放逐').css('padding','0 2em 0 0').attr('title','对列表内我关注之人取消关注');
                          }else{
                              $users.removeClass('unfo');
                              $action.html('收监').css('padding','0 0 0 2em').attr('title','将下列人犯逐一加入黑名单');
                          }
                      }
                    }).css({
                        'display':'block'
                      , 'float':'left'
                      , 'height':22
                      , 'line-height':22
                    })
                ).append(
                    $('<span>',{
                        'class':''
                      , href:'javascript:void(0);'
                      , html:'从轻'
                      , title:'选中后，将我关注的人标出，准备「取消关注」'
                    }).css({
                        'display':'block'
                      , 'float':'left'
                      , 'margin-right':20
                    })
                ).append(
                    $('<a>',{
                        'class':'button action'
                      , href:'javascript:void(0);'
                      , html:'收监'
                      , title:'将下列人犯逐一加入黑名单'
                      , click:function(){
                          var $cartDIV=$(this.parentNode.parentNode);
                          iZhihu.QuickBlock.Users2BBQ = []
                          if($('.unfo',this.parentNode).is(':checked')){
                              $('.list.i_fo .user2B',$cartDIV).each(function(i,e){
                                  iZhihu.QuickBlock.Users2BBQ.push($(e))
                              });
                              iZhihu.QuickBlock.doUnfollow();
                              //alert($('#izh_blockCart').find('.list.unfo .user2B').length);// Unfo
                          }else{
                              $('.list .user2B',$cartDIV).each(function(i,e){
                                  iZhihu.QuickBlock.Users2BBQ.push($(e))
                              });
                              iZhihu.QuickBlock.doQuickBlock();
                          }
                      }
                    }).css({
                        'display':'block'
                      , 'float':'right'
                      , 'margin-left':20
                      , 'margin-right':-10
                      , 'padding':'0 0 0 2em'
                    })
                ).append(
                    $('<a>',{
                        'class':'zg-icon zg-icon-double-arrow'
                      , href:'javascript:void(0);'
                      , click:function(){
                          var $cartDIV=$('#izh_blockCart');
                          if($cartDIV.attr('mini')!='1'){
                        	  $cartDIV.find('.frame').hide();
                        	  $cartDIV.css({'height':'','bottom':''});
                        	  $cartDIV.attr('mini','1');
                          }else{
                        	  $cartDIV.find('.frame').show();
                        	  iZhihu.QuickBlock.resizeBlockCart($cartDIV);
                        	  $cartDIV.attr('mini','0');
                          }
                      }
                    }).css({
                        'position':'absolute'
                      , 'left':0
                      , 'top':5
                    })
                )
            ).append(
                $('<div>',{'class':'frame'}
                ).append(
                    $('<div>',{
                        'class':'list i_fo fo_i'
                    })
                ).append(
                    $('<div>',{
                        'class':'list i_fo'
                    })
                ).append(
                    $('<div>',{
                        'class':'list fo_i'
                    })
                ).append(
                    $('<div>',{
                        'class':'list'
                    })
                )
            ).appendTo(iZhihu.$body);
        }
        if($cartDIV.find('.user2B[href="'+href+'"]').length){
            return;
        }

        $cartDIV.addClass('pending');
        pending.Users += who;
        pending.Count ++;

        $.get('http://www.zhihu.com/node/MemberProfileCardV2?'+$.param({params:JSON.stringify({'url_token':username})}))
        .done(function(data, textStatus, jqXHR){
            if (data === '') return
            var $html=$(data)
              //, user=r.msg[0]
              , $avatarLink=$html.find('.avatar-link:first')
              , userName=$avatarLink.text()//user[0]
              //, userID=user[1]
              , $btnFollow=$html.find('button[data-follow]')
              , hashID=!$btnFollow.length?'':$btnFollow.attr('data-id')//.substr(3)//user[3]
              , f_=$btnFollow.length&&$btnFollow.is('.zg-btn-unfollow')//r.msg[3]
              , _f=$btnFollow.length&&$btnFollow.is('[data-followme=1]')//r.msg[4]
              , cssF=_f||f_?'zg-icon rel ':''
              , $cartDIV=$('#izh_blockCart')
              , $cart=$cartDIV.find('.list')
              , href=$avatarLink.attr('href')//'/people/'+userID
              , userID=href.substr(8)
              , who=','+userID+','
              , pending=iZhihu.QuickBlock.Pending
            ;console.log(userName+':'+f_+':'+_f);

            if(0==--pending.Count)$cartDIV.removeClass('pending');

            if(hashID==''){
                //iZhihu.QuickBlock.in2BlockCart()
                return; // User blocked or you blocked
            }
            if(pending.Users.indexOf(who) < 0){
                //iZhihu.QuickBlock.in2BlockCart()
                return; // No this user in pending
            }
            
            pending.Users = pending.Users.replace(who,',');

            if($cartDIV.find('.list .user2B[href="'+href+'"]').length){
                //iZhihu.QuickBlock.in2BlockCart()
                return; // User already in block list
            }

            var $user2B=$('<div>',{
                	'class':'user2B'+(f_&&$cartDIV.find('.do .unfo:checked').length?' unfo':'')
                  , 'href':href
                  , 'uid':hashID
                })
                .append(
                    $('<a>',{
                        'class':'button del'
                      , html:'赦'
                      , href:'javascript:void(0);'
                      , click:function(){
                          	var $user=$(this).closest('.user2B')
                          	  , $cartDIV=$('#izh_blockCart')
                          	;
                            $user.remove();
                            var num2B=$cartDIV.find('.list .user2B').length;
                            $cartDIV.children('.do').attr('izh_num2B',num2B==0?'0':num2B>999?'1k+':num2B);
                            if(num2B)
                                iZhihu.QuickBlock.resizeBlockCart($cartDIV);
                            else
                                $cartDIV.css('height','');
                        }
                    })
                ).append($('<i>',{
                    'class':'say'
                  , html:'冤枉'
                  , 'data-tip':'p$t$'+userID
                })
                ).append($('<i>',{'class':'say_1'})
                ).append($('<i>',{'class':'say_2'})
                ).append($('<i>',{'class':cssF})
                ).append(
                    $('<a>',{
                        'class':'name'
                      , href:href
                      , html:userName
                      , target:'_blank'
                    })
                ).show()
            ;
            if(f_&&_f){
                $cart.eq(0).append($user2B);
            }else if(f_){
                $cart.eq(1).append($user2B);
            }else if(_f){
                $cart.eq(2).append($user2B);
            }else{
                $cart.eq(3).append($user2B);
            }
            var num2B=$cartDIV.find('.list .user2B').length;
            $cartDIV.children('.do').attr('izh_num2B',num2B==0?'0':num2B>999?'1k+':num2B);
            iZhihu.QuickBlock.resizeBlockCart($cartDIV);

            //iZhihu.QuickBlock.in2BlockCart()
        }).always(function(data,textStatus,jXHR){
            iZhihu.QuickBlock.in2BlockCart()
        });
    };
    this.addQuickBlock = function($vi,quickBlock){
        if($vi.is('.zm-item-vote-info') && !$vi.children('a[name=more]').length){
            if($vi.attr('izh-QuickBlock')!='1'){
                var $u=$('.voters a[href^="/people/"]',$vi);
                $u.each(function(i,e){
                    $('<input>',{'class':'izh-quick-block-sel',type:'checkbox'}).css({
                    }).insertBefore(e).hide().click(function(){
                        var $vi=$(this).closest('.zm-item-vote-info')
                          , $quickBlock=$vi.parent().find('.izh-quick-block')
                          , $users=$('input.izh-quick-block-sel:checked',$vi)
                        ;
                      	$quickBlock.attr('izh_num2B',$users.length);
                    });
                });
                $vi.attr('izh-QuickBlock','1');
            }
            if($vi.parent().children('a.izh-quick-block-switch').length)
                return;
            var width=$vi.closest('[data-aid]').width()
              , $btnQuickBlock=$('<a>',{
                    'class':'izh-quick-block-switch'
                  , html:'快速屏蔽'
                  , href:'javascript:void(0);'
                  , 'data-tip':'s$t$开始从赞同列表中选择屏蔽对象'
                }).css({
                    'position':'absolute'
                  , 'left':width
                  , 'width':'4em'
                }).click(function(){
                    if(this.getAttribute('on')=='1'){
                        $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).hide();
                        $(this).attr({'data-tip':'s$t$开始从赞同列表中选择屏蔽对象','on':'0'}).nextAll('.izh-quick-block').hide();
                        //this.setAttribute('on','0');
                    }
                    else{
                        $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).show();
                        $(this).attr({'data-tip':'s$t$结束从赞同列表中选择屏蔽对象','on':'1'}).nextAll('.izh-quick-block').show();
                        //this.setAttribute('on','1');
                    }
                }).insertBefore($vi)
              , $quickBlock=$('<div>',{'class':'izh-quick-block','izh_num2B':'0'}).css({'left':width}).insertBefore($vi).hide()
            ;
            $('<a>',{
                'class':'izh-quick-block-pend'
              , href:'javascript:void(0);'
              , html:'候审'
              , 'data-tip':'s$b$将所选之人列入候审名单以待收监<br/>包括答主'
            }).css({//$.extend(css_QuickBlock,{
                'margin-top':'1em'
              , 'font-size':'200%'
              , 'width':'2em'
            }).click(function(){
                var $pend=$(this)
                  , $quickBlock=$pend.closest('.izh-quick-block')
                  , $users2B=$('.zm-item-vote-info input.izh-quick-block-sel:checked',$quickBlock.parent())
                  , $a=$quickBlock.parent()
                  , $t=null
                ;
                if($a.is('.zm-item-answer-detail')){
                    $t=$a.children('.zm-item-rich-text').find('.zm-item-answer-author-info:first')
                }else if($a.is('.answer-head')){
                    $t=$a.parent('.zm-item-answer').children('.zm-item-answer-author-info')
                }
                iZhihu.QuickBlock.Users2B = []
                if($t&&$t.length){
                    iZhihu.QuickBlock.Users2B.push($t.children('.zm-item-answer-author-wrap').children('a:first'))
                }
                $users2B.each(function(i,e){
                    iZhihu.QuickBlock.Users2B.push($(e).next())
                });
                iZhihu.QuickBlock.in2BlockCart();
            }).prependTo($quickBlock);
            $('<a>',{
                'class':'izh-quick-block-selAll'
              , html:'无'
              , href:'javascript:void(0);'
              , 'data-tip':'s$r$无一选中'
            }).css({
                'margin-left':'3em'
            }).click(function(){
                var $quickBlock=$(this).closest('.izh-quick-block')
                  , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                $users.removeAttr('checked');
                $quickBlock.attr('izh_num2B',0);
            }).prependTo($quickBlock);
            $('<a>',{
                'class':'izh-quick-block-notAll'
              , html:'全'
              , href:'javascript:void(0);'
              , 'data-tip':'s$l$全部选中'
            }).css({
            }).click(function(){
                var $quickBlock=$(this).closest('.izh-quick-block')
                , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                $users.attr('checked','checked');
              	$quickBlock.attr('izh_num2B',$users.length);
            }).prependTo($quickBlock);
        }
    };
    this.addQuickBlockInOneComment = function($cmItem){
        var $where=$('.zm-comment-hd',$cmItem);
        if($where.find('.izh-quick-block-pend').length)return;
        $('<a>',{
            'class':'izh-quick-block-pend izh-button'
          , html:'候审'
          , href:'javascript:void(0);'
          , 'data-tip':'s$l$将此人列入候审名单以待收监'
        }).click(function(){
            iZhihu.QuickBlock.in2BlockCart($(this).next());
        }).prependTo($where).hide();
    };
    this.addQuickBlockInCommentList = function($where){
        // Region: 快速屏蔽
        var $cm=$where.is('.zm-comment-box')?$where:$where.closest('.zm-comment-box')
          , $u=$('.zm-item-comment',$cm)
        ;
        $u.each(function(i,e){
            iZhihu.QuickBlock.addQuickBlockInOneComment($(e));
        });
        var $btnQuickBlock=$('<a>',{
                'class':'izh-quick-block-switch izh-button'
              , html:'快速屏蔽'
              , href:'javascript:void(0);'
              , 'data-tip':'s$t$开始从评论者中选择屏蔽对象'
            }).css({'margin-left':7}).prependTo($where).click(function(){
                if(this.getAttribute('on')=='1'){
                    $('.zm-comment-hd .izh-quick-block-pend').hide();
                    $(this).attr({'data-tip':'s$t$开始从评论者中选择屏蔽对象','on':'0'}).removeClass('on');
                }
                else{
                    $('.zm-comment-hd .izh-quick-block-pend').show();
                    $(this).attr({'data-tip':'s$t$结束从评论者中选择屏蔽对象','on':'1'}).addClass('on');
                }
            })
        ;
        if($cm.is('.empty')){
            $btnQuickBlock.hide();
        }
        // Region end
    };
    
    iZhihu.$body.bind('DOMNodeInserted',function(event){
        $(event.target).filter('#zh-tooltip').bind('DOMNodeInserted',function(event){
            var $a=$(event.target).filter('#zh-tooltip-people').find('a[name=focus]')
              , bid=$a.attr('id')
              , who=','+bid+','
            ;
            if($a.is('.zg-btn-unfollow')&&iZhihu.QuickBlock.Unfollowed.Users.indexOf(who)>=0){
                $a.html('关注').removeClass('zg-btn-unfollow').addClass('zg-btn-follow');
            }
            if($a.is('.zg-btn-follow')&&iZhihu.QuickBlock.Refollowed.Users.indexOf(who)>=0){
                $a.html('取消关注').removeClass('zg-btn-follow').addClass('zg-btn-unfollow');
            }
        });
    });
    return this;
}

/**
 * @class QuickFavo
 */
function QuickFavo(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['QuickFavo']) {
        return null;
    }
    iZhihu.QuickFavo = this;
    
    var htmlSpinner = '<i class="spinner-gray"></i>'
      , htmlLoading = htmlSpinner + '&nbsp;加载中...&nbsp;'
    ;
    
    this.DefaultCount = 4;
    this.PinnedList = iZhihu.config['QuickFavoPinned'];
    this.css = 
        ['.izh-Pin4QuickFavo{padding:3px 5px 0;float:right;display:block;margin-top:4px;margin-right:2em;line-height:1.25;}'
        ,'.izh-Pin4QuickFavo .zm-item-top-btn{visibility:visible;margin:0 4px;float:right;}'
        ,'div.izh_fav{position:absolute;z-index:9999;display:none;border:1px solid #999999;background-color:#fff;border-radius:5px 5px 5px 0;margin-left:-1px;}'
        ,'div.izh_fav .title{padding:0 5px;background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center;border-radius:3px 3px 0 0;}'
        ,'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 36px 0 24px;line-height:2;}'
        ,'div.izh_fav a.fav i{position:absolute;margin-top:0.5em;}'
        ,'div.izh_fav a.fav i.spinner-gray{left:0;}'
        ,'div.izh_fav a.fav i.z-icon-collect{left:10px;visibility:hidden;background-position:-56px -36px;}'
        ,'div.izh_fav a.fav.selected i.z-icon-collect{visibility:visible;}'
        ,'div.izh_fav a.fav:hover{text-decoration:none}'
        ,'div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}'
        ,'.meta-item.on{position:relative;z-index:10000;background-color:#fff;border:1px solid #999999;border-top-color:#fff;margin:-1px -8px -1px -1px;padding:0 7px;border-radius:2px 2px 3px 3px;}'
        ,''].join('\n');
    this.addQuickFavo = function($v,$a){
        if($v.length){
            if($a.children('.izh_fav').length<=0){
                $('<div class="izh_fav">'+htmlLoading+'</div>').bind('mouseover',function(){
                    $(this).show().parent().find('.meta-item[name=favo]').addClass('on');
                }).bind('mouseout',function(){
                    $(this).hide().parent().find('.meta-item[name=favo]').removeClass('on');
                }).appendTo($a);
            }
            $v.bind('mouseenter',function(){
                var $a=iZhihu.getItem($(this))
                  , $m=$(this).addClass('on').closest('.zm-item-meta')
                  , aid=$a.attr('data-aid')
                  , $op=$(this).offsetParent()
                  , bottom1=parseInt($op.css('margin-bottom'))
                  , bottom2=parseInt($a.css('padding-bottom'))
                ;
                $a.children('.izh_fav').css({
                    'bottom':(isNaN(bottom1)?0:bottom1)+(isNaN(bottom2)?0:bottom2)+$op.height()-$(this).position().top
                  , 'left':$(this).position().left
                }).show();
                $.getJSON('http://www.zhihu.com/collections/json',$.param({answer_id:aid}),function(result,status,xhr){
                    var aid=this.url.substr(this.url.indexOf('answer_id=')+10)
                      , sel=pageIs.Question?'.zm-item-answer'
                           :pageIs.Home?'.feed-item'
                           :pageIs.Answer?'.zm-item-answer'
                           :''
                      , $a=$(sel+'[data-aid='+aid+']')
                      , $v=$a.children('.izh_fav').html([
                            '<div class="title"title="以下为最近选择的收藏夹">快速收藏</div>'
                          //, '<div class="pinned"></div><div class="normal"></div>'
                        ].join(''))
                    ;
                    if(''==sel)return;
                    var favAll=result.msg[0]
                      , favSel=result.msg[1]
                      , num=iZhihu.QuickFavo.DefaultCount
                      , fav=new Array()
                      , favNormal=new Array()
                    ;
                    $.each(favAll,function(i,e){
                        var fID=e[0]
                          , pinned=iZhihu.QuickFavo.PinnedList[fID]
                        ;
                        if(pinned){
                          fav.push(e);
                        }else{
                          favNormal.push(e);
                        }
                    });
                    num -= fav.length;
                    if(num > 0){
                        fav=fav.concat(favNormal.slice(0,num));
                    }
                    favNormal.length=0;
                    while(fav.length){
                        var e=fav.shift()
                          , fID=e[0]
                          , fName=e[1]
                        ;
                        favNormal[fID]=fName;
                        var $f=$('<a/>',{
                                'class':'fav'
                              , href:'javascript:;'
                              , aid:aid
                              , fid:fID
                              , html:fName
                            }).click(function(){
                                var u='http://www.zhihu.com/collection/'
                                  , $f=$(this)
                                  , $i=$f.children(':first')
                                ;
                                if($i.hasClass('spinner-gray'))return;
                                u+=$f.hasClass('selected')?'remove':'add';
                                $i.attr('class','spinner-gray');
                                $.post(u,$.param({_xsrf:$('input[name=_xsrf]').val(),answer_id:$(this).attr('aid'),favlist_id:$(this).attr('fid')}),function(result){
                                    var act=this.url.substring(this.url.lastIndexOf('/')+1)
                                      , fid=utils.getParamInQuery(this.data,'favlist_id')
                                      , aid=utils.getParamInQuery(this.data,'answer_id')
                                      , sel=pageIs.Question?'.zm-item-answer'
                                           :pageIs.Home?'.feed-item'
                                           :''
                                      , $vi=''==sel?null:$(sel+'[data-aid='+aid+'] .izh_fav a[fid='+fid+']')
                                      , inc=0;
                                    if(''==sel)return;
                                    if(act=='remove'&&result.msg=='OK'){
                                        $vi.removeClass('selected');
                                        inc=-1;
                                    }else if(act=='add'&&result.msg.length){
                                        $vi.addClass('selected');
                                        inc=1;
                                    }
                                    if(inc!=0){
                                        $vi.children('span').html(parseInt($vi.children('span').html())+inc);
                                    }
                                    $vi.children(':first').attr('class','z-icon-collect');
                                });
                            }).prepend($('<i/>',{'class':'z-icon-collect'}))
                              .append($('<span/>',{html:e[3]}));
                        $f.appendTo($v/*.children(pinned?'.pinned':'.normal')*/);
                    };
                    $.each(favSel,function(i,e){
                        if(favNormal[e])
                            $v.find('a.fav[fid='+e+']').addClass('selected');
                    });
                });
            });
            $v.bind('mouseleave',function(){
                var $a=iZhihu.getItem($(this).removeClass('on'));
                $a.children('.izh_fav').hide();
            });
        }
    };

    iZhihu.$body.bind('DOMNodeInserted',function(event){
		var $e=$(event.target);
		if($e.is('.modal-dialog')){
			$e.bind('DOMNodeInserted',function(event){
				var $e=$(event.target)
                  , $favList=$e.find('.zm-favo-list-content')
                ;
				if($favList.length){
					var $favItems=$favList.children('.zm-favo-list-item-link[data-lid]')
                      , funcPin=function(e){
                            var pinned=e.checked
                              , $e=$(e)
                              , $f=$e.closest('.zm-favo-list-item-link')
                            ;if(!$f.length)return;
                            var lid=$e.attr('lid')
                              , $checks=$e.closest('.zm-favo-list-content').find('.izh-Pin4QuickFavo .t_jchkbox')
                              , time=50
                              , cssStart={position:'relative','background-color':'#0874C4','z-index':'100'}
                              , cssEnd={position:'','background-color':'','z-index':''}
                              , funcRollUp=function(){
                                    var $b=$e.closest('.zm-favo-list-item-link')
                                      , $a=$b.prev()
                                    ;
                                    if(!$a.length||($a.hasClass('pinned')&&parseInt($a.attr('data-lid'))<parseInt($b.attr('data-lid')))){
                                        return;
                                    }
                                    $b.animate({bottom:$a.outerHeight()},{
                                        duration:time
                                      , step:function(now){$b.css(cssStart);}
                                      , complete:function(){
                                            $b.css($.extend({bottom:0},cssEnd));
                                            $b.insertBefore($a);
                                            funcRollUp();
                                        }
                                    });
                                }
                              , funcRollDown=function(){
                                    var $a=$e.closest('.zm-favo-list-item-link')
                                      , $b=$a.next()
                                    ;
                                    if(!$b.length||(!$b.hasClass('pinned')&&parseInt($b.attr('index'))>parseInt($a.attr('index')))){
                                        return;
                                    }
                                    $a.animate({top:$b.outerHeight()},{
                                        duration:time
                                      , step:function(now){$a.css(cssStart);}
                                      , complete:function(){
                                            $a.css($.extend({top:0},cssEnd));
                                            $a.insertAfter($b);
                                            funcRollDown();
                                        }
                                    });
                                }
                            ;
                            if(pinned){
                                $f.addClass('pinned');
                                funcRollUp();
                            }else{
                                $f.removeClass('pinned');
                                funcRollDown();
                            }
                            iZhihu.QuickFavo.PinnedList[lid]=pinned;
                            utils.setCfg('QuickFavoPinned',iZhihu.QuickFavo.PinnedList);
                        }
                    ;
					$favItems.each(function(i,e){
						var lid=e.getAttribute('data-lid')
                          , $pin=$('<a/>',{
                                href:'javascript:void(0);'
                              , 'class':'izh-Pin4QuickFavo'
                              , 'lid':lid
                              , 'data-tip':'s$b$保持在「快速收藏」菜单顶部显示'
                            }).append($('<span/>',{html:'置顶'}).add('<i/>',{'class':'zm-item-top-btn'}))
                              .appendTo($('.zg-gray',e)).attr('index',i)
                        ;
                        e.setAttribute('index',i);
                        $pin.bind('click',function(event){
                            this.checked=!this.checked;
                            funcPin(this);
                            if(this.checked){
                                $(this).children('span').html('取消置顶');
                                $(this).children('i').addClass('zm-item-top-btn-cancel');
                            }else{
                                $(this).children('span').html('置顶');
                                $(this).children('i').removeClass('zm-item-top-btn-cancel');
                            }
                            if(event.preventDefault)
                                event.preventDefault();
                            else if(event.stopPropagation)
                                event.stopPropagation();
                            else
                                event.cancelBubble=true;
                            return false;
                        })[0].checked=false;
                        if(iZhihu.QuickFavo.PinnedList[lid]){
                            $pin.click();
                        }
					});
				}
			});
		}
	});

    return this;
}

allLinks=function(_name,_listSel,_listName){
    this.name=_name;
    this.listSel=_listSel;
    this.listName=_listName;
    this.dlgID='izh-dlg-'+_name;
    this.$dlg=null;
    var _initialTitle=_listName+'地址清单',_result=new Array(),_loadTimes=0;

    //初始化弹出框
    this.initDialog = function(){
      this.$dlg=$('#'+this.dlgID);
      var retVal=0<this.$dlg.length;
      if(!retVal){
        var dom = [
          '<div id="'+this.dlgID+'" class="modal-dialog allLinks" tabindex="0" style="display: none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">'+_initialTitle+'</span>',
              '<span class="modal-dialog-title-text izhihu-collection-info"></span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<div class="izhihu-collection-links" tabIndex="-1" class="zg-form-text-input" style="height:300px;overflow-y:scroll;outline:none;">',
                  '</div>',
                  '<form action="http://ilovezhihu.duapp.com/saveMe.py"method="post"target="_blank"style="display:none"><textarea style="width: 100%;" name="links"class="izhihu-collection-links-post"></textarea><input name="title"/></form>',
                '</div>',
                '<div class="zm-command">',
                  '<div class="zg-left">',
                  '<a class="zg-btn-blue reload" href="javascript:;">重新获取</a>',
                  '</div>',
                  //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
                  '<a class="zg-btn-blue save" href="javascript:;">保存</a>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        this.$dlg = $(dom).appendTo(document.body).attr('name',_name).attr('listSel',_listSel);
        if(this.$dlg.length)
            retVal=true;

        $('.modal-dialog-title-close',this.$dlg).click(function(){
          $('#zh-global-spinner').hide();
          $('.modal-dialog-bg').hide();
          $(this).parentsUntil('.modal-dialog').parent().hide();
        });

        //拖动
        this.$dlg.drags({handler:'.modal-dialog-title-draggable'});
        
        $('.save',this.$dlg).click(function(){
            var $dlg=$(this).parentsUntil('.modal-dialog-content').parent()
              , $links=$dlg.find('.izhihu-collection-links')
              , $linksPost=$dlg.find('.izhihu-collection-links-post')
              , $linksTitle=$linksPost.next()
              , $form=$linksPost.parent()
              , links=''
            ;
            $links.find('li a').each(function(i,e){
                links+=e.getAttribute('href')+'\n';
            });
            $linksPost.val(links);
            $linksTitle.val($('#zh-fav-head-title,.zm-profile-header-main .title-section a.name').text());
            $form.submit();
        });
        
        $('.reload',this.$dlg).click(function(){
            var $d=$(this).parentsUntil('.modal-dialog').parent();
            handler(1,Number(url.data.param.query['page']),$d);
        });
      }
      return retVal;
    };
    this.start=function($d){
        if($('#zh-global-spinner:visible').length)return;
        if(!$d)$d=this.$dlg;
        if(!$d)return;
        if(!$('.izhihu-collection-links',$d).children().length){
            handler(1,Number(url.data.param.query['page']),$d);
        }
    };

//分析内容
var processNode = function(content,$dlg){
  var $qCurrent = null;
  $('.zm-item-answer', content).each(function(index, item){
    var $a = $(item)
      , $q = $a.closest(".zm-item").children("h2").children("a")
    ;
    if($q.length){
      $qCurrent=$q;
    }else if($qCurrent){
      $q=$qCurrent;
    }else{
      return;
    }
    var hrefQuestion = url.data.attr["base"] + $q.attr("href").replace(url.data.attr["base"],'');
    var obj = {
        title: $q.text(),
        //questionUrl: hrefQuestion,
        answerUrl: hrefQuestion + ($a.parent().is(".zm-item-fav") ? "/answer/" + $a.attr("data-atoken") : ""),
        answerAuthor: $a.find('.zm-item-answer-author-wrap a[href^="/people"]').text().trim(),
        summary: $a.find(".zm-item-answer-summary").children().remove().end().text(),
        content: $a.find(".zm-editable-content").html()
    };
    _result.push(obj);
    var str = utils.formatStr('<li style="list-style-type:none"><a href="{answerUrl}" title="* 《{title}》&#13;* {answerAuthor}：&#13;* {summary}">{answerUrl}</a></li>', obj);
    $('.izhihu-collection-links',$dlg).append(str);
    var count=_result.length;
    $('.izhihu-collection-info',$dlg).html('（努力加载中...已得到记录 ' + count + ' 条）');
  });
};
    
var handler = function(pageWant,pageNow,$dlg){
  if (!pageNow)pageNow=1;
  if($dlg.is(':hidden')){
    var count=_result.length;
    $('.izhihu-collection-info',$dlg).html('（加载被终止...已得到记录 ' + count + ' 条）');
    $('#zh-global-spinner').hide();
    return;
  }
  
  if(pageWant==1){
    $('.izhihu-collection-links',$dlg).empty();
    $('#zh-global-spinner').show();
    _result.length=0;
    _loadTimes++;
    $('.izhihu-collection-info',$dlg).html('');
  }
  var $pager=$(_listSel).parent().find('.zm-invite-pager')
    , $lastPage=$pager.children('span').last().prev()
    , totalCount=$pager.length==0?1:Number($lastPage.text())
  ;
  if(pageWant>totalCount){
    $('.izhihu-collection-info',$dlg).html('（加载完成，共得到记录 ' + _result.length + ' 条）');
    $('#zh-global-spinner').hide();
    $('.selAll',$dlg).click();
    return;
  }

  var pageNext=pageWant+1;
  if(pageWant==pageNow){
    processNode($(_listSel).html(),$dlg);
    handler(pageNext,pageNow,$dlg)
  }else{
    var _url=url.data.attr['base']+url.data.attr['path']+'?page='+pageWant;
    $.ajax(_url,{type:'get',context:{loadTimes:_loadTimes}}).done(function(result){
      if(this.loadTimes!=_loadTimes)return;
      processNode(result,$dlg);
      handler(pageNext,pageNow,$dlg)
    });
  }
};

};

/**
 * 回答页
 */

$(function(){
  if(pageIs.Answer){

var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
;

    var $questionWrap=$('#zh-question-meta-wrap');
    $questionWrap.children('.panel-container').bind('DOMNodeInserted',function(event){
        window.iZhihu.Comment.processComment($(event.target));
    });
    if(window.iZhihu.Comment.RightComment){
        //$questionWrap.children('.meta-item[name=addcomment]').prependTo($questionWrap);
        window.iZhihu.Comment.processCommentButton($questionWrap);
        if(!$('#izh_QuestionShadow').length){
            $('<div>',{'class':'izh_boxShadow',id:'izh_QuestionShadow'}).css({
                'z-index': '-1'
              , 'position': 'relative'
              , 'top': -25
              , 'margin-left': -32
            }).prependTo('#zh-single-question').hide();
        }   
    }

    //process each answer
    var $listAnswers=$('.zm-item-answer,.feed-item','#zh-single-answer-page');
    if($listAnswers&&$listAnswers.length){
        $listAnswers.each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),null
              , izhAuthorRear
              , false);
        });
    }

    $('#zh-question-answer-wrap').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item-answer');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na,null
                , izhAuthorRear
                , false);
        }
    });

    var $cm=$('.zm-comment-box',$questionWrap);
    if($cm.length && $cm.is(':visible')){
    	var focusName = iZhihu.Comment.scrollFocusCommentOnPageLoad($cm);

    	iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
            iZhihu.Comment.processComment($cm, focusName);
        });
    }
  }
})
/**
 * 收藏页
 */
$(function(){
  if(pageIs.Collection){
    //添加按钮
    $('#zh-list-meta-wrap')
      .append('<span class="zg-bull">•</span>  ')
      .append('<a href="javascript:;" id="getAllLinks">地址清单</a>');

    var btn = $('#getAllLinks');
    var result = [];
        
    //注册点击事件
    btn.click(function(){
      var allLinksCollection=new allLinks('Collections','#zh-list-answer-wrap','收藏夹内容');
	  if(!allLinksCollection.initDialog())return;
      $('.modal-dialog-bg').show();
      var y = ($win.height() - allLinksCollection.$dlg.width()) / 2
        , x = ($win.width() - allLinksCollection.$dlg.width()) / 2
      ;
      allLinksCollection.$dlg.css({'top': y, 'left': x}).fadeIn('slow');
      allLinksCollection.start();
    });
  }
  if(pageIs.Answers){
    //添加按钮
    $('.zm-profile-section-name')
      .append('<span class="zg-bull">•</span>  ')
      .append('<a href="javascript:;" id="getAllLinks">地址清单</a>');

    var btn = $('#getAllLinks');
    var result = [];
        
    //注册点击事件
    btn.click(function(){
      var allLinksAnswers=new allLinks('Answers','#zh-profile-answer-list','用户回答');
	  if(!allLinksAnswers.initDialog())return;
      $('.modal-dialog-bg').show();
      var y = ($win.height() - allLinksAnswers.$dlg.width()) / 2
        , x = ($win.width() - allLinksAnswers.$dlg.width()) / 2
      ;
      allLinksAnswers.$dlg.css({'top': y, 'left': x}).fadeIn('slow');
      allLinksAnswers.start();
    });
  }

  if(pageIs.MyCollection&&window.iZhihu.QuickFavo){
    var $favItems=$('#zh-favlists-wrap').children('.zm-item');
    $favItems.each(function(i,e){
    });
  }
})
/*
 * 首页
 */
$(function(){
    var $topstory=$('#is-topstory')
      , isTopStory=$topstory&&$topstory.length
      , propFeedType='data-type'//:'data-feedtype'
      , $lblHomeTitle=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      , $feedList=$('.zh-general-list')//feed_list
      , $topLinkHome=$('#zh-top-link-home')
      , $filter=//isTopStory?
            $('<span>',{
                'class':'izh-feeds-filter'
              , html:[''
                  , '<a class="izh-button izh-feeds-filter-option"showFeeds="q"><i class="zg-icon"></i>问题</a>'
                  , '<a class="izh-button izh-feeds-filter-option"showFeeds="a"><i class="zg-icon"></i>回答</a>'
                  , '<a class="izh-button izh-feeds-filter-option"showFeeds="p,r"data-tip="s$t$专栏、圆桌"><i class="zg-icon"></i>其他</a>'
                ].join('')
            })
      , $filterInfo=$('<a>',{'class':'izh-feeds-filter-info nothing',href:'javascript:void(0);'}).on('click',function(){$filter.trigger($filter.is(':hidden')||$filter.attr('doing')=='hide'?'show':'hide');})
      , ShowFeeds=function(type,enable){
            var id="izhCSS_FilterFeed_"+type
              , nd=document.getElementById(id)
            ;
            if(enable){
                if(nd)nd.parentNode.removeChild(nd);
            }else if(heads.length){
                if(!nd){
                    nd=_doc.createElement('style');
                    nd.type='text/css';
                    nd.id=id;
                    nd.appendChild(_doc.createTextNode('.feed-item['+propFeedType+'^="'+type+'"]{display:none}'));
                    heads[0].appendChild(nd);
                }
                //{ROUNDTABLE_ADD_RELATED: "roundtable",ARTICLE_VOTE_UP: "post_vote",ARTICLE_CREATE: "post_create",RECOMMENDED: "feed_recommended",QUESTION_FOLLOW: "feed_question_follow",QUESTION_CREATE: "feed_question",ANSWER_VOTE_UP: "feed_answer_vote",ANSWER_CREATE: "feed_answer_answer"};
            }
        }
      , refreshFilterInfo=function(){
            var count=$feedList.children('.feed-item:hidden').length
              , info='&nbsp;>过滤选项<'
            ;
            if(count){
                info='（'+count+'条动态被隐藏）';
                $filterInfo.removeClass('nothing').css({display:''});
            }else{
                $filterInfo.addClass('nothing');
            }   
            $filterInfo.html(info);
        }
      , feedsColumns=function(){ // Implemented by morley, modified by unogz
            //动态的类型
            var feedTypes = //isTopStory?
                [{
                 index: 0,
                 name: '全部',
                 codeName: ''
                }, {
                 index: 1,
                 name: '问题',
                 codeName: 'q'
                }, {
                 index: 2,
                 name: '回答',
                 codeName: 'a'
                }, {
                 index: 3,
                 name: '专栏',
                 codeName: 'p'
                }];
            
            //自定义 CSS 到 head
            var styles = [];
            
            styles.push('.za-filter{display: inline-block;margin-right:10px;cursor:pointer;color:#999;}');
            styles.push('.za-filter.active{color:#259;}');
            styles.push('.za-filter>.zg-num.hide{display:none;}');
            
            $('<style/>').html(styles.join('')).appendTo('head');
            
            var $zhHomeListTitle = $lblHomeTitle;
            
            //根据类型添加过滤按钮 到 #zh-home-list-title
            var filterBtns = []
              , i = feedTypes.length;
            
            while (i--) {
             filterBtns.push(
                 $('<span class="za-filter"/>')
                 .attr('typeIndex', feedTypes[i].index)
                 .html(feedTypes[i].name)
                 .append($('<span class="zg-num"/>').addClass('hide'))
                 .on('click', toggleFeedType)
             );
            }
            
            filterBtns.reverse();
            filterBtns[0].addClass('active');
            var curfeedTypeCodeName = '';
            
            $zhHomeListTitle.html(
             $zhHomeListTitle.html().replace('最新动态', '')
            ).find('i').eq(0).after(filterBtns).remove();
            
            var $targetZero = filterBtns[0].find('.zg-num');
            
            function typeMatch($elem) {
             if (curfeedTypeCodeName == '') {
                 $elem.show();
             } else if (0 <= $elem.attr(propFeedType).indexOf(curfeedTypeCodeName)) {
                 $elem.show();
             } else {
                 $elem.hide();
             }
            }
            
            //按钮事件
            function toggleFeedType() {
             var $clicked = $(this);
             $clickedNum = $clicked.find('.zg-num');
             // 交互效果
             filterBtns.forEach(function(item) {
                 item.removeClass('active');
             });
            
             $clicked.addClass('active');
            
             if ($clicked.attr('typeIndex') == 0) {
                 $('.zg-num', '.za-filter').html('').addClass('hide');
             } else {
                 var totalUnread = (parseInt($targetZero.html()) || 0) - (parseInt($clickedNum.html()) || 0);
                 if (totalUnread != 0) {
                     $targetZero.html(totalUnread);
                 } else {
                     $targetZero.html('').addClass('hide');
                 }
            
                 $clickedNum.html('').addClass('hide');
             }
             curfeedTypeCodeName = feedTypes[$clicked.attr('typeIndex')].codeName;
             // 信息流过滤
             $('.feed-item').each(function() {
                 typeMatch($(this));
             });
            }
            
            function getTypeIndexByCodeName(codeName) {
             var i = feedTypes.length;
             while (i--) {
                 if (codeName == feedTypes[i].codeName) {
                     return i;
                 };
             }
            }
            
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            
            //监听推送
            var hasNewFeed = false;
            //create an observer instance
            var observer = new MutationObserver(function(mutations) {
             if ( !! parseInt($btnNewActivity.html())) {
                 mutations.forEach(function(mutation) {
                     if (mutation.type === 'childList') {
                         console.log('Has New Feed');
                         // 有新推送则触发之
                         hasNewFeed = true;
                         $btnNewActivity.html('');
                         $.when($btnNewActivity[0].click()).done(function() {
                             setTimeout(function() {
                                 hasNewFeed = false;
                             }, 1000);
                         });
                     }
                 });
             };
            });
            
            //pass in the target node, as well as the observer options
            observer.observe(
             $btnNewActivity[0], {
                 childList: true
             });
            
            //监听插入
            $feedList.on("DOMNodeInserted", function(e) {
             var $self = $(e.target);
            
             if ($self.hasClass('feed-item')) {
                 if (hasNewFeed) {
                     $self.hide();
                     var $target = filterBtns[getTypeIndexByCodeName($self.attr(propFeedType))].find('.zg-num');
                     $target.html((parseInt($target.html()) || 0) + 1).removeClass('hide');
                     $targetZero.html((parseInt($targetZero.html()) || 0) + 1).removeClass('hide');
                 } else {
                     typeMatch($self);
                 }
             }
          });
        }
      , homeFeeds=function(izhHomeFeedsColumns){
            if (izhHomeFeedsColumns){
                feedsColumns();
            }else{
                $filter.children('.izh-feeds-filter-option').addClass('on').click(function(event){
                    var i=0
                      , $e=$(this)
                      , fs=$e.attr('showFeeds')
                      , fa=fs.split(',')
                    ;
                    $('.izh-feeds-filter-option[showFeeds="'+fs+'"]').toggleClass('on');
                    for(;i<fa.length;i++){
                        ShowFeeds(fa[i],$e.is('.on'));
                    }
                    refreshFilterInfo();
                });
                if($topLinkHome.length){
                    var $filter2=$('<div>')
                            .css({position:'absolute',border:'1px solid #777',backgroundColor:'#fff'}).hide()
                            .append($filter.clone(true,true).css({display:'block'}))
                            .on('show',function(){
                                var $e=$(this).stop();
                                if($e.is(':hidden'))
                                    $e.css({display:'',opacity:0})
                                $e.animate({opacity:1},'slow');
                            })
                            .on('hide',function(){
                                var $e=$(this).stop();
                                $e.fadeOut('slow');
                            })
                    ;
                    $topLinkHome.after($filter2).parent()
                        .on('mouseenter',function(event){
                            var $e=$(this)
                              , $f=$e.children().last()
                            ;
                            $f.trigger('show');
                            $filterInfo.filter('.nothing').hide();
                        })
                        .on('mouseleave',function(event){
                            var $e=$(this)
                              , $f=$e.children().last()
                            ;
                            $f.trigger('hide');
                            $filterInfo.filter('.nothing').hide();
                        })
                    ;
                }
                if($lblHomeTitle.length){
                    $filterInfo.css({
                        display:'none'
                      , textDecoration:'none'
                      , cursor:'pointer'
                    }).insertBefore(isTopStory?$topstory:$('#feed-ver'));
                    $lblHomeTitle.css({overflow:'hidden'})
                        .prepend($filter)
                        //.children('i:first')
                        .on('mouseenter',function(event){
                            var $e=$(this)
                              , $f=$e.children('.izh-feeds-filter-info.nothing').stop()
                            ;
                            if($f.is(':hidden'))
                                $f.css({display:'',opacity:0})
                            $f.animate({opacity:1},'fast');
                        })
                        .on('mouseleave',function(event){
                            var $e=$(this)
                              , $f=$e.children('.izh-feeds-filter-info.nothing').stop()
                            ;
                            $f.fadeOut('fast');
                        })
                    ;
                    $filter.css({marginLeft:-$filter.width(),display:'none'})
                        .on('show',function(){
                            var $e=$(this);
                            if($e.attr('doing')==='show')return;
                            $e.attr('doing','show').stop();
                            if($e.is(':hidden'))
                                $e.css({display:''})
                            $e.animate({marginLeft:0},'slow',function(){$(this).css('display','').removeAttr('doing');});
                        })
                        .on('hide',function(){
                            var $e=$(this);
                            if($e.attr('doing')==='hide')return;
                            $e.attr('doing','hide').stop();
                            $e.animate({marginLeft:-$filter.width()},'slow',function(){$(this).css('display','none').removeAttr('doing');});
                        })
                        .on('mouseenter',function(event){
                            var $e=$(this)
                            ;
                            $e.trigger('show');
                        })
                        .on('mouseleave',function(event){
                            var $e=$(this)
                            ;
                            $e.trigger('hide');
                        })
                    ;
                    refreshFilterInfo();
                }
            }
        }
    ;
    if(pageIs.Home||pageIs.Debuts){
        $feedList.find('.feed-item').each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),null
              , izhAuthorRear
              , izhAuthorList
            );
        });
        $feedList.bind('DOMNodeInserted',function(event){
            var $item=$(event.target);
            if($item.is('.feed-item')){
                window.iZhihu.Answer.processAnswer($item,null
                  , $body.attr('izhAuthorRear')=='1'
                  , $body.attr('izhAuthorList')=='1'
                );
                refreshFilterInfo();
            }
        });
    }

    if (pageIs.Home){
        if (izhHomeNoti
         && $lblHomeTitle.length
         && $btnNewActivity.length
        ){
            $lblHomeTitle.css({
                'float':'left'
              , 'margin-bottom':'2px'
              , 'line-height':'32px'
              , 'width':'100%'
              }).next().css('clear','both');
            $btnNewActivity.css({
                'float':'right'
              , 'margin':'0'
              , 'line-height':'22px'
            }).appendTo($lblHomeTitle);
        }
        homeFeeds(window.iZhihu.config['HomeFeedsColumns']);
    }

});

/**
 * 问题页
 */

$(function(){
  if(pageIs.Question){

    var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
      , $listAnswers=$('#zh-question-answer-wrap,#zh-question-collapsed-wrap').children()//$('.zm-item-answer','#zh-single-question')
      , numAnswersCount=$listAnswers.length
      , $btnCollapsedSwitcher=$('#zh-question-collapsed-switcher')
      , numCollapsedCount=!$btnCollapsedSwitcher.length||$btnCollapsedSwitcher.is(':hidden')?0:parseInt($('#zh-question-collapsed-num').text())
      , numAnswersCountTotal=numAnswersCount+numCollapsedCount
      , $reply=$('#zh-question-answer-form-wrap')//reply_form
    ;
    if($lblQuestionMeta.length){
        var s=new Array()
          , $a=$('<a>')
          , $c=$('<span>',{'class':'zg-bull',html:'•'})
          , $p=$lblQuestionMeta.children('.zm-meta-panel').children('a.meta-item:last')
          , $m=$('.zu-answer-form-disabled-wrap:visible > a','#zh-question-answer-form-wrap')
        ;
        if($m.length){
            s.push($m.attr('href'));
            $a.html('我的回答');
        }else if($reply.length){
            var id='new_answer'
              , $b=$('<a>',{name:id}).before($reply.children().first());
            s.push('#draft');
            $a.html('我要回答');
        }
        $c.insertAfter($p);
        $a.attr('href',s.join('')).attr('target','_self')
            .insertAfter($c);
    }
    if (izhAuthorList&&
        numAnswersCountTotal>100&&
        confirm('这个问题的回答数较多，是否暂时关闭「iZhihu 回答目录」？')){
        //$('#izhCSS_comment').remove();
        //return;
        izhAuthorList=false;
        $body.attr('izhAuthorList','0');
    }
    console.log((new Date()).getTime());
    
    var $lblAnswersCount=$('#zh-question-answer-num')//answers_count
      , $uno=$('<div>',{'class':'uno',style:'float:left'})//izh_AuthorsList
      , $ppT=$('<span>',{'class':'meT',style:'display:none'})//izh_AuthorsList_TopSelfIndicator
      , $frm=$('<div>',{'class':'frame'})//izh_AuthorsList_frame
      , $ppB=$('<span>',{'class':'meB',style:'display:none'})//izh_AuthorsList_BottomSelfIndicator
      , $pp=$('<ul>',{'class':'pp'})//izh_AuthorsList_UL
      , $ppI=$('<div>')
    
    ;

    window.iZhihu.$unoAnswers = $uno

    //答案按时间排序
    if(utils.getCfg('answer_orderByTime')){
      client.click('.zh-answers-filter-popup div[data-key=added_time]');
    }
    
    var $questionWrap=$('#zh-question-meta-wrap');
    $questionWrap.children('.panel-container').bind('DOMNodeInserted',function(event){
        window.iZhihu.Comment.processComment($(event.target));
    });
    if(window.iZhihu.Comment.RightComment){
        //$questionWrap.children('.meta-item[name=addcomment]').prependTo($questionWrap);
        window.iZhihu.Comment.processCommentButton($questionWrap);
        if(!$('#izh_QuestionShadow').length){
            $('<div>',{'class':'izh_boxShadow',id:'izh_QuestionShadow'}).css({
                'z-index': '-1'
              , 'position': 'relative'
              , 'top': -25
              , 'margin-left': -32
            }).prependTo('#zh-single-question').hide();
        }   
    }

    //process each answer
    if($listAnswers&&$listAnswers.length){
        if(izhAuthorList){
            $uno.appendTo($banner);
            $ppT.appendTo($uno);
            $frm.appendTo($uno);
            $pp.appendTo($frm);
            $ppB.appendTo($uno);
            //uno.appendChild(ppI);
            $uno.$endOfLastA=$('<li class="endOfLastA">').appendTo($pp)
        }
        $listAnswers.each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),$pp
              , izhAuthorRear
              , izhAuthorList);
        });
        if($reply.children('.zu-answer-form-disabled-wrap').is(':hidden')){
            var $ppla=$('<a>',{href:'#draft',target:'_self'})
                .append('<table class="plus"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>')
                .append('<span class="name func">-new-</span>')
              , $ppl=$('<li>')
                .append($ppla)
                .appendTo($pp)
            ;
        }
    }
    var resizeAuthorList=function($f){
        // Adjust AuthorList's size and locate its position
        if(!$f||!$f.length)return;
        var frm=$f.get(0);
        var width=window.iZhihu.Answer.ppWidth
          , height=$win.height()-$main.offset().top-3-$f.position().top;
        if(frm.scrollHeight>height){
            $f.height(height);
            width+=20;
        }else{
            $f.height('');
        }
        $f.width(width);
    };
    if(isNaN(numCollapsedCount))numCollapsedCount=0;
    if($listAnswers.length||numCollapsedCount){
        if(izhAuthorList){
            $uno.css({
                'float':'none'
              , 'left':9-$uno.width()
            });
            if(!$btnCollapsedSwitcher.length&&!numCollapsedCount)
                resizeAuthorList($frm);
            $('<div>',{'class':'modal-dialog-title'}).css({
                  'border-top-left-radius':0
            }).insertBefore($ppT);
            $uno.mouseover(function(){
                resizeAuthorList($('.frame',this));
                $(this).css('left','0');
            }).mouseout(function(){
                $(this).css('left',9-$(this).width());
            });
            if(window.iZhihu.Answer._e){
                $uno.children('.meT').css('display',0>window.iZhihu.Answer._e.offsetTop-$frm.scrollTop()?'':'none');
                $uno.children('.meB').css('display',$frm.height()<window.iZhihu.Answer._e.offsetTop-$frm.scrollTop()+window.iZhihu.Answer._e.offsetHeight?'':'none');
            }
        }
        if($btnCollapsedSwitcher.length){
            if(numCollapsedCount>0){
                $('#zh-question-collapsed-wrap').show().bind('DOMNodeInserted',function(event){
                    var $a=$(event.target);
                    if($a.is('.zm-item-answer')){
                        window.iZhihu.Answer.processAnswer($a,$pp
                          , $body.attr('izhAuthorRear')=='1'
                          , $body.attr('izhAuthorList')=='1'
                        );
                        var count = $('.zm-item-answer[izh_processed=1]','#zh-question-collapsed-wrap').length;
                        if(count==numCollapsedCount){
                            resizeAuthorList($frm);
                        }
                    }
                });
            }
            $btnCollapsedSwitcher[0].click();
        }
    }

    $('#zh-question-answer-wrap').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item-answer');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na,$pp
              , $body.attr('izhAuthorRear')=='1'
              , $body.attr('izhAuthorList')=='1'
            );
        }
    });
    console.log((new Date()).getTime());

    var $cm=$('.zm-comment-box',$questionWrap);
    if($cm.length && $cm.is(':visible')){
        var focusName = iZhihu.Comment.scrollFocusCommentOnPageLoad($cm);
    
        iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
            iZhihu.Comment.processComment($cm, focusName);
        });
    }
  }
})
/**
 * 配置界面
 */
$(function(){
  var domBtnSettings = [
    '<li>',
      '<a href="javascript:void(0);" tabindex="-1">',
        '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>',
        'iZhihu',
      '</a>',
    '</li>'
  ].join('');

  var cbemptyimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=';
    var domDlgSettings = [
      '<div id="izh-dlg-settings" class="modal-dialog" tabindex="0" style="display:none;width:600px">',
        '<div class="modal-dialog-title modal-dialog-title-draggable">',
          '<span class="modal-dialog-title-text">配置选项</span>',
          '<span class="modal-dialog-title-close"></span>',
        '</div>',
        '<div class="modal-dialog-content">',
          '<div>',
            '<div class="zg-section">',
            '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="5"width="100%">',
            	'<thead>',
            		'<tr><td colspan="6"align="left"><b>功能开关</b>（更改后设置将立刻保存，但只有当页面再次打开时才会生效)</td></tr>',
            	'</thead>',
            	'<tbody>',
                '<tr style="display:none"><td colspan="4"align="left"title="">在首页直接浏览常去话题</td><td width="1px"align="right"></td><td width="1px"align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" name="HomeTopics" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">改变网页样式外观</td><td align="right"><i class="icon icon-help"data-tip="s$t$* 首页隐藏大头像<br/>* 缩进投票按钮（问题/回答页）<br/>* 按钮图标动画 "></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" name="HomeLayout" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">调整首页「新动态」提醒按钮</td><td align="right"><i class="icon icon-help"data-tip="s$t$挪到 Timeline 右上角<br/>与标题「最新动态」平行"></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" name="HomeNoti" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">开启「首页分栏」</td><td align="right"><i class="icon icon-help"data-tip="s$t$将首页动态分类单独显示：<br/>问题、回答、专栏"></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeFeedsColumns" name="HomeFeedsColumns" /></td></tr>',
                '<tr><td colspan="4"align="left">将用户信息挪到回答下方</td><td align="right"></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" name="AuthorRear" /></td></tr>',
                '<tr><td align="left">开启「右舷评论」</td><td align="right"><i class="icon icon-help"data-tip="s$t$在页面右侧浮动显示打开的评论列表<br/>在首页、问题、回答页中生效"></i></td><td width="1px"align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setRightComment" name="ShowComment" /></td>',
                '<td width="1px"align="left"nowrap>关闭时自动卷屏至对应条目</td><td align="right"><i class="icon icon-help"data-tip="s$t$仅对右舷评论生效"></i></td><td width="1px"align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setRightComment_AutoScrollPageWhenClosing" name="RightComment_AutoScrollPageWhenClosing" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">开启「快速屏蔽」（加入黑名单/取消关注）功能</td><td align="right"><i class="icon icon-help"data-tip="s$t$在赞同列表、评论列表中使用"></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickBlock" name="QuickBlock" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">开启「快速收藏」菜单</td><td align="right"><i class="icon icon-help"data-tip="s$t$鼠标移上「收藏」按钮时显示"></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" name="QuickFavo" /></td></tr>',
                '<tr><td colspan="4"align="left"title="">开启「回答目录」</td><td align="right"><i class="icon icon-help"data-tip="s$t$在问题页面左侧掩藏，鼠标移上时展开<br/>并在右侧即时显示回答预览"></i></td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" name="AuthorList" /></td></tr>',
            	'</tbody>',
            '</table>',
            '</div>',
              '<div class="zg-left">',
                '当前版本：'+version+'；',
                '最后更新：'+updateDate,
                '<br/>制作：',
                '<a data-tip="p$t$unogzx" href="/people/unogzx">@钢盅郭子</a>，',
                '<a data-tip="p$t$liuyong25" href="/people/liuyong25">@天猪(刘勇)</a>，',
                '<a data-tip="p$t$luoxr" href="/people/luoxr">@yukirock</a>，',
                '<a data-tip="p$t$morlay" href="/people/morlay">@墨磊</a>',
                '<br/>感谢：',
                '<a data-tip="p$t$PeterDeng" href="/people/PeterDeng">@邓文博</a>，<a data-tip="p$b$cakvfcwz" href="/people/cakvfcwz">@水云逸</a>',
              '</div>',
              '<div class="zm-command">',
              '<a id="izhRefresh" class="zg-btn-blue" href="javascript:void(0);">刷新网页</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
        
  $(domBtnSettings).insertBefore($('ul#top-nav-profile-dropdown li:last'))
  .click(function(){
    console.log(this);
    $('.modal-dialog-bg').show();
    $('input.t_rtjdchk','#izh-dlg-settings').each(function(i,e){
        if(utils.getCfg($(e).attr('name')))
            $(e).attr('checked','checked');
    });
    $('#izh-dlg-settings').css({'z-index':'89','position':'fixed','top': ($win.height() - $('#izh-dlg-settings').height()) / 2, 'left': ($win.width() - $('#izh-dlg-settings').width()) / 2}).fadeIn('slow');
  });
  var $dlg=$(domDlgSettings).appendTo(_doc.body);
  $dlg.drags({handler:'.modal-dialog-title-draggable'});
  $('.modal-dialog-title-close',$dlg).click(function(){
      $('.modal-dialog-bg').hide();
      $('#izh-dlg-settings').first().hide();
  });
  $('input.t_rtjdchk',$dlg).checkbox({cls:'t_jchkbox',empty:cbemptyimg});
  $('input.t_rtjdchk',$dlg).click(function(){
      var key=$(this).attr('name')
        , value=!this.checked;
      console.log(key+' = '+value);
      utils.setCfg(key,value);
  });
  $('#izhRefresh').click(function(){
    location.reload()
  })
})

var firstRun = parseInt(utils.getValue('izh_fr','1'));

function _FRshow(){
if(firstRun>0 && document.domain=='zhihu.com'){
    var tboxleft=0;
    var accitem1= $('#zh-top-inner div.top-nav-profile .zu-top-nav-userinfo');
    if(accitem1.length>0){
        tboxleft = accitem1.offset().left;
    }
    if(tboxleft>0){
        $('<div id="iZhihu_tbox" class="t_frshow"><div class="t_txtshow t_tbox">感谢使用 <b>iZhihu</b><br />您可通过菜单【iZhihu】对功能进行设置<br /><s><i></i></s></div></div>').appendTo('body.zhi').hide();
        $('#iZhihu_tbox').css('left',tboxleft-100).show().mouseenter(function(){
            utils.setValue('izh_fr','0');
            //_Menu();
                $(this).remove();
            });
        }
    }
}
    
setTimeout(function(){
    _FRshow();
},1000);

if(typeof window.iZhihuX === 'undefined' || !window.iZhihuX){
    //helper method to auto update
    function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
      try {
        if (!utils.getValue) return; // Older version of Greasemonkey. Can't run.
    
        // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
        // and a script with * includes or opening a tabgrop
        var DoS_PREVENTION_TIME = 2 * 60 * 1000;
        var isSomeoneChecking = utils.getValue('izh-CHECKING', null);
        var now = new Date().getTime();
        utils.setValue('izh-CHECKING', now.toString());
    
        if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
    
        // check daily
        var ONE_DAY = 24 * 60 * 60 * 1000;
        //var ONE_WEEK = 7 * ONE_DAY;
        //var TWO_WEEKS = 2 * ONE_WEEK;
        var lastChecked = utils.getValue('izh-LAST_CHECKED', null);
        if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;
    
    GM_xmlhttpRequest({
      method: 'GET',
        url: SCRIPT.url.replace('.user.','.meta.') + '?'+new Date().getTime(), // don't increase the 'installed' count just for update checks
        headers: {'Cache-Control': 'no-cache'},
        onload: function(result) {
              if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
        
              var theOtherVersion = RegExp.$1;
              var verList1 = RegExp.$1.split('.');
              var verList2 = SCRIPT.version.split('.');
              var isOldVersion = false;
              for(var i=0;i<verList1.length;i++){
                if(i<verList2.length){
                  var v1=parseInt(verList1[i])
                    , v2=parseInt(verList2[i])
                  if(v1!=v2){
                    isOldVersion = v1>v2;
                    break;
                  }
                }else{
                  break;
                }
              }
              if (!isOldVersion)
              {
                // no updates or older version on userscripts.orge site
                if(SCRIPT.forceUpdate)
                {
                  alert("您当前所安装的 v" + SCRIPT.version + " 是最新版本，无需更新。")
                }
                return;
              }
              //find the name of the script
              result.responseText.match(/@name\s+(.+)/);
              var scriptName = RegExp.$1;
              result.responseText.match(/@updateinfo\s+(.+)/);
              var updateInfo = RegExp.$1;
              updateInfo = updateInfo.replace(/\|/g,'<br>');
              _ShowUpdate(scriptName,SCRIPT.version,theOtherVersion,updateInfo,SCRIPT.web,SCRIPT.url);
           }
        });
        utils.setValue('izh-LAST_CHECKED', now.toString());
      } catch (ex) {
        console.log(ex);
      }
    }
    
    function _ShowUpdate(p_name,p_cur_ver,p_new_ver,p_updateinfo,p_weburl,p_scripturl){
        var domDlgSettings = [
          '<div id="izh-dlg-update" class="modal-dialog" tabindex="0" style="display:none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">更新提示</span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="100%"><thead><tr><td colspan="2"align="left"><b>脚本：'+p_name+'</b></td></tr></thead><tr><th style="width:20%;">当前版本</th><td style="width:80%;">'+p_cur_ver+'</td></tr><tr><th>最新版本</th><td>'+p_new_ver+'</td></tr><tr><th>更新内容</th><td class="t_upinfo">'+p_updateinfo+'</td></tr><tfoot><tr><td colspan="2"style="line-height:15px">提示：脚本更新安装完毕后请刷新当前页面</td></tr></tfoot></table>',
                  '</div>',
                  '<div class="zm-command">',
                  '<span href="javascript:void(0);" class="zm-command-cancel izh-cancel">取消</span>',
                  '<span class="zg-btn-blue izh-update" href="javascript:void(0);">更新</span>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        var $dlg=$(domDlgSettings).appendTo(_doc.body)
        ;
        $dlg.drags({handler:'.modal-dialog-title-draggable'});
        $dlg.find('.modal-dialog-title-close').click(function(){
            $(this).closest('.modal-dialog').hide();
            $('.modal-dialog-bg').hide();
        });
        $dlg.find('.izh-cancel').click(function(){
    	    $(this).closest('.modal-dialog').hide();
            $('.modal-dialog-bg').hide();
    	});
        $dlg.find('.izh-update')[0].onclick=function(){
            GM_openInTab(p_scripturl);
    	};
        $('.modal-dialog-bg').show();
        $dlg.css({
            'z-index':'123'
          , 'position':'fixed'
          , 'top': ($win.height() - $dlg.height()) / 2
          , 'left': ($win.width() - $dlg.width()) / 2
        }).fadeIn('slow');
    }
    
    function update(forceUpdate)
    {
      autoUpdateFromUserscriptsDotOrg({
        url: 'http://userscripts.org/scripts/source/126619.user.js',
        version: version,
        forceUpdate: forceUpdate,
        web: 'http://userscripts.org/scripts/show/126619'
      });
    }
    
    if(GM_registerMenuCommand){
        GM_registerMenuCommand('从 userscript.org 更新 iZhihu',function(){update(true)});
    }

    update(false);
}
