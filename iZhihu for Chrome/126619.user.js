// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.6.0
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==
var version = "2.4.99";

var updateDate = "2013-4-12";

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), 
                b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, 
                cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), 
                cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl);
            }
            ck[a] = e;
        }
        return ck[a];
    }
    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function() {
            c[this] = a;
        });
        return c;
    }
    function ct() {
        cr = b;
    }
    function cs() {
        setTimeout(ct, 0);
        return cr = f.now();
    }
    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function ci() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break;
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
            }
        }
        return c;
    }
    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break;
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break;
                }
                k || (k = i);
            }
            j = j || k;
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j];
        }
    }
    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d);
        }); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b);
    }
    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e);
    }
    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (;i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), 
        l = b$(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l;
    }
    function bZ(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (;e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], 
                i[j ? "unshift" : "push"](c);
            }
        };
    }
    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") for (;g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), 
            c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px";
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (;g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), 
        c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px";
    }
    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), 
        b.parentNode && b.parentNode.removeChild(b);
    }
    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild;
    }
    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm);
    }
    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
    }
    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), 
            c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue;
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(f.expando);
        }
    }
    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data);
            }
            h.data && (h.data = f.extend({}, h.data));
        }
    }
    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return f.grep(a, function(a, d) {
            return a === b === c;
        });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1;
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d);
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c;
        });
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function K() {
        return !0;
    }
    function J() {
        return !1;
    }
    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
        }, 0);
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1;
        }
        return !0;
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d;
                } catch (g) {}
                f.data(a, c, d);
            } else d = b;
        }
        return d;
    }
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b;
    }
    var c = a.document, d = a.navigator, e = a.location, f = function() {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left");
                } catch (a) {
                    setTimeout(J, 1);
                    return;
                }
                e.ready();
            }
        }
        var e = function(a, b) {
            return new e.fn.init(a, b, h);
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/gi, w = /^-ms-/, x = function(a, b) {
            return (b + "").toUpperCase();
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {
            constructor: e,
            init: function(a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this;
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this;
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [ null, a, null ];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), 
                            j ? e.isPlainObject(d) ? (a = [ c.createElement(j[1]) ], e.fn.attr.call(a, d, !0)) : a = [ k.createElement(j[1]) ] : (j = e.buildFragment([ g[1] ], [ k ]), 
                            a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a);
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h;
                        }
                        this.context = c, this.selector = a;
                        return this;
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
                }
                if (e.isFunction(a)) return f.ready(a);
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this);
            },
            selector: "",
            jquery: "1.7.1",
            length: 0,
            size: function() {
                return this.length;
            },
            toArray: function() {
                return F.call(this, 0);
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
            },
            pushStack: function(a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, 
                b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d;
            },
            each: function(a, b) {
                return e.each(this, a, b);
            },
            ready: function(a) {
                e.bindReady(), A.add(a);
                return this;
            },
            eq: function(a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1);
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            slice: function() {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
            },
            map: function(a) {
                return this.pushStack(e.map(this, function(b, c) {
                    return a.call(b, c, b);
                }));
            },
            end: function() {
                return this.prevObject || this.constructor(null);
            },
            push: E,
            sort: [].sort,
            splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), 
            k === j && (i = this, --j);
            for (;j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, 
                i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
            }
            return i;
        }, e.extend({
            noConflict: function(b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e;
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? e.readyWait++ : e.ready(!0);
            },
            ready: function(a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [ e ]), e.fn.trigger && e(c).trigger("ready").off("ready");
                }
            },
            bindReady: function() {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null;
                        } catch (d) {}
                        c.documentElement.doScroll && b && J();
                    }
                }
            },
            isFunction: function(a) {
                return e.type(a) === "function";
            },
            isArray: Array.isArray || function(a) {
                return e.type(a) === "array";
            },
            isWindow: function(a) {
                return a && typeof a == "object" && "setInterval" in a;
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a);
            },
            type: function(a) {
                return a == null ? String(a) : I[C.call(a)] || "object";
            },
            isPlainObject: function(a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (c) {
                    return !1;
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d);
            },
            isEmptyObject: function(a) {
                for (var b in a) return !1;
                return !0;
            },
            error: function(a) {
                throw new Error(a);
            },
            parseJSON: function(b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return new Function("return " + b)();
                e.error("Invalid JSON: " + b);
            },
            parseXML: function(c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser(), d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), 
                    d.async = "false", d.loadXML(c));
                } catch (g) {
                    d = b;
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d;
            },
            noop: function() {},
            globalEval: function(b) {
                b && j.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b);
                })(b);
            },
            camelCase: function(a) {
                return a.replace(w, "ms-").replace(v, x);
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
            },
            each: function(a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break;
                    } else for (;g < h; ) if (c.apply(a[g++], d) === !1) break;
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break;
                } else for (;g < h; ) if (c.call(a[g], g, a[g++]) === !1) break;
                return a;
            },
            trim: G ? function(a) {
                return a == null ? "" : G.call(a);
            } : function(a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "");
            },
            makeArray: function(a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
                }
                return c;
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (;c < d; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function(a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                a.length = d;
                return a;
            },
            grep: function(a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d;
            },
            map: function(a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (;i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), 
                f != null && (h[h.length] = f);
                return h.concat.apply([], h);
            },
            guid: 1,
            proxy: function(a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d;
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function() {
                    return a.apply(c, f.concat(F.call(arguments)));
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g;
            },
            access: function(a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) e.access(a, j, c[j], f, g, d);
                    return a;
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                    return a;
                }
                return i ? g(a[0], c) : b;
            },
            now: function() {
                return new Date().getTime();
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {
                    browser: b[1] || "",
                    version: b[2] || "0"
                };
            },
            sub: function() {
                function a(b, c) {
                    return new a.fn.init(b, c);
                }
                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, 
                a.sub = this.sub, a.fn.init = function(d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b);
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a;
            },
            browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            I["[object " + b + "]"] = b.toLowerCase();
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), 
        e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), 
        h = e(c), c.addEventListener ? B = function() {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready();
        } : c.attachEvent && (B = function() {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready());
        });
        return e;
    }(), g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function(b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g);
        }, n = function(b, f) {
            f = f || [], e = !a.memory || [ b, f ], i = !0, l = j || 0, j = 0, k = c.length;
            for (;c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break;
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), 
            o.fireWith(e[0], e[1])));
        }, o = {
            add: function() {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]));
                }
                return this;
            },
            remove: function() {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (;d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                        if (a.unique) break;
                    }
                }
                return this;
            },
            has: function(a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (;b < d; b++) if (a === c[b]) return !0;
                }
                return !1;
            },
            empty: function() {
                c = [];
                return this;
            },
            disable: function() {
                c = d = e = b;
                return this;
            },
            disabled: function() {
                return !c;
            },
            lock: function() {
                d = b, (!e || e === !0) && o.disable();
                return this;
            },
            locked: function() {
                return !d;
            },
            fireWith: function(b, c) {
                d && (i ? a.once || d.push([ b, c ]) : (!a.once || !e) && n(b, c));
                return this;
            },
            fire: function() {
                o.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!e;
            }
        };
        return o;
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add,
                fail: c.add,
                progress: d.add,
                state: function() {
                    return e;
                },
                isResolved: b.fired,
                isRejected: c.fired,
                then: function(a, b, c) {
                    i.done(a).fail(b).progress(c);
                    return this;
                },
                always: function() {
                    i.done.apply(i, arguments).fail.apply(i, arguments);
                    return this;
                },
                pipe: function(a, b, c) {
                    return f.Deferred(function(d) {
                        f.each({
                            done: [ a, "resolve" ],
                            fail: [ b, "reject" ],
                            progress: [ c, "notify" ]
                        }, function(a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function() {
                                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [ g ]);
                            }) : i[a](d[e]);
                        });
                    }).promise();
                },
                promise: function(a) {
                    if (a == null) a = h; else for (var b in h) a[b] = h[b];
                    return a;
                }
            }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function() {
                e = "resolved";
            }, c.disable, d.lock).fail(function() {
                e = "rejected";
            }, b.disable, d.lock), a && a.call(i, i);
            return i;
        },
        when: function(a) {
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
                };
            }
            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
                };
            }
            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (;c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b);
            } else j !== a && j.resolveWith(j, d ? [ a ] : []);
            return k;
        }
    }), f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", 
        d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], 
        b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, 
        b.optDisabled = !h.disabled;
        try {
            delete q.test;
        } catch (s) {
            b.deleteExpando = !1;
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
            b.noCloneEvent = !1;
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", 
        i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), 
        q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", 
        a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", 
        q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in {
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), 
        b[o + "Bubbles"] = p;
        k.removeChild(q), k = g = h = j = q = i = null, f(function() {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", 
            m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", 
            o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", 
            a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", 
            r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", 
            l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", 
            l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, 
            q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, 
            typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, 
            b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", 
            b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, 
            d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, 
            e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", 
            i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, 
            r.removeChild(a), q = a = null, f.extend(b, i));
        });
        return b;
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a);
        },
        data: function(a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i;
            }
        },
        removeData: function(a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [ b ] : (b = f.camelCase(b), b in d ? b = [ b ] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return;
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return;
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
            }
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0);
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b;
            }
            return !0;
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), 
                        l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0);
                    }
                }
                return h;
            }
            if (typeof a == "object") return this.each(function() {
                f.data(this, a);
            });
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [ d[0] ]), h === b && this.length && (h = f.data(this[0], a), 
                h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h;
            }
            return this.each(function() {
                var b = f(this), e = [ d[0], c ];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e);
            });
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a);
            });
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || [];
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), 
            f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b);
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
        }
    }), f.fn.extend({
        queue: function(a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) return f.queue(this[0], a);
            return this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [ e ]);
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, 
            l.add(m);
            m();
            return d.promise();
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, a, b, !0, f.attr);
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return f.access(this, a, b, !0, f.prop);
        },
        removeProp: function(a) {
            a = f.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = b, delete this[a];
                } catch (c) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g);
                    }
                }
            }
            return this;
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h);
                    } else g.className = "";
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b);
            });
            return this.each(function() {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
            });
        },
        hasClass: function(a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (;c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1;
        },
        val: function(a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function(d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                                return a == null ? "" : a + "";
                            })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
                        }
                    });
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d;
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (;c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b);
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h;
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1);
                    return c;
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return;
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d;
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g;
            }
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (;h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), 
                u.test(e) && c in a && (a[c] = !1));
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b;
                    }
                }
            },
            value: {
                get: function(a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null;
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
        },
        set: function(a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c;
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + "";
        }
    }, f.attrHooks.tabindex.set = w.set, f.each([ "width", "height" ], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c;
                }
            }
        });
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c);
        }
    }), f.support.hrefNormalized || f.each([ "href", "src", "width", "height" ], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d;
            }
        });
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b;
        },
        set: function(a, b) {
            return a.style.cssText = "" + b;
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null;
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }), f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
            }
        });
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function(a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b;
    }, H = function(a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
    }, I = function(a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
    };
    f.event = {
        add: function(a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, 
                j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b;
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, 
                    m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i);
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), 
                    f.event.global[m] = !0;
                }
                a = null;
            }
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue;
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], 
                    m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), 
                    s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), 
                    delete o[j]);
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, [ "events", "handle" ], !0));
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), 
                h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), 
                c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, 
                o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return;
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), 
                p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [ [ e, p.bindType || h ] ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (;m; m = m.parentNode) r.push([ m, s ]), n = m;
                    n && n === e.ownerDocument && r.push([ n.defaultView || n.parentWindow || a, s ]);
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], 
                q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), 
                q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], 
                n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result;
            }
        },
        dispatch: function(c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), 
                    o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    });
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, 
                    c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), 
                    n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()));
                }
            }
            return c.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, 
                g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), 
                a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), 
                !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a;
            }
        },
        fix: function(a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d; ) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), 
            a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a;
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = f.extend(new f.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c);
    }, f.Event = function(a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, 
        b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0;
    }, f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function() {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = K, this.stopPropagation();
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), 
                a.type = b;
                return h;
            }
        };
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0);
                }), d._submit_attached = !0);
            });
        },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit");
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                }), f.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
                });
                return !1;
            }
            f.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
                }), b._change_attached = !0);
            });
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            f.event.remove(this, "._change");
            return z.test(this.nodeName);
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0, e = function(a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0);
        };
        f.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0);
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0);
            }
        };
    }), f.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this;
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, 
            d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            g === 1 && (h = e, e = function(a) {
                f().off(a);
                return h.apply(this, arguments);
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function() {
                f.event.add(this, a, e, d, c);
            });
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1);
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                return this;
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this;
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function() {
                f.event.remove(this, a, d, c);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        live: function(a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this;
        },
        die: function(a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this;
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                f.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0);
        },
        toggle: function(a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function(c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e);
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        f.fn[b] = function(a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), 
        D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
    }), function() {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break;
                                }
                            } else if (m.filter(b, [ j ]).length > 0) {
                                k = j;
                                break;
                            }
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break;
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [ 0, 0 ].sort(function() {
            i = !1;
            return 0;
        });
        var m = function(b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break;
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [ d ] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), 
                d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), 
                    j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), 
                    o.relative[q](k, r, v);
                } else k = w = [];
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e;
        };
        m.uniqueSort = function(a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
            }
            return a;
        }, m.matches = function(a, b) {
            return m(a, null, null, b);
        }, m.matchesSelector = function(a, b) {
            return m(b, null, null, [ a ]).length > 0;
        }, m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break;
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {
                set: d,
                expr: a
            };
        }, m.filter = function(a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue;
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, 
                    d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break;
                    }
                }
                if (a === q) if (g == null) m.error(a); else break;
                q = a;
            }
            return s;
        }, m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        };
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a);
                } else if (d === 3 || d === 4) return a.nodeValue;
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e;
        }, o = m.selectors = {
            order: [ "ID", "NAME", "TAG" ],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href");
                },
                type: function(a) {
                    return a.getAttribute("type");
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
                    }
                    e && m.filter(b, a, !0);
                },
                ">": function(a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (;e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1;
                            }
                        }
                    } else {
                        for (;e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0);
                    }
                },
                "": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
                },
                "~": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [ d ] : [];
                    }
                },
                NAME: function(a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c;
                    }
                },
                TAG: function(a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1;
                },
                ID: function(a) {
                    return a[1].replace(j, "");
                },
                TAG: function(a, b) {
                    return a[1].replace(j, "").toLowerCase();
                },
                CHILD: function(a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
                    } else a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a;
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), 
                    a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a;
                },
                PSEUDO: function(b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        d || e.push.apply(e, g);
                        return !1;
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b;
                },
                POS: function(a) {
                    a.unshift(!0);
                    return a;
                }
            },
            filters: {
                enabled: function(a) {
                    return a.disabled === !1 && a.type !== "hidden";
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    return a.checked === !0;
                },
                selected: function(a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0;
                },
                parent: function(a) {
                    return !!a.firstChild;
                },
                empty: function(a) {
                    return !a.firstChild;
                },
                has: function(a, b, c) {
                    return !!m(c[3], a).length;
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName);
                },
                text: function(a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
                },
                radio: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
                },
                checkbox: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
                },
                file: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type;
                },
                password: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type;
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type;
                },
                image: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type;
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type;
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button";
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName);
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function(a, b) {
                    return b === 0;
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1;
                },
                even: function(a, b) {
                    return b % 2 === 0;
                },
                odd: function(a, b) {
                    return b % 2 === 1;
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0;
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0;
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b;
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b;
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([ a ]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0;
                    }
                    m.error(e);
                },
                CHILD: function(a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                      case "only":
                      case "first":
                        while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                        if (k === "first") return !0;
                        l = a;

                      case "last":
                        while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                        return !0;

                      case "nth":
                        c = b[2], e = b[3];
                        if (c === 1 && e === 0) return !0;
                        f = b[0], g = a.parentNode;
                        if (g && (g[d] !== f || !a.nodeIndex)) {
                            i = 0;
                            for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                            g[d] = f;
                        }
                        j = a.nodeIndex - e;
                        return c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
                    }
                },
                ID: function(a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b;
                },
                TAG: function(a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
                },
                ATTR: function(a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
                },
                POS: function(a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d);
                }
            }
        }, p = o.match.POS, q = function(a, b) {
            return "\\" + (b - 0 + 1);
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), 
        o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function(a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b;
            }
            return a;
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
        } catch (t) {
            s = function(a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (;a[c]; c++) d.push(a[c]);
                return d;
            };
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function(a, b) {
            if (a === b) {
                h = !0;
                return 0;
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1;
        } : (u = function(a, b) {
            if (a === b) {
                h = !0;
                return 0;
            }
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
        }, v = function(a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling;
            }
            return 1;
        }), function() {
            var a = c.createElement("div"), d = "script" + new Date().getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [ e ] : b : [];
                }
            }, o.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b;
            }), e.removeChild(a), e = a = null;
        }(), function() {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d;
                }
                return c;
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2);
            }), a = null;
        }(), c.querySelectorAll && function() {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function(b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return s([ e.body ], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) return s([], f);
                                if (i.id === h[3]) return s([ i ], f);
                            }
                            try {
                                return s(e.querySelectorAll(b), f);
                            } catch (j) {}
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
                            } catch (r) {} finally {
                                l || k.removeAttribute("id");
                            }
                        }
                    }
                    return a(b, e, f, g);
                };
                for (var e in a) m[e] = a[e];
                b = null;
            }
        }(), function() {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle");
                } catch (f) {
                    e = !0;
                }
                m.matchesSelector = function(a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f;
                        }
                    } catch (g) {}
                    return m(c, null, null, [ a ]).length > 0;
                };
            }
        }(), function() {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
                }, a = null;
            }
        }(), c.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0);
        } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16);
        } : m.contains = function() {
            return !1;
        }, m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        };
        var y = function(a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [ b ] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e);
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, 
        f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains;
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.POS, R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function(a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function() {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0;
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break;
                }
            }
            return e;
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0;
            });
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a);
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a);
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++;
                }
                return c;
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break;
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a);
        },
        index: function(a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this);
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [ a ] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function(a) {
            return f.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c);
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling");
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling");
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return f.sibling(a.parentNode.firstChild, a);
        },
        children: function(a) {
            return f.sibling(a.firstChild);
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, 
            (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","));
        };
    }), f.extend({
        filter: function(a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : f.find.matches(a, b);
        },
        dir: function(a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), 
            g = g[c];
            return e;
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (;a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a;
        },
        sibling: function(a, b) {
            var c = [];
            for (;a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c;
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, 
    bg.th = bg.td, f.support.htmlSerialize || (bg._default = [ 1, "div<div>", "</div>" ]), 
    f.fn.extend({
        text: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()));
            });
            if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return f.text(this);
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapInner(a.call(this, b));
            });
            return this.each(function() {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this);
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments);
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a;
            }
        },
        remove: function(a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [ d ]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), 
            f.cleanData([ d ])), d.parentNode && d.parentNode.removeChild(d);
            return this;
        },
        empty: function() {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild);
            }
            return this;
        },
        clone: function(a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function() {
                return f.clone(this, a, b);
            });
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), 
                    this[c].innerHTML = a);
                } catch (e) {
                    this.empty().append(a);
                }
            } else f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()));
            }) : this.empty().append(a);
            return this;
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function(b) {
                    var c = f(this), d = c.html();
                    c.replaceWith(a.call(this, b, d));
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function() {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a);
                });
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0);
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
                }
                k.length && f.each(k, bp);
            }
            return this;
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), 
        a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, 
        h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), 
        f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        };
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this;
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j);
            }
            return this.pushStack(d, a, e.selector);
        };
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g]);
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g]);
                }
            }
            d = e = null;
            return h;
        },
        clean: function(a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || [ "", "" ])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0], o = b.createElement("div");
                    b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k), q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i]);
                    }
                    !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), 
                    k = o.childNodes;
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k);
            }
            if (d) {
                g = function(a) {
                    return !a.type || be.test(a.type);
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [ j + 1, 0 ].concat(s));
                    }
                    d.appendChild(h[j]);
                }
            }
            return h;
        },
        cleanData: function(a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null);
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bx = [ "Left", "Right" ], by = [ "Top", "Bottom" ], bz, bA, bB;
    f.fn.css = function(a, c) {
        if (arguments.length === 2 && c === b) return this;
        return f.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c);
        });
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c;
                    }
                    return a.style.opacity;
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c];
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), 
                h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d;
                } catch (l) {}
            }
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c);
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e];
        }
    }), f.curCSS = f.css, f.each([ "height", "width" ], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) return bC(a, b, d);
                    f.swap(a, bw, function() {
                        e = bC(a, b, d);
                    });
                    return e;
                }
            },
            set: function(a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px";
            }
        };
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return;
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e;
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                f.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight;
                });
                return c;
            }
        });
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), 
        c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c;
    }), c.documentElement.currentStyle && (bB = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, 
        d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), 
        g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, 
        d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f;
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a);
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = [ "*/" ] + [ "*" ];
    try {
        bV = e.href;
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href;
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e);
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), 
            h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a;
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [ c, b, a ]);
                }
            });
            return this;
        },
        serialize: function() {
            return f.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type));
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bF, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(bF, "\r\n")
                };
            }).get();
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), f.each([ "get", "post" ], function(a, c) {
        f[c] = function(a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            });
        };
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script");
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json");
        },
        ajaxSetup: function(a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a;
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
                        }
                        if (a === 304) w = "notmodified", o = !0; else try {
                            r = cc(d, x), w = "success", o = !0;
                        } catch (A) {
                            w = "parsererror", u = A;
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0);
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [ r, w, v ]) : h.rejectWith(e, [ v, w, u ]), 
                    v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [ v, d, o ? r : u ]), 
                    i.fireWith(e, [ v, w ]), t && (g.trigger("ajaxComplete", [ v, d ]), --f.active || f.event.trigger("ajaxStop"));
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a, l[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function() {
                    return s === 2 ? n : null;
                },
                getResponseHeader: function(a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2];
                        }
                        c = o[a.toLowerCase()];
                    }
                    return c === b ? null : c;
                },
                overrideMimeType: function(a) {
                    s || (d.mimeType = a);
                    return this;
                },
                abort: function(a) {
                    a = a || "abort", p && p.abort(a), w(0, a);
                    return this;
                }
            };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [ j[b], a[b] ]; else b = a[v.status], v.then(b, b);
                }
                return this;
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), 
            d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), 
            d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), 
            b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "");
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), 
            d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), 
            f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1;
            }
            for (u in {
                success: 1,
                error: 1,
                complete: 1
            }) v[u](d[u]);
            p = b$(bU, d, c, v);
            if (!p) w(-1, "No Transport"); else {
                v.readyState = 1, t && g.trigger("ajaxSend", [ v, d ]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                    v.abort("timeout");
                }, d.timeout));
                try {
                    s = 1, p.send(l, w);
                } catch (z) {
                    if (s < 2) w(-1, z); else throw z;
                }
            }
            return v;
        },
        param: function(a, c) {
            var d = [], e = function(a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value);
            }); else for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+");
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cd++;
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), 
            b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, 
            b.data = k, a[h] = function(a) {
                g = [ a ];
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0]);
            }), b.converters["script json"] = function() {
                g || f.error(h + " was not called");
                return g[0];
            }, b.dataTypes[0] = "json";
            return "script";
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                f.globalEval(a);
                return a;
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), 
                    d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, 
                        e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
                    }, e.insertBefore(d, e.firstChild);
                },
                abort: function() {
                    d && d.onload(0, 1);
                }
            };
        }
    });
    var cf = a.ActiveXObject ? function() {
        for (var a in ch) ch[a](0, 1);
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && ci() || cj();
    } : ci, function(a) {
        f.extend(f.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        });
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function(e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j]);
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function(a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), 
                                    m.text = h.responseText;
                                    try {
                                        k = h.statusText;
                                    } catch (o) {
                                        k = "";
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
                                }
                            }
                        } catch (p) {
                            e || g(-1, p);
                        }
                        m && g(j, k, m, l);
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), 
                    ch[i] = d), h.onreadystatechange = d);
                },
                abort: function() {
                    d && d(0, 1);
                }
            };
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [ [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ], [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ], [ "opacity" ] ], cr;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, 
            !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
                }
            }
            return this;
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (;g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this;
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]();
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this;
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], 
                    h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ], 
                    f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), 
                o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), 
                l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), 
                n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), 
                k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0;
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [ !1 ]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g);
        },
        stop: function(a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d);
                }
                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--; ) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), 
                c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a);
            });
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
            };
            return d;
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a;
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c;
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a);
            }
            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, 
            this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, 
            h.elem = this.elem, h.saveState = function() {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start);
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval));
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, 
            a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), 
            f(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), 
            this.options.hide = !0, this.custom(this.cur(), 0);
        },
        step: function(a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each([ "", "X", "Y" ], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a];
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), 
                    f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h));
                }
                return !1;
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, 
            this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), 
            this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0;
        }
    }, f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers, c = 0;
            for (;c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop();
        },
        interval: 13,
        stop: function() {
            clearInterval(cp), cp = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now);
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
            }
        }
    }), f.each([ "width", "height" ], function(a, b) {
        f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit);
        };
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem;
        }).length;
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
        var b = this[0], c;
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect();
        } catch (d) {}
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j, o = c.left + m - k;
        return {
            top: n,
            left: o
        };
    } : f.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, 
            b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, 
            m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, 
            m += parseFloat(c.borderLeftWidth) || 0), k = c;
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), 
        m += Math.max(h.scrollLeft, i.scrollLeft));
        return {
            top: l,
            left: m
        };
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, 
            c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            };
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [ h, i ]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), 
            f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), 
            b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, 
            d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a;
            });
        }
    }), f.each([ "Left", "Top" ], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function(c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) return null;
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d];
            }
            return this.each(function() {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c;
            });
        };
    }), f.each([ "Height", "Width" ], function(a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null;
        }, f.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null;
        }, f.fn[d] = function(a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()));
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g;
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i;
            }
            return this.css(d, typeof a == "string" ? a : a + "px");
        };
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f;
    });
})(window);

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
        var BASE64_DECODE_CHARS = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var SUPPORTED_SELECTOR_TYPES = [ "css", "xpath" ];
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
            return this.mouseEvent("click", selector);
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
                    c1 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 255];
                } while (i < len && c1 === -1);
                if (c1 === -1) {
                    break;
                }
                do {
                    c2 = BASE64_DECODE_CHARS[str.charCodeAt(i++) & 255];
                } while (i < len && c2 === -1);
                if (c2 === -1) {
                    break;
                }
                out += String.fromCharCode(c1 << 2 | (c2 & 48) >> 4);
                do {
                    c3 = str.charCodeAt(i++) & 255;
                    if (c3 === 61) return out;
                    c3 = BASE64_DECODE_CHARS[c3];
                } while (i < len && c3 === -1);
                if (c3 === -1) {
                    break;
                }
                out += String.fromCharCode((c2 & 15) << 4 | (c3 & 60) >> 2);
                do {
                    c4 = str.charCodeAt(i++) & 255;
                    if (c4 === 61) {
                        return out;
                    }
                    c4 = BASE64_DECODE_CHARS[c4];
                } while (i < len && c4 === -1);
                if (c4 === -1) {
                    break;
                }
                out += String.fromCharCode((c3 & 3) << 6 | c4);
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
                c1 = str.charCodeAt(i++) & 255;
                if (i === len) {
                    out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                    out += BASE64_ENCODE_CHARS.charAt((c1 & 3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                    out += BASE64_ENCODE_CHARS.charAt((c1 & 3) << 4 | (c2 & 240) >> 4);
                    out += BASE64_ENCODE_CHARS.charAt((c2 & 15) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += BASE64_ENCODE_CHARS.charAt(c1 >> 2);
                out += BASE64_ENCODE_CHARS.charAt((c1 & 3) << 4 | (c2 & 240) >> 4);
                out += BASE64_ENCODE_CHARS.charAt((c2 & 15) << 2 | (c3 & 192) >> 6);
                out += BASE64_ENCODE_CHARS.charAt(c3 & 63);
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
            var text = "", elements = this.findAll(selector);
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
                files: []
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
                    } else if (err.name === "FieldNotFound") {
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
                if (pSelector.type === "xpath") {
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
                if (pSelector.type === "xpath") {
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
            return Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight));
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
                    top: clipRect.top,
                    left: clipRect.left,
                    width: clipRect.width,
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
                        top: clipRect.top,
                        left: clipRect.left,
                        width: clipRect.width,
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
                    type = input.getAttribute("type").toLowerCase();
                } catch (e) {
                    type = "other";
                }
                if ([ "checkbox", "radio" ].indexOf(type) === -1) {
                    return input.value;
                }
                // single checkbox or… radio button (weird, I know)
                if (input.hasAttribute("value")) {
                    return input.checked ? input.getAttribute("value") : undefined;
                }
                return input.checked;
            }
            function getMultipleValues(inputs) {
                type = inputs[0].getAttribute("type").toLowerCase();
                if (type === "radio") {
                    var value;
                    [].forEach.call(inputs, function(radio) {
                        value = radio.checked ? radio.value : value;
                    });
                    return value;
                } else if (type === "checkbox") {
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
              case 0:
                return null;

              case 1:
                return getSingleValue(inputs[0]);

              default:
                return getMultipleValues(inputs);
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
                var name = element.getAttribute("name");
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
                    center_x = Math.floor((pos.left + pos.right) / 2), center_y = Math.floor((pos.top + pos.bottom) / 2);
                } catch (e) {}
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
                    return this.type + " selector: " + this.path;
                }
            };
            if (typeof selector === "string") {
                // defaults to CSS selector
                selectorObject.type = "css";
                selectorObject.path = selector;
                return selectorObject;
            } else if (typeof selector === "object") {
                // validation
                if (!selector.hasOwnProperty("type") || !selector.hasOwnProperty("path")) {
                    throw new Error("Incomplete selector object");
                } else if (SUPPORTED_SELECTOR_TYPES.indexOf(selector.type) === -1) {
                    throw new Error("Unsupported selector type: " + selector.type);
                }
                if (!selector.hasOwnProperty("toString")) {
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
            var xhr = new XMLHttpRequest(), dataString = "", dataList = [];
            method = method && method.toUpperCase() || "GET";
            xhr.open(method, url, !!async);
            this.log("sendAJAX(): Using HTTP method: '" + method + "'", "debug");
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            if (method === "POST") {
                if (typeof data === "object") {
                    for (var k in data) {
                        dataList.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k].toString()));
                    }
                    dataString = dataList.join("&");
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
            value = logValue = value || "";
            if (field instanceof NodeList) {
                fields = field;
                field = fields[0];
            }
            if (!(field instanceof HTMLElement)) {
                var error = new Error("Invalid field type; only HTMLElement and NodeList are supported");
                error.name = "FieldNotFound";
                throw error;
            }
            if (this.options && this.options.safeLogs && field.getAttribute("type") === "password") {
                // obfuscate password value
                logValue = new Array(value.length + 1).join("*");
            }
            this.log('Set "' + field.getAttribute("name") + '" field value to ' + logValue, "debug");
            try {
                field.focus();
            } catch (e) {
                this.log("Unable to focus() input field " + field.getAttribute("name") + ": " + e, "warning");
            }
            var nodeName = field.nodeName.toLowerCase();
            switch (nodeName) {
              case "input":
                var type = field.getAttribute("type") || "text";
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
                            values = [ values ];
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
                        name: "FileUploadError",
                        message: "File field must be filled using page.uploadFile",
                        path: value
                    };

                  case "radio":
                    if (fields) {
                        Array.prototype.forEach.call(fields, function _forEach(e) {
                            e.checked = e.value === value;
                        });
                    } else {
                        out = "Provided radio elements are empty";
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
                out = "Unsupported field type: " + nodeName;
                break;
            }
            // firing the `change` and `input` events
            [ "change", "input" ].forEach(function(name) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(name, true, true);
                field.dispatchEvent(event);
            });
            // blur the field
            try {
                field.blur();
            } catch (err) {
                this.log("Unable to blur() input field " + field.getAttribute("name") + ": " + err, "warning");
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
                var comp, el = this.findOne(selector);
                if (el) {
                    comp = window.getComputedStyle(el, null);
                    return comp.visibility !== "hidden" && comp.display !== "none" && el.offsetHeight > 0 && el.offsetWidth > 0;
                }
                return false;
            } catch (e) {
                return false;
            }
        };
    };
})(typeof exports === "object" ? exports : window);

