<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.0.0
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @copyright    2012+, @钢盅郭子 @刘勇 @罗大睿
// ==/UserScript==


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
    $(content).filter(".zm-item").each(function(index, item) {
        var dom = $(item);
        var obj = {
            title: dom.find(".zm-item-title a").text(),
            questionUrl: dom.find(".zm-item-title a").attr("href"),
            answerUrl: url.data.attr["base"] + dom.find(".answer-date-link-wrap a").attr("href"),
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
        start: next
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
            params: JSON.stringify(param.params)
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

/**
 * 读取配置
 */
utils.getCfg = function(key) {
    var obj = {
        comment_sidebar: true,
        answer_orderByTime: false,
        AuthorList: true,
        ShowComment: true,
        HomeLayout: false,
        QuickFavo: true,
        AuthorRear: false,
        HomeNoti: false
    };
    obj = _.extend(obj, this.getValue("izhihu"));
    return key ? obj[key] : obj;
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue) {
    return localStorage[key] || defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value) {
    return localStorage[key] = value;
};

/**
 * 删除存储
 */
utils.deleteValue = function(key) {
    return delete localStorage[key];
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

var $ = unsafeWindow.$;

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

var izhHomeLayout = utils.getCfg("HomeLayout"), izhAuthorList = utils.getCfg("AuthorList"), izhShowComment = utils.getCfg("ShowComment"), izhQuickFavo = utils.getCfg("QuickFavo"), izhAuthorRear = utils.getCfg("AuthorRear"), izhHomeNoti = utils.getCfg("HomeNoti");

var pageIs = {}, _doc = window.document, _path = window.frameElement ? window.frameElement.src.replace(/https?:\/\/www.zhihu.com/, "") : url.data.attr["path"], css = "", $h = $("head"), $s = $('<style type="text/css"></style>'), iPathAnswers = _path.indexOf("/answers"), iPathCollection = _path.indexOf("/collection");

pageIs.Home = "/" == _path;

pageIs.Answer = 0 < _path.indexOf("/answer/");

pageIs.Question = !pageIs.Answer && 0 == _path.indexOf("/question/");

pageIs.Answers = 0 < iPathAnswers && _path.substr(iPathAnswers) == "/answers";

pageIs.Collection = 0 == iPathCollection;

var i = 0, z = "", $user = $(".zu-top-nav-userinfo"), $banner = $(document.body).children().first(), $main = $("[role=main]");

if ($user.length) {
    z = $user.attr("href");
}

if (izhHomeLayout) {
    css += "#zh-question-list { padding-left:30px!important }\n#zh-main-feed-fresh-button { margin-left:-30px!important }\n\n.feed-item {\n    border-bottom:1px solid #EEE!important;\n    margin-top:-1px!important\n}\n.feed-item .avatar { display:none!important }\n\n.feed-main,.feed-item.combine { margin-left:0!important }\n.feed-item-q { margin-left:-30px!important;padding-left:0!important }\n\n.feed-item-a .zm-comment-box { max-width:602px!important }\n.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }\n\n\n\n\n.zm-tag-editor,\n#zh-question-title,\n#zh-question-detail,\n#zh-question-meta-wrap,\n.zh-answers-title,\n#zh-question-filter-wrap {\n    margin-left:-32px!important\n}\n\n#zh-question-log-page-wrap .zm-tag-editor,\n#zh-question-log-page-wrap #zh-question-title {\n    margin-left:0 !important\n}\n\n.zh-answers-title,\n#zh-question-filter-wrap {\n    border-bottom:1px solid #EEE!important;\n    z-index:1000!important\n}\n\n#zh-question-meta-wrap {\n    margin-bottom:0!important;\n    padding-bottom:10px!important;\n    border-bottom:1px solid #EEE!important\n}\n\n#zh-question-answer-wrap { margin-top:-1px!important }\n\n#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }\n.zu-question-collap-title { border-top:1px solid #EEE!important }\n#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }\n\n\n\n\n.zu-autohide,\n.zm-comment-op-link,\n.zm-side-trend-del,\n.unpin {\n    visibility:visible!important;\n    opacity:0;\n}\n.feed-item:hover .zu-autohide,\n.zm-item-answer .zu-autohide,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-nav-li:hover .unpin {\n    opacity:1;\n}\n.zm-item-vote-count:hover,.zm-votebar button:hover{\n    background:#a6ce56!important;\n    color:#3E5E00 !important\n}\n\na,a:hover,\ni,\n.zu-autohide,\n.zm-votebar button,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-trend-del,\n.zm-side-nav-li,\n.zu-main-feed-fresh-button,\n.zg-icon,\n.zm-side-nav-li:hover .zg-icon,\n.zm-side-nav-li:hover i,\n.unpin,\n.zm-side-nav-li:hover .unpin {\n    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n}\n\n\n\n\n\nh3{ line-height:25px }\n.zu-footer-inner {padding:15px 0!important}\n.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}\n.zm-side-list-content{clear:both}\n.unpin{ display:inline-block!important }\n";
}

var css_AuthorListItemA = "padding:0 10px 0 0;", css_AuthorListItemA_name = "padding:0 5px;";

if (pageIs.Question && izhAuthorList) {
    css += "div.uno{position:absolute;left:0;border:1px solid #0771C1;border-right-width:0;border-top-right-radius:6px}";
    css += "div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}";
    css += "div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}";
    css += "div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}";
    css += "div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}";
    css += "div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}";
    css += "div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}";
    css += "div.uno ul li a{display:block;}div.uno li a.sel{text-decoration:none;}";
    css += "div.uno ul li a{" + css_AuthorListItemA + "}";
    css += "div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}";
    css += "div.uno li a span.name{text-align:right;display:block;" + css_AuthorListItemA_name + "background-color:#fff;}div.uno li a.sel span.name{color:#fff;background-color:#0771C1;}";
    css += "div.uno li a span.name.noname{color:#000;}";
    css += "div.uno li a span.name.collapsed{color:#999999;}";
    css += "div.uno li a span.name.friend{font-style:italic;}";
    css += "div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}";
    css += "div.uno a.sel table.plus{}div.uno a.sel table.plus td{}";
    css += "div.uno li a span.func{text-align:center;}";
    css += "div.izh-answer-preview{position:fixed;margin-top:1px;background-color:#fff;border:1px solid #0771C1;border-top-width:22px;border-top-right-radius:6px;box-shadow:5px 5px 5px #777;}";
    css += "div.izh-answer-preview .zm-editable-content{overflow-y:auto;padding:10px;}";
    css += "div.izh-answer-preview img.zm-list-avatar{position:absolute;right:10px;top:-30px;}\n";
}

if (izhQuickFavo) {
    css += "div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}";
    css += "div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}";
    css += 'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}';
    css += "div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}\n";
}

css += '.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-radius-topleft:10px;border-radius-topright:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}.t_jchkbox .mark{display:inline}.t_jchkbox img{vertical-align:middle;width:45px;height:15px}.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}.t_jchkbox img{background-position:0 0}.t_jchkbox-hover img{background-position:0 -15px}.t_jchkbox-checked img{background-position:0 -30px}.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}.t_jchkbox-disabled img{background-position:0 -60px}.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}';

var heads = _doc.getElementsByTagName("head");

if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node);
}

if (!$(".modal-dialog-bg").length) {
    $(_doc.body).append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

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
            allLinksCollection.$dlg.css({
                top: btn.position().top + 60,
                left: (window.innerWidth - allLinksCollection.$dlg.width()) / 2
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
            allLinksAnswers.$dlg.css({
                top: btn.position().top + 60,
                left: (window.innerWidth - allLinksAnswers.$dlg.width()) / 2
            }).fadeIn("slow");
            allLinksAnswers.start();
        });
    }
});