(function($) {
    var i = function(e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    };
    $.fn.checkbox = function(f) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        var g = {
            cls: "jquery-checkbox",
            empty: "empty.png"
        };
        g = $.extend(g, f || {});
        var h = function(a) {
            var b = a.checked;
            var c = a.disabled;
            var d = $(a);
            if (a.stateInterval) clearInterval(a.stateInterval);
            a.stateInterval = setInterval(function() {
                if (a.disabled != c) d.trigger((c = !!a.disabled) ? "disable" : "enable");
                if (a.checked != b) d.trigger((b = !!a.checked) ? "check" : "uncheck");
            }, 10);
            return d;
        };
        return this.each(function() {
            var a = this;
            var b = h(a);
            if (a.wrapper) a.wrapper.remove();
            a.wrapper = $('<span class="' + g.cls + '"><span class="mark"><img src="' + g.empty + '" /></span></span>');
            a.wrapperInner = a.wrapper.children("span:eq(0)");
            a.wrapper.hover(function(e) {
                a.wrapperInner.addClass(g.cls + "-hover");
                i(e);
            }, function(e) {
                a.wrapperInner.removeClass(g.cls + "-hover");
                i(e);
            });
            b.css({
                position: "absolute",
                zIndex: -1,
                visibility: "hidden"
            }).after(a.wrapper);
            var c = false;
            if (b.attr("id")) {
                c = $("label[for=" + b.attr("id") + "]");
                if (!c.length) c = false;
            }
            if (!c) {
                c = b.closest ? b.closest("label") : b.parents("label:eq(0)");
                if (!c.length) c = false;
            }
            if (c) {
                c.hover(function(e) {
                    a.wrapper.trigger("mouseover", [ e ]);
                }, function(e) {
                    a.wrapper.trigger("mouseout", [ e ]);
                });
                c.click(function(e) {
                    b.trigger("click", [ e ]);
                    i(e);
                    return false;
                });
            }
            a.wrapper.click(function(e) {
                b.trigger("click", [ e ]);
                i(e);
                return false;
            });
            b.click(function(e) {
                i(e);
            });
            b.bind("disable", function() {
                a.wrapperInner.addClass(g.cls + "-disabled");
            }).bind("enable", function() {
                a.wrapperInner.removeClass(g.cls + "-disabled");
            });
            b.bind("check", function() {
                a.wrapper.addClass(g.cls + "-checked");
            }).bind("uncheck", function() {
                a.wrapper.removeClass(g.cls + "-checked");
            });
            $("img", a.wrapper).bind("dragstart", function() {
                return false;
            }).bind("mousedown", function() {
                return false;
            });
            if (window.getSelection) a.wrapper.css("MozUserSelect", "none");
            if (a.checked) a.wrapper.addClass(g.cls + "-checked");
            if (a.disabled) a.wrapperInner.addClass(g.cls + "-disabled");
        });
    };
})(unsafeWindow.jQuery);

/*
 * JQuery URL Parser plugin, v2.2.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD available; use anonymous module
        if (typeof jQuery !== "undefined") {
            define([ "jquery" ], factory);
        } else {
            define([], factory);
        }
    } else {
        // No AMD available; mutate global vars
        if (typeof jQuery !== "undefined") {
            factory(jQuery);
        } else {
            factory();
        }
    }
})(function($, undefined) {
    var tag2attr = {
        a: "href",
        img: "src",
        form: "action",
        base: "href",
        script: "src",
        iframe: "src",
        link: "href"
    }, key = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ], // keys available to query
    aliases = {
        anchor: "fragment"
    }, // aliases for backwards compatability
    parser = {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        //less intuitive, more accurate to the specs
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }, toString = Object.prototype.toString, isint = /^[0-9]+$/;
    function parseUri(url, strictMode) {
        var str = decodeURI(url), res = parser[strictMode || false ? "strict" : "loose"].exec(str), uri = {
            attr: {},
            param: {},
            seg: {}
        }, i = 14;
        while (i--) {
            uri.attr[key[i]] = res[i] || "";
        }
        // build query and fragment parameters		
        uri.param["query"] = parseString(uri.attr["query"]);
        uri.param["fragment"] = parseString(uri.attr["fragment"]);
        // split path and fragement into segments		
        uri.seg["path"] = uri.attr.path.replace(/^\/+|\/+$/g, "").split("/");
        uri.seg["fragment"] = uri.attr.fragment.replace(/^\/+|\/+$/g, "").split("/");
        // compile a 'base' domain attribute        
        uri.attr["base"] = uri.attr.host ? (uri.attr.protocol ? uri.attr.protocol + "://" + uri.attr.host : uri.attr.host) + (uri.attr.port ? ":" + uri.attr.port : "") : "";
        return uri;
    }
    function getAttrName(elm) {
        var tn = elm.tagName;
        if (typeof tn !== "undefined") return tag2attr[tn.toLowerCase()];
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
            } else if ("object" == typeof parent[key]) {
                parent[key] = val;
            } else if ("undefined" == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [ parent[key], val ];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if ("]" == part) {
                if (isArray(obj)) {
                    if ("" != val) obj.push(val);
                } else if ("object" == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [ parent[key], val ];
                }
            } else if (~part.indexOf("]")) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }
    function merge(parent, key, val) {
        if (~key.indexOf("]")) {
            var parts = key.split("["), len = parts.length, last = len - 1;
            parse(parts, parent, "base", val);
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
                pair = decodeURIComponent(pair.replace(/\+/g, " "));
            } catch (e) {}
            var eql = pair.indexOf("="), brace = lastBraceInKey(pair), key = pair.substr(0, brace || eql), val = pair.substr(brace || eql, pair.length), val = val.substr(val.indexOf("=") + 1, val.length);
            if ("" == key) key = pair, val = "";
            return merge(ret, key, val);
        }, {
            base: {}
        }).base;
    }
    function set(obj, key, val) {
        var v = obj[key];
        if (undefined === v) {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [ v, val ];
        }
    }
    function lastBraceInKey(str) {
        var len = str.length, brace, c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if ("]" == c) brace = false;
            if ("[" == c) brace = true;
            if ("=" == c && !brace) return i;
        }
    }
    function reduce(obj, accumulator) {
        var i = 0, l = obj.length >> 0, curr = arguments[2];
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
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) keys.push(prop);
        }
        return keys;
    }
    function purl(url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();
        return {
            data: parseUri(url, strictMode),
            // get various attributes from the URI
            attr: function(attr) {
                attr = aliases[attr] || attr;
                return typeof attr !== "undefined" ? this.data.attr[attr] : this.data.attr;
            },
            // return query string parameters
            param: function(param) {
                return typeof param !== "undefined" ? this.data.param.query[param] : this.data.param.query;
            },
            // return fragment parameters
            fparam: function(param) {
                return typeof param !== "undefined" ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            // return path segments
            segment: function(seg) {
                if (typeof seg === "undefined") {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1;
                    // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },
            // return fragment segments
            fsegment: function(seg) {
                if (typeof seg === "undefined") {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1;
                    // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }
        };
    }
    if (typeof $ !== "undefined") {
        $.fn.url = function(strictMode) {
            var url = "";
            if (this.length) {
                url = $(this).attr(getAttrName(this[0])) || "";
            }
            return purl(url, strictMode);
        };
        $.url = purl;
    } else {
        window.purl = purl;
    }
});

(function() {
    var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
        return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), 
    exports._ = w) : n._ = w, w.VERSION = "1.4.4";
    var A = w.each = w.forEach = function(n, t, e) {
        if (null != n) if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return;
        } else for (var a in n) if (w.has(n, a) && t.call(e, n[a], a, n) === r) return;
    };
    w.map = w.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e[e.length] = t.call(r, n, u, i);
        }), e);
    };
    var O = "Reduce of empty array with no initial value";
    w.reduce = w.foldl = w.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = w.bind(t, e)), 
        u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.reduceRight = w.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = w.bind(t, e)), 
        u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = w.keys(n);
            i = a.length;
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.find = w.detect = function(n, t, r) {
        var e;
        return E(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0;
        }), e;
    }, w.filter = w.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && (e[e.length] = n);
        }), e);
    }, w.reject = function(n, t, r) {
        return w.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u);
        }, r);
    }, w.every = w.all = function(n, t, e) {
        t || (t = w.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r;
        }), !!u);
    };
    var E = w.some = w.any = function(n, t, e) {
        t || (t = w.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0;
        }), !!u);
    };
    w.contains = w.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function(n) {
            return n === t;
        });
    }, w.invoke = function(n, t) {
        var r = o.call(arguments, 2), e = w.isFunction(t);
        return w.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r);
        });
    }, w.pluck = function(n, t) {
        return w.map(n, function(n) {
            return n[t];
        });
    }, w.where = function(n, t, r) {
        return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
            for (var r in t) if (t[r] !== n[r]) return !1;
            return !0;
        });
    }, w.findWhere = function(n, t) {
        return w.where(n, t, !0);
    }, w.max = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.max.apply(Math, n);
        if (!t && w.isEmpty(n)) return -1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a >= e.computed && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.min = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.min.apply(Math, n);
        if (!t && w.isEmpty(n)) return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            e.computed > a && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.shuffle = function(n) {
        var t, r = 0, e = [];
        return A(n, function(n) {
            t = w.random(r++), e[r - 1] = e[t], e[t] = n;
        }), e;
    };
    var k = function(n) {
        return w.isFunction(n) ? n : function(t) {
            return t[n];
        };
    };
    w.sortBy = function(n, t, r) {
        var e = k(t);
        return w.pluck(w.map(n, function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            };
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1;
            }
            return n.index < t.index ? -1 : 1;
        }), "value");
    };
    var F = function(n, t, r, e) {
        var u = {}, i = k(t || w.identity);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t);
        }), u;
    };
    w.groupBy = function(n, t, r) {
        return F(n, t, r, function(n, t, r) {
            (w.has(n, t) ? n[t] : n[t] = []).push(r);
        });
    }, w.countBy = function(n, t, r) {
        return F(n, t, r, function(n, t) {
            w.has(n, t) || (n[t] = 0), n[t]++;
        });
    }, w.sortedIndex = function(n, t, r, e) {
        r = null == r ? w.identity : k(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            u > r.call(e, n[o]) ? i = o + 1 : a = o;
        }
        return i;
    }, w.toArray = function(n) {
        return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [];
    }, w.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length;
    }, w.first = w.head = w.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
    }, w.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t));
    }, w.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
    }, w.rest = w.tail = w.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t);
    }, w.compact = function(n) {
        return w.filter(n, w.identity);
    };
    var R = function(n, t, r) {
        return A(n, function(n) {
            w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n);
        }), r;
    };
    w.flatten = function(n, t) {
        return R(n, t, []);
    }, w.without = function(n) {
        return w.difference(n, o.call(arguments, 1));
    }, w.uniq = w.unique = function(n, t, r, e) {
        w.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? w.map(n, r, e) : n, i = [], a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]));
        }), i;
    }, w.union = function() {
        return w.uniq(c.apply(e, arguments));
    }, w.intersection = function(n) {
        var t = o.call(arguments, 1);
        return w.filter(w.uniq(n), function(n) {
            return w.every(t, function(t) {
                return w.indexOf(t, n) >= 0;
            });
        });
    }, w.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return w.filter(n, function(n) {
            return !w.contains(t, n);
        });
    }, w.zip = function() {
        for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = w.pluck(n, "" + e);
        return r;
    }, w.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r;
    }, w.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r) return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r;
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (;u > e; e++) if (n[e] === t) return e;
        return -1;
    }, w.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--; ) if (n[u] === t) return u;
        return -1;
    }, w.range = function(n, t, r) {
        1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u; ) i[u++] = n, 
        n += r;
        return i;
    }, w.bind = function(n, t) {
        if (n.bind === j && j) return j.apply(n, o.call(arguments, 1));
        var r = o.call(arguments, 2);
        return function() {
            return n.apply(t, r.concat(o.call(arguments)));
        };
    }, w.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)));
        };
    }, w.bindAll = function(n) {
        var t = o.call(arguments, 1);
        return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
            n[t] = w.bind(n[t], n);
        }), n;
    }, w.memoize = function(n, t) {
        var r = {};
        return t || (t = w.identity), function() {
            var e = t.apply(this, arguments);
            return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
        };
    }, w.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r);
        }, t);
    }, w.defer = function(n) {
        return w.delay.apply(w, [ n, 1 ].concat(o.call(arguments, 1)));
    }, w.throttle = function(n, t) {
        var r, e, u, i, a = 0, o = function() {
            a = new Date(), u = null, i = n.apply(r, e);
        };
        return function() {
            var c = new Date(), l = t - (c - a);
            return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), 
            i;
        };
    }, w.debounce = function(n, t, r) {
        var e, u;
        return function() {
            var i = this, a = arguments, o = function() {
                e = null, r || (u = n.apply(i, a));
            }, c = r && !e;
            return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u;
        };
    }, w.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
        };
    }, w.wrap = function(n, t) {
        return function() {
            var r = [ n ];
            return a.apply(r, arguments), t.apply(this, r);
        };
    }, w.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [ n[r].apply(this, t) ];
            return t[0];
        };
    }, w.after = function(n, t) {
        return 0 >= n ? t() : function() {
            return 1 > --n ? t.apply(this, arguments) : void 0;
        };
    }, w.keys = _ || function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) w.has(n, r) && (t[t.length] = r);
        return t;
    }, w.values = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push(n[r]);
        return t;
    }, w.pairs = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push([ r, n[r] ]);
        return t;
    }, w.invert = function(n) {
        var t = {};
        for (var r in n) w.has(n, r) && (t[n[r]] = r);
        return t;
    }, w.functions = w.methods = function(n) {
        var t = [];
        for (var r in n) w.isFunction(n[r]) && t.push(r);
        return t.sort();
    }, w.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) n[r] = t[r];
        }), n;
    }, w.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r]);
        }), t;
    }, w.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n) w.contains(r, u) || (t[u] = n[u]);
        return t;
    }, w.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) null == n[r] && (n[r] = t[r]);
        }), n;
    }, w.clone = function(n) {
        return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n;
    }, w.tap = function(n, t) {
        return t(n), n;
    };
    var I = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
          case "[object String]":
            return n == t + "";

          case "[object Number]":
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

          case "[object Date]":
          case "[object Boolean]":
            return +n == +t;

          case "[object RegExp]":
            return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--; ) if (r[i] == n) return e[i] == t;
        r.push(n), e.push(t);
        var a = 0, o = !0;
        if ("[object Array]" == u) {
            if (a = n.length, o = a == t.length) for (;a-- && (o = I(n[a], t[a], r, e)); ) ;
        } else {
            var c = n.constructor, f = t.constructor;
            if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) return !1;
            for (var s in n) if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) break;
            if (o) {
                for (s in t) if (w.has(t, s) && !a--) break;
                o = !a;
            }
        }
        return r.pop(), e.pop(), o;
    };
    w.isEqual = function(n, t) {
        return I(n, t, [], []);
    }, w.isEmpty = function(n) {
        if (null == n) return !0;
        if (w.isArray(n) || w.isString(n)) return 0 === n.length;
        for (var t in n) if (w.has(n, t)) return !1;
        return !0;
    }, w.isElement = function(n) {
        return !(!n || 1 !== n.nodeType);
    }, w.isArray = x || function(n) {
        return "[object Array]" == l.call(n);
    }, w.isObject = function(n) {
        return n === Object(n);
    }, A([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(n) {
        w["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]";
        };
    }), w.isArguments(arguments) || (w.isArguments = function(n) {
        return !(!n || !w.has(n, "callee"));
    }), "function" != typeof /./ && (w.isFunction = function(n) {
        return "function" == typeof n;
    }), w.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    }, w.isNaN = function(n) {
        return w.isNumber(n) && n != +n;
    }, w.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n);
    }, w.isNull = function(n) {
        return null === n;
    }, w.isUndefined = function(n) {
        return n === void 0;
    }, w.has = function(n, t) {
        return f.call(n, t);
    }, w.noConflict = function() {
        return n._ = t, this;
    }, w.identity = function(n) {
        return n;
    }, w.times = function(n, t, r) {
        for (var e = Array(n), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e;
    }, w.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
    };
    var M = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    M.unescape = w.invert(M.escape);
    var S = {
        escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"),
        unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")
    };
    w.each([ "escape", "unescape" ], function(n) {
        w[n] = function(t) {
            return null == t ? "" : ("" + t).replace(S[n], function(t) {
                return M[n][t];
            });
        };
    }), w.result = function(n, t) {
        if (null == n) return null;
        var r = n[t];
        return w.isFunction(r) ? r.call(n) : r;
    }, w.mixin = function(n) {
        A(w.functions(n), function(t) {
            var r = w[t] = n[t];
            w.prototype[t] = function() {
                var n = [ this._wrapped ];
                return a.apply(n, arguments), D.call(this, r.apply(w, n));
            };
        });
    };
    var N = 0;
    w.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t;
    }, w.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var T = /(.)^/, q = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    w.template = function(n, t, r) {
        var e;
        r = w.defaults({}, r, w.templateSettings);
        var u = RegExp([ (r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source ].join("|") + "|$", "g"), i = 0, a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(B, function(n) {
                return "\\" + q[n];
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), 
            u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t;
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = Function(r.variable || "obj", "_", a);
        } catch (o) {
            throw o.source = a, o;
        }
        if (t) return e(t, w);
        var c = function(n) {
            return e.call(this, n, w);
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c;
    }, w.chain = function(n) {
        return w(n).chain();
    };
    var D = function(n) {
        return this._chain ? w(n).chain() : n;
    };
    w.mixin(w), A([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], 
            D.call(this, r);
        };
    }), A([ "concat", "join", "slice" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            return D.call(this, t.apply(this._wrapped, arguments));
        };
    }), w.extend(w.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);

/**
 * @class Comment
 */