/*
 * 首页
 */
$(function() {
    var $lblActivityCaption = $("#zh-home-list-title"), $btnNewActivity = $("#zh-main-feed-fresh-button");
    if (pageIs.Home && izhHomeNoti && $lblActivityCaption.length && $btnNewActivity.length) {
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
});

/**
 * 问题页
 */
$(function() {
    if (pageIs.Question) {
        var $lblQuestionMeta = $("#zh-question-meta-wrap"), $lblAnswersCount = $("#zh-question-answer-num"), $reply = $("#zh-question-answer-form-wrap"), ppWidth = 0, ppHeight = 400, $uno = $("<div>", {
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
        }), $ppI = $("<div>"), css_comment = {
            position: "fixed",
            "background-color": "#fff",
            outline: "none",
            "z-index": "9",
            right: 10,
            "border-radius": 0,
            border: "1px solid #999999",
            padding: "100px 0px 0px 10px"
        };
        function showComment($ac, $cm) {
            $(".zm-item-answer").not("[data-aid=" + $ac.attr("data-aid") + "]").find(".zm-comment-box:visible").each(function(i, e) {
                $(e).parent().children("[name=addcomment]")[0].click();
            });
            var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next(), t = $ac.offset().top - $main.offset().top, b = $ac.offset().top - $main.offset().top, w = $ac.width(), h = $ac.height() + parseInt($ac.css("padding-bottom")) + parseInt($n.css("padding-top"));
            if (!$ac.find(".izh_tape_a,.izh_tape_b").length) $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
            if (!$cm) $cm = $ac.find(".zm-comment-box");
            if ($cm.length) {
                if (!$cm.attr("tabindex")) {
                    $cm.attr("tabindex", "-1").focus();
                }
                $ac.find(".izh_tape_a").css({
                    position: "absolute",
                    width: 1,
                    height: h,
                    top: 0,
                    left: w - 1,
                    "z-index": "10",
                    "background-color": "#fff"
                }).show();
                var $t = $cm.clone().css({
                    position: "absolute",
                    "z-index": "-1"
                }).appendTo($(document.body)).show();
                $cm.css({
                    left: $ac.offset().left + $ac.width() - 1
                });
                var th = $t.children(".zm-comment-list").css({
                    position: "absolute",
                    height: "",
                    top: "",
                    bottom: ""
                }).height() + 100;
                if (th < window.innerHeight - $main.offset().top) {
                    var top = $cm.parent().offset().top - $(document).scrollTop();
                    if (top + th > window.innerHeight) {
                        $cm.css({
                            top: "",
                            bottom: 0
                        });
                    } else {
                        $cm.css({
                            top: top > $main.offset().top ? top : $main.offset().top,
                            bottom: ""
                        });
                    }
                } else {
                    $cm.css({
                        top: $main.offset().top,
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
                left: w,
                "z-index": "8",
                "background-color": "#999999"
            }).show();
            $ac.css("border-color", "#999999");
            $n.css("border-color", "#999999");
            $(".zh-backtotop").css("visibility", "hidden");
            $(document.body).scrollTop(t);
        }
        function hideComment($ac, $cm) {
            var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next();
            if (!$cm) $cm = $ac.find(".zm-comment-box");
            if ($cm.length) //if($cm.is(':visible')){
            //$cm.hide();
            $ac.find(".izh_tape_a").hide();
            //}
            $ac.find(".izh_tape_b").hide();
            $ac.css("border-color", "#DDDDDD");
            $n.css("border-color", "#DDDDDD");
            $(".izh_tape_a:visible,.izh_tape_b:visible").hide();
            $(".zh-backtotop").css("visibility", "visible");
        }
        function processAnswer($a) {
            if (!$a || !$a.length) return;
            if ($a.attr("izh_processed") == "1") return;
            var $c = $a.children().last(), $p = $a.find(".zm-item-answer-author-info"), $v = $a.find(".zu-question-answer-meta-fav");
            if ($p.length) {
                //relocatePersonInfo
                //var $f=$('<a>',{name:$a.attr('data-aid')}).before($c);
                if (izhAuthorRear) {
                    $p.insertBefore($c).css("textAlign", "right");
                }
                $p = $p.children().first().children().eq(1);
                if ($a.length) {
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
                    $ppla.mouseover(function() {
                        var $frm = $(this.parentNode.parentNode.parentNode), $uno = $frm.parent().mouseover();
                        $(this).addClass("sel");
                        if (_e) {
                            $uno.children(".meT").css("display", 0 > _e.offsetTop - $frm.scrollTop() ? "" : "none");
                            $uno.children(".meB").css("display", $frm.height() < _e.offsetTop - $frm.scrollTop() + _e.offsetHeight ? "" : "none");
                        }
                        var aid = $(this).attr("href").slice(1), prv = $uno.next(".izh-answer-preview"), top = $(this).position().top + $uno.position().top, sel = ".zm-item-answer[data-aid=" + aid + "] > .zm-item-rich-text", ctx = $("span", this).is(".collapsed") ? "#zh-question-collapsed-wrap" : "#zh-question-answer-wrap", div = $(sel, ctx), htm = div.html() + $("a.zm-item-link-avatar", div.parent()).html();
                        if (!prv.length) {
                            prv = $("<div>", {
                                "class": div.class,
                                html: htm
                            }).attr("data-aid", aid).addClass("izh-answer-preview").width(div.width()).mouseover(function() {
                                $("li a[href=#" + $(this).attr("data-aid") + "]", $uno).addClass("sel");
                                $(this).show();
                            }).mouseout(function() {
                                $("li a[href=#" + $(this).attr("data-aid") + "]", $uno).removeClass("sel");
                                $(this).hide();
                            }).click(function() {
                                $("li a[href=#" + $(this).attr("data-aid") + "]", $uno)[0].click();
                            }).insertAfter($uno).find("a").attr("onclick", "return false;");
                        } else if (prv.attr("data-aid") != aid) {
                            prv.html(htm).attr("data-aid", aid).find("a").attr("onclick", "return false;");
                        }
                        var th = div.height() + 33, maxTop = $main.offset().top + 3;
                        if (maxTop + th < $(unsafeWindow).height()) {
                            if (top + th + 3 < $(unsafeWindow).height()) {
                                prv.css({
                                    top: top + 3 > maxTop ? top : maxTop,
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
                        }
                        prv.css({
                            left: $uno.width()
                        }).show();
                    }).mouseout(function() {
                        $(this).removeClass("sel");
                        var $uno = $(this.parentNode.parentNode.parentNode.parentNode);
                        $uno.next().hide();
                    }).click(function() {
                        $(this).mouseout();
                        $uno.css("left", 10 - $uno.width());
                    });
                    if (_e == $a.get(0)) {
                        _e = $ppla.get(0);
                    }
                }
            }
            if ($v.length) {
                if ($a.children(".izh_fav").length <= 0) {
                    $('<div class="izh_fav">loading...</div>').bind("mouseover", function() {
                        $(this).show();
                    }).bind("mouseout", function() {
                        $(this).hide();
                    }).appendTo($a);
                }
                $v.bind("mouseover", function() {
                    var $a = $(this).parentsUntil("#zh-question-answer-wrap", ".zm-item-answer");
                    $a.children(".izh_fav").css({
                        bottom: $(this).height() + $a.height() - $(this).position().top - 1,
                        left: $(this).position().left
                    }).show();
                    $.getJSON("http://www.zhihu.com/collections/json", $.param({
                        answer_id: $a.attr("data-aid")
                    }), function(result, status, xhr) {
                        var aid = this.url.substr(this.url.indexOf("answer_id=") + 10), $a = $(".zm-item-answer[data-aid=" + aid + "]"), $v = $a.children(".izh_fav").html('<div class="title">最近的选择</div>');
                        $.each(result.msg[0].slice(0, 4), function(i, e) {
                            $("<a/>", {
                                "class": "fav",
                                href: "javascript:;",
                                aid: aid,
                                fid: e[0],
                                html: e[1]
                            }).bind("click", function() {
                                var u = "http://www.zhihu.com/collection/";
                                u += $(this).hasClass("selected") ? "remove" : "add";
                                $.post(u, $.param({
                                    _xsrf: $("input[name=_xsrf]").val(),
                                    answer_id: $(this).attr("aid"),
                                    favlist_id: $(this).attr("fid")
                                }), function(result) {
                                    var act = this.url.substring(this.url.lastIndexOf("/") + 1), fid_i = this.data.indexOf("favlist_id="), fid = this.data.substring(fid_i + 11), aid_i = this.data.indexOf("answer_id="), aid = this.data.substring(aid_i + 10, fid_i - 1), $vi = $(".zm-item-answer[data-aid=" + aid + "] .izh_fav a[fid=" + fid + "]"), inc = 0;
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
                $v.bind("mouseout", function() {
                    var $a = $(this).parentsUntil("#zh-question-answer-wrap", ".zm-item-answer");
                    $a.children(".izh_fav").hide();
                });
            }
            $c.bind("DOMNodeInserted", function(event) {
                var $cm = $(event.target);
                if ($cm.is(".zm-comment-box")) {
                    if (izhShowComment) {
                        $cm.css(css_comment).parent().children("[name=addcomment]").on("click", function(event) {
                            var $cm = $(this).parent().find(".zm-comment-box");
                            if ($cm.length) {
                                var $a = $(this).parents(".zm-item-answer");
                                if ($cm.is(":hidden")) {
                                    showComment($a, $cm);
                                } else {
                                    hideComment($a, $cm);
                                }
                            }
                        });
                        showComment($cm.parents(".zm-item-answer"), $cm);
                        $("i.zm-comment-bubble", $cm).hide();
                        $(".zm-comment-list", $cm).css({
                            height: "100%",
                            overflow: "auto"
                        }).bind("DOMNodeInserted", function(event) {
                            var $cm = $(this).parent(".zm-comment-box:visible");
                            if ($cm.length) {
                                var $a = $cm.parents(".zm-item-answer");
                                showComment($a, $cm);
                                var $icm = $(event.target);
                                $icm.bind("DOMNodeRemoved", function(event) {
                                    var $cm = $(this).parent().parent(".zm-comment-box:visible");
                                    if ($cm.length) {
                                        var $a = $cm.parents(".zm-item-answer");
                                        showComment($a, $cm);
                                    }
                                });
                            }
                        }).children(".zm-item-comment").bind("DOMNodeRemoved", function(event) {
                            var $cm = $(this).parent().parent(".zm-comment-box:visible");
                            if ($cm.length) {
                                var $a = $cm.parents(".zm-item-answer");
                                showComment($a, $cm);
                            }
                        });
                        $(".zm-comment-form.zm-comment-box-ft", $cm).css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0
                        });
                    }
                    if (!$cm.hasClass("empty") && $cm.children("a.zu-question-answer-meta-comment").length <= 0) {
                        var $btnCC = $('<a class="zu-question-answer-meta-comment"><i class="z-icon-fold"></i>收起</a>').click(function() {
                            var $a = $(this).parents(".zm-item-answer");
                            hideComment($a);
                            $a.find("[name=addcomment]")[0].click();
                        });
                        if (izhShowComment) {
                            $btnCC.css({
                                cursor: "pointer",
                                position: "absolute",
                                top: 70
                            }).insertBefore($cm.children(":first"));
                        } else {
                            $btnCC.css({
                                "float": "right",
                                cursor: "pointer",
                                "margin-right": 5
                            }).appendTo($cm);
                        }
                    }
                }
            });
            if (izhShowComment) {
                var $b_cm = $a.find(".zu-question-answer-meta-comment").css({
                    display: "block",
                    "float": "right"
                }), bw = $b_cm[0].scrollWidth + parseInt($b_cm.css("margin-left")) + parseInt($b_cm.css("margin-right"));
                $b_cm.css({});
            }
            $a.attr("izh_processed", "1");
        }
        //答案按时间排序
        if (utils.getCfg("answer_orderByTime")) {
            client.click(".zh-answers-filter-popup div[data-key=added_time]");
        }
        //process each answer
        var _e = null, $listAnswers = $(".zm-item-answer", "#zh-single-question");
        if ($listAnswers && $listAnswers.length) {
            if (izhAuthorList) {
                $uno.appendTo($banner);
                $ppT.appendTo($uno);
                $frm.appendTo($uno);
                $pp.appendTo($frm);
                $ppB.appendTo($uno);
            }
            if (izhShowComment) {
                $("#zh-question-collapsed-wrap").show();
            }
            $listAnswers.each(function(i, e) {
                processAnswer($(e));
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
            var width = ppWidth, height = $(unsafeWindow).height() - $main.offset().top - 3 - $f.position().top;
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
                    left: 10 - $uno.width()
                });
                if (!$btnCollapsedSwitcher.length && !numCollapsedCount) resizeAuthorList($frm);
                $("<div>", {
                    "class": "modal-dialog-title"
                }).append($("<a>", {
                    "class": "icon",
                    href: "javascript:void(0);",
                    click: function() {
                        $uno.css("left", 10 - $uno.width());
                    }
                })).insertBefore($ppT).css({
                    "border-top-left-radius": 0
                }).children("a.icon").css({
                    "background-position": "-175px -112px",
                    width: 15,
                    height: 15,
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    "margin-top": -5
                });
                $uno.mouseover(function() {
                    resizeAuthorList($(".frame", this));
                    $(this).css("left", "0");
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
                            processAnswer($a);
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
    var domDlgSettings = [ '<div id="izh-dlg-settings" class="modal-dialog" tabindex="0" style="display:none;width:500px">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">配置选项</span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="5"width="100%">', "<thead>", '<tr><td colspan="2"align="left"><b>功能开关</b></td></tr>', "</thead>", "<tbody>", '<tr style="display:none"><td align="left"title="">在首页直接浏览常去话题</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" /></td></tr>', '<tr><td align="left"title="* 导航部分加宽\n* 首页隐藏大头像\n* 赞同票右移\n* 首页评论框拉宽\n* 过渡效果 ">改变网页样式外观（感谢 <a href="http://www.zhihu.com/people/yukirock">@罗大睿</a>）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" /></td></tr>', '<tr><td align="left"title="挪到 Timeline 右上方，与标题「最新动态」平行">调整首页中的「新动态」提醒按钮</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" /></td></tr>', '<tr><td align="left">将问题页中的回答者信息挪到回答下方</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" /></td></tr>', '<tr><td align="left">在问题页中显示回答者目录（在页面左侧掩藏）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" /></td></tr>', '<tr><td align="left">在回答右侧浮动显示回答的评论</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setShowComment" /></td></tr>', '<tr><td align="left"title="">在「收藏」按钮上方显示「快速收藏」</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" /></td></tr>', "</tbody>", "</table>", "</div>", '<div class="zm-command">', '<div class="zg-left">', "</div>", '<a id="Refresh" class="zg-btn-blue" href="javascript:;">刷新网页</a>', "</div>", "</div>", "</div>", "</div>" ].join("");
    var d = '<div id="izh-dlg-settings" title="配置选项"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>';
    $(domBtnSettings).insertBefore($("ul#top-nav-profile-dropdown li:last")).click(function() {
        console.log(this);
        $(".modal-dialog-bg").show();
        $("#izh-dlg-settings").css({
            top: (window.innerHeight - $("#izh-dlg-settings").height()) / 2,
            left: (window.innerWidth - $("#izh-dlg-settings").width()) / 2
        }).fadeIn("slow");
        $("input:checkbox", "#izh-dlg-settings").checkbox({
            cls: "t_jchkbox",
            empty: cbemptyimg
        });
    });
    $(domDlgSettings).appendTo(_doc.body).drags({
        handler: ".modal-dialog-title-draggable"
    }).find(".modal-dialog-title-close").click(function() {
        $(".modal-dialog-bg").hide();
        $("#izh-dlg-settings").first().hide();
    });
});
=======
>>>>>>> For CRX
=======
>>>>>>> For CRX
// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.0.0
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @copyright    2012+, @钢盅郭子 @刘勇 @罗大睿
// ==/UserScript==


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
    $(content).filter(".zm-item").each(function(index, item) {
        var dom = $(item);
        var obj = {
            title: dom.find(".zm-item-title a").text(),
            questionUrl: dom.find(".zm-item-title a").attr("href"),
            answerUrl: url.data.attr["base"] + dom.find(".answer-date-link-wrap a").attr("href"),
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
    QuickBlock: false
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
        izhShowComment = oldShowComment;
        localStorage.removeItem("izh_ShowComment");
        this.setCfg("ShowComment", izhShowComment);
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

var $ = unsafeWindow.$;

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

var izhHomeLayout = utils.getCfg("HomeLayout"), izhAuthorList = utils.getCfg("AuthorList"), izhShowComment = utils.getCfg("ShowComment"), izhQuickFavo = utils.getCfg("QuickFavo"), izhAuthorRear = utils.getCfg("AuthorRear"), izhHomeNoti = utils.getCfg("HomeNoti"), izhQuickBlock = utils.getCfg("QuickBlock");

utils.transferOldCfg();

var pageIs = {}, _doc = window.document, _path = window.frameElement ? window.frameElement.src.replace(/https?:\/\/www.zhihu.com/, "") : url.data.attr["path"], css = "", $h = $("head"), $s = $('<style type="text/css"></style>'), iPathAnswers = _path.indexOf("/answers"), iPathCollection = _path.indexOf("/collection");

pageIs.Home = "/" == _path;

pageIs.Answer = 0 < _path.indexOf("/answer/");

pageIs.Question = !pageIs.Answer && 0 == _path.indexOf("/question/");

pageIs.Answers = 0 < iPathAnswers && _path.substr(iPathAnswers) == "/answers";

pageIs.Collection = 0 == iPathCollection;

var i = 0, z = "", $user = $(".zu-top-nav-userinfo"), $banner = $(document.body).children().first(), $main = $("[role=main]");

if ($user.length) {
    z = $user.attr("href");
}

if (izhHomeLayout) {
    css += "#zh-question-list { padding-left:30px!important }\n#zh-main-feed-fresh-button { margin-left:-30px!important }\n\n.feed-item {\n    border-bottom:1px solid #EEE!important;\n    margin-top:-1px!important\n}\n.feed-item .avatar { display:none!important }\n\n.feed-main,.feed-item.combine { margin-left:0!important }\n.feed-item-q { margin-left:-30px!important;padding-left:0!important }\n\n.feed-item-a .zm-comment-box { max-width:602px!important }\n.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }\n\n\n\n\n.zm-tag-editor,\n#zh-question-title,\n#zh-question-detail,\n#zh-question-meta-wrap,\n.zh-answers-title,\n#zh-question-filter-wrap {\n    margin-left:-32px!important\n}\n\n#zh-question-log-page-wrap .zm-tag-editor,\n#zh-question-log-page-wrap #zh-question-title {\n    margin-left:0 !important\n}\n\n.zh-answers-title,\n#zh-question-filter-wrap {\n    border-bottom:1px solid #EEE!important;\n    z-index:1000!important\n}\n\n#zh-question-meta-wrap {\n    margin-bottom:0!important;\n    padding-bottom:10px!important;\n    border-bottom:1px solid #EEE!important\n}\n\n#zh-question-answer-wrap { margin-top:-1px!important }\n\n#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }\n.zu-question-collap-title { border-top:1px solid #EEE!important }\n#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }\n\n\n\n\n.zu-autohide,\n.zm-comment-op-link,\n.zm-side-trend-del,\n.unpin {\n    visibility:visible!important;\n    opacity:0;\n}\n.feed-item:hover .zu-autohide,\n.zm-item-answer .zu-autohide,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-nav-li:hover .unpin {\n    opacity:1;\n}\n.zm-item-vote-count:hover,.zm-votebar button:hover{\n    background:#a6ce56!important;\n    color:#3E5E00 !important\n}\n\na,a:hover,\ni,\n.zu-autohide,\n.zm-votebar button,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-trend-del,\n.zm-side-nav-li,\n.zu-main-feed-fresh-button,\n.zg-icon,\n.zm-side-nav-li:hover .zg-icon,\n.zm-side-nav-li:hover i,\n.unpin,\n.zm-side-nav-li:hover .unpin {\n    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n}\n\n\n\n\n\nh3{ line-height:25px }\n.zu-footer-inner {padding:15px 0!important}\n.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}\n.zm-side-list-content{clear:both}\n.unpin{ display:inline-block!important }\n";
}

var css_AuthorListItemA = "padding:0 10px 0 0;", css_AuthorListItemA_name = "padding:0 5px;";

if (pageIs.Question && izhAuthorList) {
    css += "div.uno{position:absolute;left:0;border:1px solid #0771C1;border-right-width:0;border-top-right-radius:6px}";
    css += "div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}";
    css += "div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}";
    css += "div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}";
    css += "div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}";
    css += "div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}";
    css += "div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}";
    css += "div.uno ul li a{display:block;}div.uno li a.sel{text-decoration:none;}";
    css += "div.uno ul li a{" + css_AuthorListItemA + "}";
    css += "div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}";
    css += "div.uno li a span.name{text-align:right;display:block;" + css_AuthorListItemA_name + "background-color:#fff;}div.uno li a.sel span.name{color:#fff;background-color:#0771C1;}";
    css += "div.uno li a span.name.noname{color:#000;}";
    css += "div.uno li a span.name.collapsed{color:#999999;}";
    css += "div.uno li a span.name.friend{font-style:italic;}";
    css += "div.uno li span.hp{background-color:#C3412F;position:relative;float:right;margin-top:-2px;line-height:2px;height:2px;}";
    css += "div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}";
    css += "div.uno a.sel table.plus{}div.uno a.sel table.plus td{}";
    css += "div.uno li a span.func{text-align:center;}";
    css += "div.izh-answer-preview{position:fixed;margin-top:1px;background-color:#fff;border:1px solid #0771C1;border-top-width:22px;border-top-right-radius:6px;box-shadow:5px 5px 5px #777;}";
    css += "div.izh-answer-preview .zm-editable-content{top:0;bottom:0;left:0;right:0;overflow-y:auto;padding:10px;}";
    css += "div.izh-answer-preview img.zm-list-avatar{position:absolute;right:10px;top:-35px;border:1px solid #0771C1;border-radius:6px;}\n";
    css += "div.izh-answer-preview span.comment{position:absolute;top:-18px;line-height:18px;border-top-right-radius:3px;background-color:#fff;padding:0 5px;}\n";
}

if (izhQuickFavo) {
    css += "div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}";
    css += "div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}";
    css += 'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}';
    css += "div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}\n";
}

css += '.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-radius-topleft:10px;border-radius-topright:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}.t_jchkbox .mark{display:inline}.t_jchkbox img{vertical-align:middle;width:45px;height:15px}.t_jchkbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABaCAMAAAAb4y/RAAAAA3NCSVQICAjb4U/gAAADAFBMVEVBQUHMzMwBXsX6dUBzl8atra2MjIwAPI/n8/j/MwATgPrxy718e3c1gNDN0Nt9m711odY7Yo4Wcderqqf+WRmly/VmZmbk6e8YeeYzmf+8u7jFxcUrX5eDjJXH2/Hm5uakvdo0dLz/9u1YpPqOlp4AT632nXpbcoqru8xmZmYAef/zv6r4iGOlpaUTdOAhh/lZWVn/SAGFu/YXa8nv3tdysfghVpHR1dcxc7XW3//1sZRdir2Nq8sKX73/ZjP///+EhIS0s7ASg/8QZcM0esa+1vERUpzt+P1zc3Pv7+9Pj9TDwsCgqLDW3PIhargSWqxJnfz5glMQdOSRr9dHf7uVw/aZmZkybKv1qIpLS0v/QgDg5eYZhf/3k2sQas6itMj49e1oe47x1Mf/ZjPX4+8AZswAdv8AWL5ZjMb+UQkjccaTp70Ue+6AuPi10fKZmZlprfhOgLcqjPgcYa7W1tbAw87v6OWutbve3t7Fx9Ht8vcWbM7n7vU6lfzF2fHv5eD0tZwZf/O8vcTt///7cTpmmcx/nsL9YSEAR5maxfYcZLWEhIyZnKb5e0umrraQv/WRkI0XdeB6pNgHZcwfV5Vmkb//OgD18e5SUVCYs9v4hFoIVKsKe/r+URIVduOrsbfJzNj1r5O31PNFaI0hiv8cWJuPtuv//+zn7u/0uaIHWbX2o4Hr4NxAdrLU3PgLYsNSovsobr33lnGdscfO3vDd5P8Zg/gRaMfe5vCusLIYXq0Za9byxrT39/eztcH7cj/J1vUSbtXt189mepC5urr4jWTt0Menqq4dcc5Chs75e1V/oc9Cmvv+Sgi2v8p6tPcnjf/4iV7u6+mirrsKaNAoW5JUhLq5uLetzvR7e3u9wMv9YycgX6kIff9akc4AQ5JHRkUzmf8na7iLvvYQY733xbWjyfQhbcI4c7KRrs31q45rlL2twNYcab8FR5O0tru11vcWWqcKWK6CqNKkp6tAZY2FpMSdttL0vaYZjP+9vb21tbUZfe+Af30QXrbu9/eAyMgpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xMi8xMk9JTKsAAAfcSURBVFiFjZcPWBvlHcfvRu/WELY5UgNtJreltfp03mgtmIWO5pJKc7e4ASpnDaEyHpxFRx/KDrym/LPJs8oecLHdSIe200pHKjRajBT6cGWwMOcsClk1pF2mj+VhnY/dHrVuPglZ9t6f/CGDsO/zwOXefJ73ee/9fbj3B6TVHkS68PShb/vRS/c89IBWC2lDXYg+nDajXV1/fuJrB97f8TrUhPtVsBANiHSRIo7D3sOUTqeLvvX0WxA+CrMYn5YWDFubg7mSI3zBwjwMcnY3hHsZHwVilVdldBdZrfKhqanZgeaBKZCaKP8NC4uw7ldfhvAQK8InzPZ1siHbZtlVu31Ivm16fHxcoH2M6X/o6HjPt6OD9p6CAZk8GrXJt83arFb+i+Voa8G6I0ar7UVZxx5Z91RVgbzuatVdZ6IiHUqlozV1O22UraMH0GAlcnndCfvOIeMKc1PU1el2m61KVrNHNkZRRvn0rFF4+OVp44BsfGxzz5HogGwsCuhtvTZKyhLaK85NDUz39GTU2F40y61UdPLEZmOMZlVOkT7wD+gwwmCYz+dzuQb/MOmzuponm8Gdb7LdFwtrgjke/ubTOyC338+wQiqlSDdsPDDym4MHP17z/kNuSOt+wWRSpU1odBNw8Btrfgcc1L6ArObr71969/Qn13/9OqD9NBIO+1dMGOm675Enfnb2uf/c/p4WuoJ7VcmWpgb2C8/Ysq94+8tHY8audQ1ia4G2qbpijGRgzuN7934oGAuq1tG7s/wLo7Hjrt7ePxUVTM3O9la181ZhGo1Um3svZ8+LtbR+1HOie9pcZNsps2fYO4p6jnTbp0Qajtn9rWPZ50W6ffpIgbGmro4ar2s3Go17zB22qCDgcnR0zDwFDCw313Sby3uHmovM9tlZeXQF2nimZwjQszxtt3cPFpmvZtjPGFegqUmz3Wgz7tzmy6gbtFLGj8ATSEol0a/E6Gi5rPeLblmvzV43CHzdsywtzC0Y21xlNpurmm3l68BuWs/UjcV9ZVQi3HJu78QN0VjwMhmcHAQVaS9w8ZIW+BK+hoQN59YUHzp2C+TesIGRfBUubOK3EEZ188mmj//93qfzj735fxjrvXnbHV//5e7S7x5188Y2bbrj83dP/+WnK+bChQulpaXXhXcsQtx38bV/nX1uftf5tJm//YAWOowKW9Sy75XsZ0+mzaGXb4EciLhDtdu/89SwlOeHGzOfH05N7qEfQoRX2v3HJ4YtYvrq5zy3vmqw3D03Y7B0Nhik4eFn5yHCL9HnJp6Shhf68+bU1CWDp/9acIbqDErDltzzCfrDvYvCmKFMvd9i2Kje31dSTZX1jfwiPd3QvxEAnpHWvJKcvNbapXQ4lS7sLwNA3kirp6JBvVC7ytwb+yuCW1qrS/o8C4Y5tfPasvQ5ibb05amvNXjUhYbaheD6HHXS3Lsgh0KER27E92T9nNOZU2ixtHUagg2ujYkd/Bt0UayldV9xdqw6mZmNjfmZmZn5+eCmMV6dxcvAWAXxzNt3/v3BT3dl5y6mS+6j3+cdvLIJGHn6wvz5Q2nzld/yDmoPKsBb9PN7dn9SmjbXP+P91tM4Dtby2o7S+VWMfdANHcbDoyrhpHigeCLJ2fvvTzU2GxiLj4ZMnLiJb15OOJvZOMw7m5+51FjQcEjvAN1fH43tuKVwv+dUIVAmryxoqK9IGAte9jF635ekahreUdd2jqgLt9zaX2IxlHgSlV9C54rDM1TtTLBxJGemorr6neCptiQ6lKAfk+hLaqBScKH61QpPCXVpbgU6NneZun6LJdjpLOtsK3O1lZSkX8l6Z5vlx4Za18yCBzyCc3/6uS0V6rmGU+rOLXO1fYZT6vjcuyCFHxaLo+PuPbYY28G7XU5XfV+woqQv2DpSb4gbewWBQwLOfVY8sZiohWhqvvQjGnsUdI/60Btv3PnI98BbdOLkT5aNYOxJ0div+m+CUx+8N39+448rZ7torLtpla4A9AVoQLlVefMHWsitp0f50z/EZ8Oy0eOIyeR1fEDyxoZgDZMu0i7ovA9vgnA93xX4+LO+shKcYaBJWxrQx0p9VeR4vI+lYNrh0FOchgZBMIS/MNySPtYBxftBOEAgNInr/MouBDcxARRBENa5pB9MoukAy1E4yYZIhuM4JoKA39TSzjRBV6IOjuJUpCpEgiWwLEHQdIhbiWYJGtAwT+MKBaBRBA85qRVXEmF1nEJcCSWshErtYxM0WAQawkma85Ia/nSPKGI0lUwrYn0sjAYiCMbBBH9f6RCXISzSJP3fEDgONSEasTkDlcGEaqSGVQk4p3i4C9Kawho2feBRRTiMEx9EBGND3vTR444s4OCTgrEXHaRya/oolcqtZBdvLE7oQVtBgBEybZTHs9zQP1FG+BOmlVlZESkBEOEqfI4NkkoacoyK2+MjAwQqhUBplL9xoMkhSGWiKyDJGO1QsRgzSqAqlkZRjT8+SUCZOC8TtIbTqCgKR1mdiqApVZyOLEfjHIwSXU7GwVCUwoEl0eQytF6Hg08sRrOgynTlUjqcSofjtErBaTBT+rnBSogIzTEOFiZUHLcKjTIcHMI4hMBgwlGZTCshBy7CrDJpBzEfqwB7Y0IJpBKPb3iAhN5GhQMQI5RZierwQVNDkM+As5jAEZwmtyrJSPqQtNAVCA6uJhVJXHRr/wsTnWkfsGSBJQAAAABJRU5ErkJggg==") no-repeat}.t_jchkbox img{background-position:0 0}.t_jchkbox-hover img{background-position:0 -15px}.t_jchkbox-checked img{background-position:0 -30px}.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}.t_jchkbox-disabled img{background-position:0 -60px}.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}';

var heads = _doc.getElementsByTagName("head");

if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node);
}

if (!$(".modal-dialog-bg").length) {
    $(_doc.body).append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

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
            var y = ($(unsafeWindow).height() - allLinksCollection.$dlg.width()) / 2, x = ($(unsafeWindow).width() - allLinksCollection.$dlg.width()) / 2;
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
            var y = ($(unsafeWindow).height() - allLinksAnswers.$dlg.width()) / 2, x = ($(unsafeWindow).width() - allLinksAnswers.$dlg.width()) / 2;
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
    var $lblActivityCaption = $("#zh-home-list-title"), $btnNewActivity = $("#zh-main-feed-fresh-button");
    if (pageIs.Home && izhHomeNoti && $lblActivityCaption.length && $btnNewActivity.length) {
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
});

/**
 * 问题页
 */
$(function() {
    if (pageIs.Question) {
        var $lblQuestionMeta = $("#zh-question-meta-wrap"), $lblAnswersCount = $("#zh-question-answer-num"), $reply = $("#zh-question-answer-form-wrap"), ppWidth = 0, ppHeight = 400, $uno = $("<div>", {
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
        }), $ppI = $("<div>"), css_comment = {
            position: "fixed",
            "background-color": "#fff",
            outline: "none",
            "z-index": "9",
            right: 10,
            "border-radius": 0,
            border: "1px solid #999999",
            padding: "100px 0px 0px 10px"
        }, css_QuickBlock = {
            "background-position": "-146px -202px",
            width: 16,
            height: 16
        }, quickBlock = function($e) {
            $.post("http://www.zhihu.com" + $e.attr("href") + "/block", $.param({
                action: "add"
            }), function(r) {
                var u = this.url.replace(/http:\/\/www.zhihu.com/g, "").replace(/\/block/g, "");
                $('a[href="' + u + '"]').css("text-decoration", "line-through");
            });
        }, addQuickBlock = function($vi) {
            if ($vi.is(".zm-item-vote-info")) {
                var $u = $('.voters a[href^="/people/"]', $vi);
                $u.each(function(i, e) {
                    $("<input>", {
                        "class": "izh-quick-block-sel",
                        type: "checkbox"
                    }).css({}).insertBefore(e).hide();
                });
                var width = $vi.closest(".zm-item-answer").width(), $btnQuickBlock = $("<a>", {
                    "class": "izh-quick-block",
                    html: "快速屏蔽",
                    href: "javascript:void(0);"
                }).css({
                    position: "absolute",
                    left: width,
                    width: "4em"
                }).click(function() {
                    if (this.getAttribute("on") == "1") {
                        $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).hide();
                        $(this).nextAll("[class^=izh-quick-block]").hide();
                        this.setAttribute("on", "0");
                    } else {
                        $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).show();
                        $(this).nextAll("[class^=izh-quick-block]").show();
                        this.setAttribute("on", "1");
                    }
                }).insertBefore($vi);
                $("<a>", {
                    "class": "izh-quick-block-do zg-icon",
                    href: "javascript:void(0);"
                }).css($.extend(css_QuickBlock, {
                    position: "absolute",
                    left: width,
                    "margin-top": "2.5em",
                    "margin-left": "2.5em"
                })).click(function() {
                    $(".zm-item-vote-info input.izh-quick-block-sel:checked", this.parentNode).each(function(i, e) {
                        quickBlock($(e).next());
                    });
                }).insertAfter($btnQuickBlock).hide();
                $("<a>", {
                    "class": "izh-quick-block-selAll",
                    html: "不选",
                    href: "javascript:void(0);"
                }).css({
                    position: "absolute",
                    left: width,
                    width: "2em",
                    "margin-top": "3em"
                }).click(function() {
                    $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).removeAttr("checked");
                }).insertAfter($btnQuickBlock).hide();
                $("<a>", {
                    "class": "izh-quick-block-notAll",
                    html: "全选",
                    href: "javascript:void(0);"
                }).css({
                    position: "absolute",
                    left: width,
                    width: "2em",
                    "margin-top": "1.5em"
                }).click(function() {
                    $(".zm-item-vote-info input.izh-quick-block-sel", this.parentNode).attr("checked", "checked");
                }).insertAfter($btnQuickBlock).hide();
            }
        };
        function showComment($ac, $cm) {
            $(".zm-item-answer").not("[data-aid=" + $ac.attr("data-aid") + "]").find(".zm-comment-box:visible").each(function(i, e) {
                $(e).parent().children("[name=addcomment]")[0].click();
            });
            var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next(), t = $ac.offset().top - $main.offset().top, b = $ac.offset().top - $main.offset().top, w = $ac.width(), h = $ac.height() + parseInt($ac.css("padding-bottom")) + parseInt($n.css("padding-top"));
            if (!$ac.find(".izh_tape_a,.izh_tape_b").length) $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
            if (!$cm) $cm = $ac.find(".zm-comment-box");
            if ($cm.length) {
                if (!$cm.attr("tabindex")) {
                    $cm.attr("tabindex", "-1").focus();
                }
                $ac.find(".izh_tape_a").css({
                    position: "absolute",
                    width: 1,
                    height: h,
                    top: 0,
                    left: w - 1,
                    "z-index": "10",
                    "background-color": "#fff"
                }).show();
                var $t = $cm.clone().css({
                    position: "absolute",
                    "z-index": "-1"
                }).appendTo($(document.body)).show();
                $cm.css({
                    left: $ac.offset().left + $ac.width() - 1
                });
                var th = $t.children(".zm-comment-list").css({
                    position: "absolute",
                    height: "",
                    top: "",
                    bottom: ""
                }).height() + 100;
                if (th < window.innerHeight - $main.offset().top) {
                    var top = $cm.parent().offset().top - $(document).scrollTop();
                    if (top + th > window.innerHeight) {
                        $cm.css({
                            top: "",
                            bottom: 0
                        });
                    } else {
                        $cm.css({
                            top: top > $main.offset().top ? top : $main.offset().top,
                            bottom: ""
                        });
                    }
                } else {
                    $cm.css({
                        top: $main.offset().top,
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
                left: w,
                "z-index": "8",
                "background-color": "#999999"
            }).show();
            $ac.css("border-color", "#999999");
            $n.css("border-color", "#999999");
            $(".zh-backtotop").css("visibility", "hidden");
            $(document.body).scrollTop(t);
        }
        function hideComment($ac, $cm) {
            var $n = $ac.next(), $n = $n.length ? $n : $ac.parent().next();
            if (!$cm) $cm = $ac.find(".zm-comment-box");
            if ($cm.length) //if($cm.is(':visible')){
            //$cm.hide();
            $ac.find(".izh_tape_a").hide();
            //}
            $ac.find(".izh_tape_b").hide();
            $ac.css("border-color", "#DDDDDD");
            $n.css("border-color", "#DDDDDD");
            $(".izh_tape_a:visible,.izh_tape_b:visible").hide();
            $(".zh-backtotop").css("visibility", "visible");
        }
        function processAnswer($a) {
            if (!$a || !$a.length) return;
            if ($a.attr("izh_processed") == "1") return;
            var $c = $a.children().last(), $p = $a.find(".zm-item-answer-author-info"), $v = $a.find(".zu-question-answer-meta-fav");
            if ($p.length) {
                //relocatePersonInfo
                //var $f=$('<a>',{name:$a.attr('data-aid')}).before($c);
                if (izhAuthorRear) {
                    $p.insertBefore($c).css("textAlign", "right");
                }
                $p = $p.children().first().children().eq(1);
                if ($a.length) {
                    if (izhQuickBlock) {
                        // Region: 快速屏蔽
                        var $answerHead = $(".answer-head", $a);
                        if ($("[name=more]", $answerHead).length) {
                            $answerHead.bind("DOMNodeInserted", function(event) {
                                addQuickBlock($(event.target));
                            });
                        }
                    }
                    if (izhAuthorList) {
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
                                    $("li a[href=#" + $(this).attr("data-aid") + "]", $uno).addClass("sel");
                                    $(this).show();
                                }).mouseout(function() {
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
                            if (maxTop + th < $(unsafeWindow).height()) {
                                if (top + th < $(unsafeWindow).height()) {
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
                            $uno.css("left", 10 - $uno.width());
                        });
                    }
                    if (_e == $a.get(0)) {
                        _e = $ppla.get(0);
                    }
                }
            }
            if ($v.length) {
                if ($a.children(".izh_fav").length <= 0) {
                    $('<div class="izh_fav">loading...</div>').bind("mouseover", function() {
                        $(this).show();
                    }).bind("mouseout", function() {
                        $(this).hide();
                    }).appendTo($a);
                }
                $v.bind("mouseover", function() {
                    var $a = $(this).parentsUntil("#zh-question-answer-wrap", ".zm-item-answer");
                    $a.children(".izh_fav").css({
                        bottom: $(this).height() + $a.height() - $(this).position().top - 1,
                        left: $(this).position().left
                    }).show();
                    $.getJSON("http://www.zhihu.com/collections/json", $.param({
                        answer_id: $a.attr("data-aid")
                    }), function(result, status, xhr) {
                        var aid = this.url.substr(this.url.indexOf("answer_id=") + 10), $a = $(".zm-item-answer[data-aid=" + aid + "]"), $v = $a.children(".izh_fav").html('<div class="title">最近的选择</div>');
                        $.each(result.msg[0].slice(0, 4), function(i, e) {
                            $("<a/>", {
                                "class": "fav",
                                href: "javascript:;",
                                aid: aid,
                                fid: e[0],
                                html: e[1]
                            }).bind("click", function() {
                                var u = "http://www.zhihu.com/collection/";
                                u += $(this).hasClass("selected") ? "remove" : "add";
                                $.post(u, $.param({
                                    _xsrf: $("input[name=_xsrf]").val(),
                                    answer_id: $(this).attr("aid"),
                                    favlist_id: $(this).attr("fid")
                                }), function(result) {
                                    var act = this.url.substring(this.url.lastIndexOf("/") + 1), fid_i = this.data.indexOf("favlist_id="), fid = this.data.substring(fid_i + 11), aid_i = this.data.indexOf("answer_id="), aid = this.data.substring(aid_i + 10, fid_i - 1), $vi = $(".zm-item-answer[data-aid=" + aid + "] .izh_fav a[fid=" + fid + "]"), inc = 0;
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
                $v.bind("mouseout", function() {
                    var $a = $(this).parentsUntil("#zh-question-answer-wrap", ".zm-item-answer");
                    $a.children(".izh_fav").hide();
                });
            }
            $c.bind("DOMNodeInserted", function(event) {
                var $cm = $(event.target);
                if ($cm.is(".zm-comment-box")) {
                    if (izhShowComment) {
                        $cm.css(css_comment).parent().children("[name=addcomment]").on("click", function(event) {
                            var $cm = $(this).parent().find(".zm-comment-box");
                            if ($cm.length) {
                                var $a = $(this).parents(".zm-item-answer");
                                if ($cm.is(":hidden")) {
                                    showComment($a, $cm);
                                } else {
                                    hideComment($a, $cm);
                                }
                            }
                        });
                        if (izhQuickBlock) {
                            // Region: 快速屏蔽
                            var $u = $(".zm-comment-hd", $cm);
                            $u.each(function(i, e) {
                                $("<a>", {
                                    "class": "zg-icon izh-quick-block-do",
                                    html: "",
                                    href: "javascript:void(0);"
                                }).css($.extend(css_QuickBlock, {
                                    "float": "right"
                                })).click(function() {
                                    quickBlock($(this).next());
                                }).prependTo(e).hide();
                            });
                            $("<a>", {
                                "class": "",
                                html: "快速屏蔽",
                                href: "javascript:void(0);"
                            }).css({
                                position: "absolute",
                                right: 10,
                                top: 70
                            }).prependTo($cm).click(function() {
                                if (this.getAttribute("on") == "1") {
                                    $(".zm-comment-hd .izh-quick-block-do").hide();
                                    this.setAttribute("on", "0");
                                } else {
                                    $(".zm-comment-hd .izh-quick-block-do").show();
                                    this.setAttribute("on", "1");
                                }
                            });
                        }
                        showComment($cm.parents(".zm-item-answer"), $cm);
                        $("i.zm-comment-bubble", $cm).hide();
                        $(".zm-comment-list", $cm).css({
                            height: "100%",
                            overflow: "auto"
                        }).bind("DOMNodeInserted", function(event) {
                            var $cm = $(this).parent(".zm-comment-box:visible");
                            if ($cm.length) {
                                var $a = $cm.parents(".zm-item-answer");
                                showComment($a, $cm);
                                var $icm = $(event.target);
                                $icm.bind("DOMNodeRemoved", function(event) {
                                    var $cm = $(this).parent().parent(".zm-comment-box:visible");
                                    if ($cm.length) {
                                        var $a = $cm.parents(".zm-item-answer");
                                        showComment($a, $cm);
                                    }
                                });
                            }
                        }).children(".zm-item-comment").bind("DOMNodeRemoved", function(event) {
                            var $cm = $(this).parent().parent(".zm-comment-box:visible");
                            if ($cm.length) {
                                var $a = $cm.parents(".zm-item-answer");
                                showComment($a, $cm);
                            }
                        });
                        $(".zm-comment-form.zm-comment-box-ft", $cm).css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0
                        });
                    }
                    if (!$cm.hasClass("empty") && $cm.children("a.zu-question-answer-meta-comment").length <= 0) {
                        var $btnCC = $("<a>", {
                            "class": "zu-question-answer-meta-comment",
                            html: "收起"
                        }).click(function() {
                            var $a = $(this).parents(".zm-item-answer");
                            hideComment($a);
                            $a.find("[name=addcomment]")[0].click();
                        });
                        if (izhShowComment) {
                            $btnCC.css({
                                cursor: "pointer",
                                position: "absolute",
                                top: 70
                            }).insertBefore($cm.children(":first")).prepend('<i class="zg-icon"style="background-position:-176px -112px;width:15px;height:15px;"></i>');
                        } else {
                            $btnCC.css({
                                "float": "right",
                                cursor: "pointer",
                                "margin-right": 5
                            }).appendTo($cm).prepend('<i class="z-icon-fold"></i>');
                        }
                    }
                }
            });
            if (izhShowComment) {
                var $b_cm = $a.find(".zu-question-answer-meta-comment").css({
                    display: "block",
                    "float": "right"
                }), bw = $b_cm[0].scrollWidth + parseInt($b_cm.css("margin-left")) + parseInt($b_cm.css("margin-right"));
                $b_cm.css({});
            }
            $a.attr("izh_processed", "1");
        }
        //答案按时间排序
        if (utils.getCfg("answer_orderByTime")) {
            client.click(".zh-answers-filter-popup div[data-key=added_time]");
        }
        //process each answer
        var _e = null, $listAnswers = $(".zm-item-answer", "#zh-single-question");
        if ($listAnswers && $listAnswers.length) {
            if (izhAuthorList) {
                $uno.appendTo($banner);
                $ppT.appendTo($uno);
                $frm.appendTo($uno);
                $pp.appendTo($frm);
                $ppB.appendTo($uno);
            }
            if (izhShowComment) {
                $("#zh-question-collapsed-wrap").show();
            }
            $listAnswers.each(function(i, e) {
                processAnswer($(e));
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
            var width = ppWidth, height = $(unsafeWindow).height() - $main.offset().top - 3 - $f.position().top;
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
                    left: 10 - $uno.width()
                });
                if (!$btnCollapsedSwitcher.length && !numCollapsedCount) resizeAuthorList($frm);
                $("<div>", {
                    "class": "modal-dialog-title"
                }).append($("<a>", {
                    "class": "icon",
                    href: "javascript:void(0);",
                    click: function() {
                        $uno.css("left", 10 - $uno.width());
                    }
                })).insertBefore($ppT).css({
                    "border-top-left-radius": 0
                }).children("a.icon").css({
                    "background-position": "-175px -112px",
                    width: 15,
                    height: 15,
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    "margin-top": -5
                });
                $uno.mouseover(function() {
                    resizeAuthorList($(".frame", this));
                    $(this).css("left", "0");
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
                            processAnswer($a);
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

<<<<<<< HEAD
    setTimeout(function(){
        _Menu();
        _FRshow();
        },1000);

    update(false);
})(window.document,(window.frameElement?window.frameElement.src.replace(/https?:\/\/www.zhihu.com/,''):window.location.pathname));
<<<<<<< HEAD
=======
>>>>>>> branch 'master' of https://github.com/unogz/izhihu.git
>>>>>>> For CRX
=======
/**
 * 配置界面
 */
$(function() {
    var domBtnSettings = [ "<li>", '<a href="javascript:void(0);" tabindex="-1">', '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>', "iZhihu", "</a>", "</li>" ].join("");
    var cbemptyimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=";
    var domDlgSettings = [ '<div id="izh-dlg-settings" class="modal-dialog" tabindex="0" style="display:none;width:500px">', '<div class="modal-dialog-title modal-dialog-title-draggable">', '<span class="modal-dialog-title-text">配置选项</span>', '<span class="modal-dialog-title-close"></span>', "</div>", '<div class="modal-dialog-content">', "<div>", '<div class="zg-section">', '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="5"width="100%">', "<thead>", '<tr><td colspan="2"align="left"><b>功能开关</b>（更改后设置将立刻保存，但只有当页面再次打开时才会生效)</td></tr>', "</thead>", "<tbody>", '<tr style="display:none"><td align="left"title="">在首页直接浏览常去话题</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" name="HomeTopics" /></td></tr>', '<tr><td align="left"title="* 导航部分加宽\n* 首页隐藏大头像\n* 赞同票右移\n* 首页评论框拉宽\n* 过渡效果 ">改变网页样式外观（感谢 <a href="http://www.zhihu.com/people/yukirock">@罗大睿</a>）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" name="HomeLayout" /></td></tr>', '<tr><td align="left"title="挪到 Timeline 右上方，与标题「最新动态」平行">调整首页中的「新动态」提醒按钮</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" name="HomeNoti" /></td></tr>', '<tr><td align="left">将问题页中的回答者信息挪到回答下方</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" name="AuthorRear" /></td></tr>', '<tr><td align="left">在问题页中显示回答者目录（在页面左侧掩藏）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" name="AuthorList" /></td></tr>', '<tr><td align="left">在回答右侧浮动显示回答的评论</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setShowComment" name="ShowComment" /></td></tr>', '<tr><td align="left">为赞同列表、评论列表开启「快速黑名单」功能</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickBlock" name="QuickBlock" /></td></tr>', '<tr><td align="left"title="">在「收藏」按钮上方显示「快速收藏」</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" name="QuickFavo" /></td></tr>', "</tbody>", "</table>", "</div>", '<div class="zm-command">', '<div class="zg-left">', "</div>", '<a id="Refresh" class="zg-btn-blue" href="javascript:void(0);" onclick="location.reload();">刷新网页</a>', "</div>", "</div>", "</div>", "</div>" ].join("");
    var d = '<div id="izh-dlg-settings" title="配置选项"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>';
    $(domBtnSettings).insertBefore($("ul#top-nav-profile-dropdown li:last")).click(function() {
        console.log(this);
        $(".modal-dialog-bg").show();
        $(".t_set_tb .t_rtjdchk:checkbox", $dlg).each(function(i, e) {
            if (utils.getCfg($(e).attr("name"))) $(e).attr("checked", "checked");
        });
        $("#izh-dlg-settings").css({
            position: "fixed",
            top: ($(unsafeWindow).height() - $("#izh-dlg-settings").height()) / 2,
            left: ($(unsafeWindow).width() - $("#izh-dlg-settings").width()) / 2
        }).fadeIn("slow");
        $("input:checkbox", "#izh-dlg-settings").checkbox({
            cls: "t_jchkbox",
            empty: cbemptyimg
        });
    });
    var $dlg = $(domDlgSettings).appendTo(_doc.body);
    $dlg.drags({
        handler: ".modal-dialog-title-draggable"
    });
    $(".modal-dialog-title-close", $dlg).click(function() {
        $(".modal-dialog-bg").hide();
        $("#izh-dlg-settings").first().hide();
    });
<<<<<<< HEAD
});
>>>>>>> For CRX
=======
    $(".t_set_tb .t_rtjdchk:checkbox", $dlg).click(function() {
        var key = $(this).attr("name"), value = !this.checked;
        console.log(key + " = " + value);
        utils.setCfg(key, value);
    });
});
>>>>>>> For CRX