function Comment(iZhihu) {
    if (typeof iZhihu === "undefined" || !iZhihu) {
        return null;
    }
    iZhihu.Comment = this;
    var css_comment = {
        position: "fixed",
        "background-color": "#fff",
        outline: "none",
        "z-index": "9999",
        right: 10,
        "border-radius": "0 6px 0 0",
        padding: "100px 0px 0px 7px"
    };
    this.RightComment = iZhihu.config["ShowComment"];
    if (!this.RightComment) {
        this.css = [ ".zm-comment-box.empty .izh-button-cc{display:none;}", "" ].join("\n");
    } else {
        this.css = [ ".mention-popup{z-index:10000 !important;}", ".zm-item-meta .meta-item[name=addcomment],", ".zm-item-meta .meta-item[name=add-q-comment]{display:block;float:right;margin-left:7px !important;}", ".zm-comment-box .zm-comment-box-ft{position:absolute;top:0;left:0;right:0;}", ".zm-comment-box.empty{padding-top:10px !important;}", ".zm-comment-box.empty .zm-comment-box-ft{position:static;margin:0 !important;padding:15px !important;}", ".zm-comment-box [class^=izh-buttons-cm]{position:absolute;top:70px;}", ".zm-comment-box .izh-buttons-cm-L{left:0;}", ".zm-comment-box .izh-buttons-cm-L > a{margin-right:7px;}", ".zm-comment-box .izh-buttons-cm-R{right:1em;}", ".zm-comment-box .izh-buttons-cm-R > a{margin-left:7px;}", ".zm-comment-box a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}", ".zm-comment-box a.izh-button.off{color:#eee;}", ".zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:7px;}", "" ].join("\n");
    }
    this.processCommentButton = function($a) {
        if (iZhihu.Comment.RightComment) {
            var $bc = $a.find('.meta-item[name="addcomment"],.meta-item[name="add-q-comment"]');
            $bc.prependTo($bc.parent());
        }
    };
    this.showComment = function($ac, $cm) {
        $(".zm-comment-box:visible").each(function(i, e) {
            if (!$cm.length || e != $cm.get(0)) $(e).closest(".zm-item-meta").find("[name=addcomment],[name=add-q-comment]")[0].click();
        });
        var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next(), t = $ac.offset().top - iZhihu.$main.offset().top, b = $ac.offset().top - iZhihu.$main.offset().top, w = $ac.width(), inAnswer = $ac.is(".zm-item-answer"), inQuestion = $ac.is("#zh-question-detail"), $questionMeta = $("#zh-question-meta-wrap"), h = inQuestion ? $questionMeta.offset().top + $questionMeta.height() + parseInt($questionMeta.css("padding-bottom")) - iZhihu.$main.offset().top : $ac.height() + parseInt($ac.css("padding-bottom")) + parseInt($n.css("padding-top"));
        if (!$ac.find(".izh_tape_a,.izh_tape_b").length) $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
        if (!$cm) $cm = $ac.find(".zm-comment-box");
        if ($cm.length) {
            if (!$cm.attr("tabindex")) {
                $cm.attr("tabindex", "-1").focus();
            }
            if (inQuestion) {
                $("#izh_QuestionShadow").css({
                    height: h,
                    "margin-bottom": -h
                }).show();
                $questionMeta.next(":visible").andSelf().addClass("izh_noBorder");
            } else {
                $ac.addClass("izh_boxShadow");
            }
            $ac.find(".izh_tape_a").css({
                position: "absolute",
                width: 1,
                height: h,
                top: 0,
                "margin-left": w - 1,
                "z-index": "10000",
                "background-color": "#fff"
            }).show();
            var $t = $cm.clone().css({
                position: "absolute",
                "z-index": "-1"
            }).appendTo(iZhihu.$body).show();
            $cm.css({
                left: $ac.offset().left + $ac.width() - 1
            });
            var th = $t.children(".zm-comment-list").css({
                position: "absolute",
                height: "",
                top: "",
                bottom: ""
            }).height() + 100;
            if (th < iZhihu.$win.height() - iZhihu.$main.offset().top) {
                var top = inQuestion ? 0 : $cm.parent().offset().top - $(document).scrollTop();
                if (top + th > iZhihu.$win.height()) {
                    $cm.css({
                        top: "",
                        bottom: 0
                    });
                } else {
                    $cm.css({
                        top: top > iZhihu.$main.offset().top ? top : iZhihu.$main.offset().top,
                        bottom: ""
                    });
                }
            } else {
                $cm.css({
                    top: iZhihu.$main.offset().top,
                    bottom: 0
                });
            }
            $t.remove();
            $t = null;
            $(".mention-popup").attr("data-aid", $ac.attr("data-aid"));
        } else {
            $ac.find(".zu-question-answer-meta-comment")[0].click();
        }
        $ac.find(".izh_tape_b").css({
            position: "absolute",
            width: 1,
            height: h,
            top: 0,
            "margin-left": w,
            "z-index": "9998",
            "background-color": "#eee"
        }).show();
        //$ac.css('border-color','#999999');
        //$n.css('border-color','#999999');
        $(".zh-backtotop").css("visibility", "hidden");
        iZhihu.$body.scrollTop(t);
    };
    this.hideComment = function($ac, $cm) {
        var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next(), inQuestion = $ac.is("#zh-question-detail");
        if (!$cm) $cm = $ac.find(".zm-comment-box");
        if (inQuestion) {
            $("#izh_QuestionShadow").hide();
            $("#zh-question-meta-wrap").next(":visible").andSelf().removeClass("izh_noBorder");
        } else {
            $ac.removeClass("izh_boxShadow");
        }
        if ($cm.length) {
            $ac.find(".izh_tape_a").hide();
        }
        $ac.find(".izh_tape_b").hide();
        //$ac.css('border-color','#DDDDDD');
        //$n.css('border-color','#DDDDDD');
        $(".izh_tape_a:visible,.izh_tape_b:visible").hide();
        $(".zh-backtotop").css("visibility", "visible");
    };
    this.processComment = function($cm) {
        if ($cm.is(".zm-comment-box")) {
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
            var $list = $cm.find(".zm-comment-list").bind("DOMNodeInserted", function(event) {
                var $icm = $(event.target);
                if ($icm.is(".zm-item-comment") && iZhihu.QuickBlock) {
                    iZhihu.QuickBlock.addQuickBlockInOneComment($icm);
                }
            });
            if (iZhihu.Comment.RightComment) {
                $cm.addClass("izh_boxShadow").css(css_comment).closest(".zm-item-meta").find("[name=addcomment],[name=add-q-comment]").click(function(event) {
                    var $cm = $(this).closest(".zm-item-meta").find(".zm-comment-box");
                    if ($cm.length) {
                        var $item = getItem($cm);
                        if ($cm.is(":hidden")) {
                            iZhihu.Comment.showComment($item, $cm);
                        } else {
                            iZhihu.Comment.hideComment($item, $cm);
                        }
                    }
                });
                var $item = getItem($cm);
                iZhihu.Comment.showComment($item, $cm);
                $("i.zm-comment-bubble", $cm).hide();
                $list.css({
                    height: "100%",
                    overflow: "auto"
                }).bind("DOMNodeInserted", function(event) {
                    var $cm = $(this).parent(".zm-comment-box:visible");
                    if ($cm.length) {
                        $(".izh-quick-block-switch", $cm).show();
                        var $item = getItem($cm);
                        iZhihu.Comment.showComment($item, $cm);
                        var $icm = $(event.target);
                        $icm.bind("DOMNodeRemoved", function(event) {
                            var $cm = $(this).closest(".zm-comment-box:visible");
                            if ($cm.length) {
                                if ($(this).closest(".zm-comment-list").children().length == 1) {
                                    $(".izh-quick-block-switch", $cm).hide();
                                }
                                var $item = getItem($cm);
                                iZhihu.Comment.showComment($item, $cm);
                            }
                        });
                    }
                }).children(".zm-item-comment").bind("DOMNodeRemoved", function(event) {
                    var $cm = $(this).closest(".zm-comment-box:visible");
                    if ($cm.length) {
                        if ($(this).closest(".zm-comment-list").children().length == 1) {
                            $(".izh-quick-block-switch", $cm).hide();
                        }
                        var $item = getItem($cm);
                        iZhihu.Comment.showComment($item, $cm);
                    }
                });
            }
            var $btnCC = $("<a>", {
                "class": "zu-question-answer-meta-comment izh-button-cc",
                href: "javascript:void(0);",
                html: "收起",
                click: function() {
                    var $cm = $(this).closest(".zm-comment-box"), $item = getItem($cm), $itemMeta = $cm.closest(".zm-item-meta");
                    iZhihu.Comment.hideComment($item);
                    $itemMeta.find("[name=addcomment],[name=add-q-comment]")[0].click();
                }
            }), $buttonsL = $("<div>", {
                "class": "izh-buttons-cm-L"
            }).prependTo($cm), $buttonsR = $("<div>", {
                "class": "izh-buttons-cm-R"
            });
            if (iZhihu.Comment.RightComment) {
                $buttonsR.prependTo($cm);
                $btnCC.css({
                    "float": "left",
                    "margin-left": 7
                }).prepend('<i class="z-icon-izh-fold"/>').prependTo($buttonsL);
                if (!$cm.is(".empty")) {
                    $("<a>", {
                        "class": "izh-button izh-back-top",
                        href: "javascript:void(0);",
                        html: "返回顶部",
                        click: function() {
                            $(this.parentNode).nextAll(".zm-comment-list").scrollTop(0);
                        }
                    }).add("<a>", {
                        "class": "izh-button izh-show-good",
                        href: "javascript:void(0);",
                        html: "人气妙评",
                        click: function() {
                            var $e = $(this), $l = $e.closest(".zm-comment-box").find(".zm-comment-list"), $n = $l.find(".zm-item-comment").has("span.like-num.nil");
                            if ($e.hasClass("on")) {
                                $e.attr("scrollTop_showgood", $l[0].scrollTop);
                                $n.show();
                                $e.removeClass("on");
                                var scrollTop = parseInt($e.attr("scrollTop"));
                                if (!isNaN(scrollTop)) $l.scrollTop(scrollTop);
                            } else {
                                $e.attr("scrollTop", $l[0].scrollTop);
                                $n.hide();
                                $e.addClass("on");
                                var scrollTop = parseInt($e.attr("scrollTop_showgood"));
                                if (!isNaN(scrollTop)) $l.scrollTop(scrollTop);
                            }
                        }
                    }).css({
                        "float": "right"
                    }).appendTo($buttonsR);
                    $list.scroll(function() {
                        var $e = $(this), $b = $e.closest(".zm-comment-box").find(".izh-back-top");
                        if ($e.height() < this.scrollTop) {
                            $b.removeClass("off");
                        } else {
                            $b.addClass("off");
                        }
                    }).scroll();
                    $list.find(".zm-item-comment span.like-num").each(function(i, e) {
                        var tip = e.getAttribute("data-tip").replace("s$r$", "s$l$");
                        if (tip != "") e.setAttribute("data-tip", tip);
                    });
                }
            } else {
                $btnCC.prepend('<i class="z-icon-fold"/>').css({
                    position: "absolute",
                    cursor: "pointer",
                    "margin-left": -1,
                    left: 0,
                    "background-color": "#fbfbfb",
                    padding: "2px 5px",
                    bottom: -22,
                    border: "1px solid #ddd",
                    "border-radius": "4px"
                }).insertBefore($cm.find(".zm-comment-box-ft"));
            }
            if (iZhihu.QuickBlock && !$cm.is(".empty")) {
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
    if (typeof iZhihu === "undefined" || !iZhihu || !iZhihu.config["Noti7"]) {
        return null;
    }
    iZhihu.Noti7 = this;
    this.$noti7 = $("#zh-top-nav-live-new");
    this.$frame = $(".zm-noti7-frame", this.$noti7);
    this.$content = $(".zm-noti7-content-body", this.$noti7);
    this.$footer = $(".zm-noti7-popup-footer", this.$noti7);
    this.$tab = $(".zm-noti7-popup-tab-container", "#zh-top-nav-live-new-inner");
    this.css = [ '#zh-top-nav-live-new .zm-noti7-popup-footer a[unreadonly="1"]{color:#225599 !important;text-shadow:0 0 1px #225599;}', "" ].join("\n");
    this.enhance = function() {
        iZhihu.Noti7.$tab.find(".zm-noti7-popup-tab-item").each(function(i, e) {
            utils.observeDOMAttrModified(e, function(event) {
                var $e = $(event.target);
                if ($e.is(".zm-noti7-popup-tab-item.current")) {
                    var currentClass = $e.attr("class"), $bFilterRead = $(".izh-filter-read", iZhihu.Noti7.$footer);
                    if (currentClass != $bFilterRead.attr("currentClass")) {
                        $bFilterRead.attr({
                            unreadOnly: "",
                            currentClass: currentClass
                        });
                    }
                }
            });
        });
        iZhihu.Noti7.$footer.append($("<a>", {
            "class": "izh-filter-read",
            html: "隐藏已读",
            href: "javascript:void(0);",
            unreadOnly: "",
            click: function() {
                var unreadOnly = this.getAttribute("unreadOnly") == "1", $contentVisible = iZhihu.Noti7.$content.filter(":visible"), $scroller = $contentVisible.closest(".zh-scroller-inner"), $items = $contentVisible.find(".zm-noti7-content-item");
                unreadOnly = !unreadOnly;
                this.setAttribute("unreadOnly", unreadOnly ? "1" : "");
                if (unreadOnly) {
                    $scroller.attr("scrollTop", $scroller[0].scrollTop);
                    $items.not(".unread").hide();
                    var scrollTop = parseInt($scroller.attr("scrollTop_unread"));
                    if (!isNaN(scrollTop)) $scroller.scrollTop(scrollTop);
                } else {
                    $scroller.attr("scrollTop_unread", $scroller[0].scrollTop);
                    $items.not(".unread").show();
                    var scrollTop = parseInt($scroller.attr("scrollTop"));
                    if (!isNaN(scrollTop)) $scroller.scrollTop(scrollTop);
                }
            }
        }));
    };
    return this;
}

/**
 * @class QuickBlock
 */
function QuickBlock(iZhihu) {
    if (typeof iZhihu === "undefined" || !iZhihu || !iZhihu.config["QuickBlock"]) {
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
    this.Pending = {
        Users: ",",
        Count: 0
    };
    this.Blocking = {
        Users: ",",
        Count: 0
    };
    this.Unfollowed = {
        Users: ",",
        Count: 0
    };
    this.Refollowed = {
        Users: ",",
        Count: 0
    };
    this.css = [ ".izh_blockCart{background-color:#0771C1;position:fixed;right:0;z-index:9;padding:0 30px 0 60px;border:1px solid #0771C1;border-left-width:10px;border-top-left-radius:6px;}", ".izh_blockCart .do{color:#fff;text-align:center;display:block;margin:2px;min-width:80px;width:100%;height:20px;}", ".izh_blockCart.pending .do:after{text-decoration:blink;color:red;}", ".izh_blockCart .do:after{position:relative;content:attr(izh_num2B);}", ".izh_blockCart .do .button{color:#fff;}", ".izh_blockCart .frame{overflow-y:auto;overflow-x:hidden;position:absolute;top:25px;bottom:0;left:0;right:0;background-color:#fff;padding-top:5px;}", ".izh_blockCart .list{display:block;margin:2px;width:100%;padding-right:5px;}", ".izh_blockCart .list .rel{border-width:0 2px;border-style:solid;border-color:#fff;width:24px;height:18px;}", ".izh_blockCart .list.i_fo .rel{border-left-color:#259;background-position:-120px -184px;}", ".izh_blockCart .list.fo_i .rel{border-right-color:#259;background-position:-120px -164px;}", ".izh_blockCart .list.i_fo.fo_i .rel{background-position:-78px -200px;}", ".izh_blockCart .user2B{display:block;margin:2px 0;padding:0 40px 0 60px;}", ".izh_blockCart .user2B i.zg-icon{display:block;position:absolute;right:0;margin-top:5px;}", ".izh_blockCart .user2B .name{display:block;color:#fff;background-color:#000;white-space:nowrap;padding:2px 5px;border-radius:3px;}", ".izh_blockCart .list .user2B.unfo .name{background-color:#f00;}", ".izh_blockCart .user2B .del{display:block;position:absolute;margin-left:-4.5em;}", ".izh_blockCart .user2B i.say{display:block;position:absolute;margin-left:-44px;border-radius:6px 6px 0 6px;border:1px solid #999;padding:0 5px 0 3px;}", ".izh_blockCart .user2B i.say_1{display:block;position:absolute;margin-left:-10px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-bottom:1px solid #999;}", ".izh_blockCart .user2B i.say_2{display:block;position:absolute;margin-left:-9px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-radius:0 0 0 6px;border:1px solid #999;border-width:0 0 1px 1px}", ".izh-quick-block{position:absolute;text-align:center;width:4em;margin-top:1.5em;white-space:nowrap;}", ".izh-quick-block [class^=izh-quick-block]{position:absolute;display:block;white-space:nowrap;}", ".izh-quick-block:after{content:attr(izh_num2B);margin-top:1em;display:block;}", ".zm-comment-hd .izh-quick-block-pend{position:absolute;left:0;top:40px;}", "" ].join("\n");
    this.unblockAll = function() {
        $(".zg-btn-unfollow").each(function(i, e) {
            var uid = $(e).attr("id").slice(4);
            $.post("http://www.zhihu.com/settings/unblockuser", $.param({
                _xsrf: $("input[name=_xsrf]").val(),
                uid: uid
            }), function(r) {
                console.log(r);
            });
        });
    };
    this.doUnfollow = function($e) {
        var uid = $e.attr("uid");
        $.post("http://www.zhihu.com/node/MemberFollowBaseV2", $.param({
            method: "unfollow_member",
            params: JSON.stringify({
                hash_id: uid
            }),
            _xsrf: $("input[name=_xsrf]").val()
        }), function(r) {
            var query = decodeURIComponent(this.data), params = utils.getParamInQuery(query, "params");
            eval("params=" + params);
            console.log(params);
            var bid = "fb-" + params.hash_id, who = bid + ",", unfollowed = iZhihu.QuickBlock.Unfollowed, refollowed = iZhihu.QuickBlock.Refollowed, $cartDIV = $("#izh_blockCart"), $user = $cartDIV.find(".user2B[uid=" + params.hash_id + "]"), $list = $user.closest(".list");
            $user.prependTo($list.next().next());
            if (unfollowed.Users.indexOf("," + who) < 0) unfollowed.Users += who;
            if (refollowed.Users.indexOf("," + who) >= 0) refollowed.Users = refollowed.replace("," + who, ",");
        });
    };
    this.doQuickBlock = function($e) {
        var blocking = iZhihu.QuickBlock.Blocking, href = $e.attr("href"), who = href.replace("/people/", "") + ",";
        if (typeof blocking === "undefined" || !blocking) {
            blocking = iZhihu.QuickBlock.Blocking = {
                Users: ",",
                Count: 0
            };
        } else if (blocking.Users.indexOf("," + who) >= 0) {
            return;
        }
        var $cartDIV = $("#izh_blockCart");
        $cartDIV.addClass("blocking");
        blocking.Users += who;
        blocking.Count++;
        $.post("http://www.zhihu.com" + href + "/block", $.param({
            action: "add",
            _xsrf: $("input[name=_xsrf]").val()
        }), function(r) {
            var href = this.url.replace("http://www.zhihu.com", "").replace("/block", ""), userID = href.replace("/people/", ""), who = "," + userID + ",", blocking = iZhihu.QuickBlock.Blocking;
            if (0 == --blocking.Count) $cartDIV.removeClass("pending");
            if (blocking.Users.indexOf(who) < 0) return;
            // No this user in pending
            blocking.Users = blocking.Users.replace(who, ",");
            $('#izh_blockCart .user2B[href="' + href + '"]').find(".del")[0].click();
            $('a[href="' + href + '"]').css("text-decoration", "line-through");
        });
    };
    this.resizeBlockCart = function($cartDIV) {
        var $temp = $cartDIV.clone().attr("id", "").css({
            height: "",
            position: "absolute",
            bottom: "",
            "z-index": "-1"
        }).appendTo(iZhihu.$body).show();
        $temp.find(".frame").css({
            position: "static",
            top: "",
            bottom: "",
            left: "",
            right: "",
            overflow: ""
        });
        var h = $temp.height();
        $temp.remove();
        $temp = null;
        if (h + iZhihu.$main.offset().top < iZhihu.$win.height()) {
            $cartDIV.css({
                height: h,
                bottom: ""
            });
        } else {
            $cartDIV.css({
                height: "",
                bottom: 0
            });
        }
    };
    this.in2BlockCart = function($e) {
        var pending = iZhihu.QuickBlock.Pending, href = $e.attr("href"), who = href.replace("/people/", "") + ",";
        if (typeof pending === "undefined" || !pending) {
            pending = iZhihu.QuickBlock.Pending = {
                Users: ",",
                Count: 0
            };
        } else if (pending.Users.indexOf("," + who) >= 0) {
            return;
        }
        var $cartDIV = $("#izh_blockCart");
        if (!$cartDIV.length) {
            $cartDIV = $('<div id="izh_blockCart"class="izh_blockCart">').css({
                top: iZhihu.$main.offset().top
            }).append($("<div>", {
                "class": "do",
                izh_num2B: 0,
                title: "下为「候审」列表\n点击左上角可收起/展开\n数字为人犯总数（红色表示仍有人犯正待入列）"
            }).append($("<a>", {
                "class": "button delAll",
                href: "javascript:void(0);",
                html: "大赦",
                title: "清空「候审」列表",
                click: function() {
                    var $cartDIV = $("#izh_blockCart");
                    $cartDIV.css("bottom", "").find(".list").empty();
                    $(this.parentNode).attr("izh_num2B", "0");
                    $cartDIV.css("height", "");
                }
            }).css({
                display: "block",
                position: "absolute",
                left: 24
            })).append($("<input>", {
                "class": "unfo",
                href: "javascript:void(0);",
                type: "checkbox",
                title: "选中后，将我关注之人标出，改以放逐（取消关注）论处",
                click: function() {
                    var $cartDIV = $(this.parentNode.parentNode), $users = $(".frame .list.i_fo .user2B", $cartDIV), $action = $(".action", this.parentNode);
                    if (this.checked) {
                        $users.addClass("unfo");
                        $action.html("放逐").css("padding", "0 2em 0 0").attr("title", "对列表内我关注之人取消关注");
                    } else {
                        $users.removeClass("unfo");
                        $action.html("收监").css("padding", "0 0 0 2em").attr("title", "将下列人犯逐一加入黑名单");
                    }
                }
            }).css({
                display: "block",
                "float": "left",
                height: 22,
                "line-height": 22
            })).append($("<span>", {
                "class": "",
                href: "javascript:void(0);",
                html: "从轻",
                title: "选中后，将我关注的人标出，准备「取消关注」"
            }).css({
                display: "block",
                "float": "left",
                "margin-right": 20
            })).append($("<a>", {
                "class": "button action",
                href: "javascript:void(0);",
                html: "收监",
                title: "将下列人犯逐一加入黑名单",
                click: function() {
                    var $cartDIV = $(this.parentNode.parentNode);
                    if ($(".unfo", this.parentNode).is(":checked")) {
                        $(".list.i_fo .user2B", $cartDIV).each(function(i, e) {
                            iZhihu.QuickBlock.doUnfollow($(e));
                        });
                    } else {
                        $(".list .user2B", $cartDIV).each(function(i, e) {
                            iZhihu.QuickBlock.doQuickBlock($(e));
                        });
                    }
                }
            }).css({
                display: "block",
                "float": "right",
                "margin-left": 20,
                "margin-right": -10,
                padding: "0 0 0 2em"
            })).append($("<a>", {
                "class": "zg-icon zg-icon-double-arrow",
                href: "javascript:void(0);",
                click: function() {
                    var $cartDIV = $("#izh_blockCart");
                    if ($cartDIV.attr("mini") != "1") {
                        $cartDIV.find(".frame").hide();
                        $cartDIV.css({
                            height: "",
                            bottom: ""
                        });
                        $cartDIV.attr("mini", "1");
                    } else {
                        $cartDIV.find(".frame").show();
                        iZhihu.QuickBlock.resizeBlockCart($cartDIV);
                        $cartDIV.attr("mini", "0");
                    }
                }
            }).css({
                position: "absolute",
                left: 0,
                top: 5
            }))).append($("<div>", {
                "class": "frame"
            }).append($("<div>", {
                "class": "list i_fo fo_i"
            })).append($("<div>", {
                "class": "list i_fo"
            })).append($("<div>", {
                "class": "list fo_i"
            })).append($("<div>", {
                "class": "list"
            }))).appendTo(iZhihu.$body);
        }
        if ($cartDIV.find('.user2B[href="' + href + '"]').length) {
            return;
        }
        $cartDIV.addClass("pending");
        pending.Users += who;
        pending.Count++;
        $.get("http://www.zhihu.com" + href + "/json", "", function(r) {
            var user = r.msg[0], userName = user[0], userID = user[1], hashID = user[3], f_ = r.msg[3], _f = r.msg[4], cssF = _f || f_ ? "zg-icon rel " : "", $cartDIV = $("#izh_blockCart"), $cart = $cartDIV.find(".list"), href = "/people/" + userID, who = "," + userID + ",", pending = iZhihu.QuickBlock.Pending;
            console.log(userName + ":" + f_ + ":" + _f);
            if (0 == --pending.Count) $cartDIV.removeClass("pending");
            if (pending.Users.indexOf(who) < 0) return;
            // No this user in pending
            pending.Users = pending.Users.replace(who, ",");
            if ($cartDIV.find('.list .user2B[href="' + href + '"]').length) return;
            // User already in block list
            var $user2B = $("<div>", {
                "class": "user2B" + (f_ && $cartDIV.find(".do .unfo:checked").length ? " unfo" : ""),
                href: href,
                uid: hashID
            }).append($("<a>", {
                "class": "button del",
                html: "赦",
                href: "javascript:void(0);",
                click: function() {
                    var $user = $(this).closest(".user2B"), $cartDIV = $("#izh_blockCart");
                    $user.remove();
                    var num2B = $cartDIV.find(".list .user2B").length;
                    $cartDIV.children(".do").attr("izh_num2B", num2B == 0 ? "0" : num2B > 999 ? "1k+" : num2B);
                    if (num2B) iZhihu.QuickBlock.resizeBlockCart($cartDIV); else $cartDIV.css("height", "");
                }
            })).append($("<i>", {
                "class": "say",
                html: "冤枉",
                "data-tip": "p$t$" + userID
            })).append($("<i>", {
                "class": "say_1"
            })).append($("<i>", {
                "class": "say_2"
            })).append($("<i>", {
                "class": cssF
            })).append($("<a>", {
                "class": "name",
                href: href,
                html: userName,
                target: "_blank"
            })).show();
            if (f_ && _f) {
                $cart.eq(0).append($user2B);
            } else if (f_) {
                $cart.eq(1).append($user2B);
            } else if (_f) {
                $cart.eq(2).append($user2B);
            } else {
                $cart.eq(3).append($user2B);
            }
            var num2B = $cartDIV.find(".list .user2B").length;
            $cartDIV.children(".do").attr("izh_num2B", num2B == 0 ? "0" : num2B > 999 ? "1k+" : num2B);
            iZhihu.QuickBlock.resizeBlockCart($cartDIV);
        });
    };
    this.addQuickBlock = function($vi, quickBlock) {
        if ($vi.is(".zm-item-vote-info") && !$vi.children("a[name=more]").length) {
            if ($vi.attr("izh-QuickBlock") != "1") {
                var $u = $('.voters a[href^="/people/"]', $vi);
                $u.each(function(i, e) {
                    $("<input>", {
                        "class": "izh-quick-block-sel",
                        type: "checkbox"
                    }).css({}).insertBefore(e).hide().click(function() {
                        var $vi = $(this).closest(".zm-item-vote-info"), $quickBlock = $vi.parent().find(".izh-quick-block"), $users = $("input.izh-quick-block-sel:checked", $vi);
                        $quickBlock.attr("izh_num2B", $users.length);
                    });
                });
                $vi.attr("izh-QuickBlock", "1");
            }
            if ($vi.parent().children("a.izh-quick-block-switch").length) return;
            var width = $vi.closest("[data-aid]").width(), $btnQuickBlock = $("<a>", {
                "class": "izh-quick-block-switch",
                html: "快速屏蔽",
                href: "javascript:void(0);",
                title: "开始从赞同列表中选择屏蔽对象"
            }).css({
                position: "absolute",
                left: width,
                width: "4em"
            }).click(function() {
                if (this.getAttribute("on") == "1") {
                    $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).hide();
                    $(this).attr({
                        title: "开始从赞同列表中选择屏蔽对象",
                        on: "0"
                    }).nextAll(".izh-quick-block").hide();
                } else {
                    $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).show();
                    $(this).attr({
                        title: "结束从赞同列表中选择屏蔽对象",
                        on: "1"
                    }).nextAll(".izh-quick-block").show();
                }
            }).insertBefore($vi), $quickBlock = $("<div>", {
                "class": "izh-quick-block",
                izh_num2B: "0"
            }).css({
                left: width
            }).insertBefore($vi).hide();
            $("<a>", {
                "class": "izh-quick-block-pend",
                href: "javascript:void(0);",
                html: "候审",
                title: "将所选之人列入候审名单以待收监"
            }).css({
                //$.extend(css_QuickBlock,{
                "margin-top": "1em",
                "font-size": "200%",
                width: "2em"
            }).click(function() {
                var $pend = $(this), $quickBlock = $pend.closest(".izh-quick-block"), $users2B = $(".zm-item-vote-info input.izh-quick-block-sel:checked", $quickBlock.parent());
                $users2B.each(function(i, e) {
                    iZhihu.QuickBlock.in2BlockCart($(e).next());
                });
            }).prependTo($quickBlock);
            $("<a>", {
                "class": "izh-quick-block-selAll",
                html: "无",
                href: "javascript:void(0);",
                title: "无一选中"
            }).css({
                "margin-left": "3em"
            }).click(function() {
                var $quickBlock = $(this).closest(".izh-quick-block"), $users = $(".zm-item-vote-info input.izh-quick-block-sel", $quickBlock.parent());
                $users.removeAttr("checked");
                $quickBlock.attr("izh_num2B", 0);
            }).prependTo($quickBlock);
            $("<a>", {
                "class": "izh-quick-block-notAll",
                html: "全",
                href: "javascript:void(0);",
                title: "全部选中"
            }).css({}).click(function() {
                var $quickBlock = $(this).closest(".izh-quick-block"), $users = $(".zm-item-vote-info input.izh-quick-block-sel", $quickBlock.parent());
                $users.attr("checked", "checked");
                $quickBlock.attr("izh_num2B", $users.length);
            }).prependTo($quickBlock);
        }
    };
    this.addQuickBlockInOneComment = function($cmItem) {
        var $where = $(".zm-comment-hd", $cmItem);
        if ($where.find(".izh-quick-block-pend").length) return;
        $("<a>", {
            "class": "izh-quick-block-pend izh-button",
            html: "候审",
            href: "javascript:void(0);",
            title: "将此人列入候审名单以待收监"
        }).click(function() {
            iZhihu.QuickBlock.in2BlockCart($(this).next());
        }).prependTo($where).hide();
    };
    this.addQuickBlockInCommentList = function($where) {
        // Region: 快速屏蔽
        var $cm = $where.is(".zm-comment-box") ? $where : $where.closest(".zm-comment-box"), $u = $(".zm-item-comment", $cm);
        $u.each(function(i, e) {
            iZhihu.QuickBlock.addQuickBlockInOneComment($(e));
        });
        var $btnQuickBlock = $("<a>", {
            "class": "izh-quick-block-switch izh-button",
            html: "快速屏蔽",
            href: "javascript:void(0);",
            title: "开始从评论者中选择屏蔽对象"
        }).css({
            "margin-left": 7
        }).prependTo($where).click(function() {
            if (this.getAttribute("on") == "1") {
                $(".zm-comment-hd .izh-quick-block-pend").hide();
                $(this).attr({
                    title: "开始从评论者中选择屏蔽对象",
                    on: "0"
                }).removeClass("on");
            } else {
                $(".zm-comment-hd .izh-quick-block-pend").show();
                $(this).attr({
                    title: "结束从评论者中选择屏蔽对象",
                    on: "1"
                }).addClass("on");
            }
        });
        if ($cm.is(".empty")) {
            $btnQuickBlock.hide();
        }
    };
    iZhihu.$body.bind("DOMNodeInserted", function(event) {
        $(event.target).filter("#zh-tooltip").bind("DOMNodeInserted", function(event) {
            var $a = $(event.target).filter("#zh-tooltip-people").find("a[name=focus]"), bid = $a.attr("id"), who = "," + bid + ",";
            if ($a.is(".zg-btn-unfollow") && iZhihu.QuickBlock.Unfollowed.Users.indexOf(who) >= 0) {
                $a.html("关注").removeClass("zg-btn-unfollow").addClass("zg-btn-follow");
            }
            if ($a.is(".zg-btn-follow") && iZhihu.QuickBlock.Refollowed.Users.indexOf(who) >= 0) {
                $a.html("取消关注").removeClass("zg-btn-follow").addClass("zg-btn-unfollow");
            }
        });
    });
    return this;
}

/**
 * @class QuickFavo
 */
function QuickFavo(iZhihu) {
    if (typeof iZhihu === "undefined" || !iZhihu || !iZhihu.config["QuickFavo"]) {
        return null;
    }
    iZhihu.QuickFavo = this;
    this.css = [ "div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}", "div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}", 'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}', "div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}", "" ].join("\n");
    this.addQuickFavo = function($v, $a) {
        if ($v.length) {
            if ($a.children(".izh_fav").length <= 0) {
                $('<div class="izh_fav">loading...</div>').bind("mouseover", function() {
                    $(this).show();
                }).bind("mouseout", function() {
                    $(this).hide();
                }).appendTo($a);
            }
            $v.bind("mouseenter", function() {
                var $a = getItem($(this)), $m = $(this).closest(".zm-item-meta");
                $a.children(".izh_fav").css({
                    bottom: $(this).offsetParent().innerHeight() - $(this).position().top,
                    left: $(this).position().left
                }).show();
                $.getJSON("http://www.zhihu.com/collections/json", $.param({
                    answer_id: $a.attr("data-aid")
                }), function(result, status, xhr) {
                    var aid = this.url.substr(this.url.indexOf("answer_id=") + 10), sel = pageIs.Question ? ".zm-item-answer" : pageIs.Home ? ".feed-item" : "", $a = $(sel + "[data-aid=" + aid + "]"), $v = $a.children(".izh_fav").html('<div class="title">最近的选择</div>');
                    if ("" == sel) return;
                    $.each(result.msg[0].slice(0, 4), function(i, e) {
                        $("<a/>", {
                            "class": "fav",
                            href: "javascript:;",
                            aid: aid,
                            fid: e[0],
                            html: e[1]
                        }).click(function() {
                            var u = "http://www.zhihu.com/collection/";
                            u += $(this).hasClass("selected") ? "remove" : "add";
                            $.post(u, $.param({
                                _xsrf: $("input[name=_xsrf]").val(),
                                answer_id: $(this).attr("aid"),
                                favlist_id: $(this).attr("fid")
                            }), function(result) {
                                var act = this.url.substring(this.url.lastIndexOf("/") + 1), fid = utils.getParamInQuery(this.data, "favlist_id"), aid = utils.getParamInQuery(this.data, "answer_id"), sel = pageIs.Question ? ".zm-item-answer" : pageIs.Home ? ".feed-item" : "", $vi = "" == sel ? null : $(sel + "[data-aid=" + aid + "] .izh_fav a[fid=" + fid + "]"), inc = 0;
                                if ("" == sel) return;
                                if (act == "remove" && result.msg == "OK") {
                                    $vi.removeClass("selected");
                                    inc = -1;
                                } else if (act == "add" && result.msg.length) {
                                    $vi.addClass("selected");
                                    inc = 1;
                                }
                                if (inc != 0) {
                                    $vi.children("span").html(parseInt($vi.children("span").html()) + inc);
                                }
                            });
                        }).appendTo($v).append($("<span/>", {
                            html: e[3]
                        }));
                    });
                    $.each(result.msg[1].slice(0, 4), function(i, e) {
                        $v.find("a.fav[fid=" + e + "]").addClass("selected");
                    });
                });
            });
            $v.bind("mouseleave", function() {
                var $a = getItem($(this));
                $a.children(".izh_fav").hide();
            });
        }
    };
    return this;
}

allLinks = function(name, listSel, listName) {
    this.name = name;
    this.listSel = listSel;
    this.listName = listName;
    this.dlgID = "izh-dlg-" + name;
    this.$dlg = null;
    //初始化弹出框
    this.initDialog = function() {
        this.$dlg = $("#" + this.dlgID);
        var retVal = 0 < this.$dlg.length;
        if (!retVal) {
            var dom = [ '<div id="' + this.dlgID + '" class="modal-dialog allLinks" tabindex="0" style="display: none;width:500px">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">' + this.listName + "链接清单</span>", '<span class="modal-dialog-title-text izhihu-collection-info"></span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<div class="izhihu-collection-links" tabIndex="-1" class="zg-form-text-input" style="height:300px;overflow-y:scroll;outline:none;">', //'<textarea style="width: 100%; height: 132px;" id="izhihu-collection-links" class="zu-seamless-input-origin-element"></textarea>',
            "</div>", "</div>", '<div class="zm-command">', '<div class="zg-left">', '<a class="zg-btn-blue reload" href="javascript:;">重新获取</a>', "</div>", //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
            '<a class="zg-btn-blue copy" href="javascript:;">复制到剪贴板</a>', '<a class="zg-btn-blue selAll" href="javascript:;">选择全部</a>', "</div>", "</div>", "</div>", "</div>" ].join("");
            this.$dlg = $(dom).appendTo(document.body).attr("name", this.name).attr("listSel", this.listSel);
            if (this.$dlg.length) retVal = true;
            $(".modal-dialog-title-close", this.$dlg).click(function() {
                $("#zh-global-spinner").hide();
                $(".modal-dialog-bg").hide();
                $(this).parentsUntil(".modal-dialog").parent().hide();
            });
            //拖动
            this.$dlg.drags({
                handler: ".modal-dialog-title-draggable"
            });
            $(".copy", this.$dlg).click(function() {
                var s = new Array();
                $(".izhihu-collection-links a", $(this).parentsUntil(".modal-dialog-content").parent()).each(function(i, e) {
                    s.push(e.getAttribute("href"));
                });
                //copyToClipboard(txt);
                GM_setClipboard("test", "html");
                //s.join('<br/>')
                alert("已复制 :)");
            }).hide();
            $(".selAll", this.$dlg).click(function() {
                var $e = $(this).parentsUntil(".modal-dialog-content").parent().find(".izhihu-collection-links");
                if ($e.length) selectText($e.get(0));
            });
            $(".reload", this.$dlg).click(function() {
                var $d = $(this).parentsUntil(".modal-dialog").parent();
                result = [];
                next = "0";
                $(".izhihu-collection-links", $d).empty();
                var listSel = $d.attr("listSel");
                msg = [ $(".zm-item", listSel).size(), $(listSel).html(), "0" ];
                handler(msg, $d);
            });
        }
        return retVal;
    };
    this.start = function($d) {
        if (!$d) $d = this.$dlg;
        if (!$d) return;
        if ($("#zh-global-spinner:visible").length) return;
        $("#zh-global-spinner").show();
        var msg = [ 0, "", "0" ];
        if (!$(".izhihu-collection-links", $d).children().length || next == "") {
            result = [];
            next = "0";
            $(".izhihu-collection-links", $d).empty();
            var listSel = $d.attr("listSel");
            msg = [ $(".zm-item", listSel).size(), $(listSel).html(), "0" ];
        }
        handler(msg, $d);
    };
};

//分析内容
var processNode = function(content, $dlg) {
    $(content).find(".zm-item-answer").each(function(index, item) {
        var dom = $(item), parent = dom.parent(), lnkTitle = $("a", dom.closest(".zm-item").children().first()), hrefQuestion = url.data.attr["base"] + lnkTitle.attr("href");
        //console.log(dom);
        var obj = {
            title: lnkTitle.text(),
            questionUrl: hrefQuestion,
            answerUrl: hrefQuestion + (dom.parent().is(".zm-item-fav") ? "/answer/" + dom.attr("data-atoken") : ""),
            answerAuthor: dom.find('.zm-item-answer-author-wrap a[href^="/people"]').text().trim(),
            summary: dom.find(".zm-item-answer-summary").children().remove().end().text(),
            content: dom.find(".zm-editable-content").html()
        };
        result.push(obj);
        var str = utils.formatStr('<li style="list-style-type:none"><a href="{answerUrl}" title="* 《{title}》&#13;* {answerAuthor}：&#13;* {summary}">{answerUrl}</a></li>', obj);
        $(".izhihu-collection-links", $dlg).append(str);
        var count = result.length;
        $(".izhihu-collection-info", $dlg).html("（努力加载中...已得到记录 " + count + " 条）");
    });
};

//处理函数
var handlerCollections = function(msg, $dlg) {
    next = String(msg[2]);
    if (next == "0") next = $("#zh-load-more").attr("data-next");
    $.post(window.location, $.param({
        offset: 0,
        start: next,
        _xsrf: $("input[name=_xsrf]").val()
    }), function(r) {
        handler(r.msg, $(".modal-dialog.allLinks"));
    });
};

var handlerAnswers = function(msg, $dlg) {
    var c = Number(msg[0]);
    if (!c) {
        next = "-1";
        handler([ 0, "", "-1" ], $dlg);
        return;
    }
    next = String(Number(next) + c);
    eval("var param=" + $("#zh-profile-answer-list").children().first().attr("data-init"));
    if (param && param.params) {
        $.extend(param.params, {
            offset: Number(next)
        });
        var s = url.data.attr.base + "/node/" + param.nodename;
        $.post(s, $.param({
            method: "next",
            params: JSON.stringify(param.params),
            _xsrf: $("input[name=_xsrf]").val()
        }), function(r) {
            handler([ r.msg.length, r.msg.join(""), r.msg.length ? String(r.msg.length) : "-1" ], $(".modal-dialog.allLinks"));
        });
    }
};

var next = "";

var handler = function(msg, $dlg) {
    processNode(msg[1], $dlg);
    if ($dlg.is(":hidden")) {
        $("#zh-global-spinner").hide();
        return;
    }
    if (next !== "-1") {
        var funcName = "handler" + $dlg.attr("name"), param = null;
        eval("if(" + funcName + "){" + funcName + "(msg,$dlg)}");
    } else {
        $(".izhihu-collection-info", $dlg).html("（加载完成，共得到记录 " + result.length + " 条）");
        $("#zh-global-spinner").hide();
        $(".selAll", $dlg).click();
    }
};

var w = unsafeWindow;

// 复制到剪贴板（未实现）
var copyToClipboard = function(txt) {
    if (w.clipboardData) {
        w.clipboardData.clearData();
        w.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        w.location = txt;
    } else if (w.netscape) {
        try {
            w.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor("text/unicode");
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("复制成功！");
    }
};

// 选中元素内文本
var selectText = function(element) {
    if (!element) return;
    var doc = document, range, selection;
    if (doc.body.createTextRange) {
        //ms
        range = doc.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        //all others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

//拖动, 用法 $('目标的css selector').drags({handler:'拖动对象的css selector'})
//http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
(function($) {
    $.fn.drags = function(opt) {
        opt = $.extend({
            handler: "",
            cursor: "move"
        }, opt);
        if (opt.handler === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handler);
        }
        return $el.css("cursor", opt.cursor).on("mousedown", function(e) {
            if (opt.handler === "") {
                var $drag = $(this).addClass("draggable");
            } else {
                var $drag = $(this).addClass("active-handle").parent().addClass("draggable");
            }
            var z_idx = $drag.css("z-index"), drg_h = $drag.outerHeight(), drg_w = $drag.outerWidth(), pos_y = $drag.offset().top + drg_h - e.pageY, pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css("z-index", 1e3).parents().on("mousemove", function(e) {
                $(".draggable").offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass("draggable").css("z-index", z_idx);
                });
            });
            e.preventDefault();
        }).on("mouseup", function() {
            if (opt.handler === "") {
                $(this).removeClass("draggable");
            } else {
                $(this).removeClass("active-handle").parent().removeClass("draggable");
            }
        });
    };
})(unsafeWindow.$);

/**
 * @class Utils 辅助类
 */
function utils() {}

var cfgDefault = {
    comment_sidebar: true,
    answer_orderByTime: false,
    AuthorList: false,
    ShowComment: true,
    HomeLayout: false,
    QuickFavo: true,
    AuthorRear: false,
    HomeNoti: false,
    QuickBlock: false,
    Noti7: true
};

/**
 * 读取配置
 */
utils.getCfg = function(key) {
    if (!key) return false;
    var cfg = _.extend(cfgDefault, this.getValue("izhihu", cfgDefault));
    return key ? cfg[key] : cfg;
};

utils.setCfg = function(key, value) {
    if (!key) return;
    var cfg = _.extend(cfgDefault, this.getValue("izhihu", cfgDefault));
    cfg[key] = value;
    this.setValue("izhihu", cfg);
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue) {
    var v = localStorage[key];
    if (v) return JSON.parse(v); else return defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value) {
    localStorage[key] = JSON.stringify(value);
};

/**
 * 删除存储
 */
utils.deleteValue = function(key) {
    return delete localStorage[key];
};

utils.transferOldCfg = function() {
    var oldHomeLayout = localStorage["izh_HomeLayout"], oldAuthorList = localStorage["izh_AuthorList"], oldShowComment = localStorage["izh_ShowComment"], oldQuickFavo = localStorage["izh_QuickFavo"], oldAuthorRear = localStorage["izh_AuthorRear"], oldHomeNoti = localStorage["izh_HomeNoti"];
    if (oldHomeLayout) {
        izhHomeLayout = oldHomeLayout;
        localStorage.removeItem("izh_HomeLayout");
        this.setCfg("HomeLayout", izhHomeLayout);
    }
    if (oldAuthorList) {
        izhAuthorList = oldAuthorList;
        localStorage.removeItem("izh_AuthorList");
        this.setCfg("AuthorList", izhAuthorList);
    }
    if (oldShowComment) {
        izhRightComment = oldShowComment;
        localStorage.removeItem("izh_ShowComment");
        this.setCfg("ShowComment", izhRightComment);
    }
    if (oldQuickFavo) {
        izhQuickFavo = oldQuickFavo;
        localStorage.removeItem("izh_QuickFavo");
        this.setCfg("QuickFavo", izhQuickFavo);
    }
    if (oldAuthorRear) {
        izhAuthorRear = oldAuthorRear;
        localStorage.removeItem("izh_AuthorRear");
        this.setCfg("AuthorRear", izhAuthorRear);
    }
    if (oldHomeNoti) {
        izhHomeNoti = oldHomeNoti;
        localStorage.removeItem("izh_HomeNoti");
        this.setCfg("HomeNoti", izhHomeNoti);
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
utils.formatStr = function(tpl, obj) {
    obj = typeof obj === "object" ? obj : Array.prototype.slice.call(arguments, 1);
    return tpl.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
        if (m == "{{") {
            return "{";
        }
        if (m == "}}") {
            return "}";
        }
        return obj[n];
    });
};

utils.getParamInQuery = function(queryStr, paramName) {
    var param = paramName + "=", start = queryStr.indexOf(param) + param.length, end = queryStr.indexOf("&", start);
    return end < start ? queryStr.substring(start) : queryStr.substring(start, end);
};

utils.observeDOMAttrModified = function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
    return function(obj, callback) {
        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer) {
                if (mutations[0].type == "attributes") callback(mutations[0]);
            });
            obs.observe(obj, {
                attributes: true
            });
        } else if (eventListenerSupported) {
            obj.addEventListener("DOMAttrModified", callback, false);
        }
    };
}();

//var $ = unsafeWindow.$;
var _ = this._;

var purl = window.purl || $.url;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var url = purl();

var page = url.segment(1);

//主入口
$(function main() {
    console.log("izhihu started.");
});

var pageIs = {}, $win = $(unsafeWindow), _doc = window.document, $body = $(_doc.body), _path = window.frameElement ? window.frameElement.src.replace(/https?:\/\/www.zhihu.com/, "") : url.data.attr["path"], css = "", $h = $("head"), $s = $('<style type="text/css"></style>'), iPathAnswers = _path.indexOf("/answers"), iPathCollection = _path.indexOf("/collection");

pageIs.Home = "/" == _path;

pageIs.Answer = 0 < _path.indexOf("/answer/");

pageIs.Question = !pageIs.Answer && 0 == _path.indexOf("/question/");

pageIs.Answers = 0 < iPathAnswers && _path.substr(iPathAnswers) == "/answers";

pageIs.Collection = 0 == iPathCollection;

pageIs.Debuts = 0 == _path.indexOf("/debuts/");

var i = 0, $user = $(".zu-top-nav-userinfo"), z = $user.length ? $user.attr("href") : "", $banner = $(document.body).children().first(), $main = $("[role=main]"), css_AuthorListItemA = "padding:0 10px 0 0;", css_AuthorListItemA_name = "padding:0 5px;";

window.iZhihu = {
    $win: $win,
    $body: $body,
    $main: $main,
    config: _.extend(cfgDefault, utils.getValue("izhihu", cfgDefault))
};

var izhHomeLayout = window.iZhihu.config["HomeLayout"], izhAuthorList = window.iZhihu.config["AuthorList"], izhRightComment = window.iZhihu.config["ShowComment"], izhQuickFavo = window.iZhihu.config["QuickFavo"], izhAuthorRear = window.iZhihu.config["AuthorRear"], izhHomeNoti = window.iZhihu.config["HomeNoti"], izhQuickBlock = window.iZhihu.config["QuickBlock"];

utils.transferOldCfg();

window.iZhihu.$body.attr({
    izhHomeLayout: izhHomeLayout ? "1" : "",
    izhAuthorList: izhAuthorList ? "1" : "",
    izhRightComment: izhRightComment ? "1" : "",
    izhQuickFavo: izhQuickFavo ? "1" : "",
    izhAuthorRear: izhAuthorRear ? "1" : "",
    izhHomeNoti: izhHomeNoti ? "1" : "",
    izhQuickBlock: izhQuickBlock ? "1" : ""
});

var _QuickBlock = new QuickBlock(window.iZhihu), _QuickFavo = new QuickFavo(window.iZhihu), _Comment = new Comment(window.iZhihu), _Noti7 = new Noti7(window.iZhihu);

css += [ '.t_showframe{padding:10px 10px 10px 10px;background:#f0f0f0;border:1px solid #fff;box-shadow:2px 5px 15px #333;border-radius:10px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:10px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:10px}#iZhihu_rtjddiv{width:650px;height:437px}#iZhihu_setdiv{width:600px;height2:295px}.t_setdiv{padding-bottom:10px;background:#fcfcfc;width:100%;height:100%}.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-radius-topleft:10px;border-radius-topright:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_set_ft{font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-weight:bold !important;text-shadow:none !important;margin-top:15px !important}.t_set_ft a{text-decoration:none;color:#000}.t_setbtn{border:1px solid black;padding:2px;cursor:pointer;background:#fff;color:#0080c0}.t_setftbtn span{padding:2px 10px 2px 10px !important}.t_rtjdbtn{background:#0080c0 !important;color:#fff !important}.t_rtjdtxtpos{padding-top:5px}.t_rtjdchk{vertical-align:middle;margin-top:-2px;margin-bottom:1px}#iZhihu_rthint{font-family:Arial,sans-serif,瀹�� !important;font-size:16px !important;font-weight:bold;padding:5px 10px 5px 10px;position:fixed;top:20px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;display:inline-block;opacity:0.7}.t_rthint_n{color:#fff !important;background:#000 !important}.t_rthint_f{background:#880000 !important;color:#ffffdd !important}.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}.t_jchkbox .mark{display:inline}.t_jchkbox img{vertical-align:middle;width:45px;height:15px}.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}.t_jchkbox img{background-position:0 0}.t_jchkbox-hover img{background-position:0 -15px}.t_jchkbox-checked img{background-position:0 -30px}.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}.t_jchkbox-disabled img{background-position:0 -60px}.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}.t_jradbox{display:inline;font-size:16px;line-height:16px;padding-right:3px;cursor:pointer;cursor:hand}.t_jradbox .mark{display:inline}.t_jradbox img{vertical-align:middle;width:16px;height:16px}.t_jradbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAMAAABMUIWcAAAAA3NCSVQICAjb4U/gAAABoVBMVEX////7+/v5+fn4+Pj39/f29vb19fX09PTz8/Py8vPx8fHw8PDv7+/u7u7t7e3s7Ozq6uro6Ojm5ubl5eXk5OTi4uLg4ODf39+26vXb2/zb2/3a2v3c3NzZ2fbZ2fjI3vTY2NjX1/LX19fU1ebU1NTT09PQ0NDOzs6k2PCh1v+x0fHKysrIyMiqzfDGxsbCwsLAwMCWyO6lw+G9vb2Nw/i6urqZwNabv+K4uLi3t7eYu920tLSzs7ODu/SysrKEtuisrKyIstyLstJ3su6mpqZ+rNt/p890qONrquiKo8hup9+cnJxkpOVuoNJfoeRunMlindhZneGTk5ORkZpTmd9RlttVldSLi4uLi5N8jZ5yi76GhpRZjsSGhoZ9h5N/gbZMjtBgiLGCgoqBgYFXh71Gis5/f397e3t7e4I+hMpleY11dXVLea9YeJlwcHBMcJQ1csNpaWlBb5xoaG5jY2NCZIY0ZZZYWZ4rY7ZLXJ9PUphUVFRHVWQkWKwhT6VATFkbRZw0RFUWOJIiNkkWJjcXGBoTFSAUFRYOERUJDBEBAQEtwLhRAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAu1JREFUSInNlGtXElEUhimssIsIhIXUigydbBRJwCDESjAvqCEqYxeQRAZR85KXMMW4mMH51Z19Zk/M4Uvap561hrXemWctDnu/jM7+F3QXEBzza8i8A245VvaQFQcTVlw6ZGAJhLVgGzKyxoR94Toi7oJw7L+HDB8zYUu8iYhbNsp+0IEE9202nc22IRgRIQfCbqAbCewyISN0IUIShC2/G/FvMEHq7kC6JRByvj7EJzMh7jQhzjgIGU8P4kkyIdqlHtIRBUFyq4d0S0yIWNQ5mCMgxIU7iBBVziAaECEOc5B8VsQnsTmIuQ0kJ4LAZ1iW4QFiUPbD5Ytss8HSzz17c9YKAql3aZ8/JvWHIDxZ/qZwTj6yB8vfFWqQqXA0+YiRIudH8PzowyBjnWUqVOaeAYM1slkBoZJ9A7ytk8MKE0qLP8rv+/tPyMliCSZZyZerX8bGyqScr7BJni6sk9rLSfLrxcIpCKX8Aam/+0xqM/kSE4pzs2ekeka+zs4VmZBNs3yYzipCYW4iViekOjExWwDhNJtYhZxIZE8VYTYc3ib1mXBYEYrpWIx+yadYLF1kws50KBSqbtOP6R0QCompqanqAf1IFJiwGurt7X1Or97QKgib416v9xW9vOObTEgN3UeGUjCH1OhTZDR1wT7Y1f23NvWh9dJ9+FfB6BtBfEa4xWcqBK3q/8IaBIHPVBgxXUEsTOAzFQIWPWL2d1L4rOvs9JiuIWYPCHymgtukvkBMAyDwmQou0y3E5AKBz1QQ228g7SIIfKaCYFQPZewBgc9U6DGov9vgBIHPcAbLVcTcB3PgM52DxeNDPBYQ+AzL0quvHL2yHy5fbt0BKWJvzlrBnMm025uztg+SHOD6wLKmD4Ic5/qg5EYfDFJG0PYBM/TB+jri1OuH5RHsA5dZH1yy1NaRkW6rfdBmpQ9RORKVxUYfNFnpw92kLEc0fdBk7IMoJ03aPjSy2oeIi+/Dn6z2oaWpDy3/Ux9+AyHcPO1jtxhjAAAAAElFTkSuQmCC") no-repeat}.t_jradbox img{background-position:0 0}.t_jradbox-hover img{background-position:-16px 0}.t_jradbox-checked img{background-position:0 -16px}.t_jradbox-checked .t_jradbox-hover img{background-position:-16px -16px}.t_jradbox-disabled img{background-position:0 -32px}.t_jradbox-checked .t_jradbox-disabled img{background-position:0 -48px}#izh_updatediv{width:400px;height:315px}.t_upbtn{background:#0080c0 !important;color:#fff !important}.t_upinfo{height:120px !important;vertical-align:text-top !important}#izh_updatediv th{border-right:2px solid #fcfcfc !important}#izh_updatediv tfoot td{border:none !important;border-top:2px solid #fcfcfc !important;font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-style:normal !important;text-shadow:none !important}.t_txtshow{text-align:center;background:#0080c0;color:#f0f0f0;user-select:none;-moz-user-select:none}.t_frshow{font-size:1.2em;position:fixed;z-index:99999;top:45px;width:200px;opacity:0.9;cursor:pointer}.t_tbox{padding:10px;position:relative;border:1px solid #f0f0f0;line-height:20px;*height:1%;width:200px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:7px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:7px}.t_tbox s{position:absolute;top:-20px;left:160px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #f0f0f0 transparent;border-style:dashed dashed solid dashed;border-width:10px}.t_tbox i{position:absolute;top:-9px;left:-10px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #0080c0 transparent;border-style:dashed dashed solid dashed;border-width:10px}@media screen and (-webkit-min-device-pixel-ratio:0){#iZhihu_rtjddiv{height:417px}#iZhihu_setdiv{height2:295px}#izh_updatediv{height:315px}}', "" ].join("\n");

if (pageIs.Question && izhAuthorList) {
    css += [ "div.uno{position:absolute;left:0;border:1px solid #0771C1;border-right-width:0;border-top-right-radius:6px}", "div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}", "div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}", "div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}", "div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}", "div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}", "div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}", "div.uno ul li a{display:block;}div.uno li a.sel{text-decoration:none;}", "div.uno ul li a{" + css_AuthorListItemA + "}", "div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}", "div.uno li a span.name{text-align:right;display:block;" + css_AuthorListItemA_name + "background-color:#fff;}div.uno li a.sel span.name{color:#fff;background-color:#0771C1;}", "div.uno li a span.name.noname{color:#000;}", "div.uno li a span.name.collapsed{color:#999999;}", "div.uno li a span.name.friend{font-style:italic;}", "div.uno li span.hp{background-color:#999999;position:relative;float:right;margin-top:-2px;line-height:2px;height:2px;}", "div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}", "div.uno a.sel table.plus{}div.uno a.sel table.plus td{}", "div.uno li a span.func{text-align:center;}", "div.izh-answer-preview{position:fixed;margin-top:1px;background-color:#fff;border:1px solid #0771C1;border-top-width:22px;border-top-right-radius:6px;box-shadow:5px 5px 5px #777;}", "div.izh-answer-preview .zm-editable-content{top:0;bottom:0;left:0;right:0;overflow-y:auto;padding:10px;}", "div.izh-answer-preview img.zm-list-avatar{position:absolute;right:10px;top:-35px;border:1px solid #0771C1;border-radius:6px;}", "div.izh-answer-preview span.comment{position:absolute;top:-18px;line-height:18px;border-top-right-radius:3px;background-color:#fff;padding:0 5px;}", "" ].join("\n");
}

css += [ ".z-icon-izh-fold{background-position:-173px -107px;width:15px;height:15px;}", "" ].join("\n");

css += [ '.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}', ".t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-top-left-radius:6px;border-top-right-radius:6px}", ".t_set_tb th,.t_set_tb td{padding:8px;background:#e7f3f9;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}", ".t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}", ".t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}", ".t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}", ".t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}", ".t_jchkbox .mark{display:inline}", ".t_jchkbox img{vertical-align:middle;width:45px;height:15px}", '.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}', ".t_jchkbox img{background-position:0 0}", ".t_jchkbox-hover img{background-position:0 -15px}", ".t_jchkbox-checked img{background-position:0 -30px}", ".t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}", ".t_jchkbox-disabled img{background-position:0 -60px}", ".t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}", "" ].join("\n");

css += [ ".izh_boxShadow{box-shadow: 5px 5px 3px 0px #999 !important;}", "#zh-question-meta-wrap.izh_noBorder{border-bottom-color:transparent !important;}", "#zh-question-filter-wrap.izh_noBorder{border-top-color:transparent !important;}", "" ].join("\n");

if (izhHomeLayout) {
    css += [ "#zh-question-list { padding-left:30px!important }", "#zh-main-feed-fresh-button { margin-left:-30px!important }", ".feed-item {", "    border-bottom:1px solid #EEE!important;", "    margin-top:-1px!important", "}", ".feed-item .avatar { display:none!important }", "", ".feed-main,.feed-item.combine { margin-left:0!important }", ".feed-item-q { margin-left:-30px!important;padding-left:0!important }", "", window.iZhihu.Comment.RightComment ? "" : ".feed-item-a .zm-comment-box { max-width:602px!important }", window.iZhihu.Comment.RightComment ? "" : ".feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }", "", ".zm-tag-editor,", "#zh-question-title,", "#zh-question-detail,", "#zh-question-meta-wrap,", ".zh-answers-title,", "#zh-question-filter-wrap {", "    margin-left:-32px!important", "}", "", "#zh-question-log-page-wrap .zm-tag-editor,", "#zh-question-log-page-wrap #zh-question-title {", "    margin-left:0 !important", "}", "", ".zh-answers-title,", "#zh-question-filter-wrap {", "    border-bottom:1px solid #EEE!important;", "    z-index:1000!important", "}", "", "#zh-question-meta-wrap {", "    margin-bottom:0!important;", "    padding-bottom:10px!important;", "    border-bottom:1px solid #EEE!important", "}", "", "#zh-question-answer-wrap { margin-top:-1px!important }", "", "#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }", ".zu-question-collap-title { border-top:1px solid #EEE!important }", "#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }", "", ".zu-autohide,", ".zm-comment-op-link,", ".zm-side-trend-del,", ".unpin {", "    visibility:visible!important;", "    opacity:0;", "}", ".feed-item:hover .zu-autohide,", ".zm-item-answer .zu-autohide,", ".zm-item-comment:hover .zm-comment-op-link,", ".zm-side-trend-row:hover .zm-side-trend-del,", ".zm-side-nav-li:hover .unpin {", "    opacity:1;", "}", ".zm-item-vote-count:hover,.zm-votebar button:hover{", "    background:#a6ce56!important;", "    color:#3E5E00 !important", "}", "", "a,a:hover,", "i,", ".zu-autohide,", ".zm-votebar button,", ".zm-item-comment:hover .zm-comment-op-link,", ".zm-comment-op-link,", ".zm-side-trend-row:hover .zm-side-trend-del,", ".zm-side-trend-del,", ".zm-side-nav-li,", ".zu-main-feed-fresh-button,", ".zg-icon,", ".zm-side-nav-li:hover .zg-icon,", ".zm-side-nav-li:hover i,", ".unpin,", ".zm-side-nav-li:hover .unpin {", "    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;", "    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;", "    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;", "}", "", "h3{ line-height:25px }", ".zu-footer-inner {padding:15px 0!important}", ".zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}", ".zm-side-list-content{clear:both}", ".unpin{ display:inline-block!important }", "" ].join("\n");
}

css += window.iZhihu.Comment.css;

if (window.iZhihu.QuickFavo) {
    css += window.iZhihu.QuickFavo.css;
}

if (window.iZhihu.QuickBlock) {
    css += window.iZhihu.QuickBlock.css;
}

if (window.iZhihu.Noti7) {
    css += window.iZhihu.Noti7.css;
    window.iZhihu.Noti7.enhance();
}

var heads = _doc.getElementsByTagName("head");

if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node);
}

if (!$(".modal-dialog-bg").length) {
    $body.append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

var _e = null, ppWidth = 0, ppHeight = 400, getItem = function($c) {
    var $item = $(null);
    if ($c && $c.length) {
        var $itemMeta = $c.closest(".zm-item-meta");
        if ($itemMeta.parent().is(".feed-meta")) {
            $item = $c.closest(".feed-item");
        } else if ($itemMeta.is(".answer-actions")) {
            $item = $c.closest(".zm-item-answer,.feed-item");
        } else {
            $item = $itemMeta.prev();
        }
    }
    return $item;
}, processAnswer = function($a, $pp, bAuthorRear, bAuthorList) {
    if (!$a || !$a.length) return;
    if ($a.attr("izh_processed") == "1") return;
    var $c = $a.children().last(), $p = $a.find(".zm-item-answer-author-info"), $v = $a.find(".meta-item[name=favo]");
    if (window.iZhihu.QuickBlock) {
        // Region: 快速屏蔽
        var $voteInfo = $(".zm-item-vote-info", $a);
        if ($("[name=more]", $voteInfo).length) {
            $voteInfo.parent().bind("DOMNodeInserted", function(event) {
                window.iZhihu.QuickBlock.addQuickBlock($(event.target), window.iZhihu.QuickBlock);
            });
        }
    }
    if ($p.length) {
        //relocatePersonInfo
        if (bAuthorRear) {
            $p.css({
                textAlign: "right"
            });
            if ($a.is(".feed-item")) {
                $a.find(".answer_wrap .zm-item-answer-detail .zm-item-rich-text").append($p.hide()).bind("DOMNodeInserted", function(event) {
                    var $c = $(event.target);
                    if ($c.is(".zm-editable-content")) {
                        $(this).children(".zm-item-answer-author-info").insertBefore($c.children(".answer-date-link-wrap")).css({
                            position: "absolute",
                            right: 0
                        }).show();
                    }
                });
            } else {
                $p.insertBefore($c);
            }
        }
        $p = $p.children().first().children().eq(1);
        if ($pp && bAuthorList) {
            // Region: 回答目录项
            var $ppla = $("<a>", {
                href: "#" + $a.attr("data-aid"),
                target: "_self",
                style: css_AuthorListItemA
            }), $ppl = $("<li>").append($ppla).appendTo($pp);
            if ($a.attr("data-isowner") == "1") {
                _e = $a.get(0);
                $ppla.append('<span class="me"></span>');
            }
            var nameCSS = "name";
            if ($a.attr("data-isfriend") == "1") {
                nameCSS += " friend";
            }
            if ($a.attr("data-collapsed") == "1") {
                nameCSS += " collapsed";
            }
            if (!$p.length) {
                nameCSS += " noname";
            }
            $("<span>", {
                "class": nameCSS,
                html: !$p.length ? "匿名用户" : $p.html(),
                style: css_AuthorListItemA_name
            }).appendTo($ppla);
            if ($ppl.width() > ppWidth) ppWidth = $ppl.width();
            // Region end
            // Region: 回答篇幅指示
            var nHP = Math.ceil($(".zm-editable-content", $a).text().length / 100);
            $("<span>", {
                "class": "hp"
            }).css({
                width: nHP * 10,
                "margin-left": -nHP * 10
            }).appendTo($ppla);
            // Region end
            $ppla.mouseover(function() {
                var $frm = $(this.parentNode.parentNode.parentNode), $uno = $frm.parent().mouseover();
                $(this).addClass("sel");
                if (_e) {
                    $uno.children(".meT").css("display", 0 > _e.offsetTop - $frm.scrollTop() ? "" : "none");
                    $uno.children(".meB").css("display", $frm.height() < _e.offsetTop - $frm.scrollTop() + _e.offsetHeight ? "" : "none");
                }
                // Region: 回答预览
                var nam = $("span.name", this);
                if (!nam.length) return;
                var aid = $(this).attr("href").slice(1), prv = $uno.next(".izh-answer-preview"), top = $(this).position().top + $uno.position().top, sel = ".zm-item-answer[data-aid=" + aid + "] > .zm-item-rich-text", ctx = nam.is(".collapsed") ? "#zh-question-collapsed-wrap" : "#zh-question-answer-wrap", div = $(sel, ctx), htm = div.html(), cmt = $(".zm-item-meta > .zu-question-answer-meta-comment", div.parent());
                if (!prv.length) {
                    prv = $("<div>", {
                        "class": div.class
                    }).addClass("izh-answer-preview").width(div.width() + 22).mouseover(function() {
                        $uno.mouseover();
                        $("li a[href=#" + $(this).attr("data-aid") + "]", $uno).addClass("sel");
                        $(this).show();
                    }).mouseout(function() {
                        $uno.mouseout();
                        $("li a[href=#" + $(this).attr("data-aid") + "]", $uno).removeClass("sel");
                        $(this).hide();
                    }).click(function() {
                        $("li a[href=#" + $(this).attr("data-aid") + "]", $uno)[0].click();
                    }).insertAfter($uno);
                }
                if (prv.attr("data-aid") != aid) {
                    prv.attr("data-aid", aid).html(htm).find("a").attr("onclick", "return false;");
                    if ($("span.me", this).length) prv.find("a.zu-edit-button").remove();
                    if (!nam.hasClass("noname")) $("img.zm-list-avatar", div.parent()).clone().appendTo(prv);
                    var t = cmt.text(), i = t.indexOf("条评论");
                    if (cmt.length && i > 0) $("<span>", {
                        "class": "comment",
                        html: t.substring(0, i)
                    }).prepend(cmt.children("i").clone()).appendTo(prv);
                }
                var th = div.height() + 33, maxTop = $uno.position().top + 12, contentPosition = "";
                if (maxTop + th < $win.height()) {
                    if (top + th < $win.height()) {
                        prv.css({
                            top: top > maxTop ? top : maxTop,
                            bottom: ""
                        });
                    } else {
                        prv.css({
                            top: "",
                            bottom: 0
                        });
                    }
                } else {
                    prv.css({
                        top: maxTop,
                        bottom: 0
                    });
                    contentPosition = "absolute";
                }
                prv.css({
                    left: $uno.width()
                }).show().children().first().css("position", contentPosition);
            }).mouseout(function() {
                $(this).removeClass("sel");
                var $uno = $(this.parentNode.parentNode.parentNode.parentNode);
                $uno.next().hide();
            }).click(function() {
                $(this).mouseout();
                $uno.css("left", 9 - $uno.width());
            });
            if (_e == $a.get(0)) {
                _e = $ppla.get(0);
            }
        }
    }
    if (window.iZhihu.QuickFavo) window.iZhihu.QuickFavo.addQuickFavo($v, $a);
    $c.bind("DOMNodeInserted", function(event) {
        window.iZhihu.Comment.processComment($(event.target));
    });
    window.iZhihu.Comment.processCommentButton($a);
    window.iZhihu.Comment.processComment($(".zm-comment-box", $a));
    $a.attr("izh_processed", "1");
};

/**
 * 回答页
 */
$(function() {
    if (pageIs.Answer) {
        var $lblQuestionMeta = $("#zh-question-meta-wrap");
        var $questionWrap = $("#zh-question-meta-wrap");
        $questionWrap.children(".panel-container").bind("DOMNodeInserted", function(event) {
            window.iZhihu.Comment.processComment($(event.target));
        });
        if (window.iZhihu.Comment.RightComment) {
            //$questionWrap.children('.meta-item[name=addcomment]').prependTo($questionWrap);
            window.iZhihu.Comment.processCommentButton($questionWrap);
            if (!$("#izh_QuestionShadow").length) {
                $("<div>", {
                    "class": "izh_boxShadow",
                    id: "izh_QuestionShadow"
                }).css({
                    "z-index": "-1",
                    position: "relative",
                    top: -25,
                    "margin-left": -32
                }).prependTo("#zh-single-question").hide();
            }
        }
        window.iZhihu.Comment.processComment($(".zm-comment-box", $questionWrap));
        //process each answer
        var $listAnswers = $(".zm-item-answer", "#zh-single-question");
        if ($listAnswers && $listAnswers.length) {
            $listAnswers.each(function(i, e) {
                processAnswer($(e), null, izhAuthorRear, false);
            });
        }
    }
});

/**
 * 收藏页
 */
$(function() {
    if (pageIs.Collection) {
        //添加按钮
        $("#zh-list-meta-wrap").append('<span class="zg-bull">•</span>  ').append('<a href="javascript:;" id="getAllLinks">地址清单</a>');
        var btn = $("#getAllLinks");
        var result = [];
        //注册点击事件
        btn.click(function() {
            var allLinksCollection = new allLinks("Collections", "#zh-list-answer-wrap", "收藏夹");
            if (!allLinksCollection.initDialog()) return;
            $(".modal-dialog-bg").show();
            var y = ($win.height() - allLinksCollection.$dlg.width()) / 2, x = ($win.width() - allLinksCollection.$dlg.width()) / 2;
            allLinksCollection.$dlg.css({
                top: y,
                left: x
            }).fadeIn("slow");
            allLinksCollection.start();
        });
    }
    if (pageIs.Answers) {
        //添加按钮
        $(".zm-profile-section-name").append('<span class="zg-bull">•</span>  ').append('<a href="javascript:;" id="getAllLinks">地址清单</a>');
        var btn = $("#getAllLinks");
        var result = [];
        //注册点击事件
        btn.click(function() {
            var allLinksAnswers = new allLinks("Answers", "#zh-profile-answer-list .zh-general-list", "用户回答");
            if (!allLinksAnswers.initDialog()) return;
            $(".modal-dialog-bg").show();
            var y = ($win.height() - allLinksAnswers.$dlg.width()) / 2, x = ($win.width() - allLinksAnswers.$dlg.width()) / 2;
            allLinksAnswers.$dlg.css({
                top: y,
                left: x
            }).fadeIn("slow");
            allLinksAnswers.start();
        });
    }
});

/*
 * 首页
 */
$(function() {
    var $lblActivityCaption = $("#zh-home-list-title"), $btnNewActivity = $("#zh-main-feed-fresh-button"), $feedList = $(".zh-general-list");
    if (pageIs.Home) {
        if (izhHomeNoti && $lblActivityCaption.length && $btnNewActivity.length) {
            $lblActivityCaption.css({
                "float": "left",
                "margin-bottom": "2px",
                "line-height": "32px",
                width: "100%"
            }).next().css("clear", "both");
            $btnNewActivity.css({
                "float": "right",
                margin: "0",
                "line-height": "22px"
            }).appendTo($lblActivityCaption);
        }
    }
    if (pageIs.Home || pageIs.Debuts) {
        $feedList.find(".feed-item").each(function(i, e) {
            processAnswer($(e), null, izhAuthorRear, izhAuthorList);
        });
        $feedList.bind("DOMNodeInserted", function(event) {
            var $item = $(event.target);
            if ($item.is(".feed-item")) {
                processAnswer($item, null, $body.attr("izhAuthorRear") == "1", $body.attr("izhAuthorList") == "1");
            }
        });
    }
});

/**
 * 问题页
 */
$(function() {
    if (pageIs.Question) {
        var $lblQuestionMeta = $("#zh-question-meta-wrap"), $lblAnswersCount = $("#zh-question-answer-num"), $reply = $("#zh-question-answer-form-wrap"), $uno = $("<div>", {
            "class": "uno",
            style: "float:left"
        }), $ppT = $("<span>", {
            "class": "meT",
            style: "display:none"
        }), $frm = $("<div>", {
            "class": "frame"
        }), $ppB = $("<span>", {
            "class": "meB",
            style: "display:none"
        }), $pp = $("<ul>", {
            "class": "pp"
        }), $ppI = $("<div>");
        //答案按时间排序
        if (utils.getCfg("answer_orderByTime")) {
            client.click(".zh-answers-filter-popup div[data-key=added_time]");
        }
        var $questionWrap = $("#zh-question-meta-wrap");
        $questionWrap.children(".panel-container").bind("DOMNodeInserted", function(event) {
            window.iZhihu.Comment.processComment($(event.target));
        });
        if (window.iZhihu.Comment.RightComment) {
            //$questionWrap.children('.meta-item[name=addcomment]').prependTo($questionWrap);
            window.iZhihu.Comment.processCommentButton($questionWrap);
            if (!$("#izh_QuestionShadow").length) {
                $("<div>", {
                    "class": "izh_boxShadow",
                    id: "izh_QuestionShadow"
                }).css({
                    "z-index": "-1",
                    position: "relative",
                    top: -25,
                    "margin-left": -32
                }).prependTo("#zh-single-question").hide();
            }
        }
        window.iZhihu.Comment.processComment($(".zm-comment-box", $questionWrap));
        //process each answer
        var $listAnswers = $(".zm-item-answer", "#zh-single-question");
        if ($listAnswers && $listAnswers.length) {
            if (izhAuthorList) {
                $uno.appendTo($banner);
                $ppT.appendTo($uno);
                $frm.appendTo($uno);
                $pp.appendTo($frm);
                $ppB.appendTo($uno);
            }
            $listAnswers.each(function(i, e) {
                processAnswer($(e), $pp, izhAuthorRear, izhAuthorList);
            });
            if ($reply.children(".zu-answer-form-disabled-wrap").is(":hidden")) {
                var $ppla = $("<a>", {
                    href: "#draft",
                    target: "_self"
                }).append('<table class="plus"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>').append('<span class="name func">-new-</span>'), $ppl = $("<li>").append($ppla).appendTo($pp);
            }
        }
        if ($lblQuestionMeta.length) {
            var s = new Array(), $a = $("<a>"), $c = $("<span>", {
                "class": "zg-bull",
                html: "•"
            }), $p = $lblQuestionMeta.children("a.meta-item:last");
            if (_e) {
                s.push($(_e).attr("href"));
                $a.html("我的回答");
            } else if ($reply.length) {
                var id = "new_answer", $b = $("<a>", {
                    name: id
                }).before($reply.children().first());
                s.push("#draft");
                $a.html("我要回答");
            }
            $c.insertAfter($p);
            $a.attr("href", s.join("")).attr("target", "_self").insertAfter($c);
        }
        var resizeAuthorList = function($f) {
            // Adjust AuthorList's size and locate its position
            if (!$f || !$f.length) return;
            var frm = $f.get(0);
            var width = ppWidth, height = $win.height() - $main.offset().top - 3 - $f.position().top;
            if (frm.scrollHeight > height) {
                $f.height(height);
                width += 20;
            } else {
                $f.height("");
            }
            $f.width(width);
        };
        var $btnCollapsedSwitcher = $("#zh-question-collapsed-switcher"), numCollapsedCount = !$btnCollapsedSwitcher.length || $btnCollapsedSwitcher.is(":hidden") ? 0 : parseInt($("#zh-question-collapsed-num").text());
        if (isNaN(numCollapsedCount)) numCollapsedCount = 0;
        if ($listAnswers.length || numCollapsedCount) {
            if (izhAuthorList) {
                $uno.css({
                    "float": "none",
                    left: 9 - $uno.width()
                });
                if (!$btnCollapsedSwitcher.length && !numCollapsedCount) resizeAuthorList($frm);
                $("<div>", {
                    "class": "modal-dialog-title"
                }).css({
                    "border-top-left-radius": 0
                }).insertBefore($ppT);
                $uno.mouseover(function() {
                    resizeAuthorList($(".frame", this));
                    $(this).css("left", "0");
                }).mouseout(function() {
                    $(this).css("left", 9 - $(this).width());
                });
                if (_e) {
                    $uno.children(".meT").css("display", 0 > _e.offsetTop - $frm.scrollTop() ? "" : "none");
                    $uno.children(".meB").css("display", $frm.height() < _e.offsetTop - $frm.scrollTop() + _e.offsetHeight ? "" : "none");
                }
            }
            if ($btnCollapsedSwitcher.length) {
                if (numCollapsedCount > 0) {
                    $("#zh-question-collapsed-wrap").show().bind("DOMNodeInserted", function(event) {
                        var $a = $(event.target);
                        if ($a.is(".zm-item-answer")) {
                            processAnswer($a, $pp, $body.attr("izhAuthorRear") == "1", $body.attr("izhAuthorList") == "1");
                            var count = $(".zm-item-answer[izh_processed=1]", "#zh-question-collapsed-wrap").length;
                            if (count == numCollapsedCount) {
                                resizeAuthorList($frm);
                            }
                        }
                    });
                }
                $btnCollapsedSwitcher[0].click();
            }
        }
    }
});

/**
 * 配置界面
 */
$(function() {
    var domBtnSettings = [ "<li>", '<a href="javascript:void(0);" tabindex="-1">', '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>', "iZhihu", "</a>", "</li>" ].join("");
    var cbemptyimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=";
    var domDlgSettings = [ '<div id="izh-dlg-settings" class="modal-dialog" tabindex="0" style="display:none;width:500px">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">配置选项</span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="5"width="100%">', "<thead>", '<tr><td colspan="2"align="left"><b>功能开关</b>（更改后设置将立刻保存，但只有当页面再次打开时才会生效)</td></tr>', "</thead>", "<tbody>", '<tr style="display:none"><td align="left"title="">在首页直接浏览常去话题</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" name="HomeTopics" /></td></tr>', '<tr><td align="left"title="* 导航部分加宽\n* 首页隐藏大头像\n* 赞同票右移\n* 首页评论框拉宽\n* 过渡效果 ">改变网页样式外观</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" name="HomeLayout" /></td></tr>', '<tr><td align="left"title="挪到 Timeline 右上方，与标题「最新动态」平行">调整首页中的「新动态」提醒按钮</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" name="HomeNoti" /></td></tr>', '<tr><td align="left">将问题页中的回答者信息挪到回答下方</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" name="AuthorRear" /></td></tr>', '<tr><td align="left">在问题页中显示回答者目录（在页面左侧掩藏）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" name="AuthorList" /></td></tr>', '<tr><td align="left">在页面右侧浮动显示打开的评论列表</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setRightComment" name="ShowComment" /></td></tr>', '<tr><td align="left">为赞同列表、评论列表开启「快速黑名单」功能</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickBlock" name="QuickBlock" /></td></tr>', '<tr><td align="left"title="">在「收藏」按钮上方显示「快速收藏」</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" name="QuickFavo" /></td></tr>', "</tbody>", "</table>", "</div>", '<div class="zg-left">', "当前版本：" + version + "；", "最后更新：" + updateDate + "<br/>", '制作：<a data-tip="p$t$unogzx" href="/people/unogzx">@钢盅郭子</a>，', '<a data-tip="p$t$liuyong25" href="/people/liuyong25">@天猪(刘勇)</a>，', '<a data-tip="p$t$yukirock" href="/people/yukirock">@罗大睿</a><br/>', '感谢：<a data-tip="p$t$cocksucker" href="/people/cocksucker">@Peter</a>', "</div>", '<div class="zm-command">', '<a id="Refresh" class="zg-btn-blue" href="javascript:void(0);" onclick="location.reload();">刷新网页</a>', "</div>", "</div>", "</div>", "</div>" ].join("");
    var d = '<div id="izh-dlg-settings" title="配置选项"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>';
    $(domBtnSettings).insertBefore($("ul#top-nav-profile-dropdown li:last")).click(function() {
        console.log(this);
        $(".modal-dialog-bg").show();
        $("input.t_rtjdchk", "#izh-dlg-settings").each(function(i, e) {
            if (utils.getCfg($(e).attr("name"))) $(e).attr("checked", "checked");
        });
        $("#izh-dlg-settings").css({
            "z-index": "123",
            position: "fixed",
            top: ($win.height() - $("#izh-dlg-settings").height()) / 2,
            left: ($win.width() - $("#izh-dlg-settings").width()) / 2
        }).fadeIn("slow");
    });
    var $dlg = $(domDlgSettings).appendTo(_doc.body);
    $dlg.drags({
        handler: ".modal-dialog-title-draggable"
    });
    $(".modal-dialog-title-close", $dlg).click(function() {
        $(".modal-dialog-bg").hide();
        $("#izh-dlg-settings").first().hide();
    });
    $("input.t_rtjdchk", $dlg).checkbox({
        cls: "t_jchkbox",
        empty: cbemptyimg
    });
    $("input.t_rtjdchk", $dlg).click(function() {
        var key = $(this).attr("name"), value = !this.checked;
        console.log(key + " = " + value);
        utils.setCfg(key, value);
    });
});

var firstRun = parseInt(utils.getValue("izh_fr", "1"));

function _FRshow() {
    if (firstRun > 0 && document.domain == "zhihu.com") {
        var tboxleft = 0;
        var accitem1 = $("#zh-top-inner div.top-nav-profile .zu-top-nav-userinfo");
        if (accitem1.length > 0) {
            tboxleft = accitem1.offset().left;
        }
        if (tboxleft > 0) {
            $('<div id="iZhihu_tbox" class="t_frshow"><div class="t_txtshow t_tbox">感谢使用 <b>iZhihu</b><br />您可通过菜单【iZhihu】对功能进行设置<br /><s><i></i></s></div></div>').appendTo("body.zhi").hide();
            $("#iZhihu_tbox").css("left", tboxleft - 100).show().mouseenter(function() {
                utils.setValue("izh_fr", "0");
                //_Menu();
                $(this).remove();
            });
        }
    }
}

setTimeout(function() {
    _FRshow();
}, 1e3);

if (typeof window.iZhihu4CRX === "undefined" || !window.iZhihu4CRX) {
    //helper method to auto update
    function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
        try {
            if (!utils.getValue) return;
            // Older version of Greasemonkey. Can't run.
            // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
            // and a script with * includes or opening a tabgrop
            var DoS_PREVENTION_TIME = 2 * 60 * 1e3;
            var isSomeoneChecking = utils.getValue("izh-CHECKING", null);
            var now = new Date().getTime();
            //utils.setValue('izh-CHECKING', now.toString());
            //if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
            // check daily
            var ONE_DAY = 24 * 60 * 60 * 1e3;
            //var ONE_WEEK = 7 * ONE_DAY;
            //var TWO_WEEKS = 2 * ONE_WEEK;
            var lastChecked = utils.getValue("izh-LAST_CHECKED", null);
            //if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;
            GM_xmlhttpRequest({
                method: "GET",
                url: SCRIPT.url.replace(".user.", ".meta.") + "?" + new Date().getTime(),
                // don't increase the 'installed' count just for update checks
                headers: {
                    "Cache-Control": "no-cache"
                },
                onload: function(result) {
                    if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
                    // did not find a suitable version header
                    var theOtherVersion = RegExp.$1;
                    var verList1 = RegExp.$1.split(".");
                    var verList2 = SCRIPT.version.split(".");
                    var isOldVersion = false;
                    for (var i = 0; i < verList1.length; i++) {
                        if (i < verList2.length) {
                            if (parseInt(verList1[i]) > parseInt(verList2[i])) {
                                isOldVersion = true;
                                break;
                            } else {}
                        } else {
                            break;
                        }
                    }
                    if (!isOldVersion) {
                        // no updates or older version on userscripts.orge site
                        if (SCRIPT.forceUpdate) {
                            alert("您当前所安装的 v" + SCRIPT.version + " 是最新版本，无需更新。");
                        }
                        return;
                    }
                    //find the name of the script
                    result.responseText.match(/@name\s+(.+)/);
                    var scriptName = RegExp.$1;
                    result.responseText.match(/@updateinfo\s+(.+)/);
                    var updateInfo = RegExp.$1;
                    updateInfo = updateInfo.replace(/\|/g, "<br>");
                    _ShowUpdate(scriptName, SCRIPT.version, theOtherVersion, updateInfo, SCRIPT.web, SCRIPT.url);
                }
            });
        } catch (ex) {
            console.log(ex);
        }
    }
    function _ShowUpdate(p_name, p_cur_ver, p_new_ver, p_updateinfo, p_weburl, p_scripturl) {
        var domDlgSettings = [ '<div id="izh-dlg-update" class="modal-dialog" tabindex="0" style="display:none;width:500px">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">更新提示</span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="100%"><thead><tr><td colspan="2"align="left"><b>脚本：' + p_name + '</b></td></tr></thead><tr><th style="width:20%;">当前版本</th><td style="width:80%;">' + p_cur_ver + "</td></tr><tr><th>最新版本</th><td>" + p_new_ver + '</td></tr><tr><th>更新内容</th><td class="t_upinfo">' + p_updateinfo + '</td></tr><tfoot><tr><td colspan="2"style="line-height:15px">提示：脚本更新安装完毕后请刷新当前页面</td></tr></tfoot></table>', "</div>", '<div class="zm-command">', '<span href="javascript:void(0);" class="zm-command-cancel izh-cancel">取消</span>', '<span class="zg-btn-blue izh-update" href="javascript:void(0);">更新</span>', "</div>", "</div>", "</div>", "</div>" ].join("");
        var $dlg = $(domDlgSettings).appendTo(_doc.body);
        $dlg.drags({
            handler: ".modal-dialog-title-draggable"
        });
        $dlg.find(".modal-dialog-title-close").click(function() {
            $(this).closest(".modal-dialog").hide();
            $(".modal-dialog-bg").hide();
        });
        $dlg.find(".izh-cancel").click(function() {
            $(this).closest(".modal-dialog").hide();
            $(".modal-dialog-bg").hide();
        });
        $dlg.find(".izh-update").click(function() {
            GM_openInTab(p_scripturl);
        });
        $(".modal-dialog-bg").show();
        $dlg.css({
            "z-index": "123",
            position: "fixed",
            top: ($win.height() - $dlg.height()) / 2,
            left: ($win.width() - $dlg.width()) / 2
        }).fadeIn("slow");
    }
    function update(forceUpdate) {
        autoUpdateFromUserscriptsDotOrg({
            url: "http://userscripts.org/scripts/source/126619.user.js",
            version: version,
            forceUpdate: forceUpdate,
            web: "http://userscripts.org/scripts/show/126619"
        });
    }
    if (GM_registerMenuCommand) {
        GM_registerMenuCommand("从 userscript.org 更新 iZhihu", function() {
            update(true);
        });
    }
    update(false);
}