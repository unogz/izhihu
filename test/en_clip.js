// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.zhihu.com/question/20150594/answer/14153424
// @copyright  2012+, You
// ==/UserScript==


/* 
 * How this HTML serializer works:
 *
 * The serialization of the document structure itself in here is fairly straightforward: it's a recursive descent
 * parser that will serialize HTML into ENML-ready markup. It converts unknown elements into generic equivalents, drops
 * prohibited elements, copies attributes across (unless they're restricted) and basically does what you'd expect, with
 * the following exceptions:
 * 
 * It breaks every N nodes serialized and fires off a callback (via setTimeout) to resume in a few milliseconds.
 * This has a couple important properties. It keeps the UI from blocking completely while the serializer runs (but
 * still makes it sluggish), and more importantly, it keeps browsers from deciding that the script on the page is
 * spinning and prompting the user to kill it.
 * 
 *
 * CSS: The interesting portion of how this whole things works is how it goes about inlining stylesheets. The core of
 * this is built on an API called getMatchedCSSRules (webkit-only, for other browsers, there is another implementation
 * in here built around matchesSelector, which is both much slower and probably not kept in sync with the primary
 * version). 
 * 
 * Calling getMatchedCSSRules will give you a list of all the CSS rules that apply to your element, but with some
 * caveats: noticeably, you wont get back rules from stylesheets that you wouldn't normally be able to load yourself
 * due to the same-origin policy. These are just silently omitted. To get around this, we start our serialization
 * process by iterating across all the stylesheets attached to the document, and if they are link elements with 'href'
 * properties, we'll pass a message to the extension page asking it to request that URL on our behalf (because the
 * background page in an extension is not subject to the same origin policy). We don't need to bother for styles in
 * "style" tags because they can't have same-origin policy issues. We also run through each rule in each stylesheet and
 * if it's an @import rule, we'll send off a request for that stylesheet as well. We keep a list of stylesheets
 * requested and wont request duplicates, and will give up at a max of 100 total stylesheets (fun fact: @import rules
 * can be circular).
 * 
 * The background page will return us a message with the result from each requested stylesheet. We create a "style"
 * tag, and then insert the text from the request in there, and append the new style element to the page. We then fire
 * off a polling function that waits for a new item to show up in document.styleSheets that references the style tag we
 * just added. When that shows up, we'll run the newly attached styleSheet object through our @import check again to
 * see if we need to grab any more stylesheets from there.
 *
 * If the polling function gets to the point that there are no more outstanding requests, it stops its own polling and
 * fires off the recursive serializer.
 *
 * At each node in the tree, we grab the list of matching CSS rules, which will now include all the ones from the style
 * tags that we added from originally third-party stylesheets, and grab the CSS *text* from each one, rather than the
 * parsed CSS representation. This will let us keep properties like "border" without expanding it out into
 * "border-(top|bottom|left|right)", and it will also keep "invalid" styles that the webkit parser would otherwise drop
 * (like properties beginning with "-moz-"). We parse this CSS text into name/value pairs, and expand out any URLs
 * referenced into absolute paths (important note, relative paths need to be made absolute relative to the path of the
 * stylesheet, not the document).
 * 
 * As we iterate through each matching rule, we let matching properties from later rules overwrite matched properties
 * from earlier rules. This may not strictly be correct, the order in which matching rules are returned is unspecified,
 * ideally we could sort them, but the logic for doing this is actually non-trivial, and it rarely makes a difference
 * anyway.
 *
 * Once we finish checking each matched CSS rule, we have a final name/value map containing all the CSS properties that
 * we want to keep. We serialize this into a "style" attribute and add it to our element, and then move on to serialize
 * its children.
 */

// Shim 'SAFARI' into existence for scripts running in frame contexts.
if (typeof SAFARI == "undefined") {
  SAFARI = false;
}

// Shim 'Browser' into existence for scripts running in frame contexts.
if (typeof Browser == "undefined") {
  Browser = {};
  Browser.sendToExtension = function(msg) {
    window.parent.postMessage(msg, "*");
  }

  var msgMap = {};

  var msgHandler = function(msg) {
    var data = msg.data;
    if (data && data.name && msgMap[data.name]) {
      msgMap[data.name](msg.data);
    }
  }
  window.addEventListener("message", msgHandler, false);

  Browser.addMessageHandlers = function(obj) {
    for (var i in obj) {
      msgMap[i] = obj[i];
    }
  }
}

function HtmlSerializer() {
  "use strict";

  var pendingStyleSheets = [];

  var pendingStyleCount = 0;
  var styleSheetList = [];
  var element;
  var range;
  var keepStyle;
  var callbacks = [];
  var stylesToRemove = [];
  var iterationCount = 0;
  var stack = [];
  var blocked = false;
  var pseudoElementRules = [];
  var frameData;

  // getMatchedCSSRules seems to fail on pages with a base specified, so if we find a base tag, then we temporarily
  // remove it from the document and store it here. This only works in Chrome, in Safari getMatchedCSSRules still
  // doesn't work, even if we remove this, so there is a separate check for Safari, so that we won't use
  // getMatchedCSSRules on pages with BASE tags.
  var base = null;

  var maxStylesToAdd = 100;
  var stylesAdded = [];

  // Teseting only.
  var timerStart, timerEnd;

  var allowedElements = [
    "A",
    "ABBR",
    "ACRONYM",
    "ADDRESS",
    "AREA",
    "B",
    "BDO",
    "BIG",
    "BLOCKQUOTE",
    "BR",
    "CAPTION",
    "CENTER",
    "CITE",
    "CODE",
    "COL",
    "COLGROUP",
    "DD",
    "DEL",
    "DFN",
    "DIV",
    "DL",
    "DT",
    "EM",
    "FONT",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HR",
    "I",
    "IMG",
    "INS",
    "KBD",
    "LI",
    "MAP",
    "OL",
    "P",
    "PRE",
    "Q",
    "S",
    "SAMP",
    "SMALL",
    "SPAN",
    "STRIKE",
    "STRONG",
    "SUB",
    "SUP",
    "TABLE",
    "TBODY",
    "TD",
    "TFOOT",
    "TH",
    "THEAD",
    "TITLE",
    "TR",
    "TT",
    "U",
    "UL",
    "VAR",
    "XMP"
  ];

  var html5Elements = [
    "ARTICLE",
    "ASIDE",
    "DETAILS",
    "FOOTER",
    "FIGURE",
    "FIGCAPTION",
    "HEADER",
    "HGROUP",
    "NAV",
    "SECTION",
    "SUMMARY",
  ];

  var disallowedElements = [
    "APPLET",
    "BASE",
    "BASEFONT",
    "BGSOUND",
    "BLINK",
    "BODY",
    "BUTTON",
    "DIR",
    "EMBED",
    "FIELDSET",
    "FORM",
    "FRAME",
    "FRAMESET",
    "HEAD",
    "HTML",
    "IFRAME",
    "ILAYER",
    "INPUT",
    "ISINDEX",
    "LABEL",
    "LAYER,",
    "LEGEND",
    "LINK",
    "MARQUEE",
    "MENU",
    "META",
    "NOEMBED", /* ENML doesn't support this, so we drop it to keep it from rendering, since it's unlikely to apply. */
    "NOFRAMES",
    "NOSCRIPT",
    "OBJECT",
    "OPTGROUP",
    "OPTION",
    "PARAM",
    "PLAINTEXT",
    "SCRIPT",
    "SELECT",
    "STYLE",
    "TEXTAREA",
    "XML"
  ];

  // In addition to the following, any attribute beginning with "on" is disallowed.
  var disallowedAttributes = [
    "id",
    "class",
    "accesskey",
    "data",
    "dynsrc",
    "tabindex",
    "style" // We strip style attributes because we build our own.
  ];

  // Properties we'll strip from ancestor elements to the main element being serialized. We want to keep inheritable
  // properties on these, like fonts and colors, but lose positioning.
  var strippableProperties = [
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "clear",
    "display",
    "float",
    "height",
    "layout-flow",
    "layout-grid",
    "layout-grid-char",
    "layout-grid-char-spacing",
    "layout-grid-line",
    "layout-grid-mode",
    "layout-grid-type",
    "left",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "position",
    "right",
    "size",
    "table-layout",
    "top",
    "visibility",
    "width",
    "z-index"
  ];

  function attributeAllowed(attrName) {
    attrName = attrName.toLowerCase();
    if (attrName.match(/^on/i)) return false;
    if (attrName.match(/^data-/i)) return false;
    return (disallowedAttributes.indexOf(attrName) == -1);
  }

  function nodeAllowed(nodeName) {
    nodeName = nodeName.toUpperCase();
    return (disallowedElements.indexOf(nodeName) == -1);
  }

  function transformNode(node) {
    var nodeName = node.nodeName;
    nodeName = nodeName.toUpperCase();

    if (nodeName == "INPUT" && node.type && node.type.toLowerCase() == "image") {
      return "img";
    }

    // If there's special handling for this type, put it here.
    if (nodeName == "BODY") return "div";
    if (nodeName == "HTML") return "div";
    if (nodeName == "FORM") return "div";
    if (nodeName == "LABEL") return "span";
    if (nodeName == "FIELDSET") return "div";
    if (nodeName == "LEGEND") return "span";
    if (nodeName == "IFRAME") return "div";
    // These HTML5 tags should be rendered as divs instead of spans
    if (html5Elements.indexOf(nodeName) > -1) {
      return "div";
    }

    // If the node's not allowed, we want to make sure we reutn it as is, so nothing thinks it's supposed to be the
    // transformed type.
    if (!nodeAllowed(nodeName)) {
      return nodeName.toLowerCase();
    }

    // If it's not specifically allowed, either, then we'll turn it into a span, this preserves the content of special
    // node types from HTML5 and the future.
    if (allowedElements.indexOf(nodeName) == -1) {
      return "span";
    }

    // Anything else gets returned as is.
    return nodeName.toLowerCase();
  }

  Browser.addMessageHandlers({
    content_textResource: msgHandlerTextResource
  });

  function serialize(_element, _range, _keepStyle, callback, _frameData) {
    if (callback) {
      callbacks.push(callback);
    }
    if (!blocked) {
      blocked = true;
      element = _element;
      range = _range;
      keepStyle = _keepStyle;
      frameData = _frameData;
      checkStyleSheets();
    }
    else {
      console.warn("Called serialize while blocked. Added callback but won't change base element.");
    }
  }

  function checkStyleSheet(sheet) {
    if (!usableMedia(sheet)) {
      return;
    }
    if (stylesAdded.length >= maxStylesToAdd) {
      console.warn("Hit style cap of " + maxStylesToAdd + " styles. Stopping.");
      return;
    }

    // This is probably third party, which is why we can't read the rules (because of the same origin policy).
    if (!sheet.cssRules && sheet.href) {
      styleSheetList.push({href: sheet.href, owner: sheet.ownerNode});
      pendingStyleCount++;
      stylesAdded.push(sheet.href);

      pendingStyleSheets.push(sheet.href);
      Browser.sendToExtension({name: "main_getTextResource", href: sheet.href});
      return;
    }

    // Prepend any @imports.
    var rules = sheet.cssRules;
    for (var j = 0; j < rules.length; j++) {
      if (rules[j].type == CSSRule.IMPORT_RULE) {

        if (stylesAdded.indexOf(rules[j].styleSheet.href) != -1) {
          continue; // Duplicate (a fun case was when these were circular).
        }

        styleSheetList.push({href: rules[j].styleSheet.href, owner: sheet.ownerNode});
        pendingStyleCount++;
        stylesAdded.push(rules[j].styleSheet.href);
        pendingStyleSheets.push(rules[j].styleSheet.href);
        Browser.sendToExtension({name: "main_getTextResource", href: rules[j].styleSheet.href});
      }

      else if (rules[j].type == CSSRule.MEDIA_RULE) {
        if (usableMedia(rules[j])) {
          styleSheetList.push(rules[j]);
        }
      }
    }

    // If we get this far, we want to keep this stylesheet, too.
    styleSheetList.push(sheet);
  }

  function checkStyleSheets() {
    pendingStyleCount = 0;
    for (var i = 0; i < document.styleSheets.length; i++) {
      checkStyleSheet(document.styleSheets[i]);
    }
    if (pendingStyleCount == 0) {
      startRecurse(element);
    }
  }

  function reconstituteUrl(base, match, url) {
    var reconstituted;
    url = url.trim(); // for cases like: url( http://www.com/ )
    if (url.match(/^http/i)) {
      reconstituted = url;
    }
    else if (url.match(/^\//)) {
      reconstituted = base.replace(/^(.*?:\/\/[^\/]+).*$/, "$1") + url;
    }
    else {
      reconstituted = base.replace(/^(.*\/)/, "$1") + url;
    }
    reconstituted = "url('" + reconstituted + "')";
    return reconstituted;
  }

  // We need to make our style tag match our original stylesheet.
  function preProcessStyle(styleText, originatingSheetHref) {

    var pageBase = document.location.href.replace(/[^\/]+$/, "");
    var styleBase = originatingSheetHref.replace(/[^\/]+$/, "");

    if (pageBase == styleBase) {
      return styleText;
    }

    // This first block repairs URL paths.  
    // call reconstituteUrl, but prepend the original base URL to its arguments list.
    function reconstitute() {
      var args = [styleBase];
      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
      return reconstituteUrl.apply(this, args);
    }
    if (styleText) {
      styleText = styleText.replace(/url\(["']?(.*?)["']?\)/g, reconstitute);
    }

    return styleText;
  }

  var outstandingStyleSheets = [];
  var styleInterval = 0;
  function pollForStyleSheets(){
    if (styleInterval) return;
    styleInterval = setInterval(function() {

      if (stylesAdded.length >= maxStylesToAdd) {
        cancelPollForStyleSheets();
        startRecurse(element);
        return;
      }

      OUTER: for (var i = 0; i < outstandingStyleSheets.length; i++) {
        var style = outstandingStyleSheets[i][0];
        var idx = outstandingStyleSheets[i][1];
        for (var j = 0; j < document.styleSheets.length; j++) {
          var sheet = document.styleSheets[j];

          if (sheet.ownerNode === style) {
            styleSheetList[idx] = sheet;
            checkStyleSheet(document.styleSheets[j]);
            outstandingStyleSheets.splice(i, 1);
            pendingStyleCount--;
            break OUTER;
          }
        }
      }
      if (pendingStyleCount == 0) {
        cancelPollForStyleSheets();
        startRecurse(element);
      }
    }, 100);
  }

  function cancelPollForStyleSheets() {
    if (styleInterval) {
      clearInterval(styleInterval);
      styleInterval = 0;
    }
  }

  function msgHandlerTextResource(request, sender, sendResponse) {

    var sheetIndex = pendingStyleSheets.indexOf(request.href);
    if (sheetIndex == -1) {
      if (pendingStyleSheets.length)
        return;
    }
    else {
      pendingStyleSheets.splice(sheetIndex, 1);
    }

    for (var i = 0; i < styleSheetList.length; i++) {
      var sheet = styleSheetList[i];

      if (sheet.href === request.href) {
        var styleText = preProcessStyle(request.responseText, sheet.href);
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = styleText;
        style.dataset["evernoteOriginatingUrl"] = sheet.href;

        // Save the current list, as the new style will get inserted at some unknown point in the list, and we'll have
        // to pick it out.
        var savedStyles = [];
        for (var j = 0; j < document.styleSheets.length; j++) {
          savedStyles.push(document.styleSheets[j]);
        }

        if (sheet.owner) {
          sheet.owner.parentNode.insertBefore(style, sheet.owner);
        }
        else {
          document.head.appendChild(style);
        }
        stylesToRemove.push(style);

        outstandingStyleSheets.push([style, i]);
        pollForStyleSheets();

        return;
      }
    }
  }

  // "screen" and "all" are usable, and no media at all is a default of "screen".
  function usableMedia(stylesheet) {
    if (stylesheet.media && stylesheet.media.length) {
      for (var j = 0; j < stylesheet.media.length; j++) {
        var m = stylesheet.media[j].toLowerCase();
        if (m.match(/\bscreen\b/i) || m.match(/\ball\b/i)) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  function postProcessStyles() {
    pseudoElementRules = [];
    for (var i = 0; i < styleSheetList.length; i++) {
      var sheet = styleSheetList[i];
      if (!sheet.cssRules) {
        continue;
      }
      for (var j = 0; j < sheet.cssRules.length; j++) {
        var rule = sheet.cssRules[j];
        if (rule.selectorText && rule.selectorText.match(/(:?:before)|(:?:after)/)) {
          pseudoElementRules.push(rule);
        }
      }
    }
  }

  function startRecurse(el) {
    // Styles don't seem to get resolved instantly all the time, so we introduce a small delay and hope that helps.
    setTimeout(function() {
      postProcessStyles();
      timerStart = new Date();
      stack = [];
      stack.push({element: el, string: "", i: 0, after: null});
      recurse();
    }, 300);
  }

  function escapeHTML(str){ 
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
  }

  function serializeYoutubeVideo(el) {
    if (el.className.match(/flash-player/) && el.id.match(/watch-player/)) {
      if (document.location.href.match(/v=(.*?)(&|$)/)) {
        var vidId = document.location.href.match(/v=(.*?)(&|$)/)[1];
        return "<a href='" + document.location.href + "'><img src='http://img.youtube.com/vi/" + vidId +
          "/0.jpg'/></a>";
      }
    }
    return "";
  }

  function serializeIframe(el) {
    if (el.nodeName.toLowerCase() != "iframe") {
      return null;
    }
    var contents = "";
    if (el.dataset && el.dataset.en_id) {
      if (frameData && frameData[el.dataset.en_id]) {
        contents = frameData[el.dataset.en_id];
        var style = resolveStyle(el);
        if (el.width) style.map.width = {value: el.width + "px"};
        if (el.height) style.map.height = {value: el.height + "px"};

        var styleStr = "";
        for (var i in style.map) {
          styleStr += i + ":" + style.map[i].value + ";";
        }

        if (styleStr) {
          styleStr = " style=\"" + escapeAttr(styleStr) + "\"";
        }
        else {
          styleStr = "";
        }

        var div = "<div" + styleStr + ">" + contents + "</div>";
        return div;
      }
    }
    return null;
  }

  // If we try to serialize a DL that contains elements other than DD or DT, the server will try to coerce this into
  // valid HTML by auto-closing our list. Instead, we simply discard invalid elements here.
  // This function returns true if this is a valid DD or DT or isn't a child of a DL. It returns false if this is an
  // invalid DL child.
  function checkValidDlChild(el) {
    if (el.parentNode) {
      var parentName = el.parentNode.nodeName;
      parentName = parentName.toLowerCase();
      if (parentName == "dl") {
        var normalized = transformNode(el);
        if (normalized != "dd" && normalized != "dt") {
          return false;
        }
      }
    }
    return true;
  }

  function recurse() {
    iterationCount++;
    if (iterationCount % 500 == 0) {
      setTimeout(recurse, 25);
      return;
    }

    // We're not allowed to create variables in here (they need to be on our stack), but this is just a convenience
    // mapping. (f == frame);
    var f = stack[stack.length - 1];
    if (!f) {
      // This can occur in strange cases, like we have a page that uses frames, but the frame we would choose as the
      // main content area fails the same-origin-policy check. We'll get a blank note, but at least not hang.
      doneRecursing("");
    }

    // We haven't gotten into any of our children yet.
    if (f.i == 0) {

      // This particular 'if' block isn't interruptable. Any vars declared in here must only live in here.
      if (!nodeAllowed(transformNode(f.element))) {
        stack.pop();
        recurse();
        return;
      }

      if (!checkValidDlChild(f.element)) {
        console.warn("discarding invalid DL child \"" + f.element.nodeName + "\"");
        stack.pop();
        recurse();
        return;
      }

      if (range && f.element != range.commonAncestorContainer && !range.intersectsNode(f.element)) {
        stack.pop();
        recurse();
        return;
      }
      
      // Drop trailing paragraphs that you get when you triple-click to select.
      if (range && f.element === range.endContainer && range.endOffset === 0) {
        stack.pop();
        recurse();
        return;
      }

      // Don't attempt to serialize the Clipping result iframe
      if (f.element.id == "evernoteClipperResult") {
        stack.pop();
        recurse();
        return;
      }

      var ytvid = serializeYoutubeVideo(f.element);
      if (ytvid) {
        f.string += ytvid;
        stack.pop();
        if (stack.length) {
          stack[stack.length - 1].string = f.string;
          recurse();
        }
        else {
          doneRecursing(f.string);
        }
        return;
      }

      var iframe = serializeIframe(f.element);
      if (iframe) {
        f.string += iframe;
        stack.pop();
        if (stack.length) {
          stack[stack.length - 1].string = f.string;
          recurse();
        }
        else {
          doneRecursing(f.string);
        }
        return;
      }

      var style = {};
      if (keepStyle) {

        style = resolveStyle(f.element);
        if (style.after) f.after = style.after;
      }

      if (style.map && style.map.display && style.map.display.value == "none") {
        // Skipping hidden element.
        stack.pop();
        recurse();
        return;
      }

      f.string += "<" + transformNode(f.element);

      specifyImgDims(f.element);
      if (f.element.attributes && f.element.attributes.length) {
        for (f.i = 0; f.i < f.element.attributes.length; f.i++) {
          if (attributeAllowed(f.element.attributes[f.i].name)) {
            f.string += " " + transformAttribute(f.element, f.element.attributes[f.i]);
          }
        }
      }

      if (keepStyle) {
        f.string += style.style;
      }
      f.string += ">";

      if (keepStyle) {
        if (style.before) {
          f.string += style.before;
        }
      }

      f.i = 0;
    }

    while (f.i < f.element.childNodes.length) {
      if (f.element.childNodes[f.i].nodeType == Node.TEXT_NODE) {
        var text;

        if (range && f.element.childNodes[f.i] === range.startContainer) {
          text = escapeHTML(f.element.childNodes[f.i].textContent.substr(range.startOffset));
        }
        else if (range && f.element.childNodes[f.i] === range.endContainer) {
          text = escapeHTML(f.element.childNodes[f.i].textContent.substr(0, range.endOffset));
        }
        else if (range && !range.intersectsNode(f.element.childNodes[f.i])) {
          text = "";
        }
        else {
          text = escapeHTML(f.element.childNodes[f.i].textContent);
        }
        // text = text.replace(/\s+/g, " "); // @TODO: Enable in production.
        f.string += text;
        f.i++;
      }
      else if(f.element.childNodes[f.i].nodeType == Node.ELEMENT_NODE) {
        stack.push({element: f.element.childNodes[f.i], string: f.string, i: 0, after: null});
        f.i++;
        recurse();
        return;
      }
      else {
        f.i++;
      }
    }

    if (keepStyle) {
      if (f.after) {
        f.string += f.after;
      }
    }

    f.string += "</" + transformNode(f.element) + ">";

    stack.pop();
    if (stack.length) {
      stack[stack.length - 1].string = f.string;
      recurse();
    }
    else {
      doneRecursing(f.string);
    }
  }

  // If someone specifies "background: 0" in CSS, chrome expands that out to:
  // background-position: 0px 50%; background-repeat: initial initial;
  // We restore the original here.
  function rebackgroudifyCss(map) {
    if (map["background-position"] && map["background-repeat"]) {
      if (map["background-position"].trim() == "0px 50%" && map["background-repeat"].trim() == "initial initial") {
        for (var prop in map) {
          if (prop.match(/background/)) {
            delete map[prop];
          }
        }
        map["background"] = "0";
      }
    }
  }
  // @TODO: this is almost certainly horribly incomplete. NOTE: Actually it works remarkably well.
  function parseCssText(str) {
    var val = {};
    var props = str.split(/;\s*/);
    for (var i = 0; i < props.length; i++) {
      props[i] = props[i].trim();
      if (props[i]) {
        var splitIdx = props[i].indexOf(":");
        var name = props[i].substr(0, splitIdx).trim();
        var value = props[i].substr(splitIdx + 1).trim();
        if (name && value) val[name.toLowerCase()] = value;
      }
    }
    rebackgroudifyCss(val);
    return val;
  }

  function objectifyCssRule(rule) {
    var styleMap = {};
    if (rule.style.cssText) {
      var styles;
      if (!rule.style.savedCssObj) {
        rule.style.savedCssObj = parseCssText(rule.style.cssText);
      }
      styles = rule.style.savedCssObj;

      for (var k in styles) {
        styleMap[k] = styles[k];
      }
    }
    return styleMap;
  }

  function specifyImgDims(el) {
    if (el.nodeName.toLowerCase() == "img") {
      if (!el.attributes.width) {
        el.setAttribute("width", el.width);
      }
      if (!el.attributes.height) {
        el.setAttribute("height", el.height);
      }
    }
  }

  // ================================================================================================================
  // The following block does "slow" CSS resolution, where getMatchedCSSRules doesn't exist.
  // This is *incredibly slow* compared to the normal version, by orders of magnitude.
  function resolveRule(rule, el, ruleList) {
    try {

      // @TODO: Move this somewhere else, we don't really want to be re-doing thing resolution on every single match
      // attempt. Handily, it doesn't matter in webkit, since we have getMatchedCSSRules and will be using "fast"
      // resolution.
      var matches = false;
      if (el.matchesSelector) matches = el.matchesSelector(rule.selectorText);
      else if (el.mozMatchesSelector) matches = el.mozMatchesSelector(rule.selectorText);
      else if (el.webkitMatchesSelector) matches = el.webkitMatchesSelector(rule.selectorText);

      if (matches) {
        ruleList.push(rule);
      }
    }
    catch (e) { }
  }

  function resolveSheet(sheet, el, ruleList) {
    for (var j = 0; j < sheet.cssRules.length; j++) {
      resolveRule(sheet.cssRules[j], el, ruleList);
    }
  }

  function getMatchedCSSRulesSlow(el) {
    var rules = [];
    for (var i = 0; i < styleSheetList.length; i++) {
      var sheet = styleSheetList[i];

      // Skip any sheet with no rules.
      if (!sheet.cssRules) continue;
      resolveSheet(sheet, el, rules);
    }
    return rules;
  }

  // @TODO: This is wrong for comma-separated selectors. We should split them and check each one individually.
  function getSelectorSpecificity(sel) {
    var matchers = {
      "ids": {
        "regex": /#[A-Z]+/ig,
        "count": 0
      },
      "classes": {
        "regex": /\.[A-Z]+/ig,
        "count": 0
      },
      "attrs": {
        "regex": /\[.*?\]/g,
        "count": 0
      },
      "pseudos": {
        "regex": /:+[A-Z]+/ig,
        "count": 0
      },
      "pseudoEls": {
        "regex": /:+(first-line|first-letter|before|after)/ig,
        "count": 0
      },
      "types": {
        "regex": /(^|\s)[A-Z]+/ig,
        "count": 0
      }
    }

    for (var i in matchers) {
      var re = matchers[i].regex;
      while (re.exec(sel)) {
        matchers[i].count++;
      }
    }

    matchers.pseudoClasses = {};
    matchers.pseudoClasses.count = matchers.pseudos.count - matchers.pseudoEls.count;

    var first = matchers.ids.count;
    var second = matchers.classes.count + matchers.attrs.count + matchers.pseudoClasses.count;
    var third = matchers.types.count + matchers.pseudoEls.count;

    var score = (first * 256 * 256) + (second * 256) + third;

    return score;
  }

  function splitSelectorList(sel) {
    var sels = [];
    var lastStart = 0;
    var i = 0;
    var quoted = "";
    for (i = 0; i < sel.length; i++) {
      if (!quoted) {
        if (sel[i] == "'" || sel[i] == "\"") {
          quoted = sel[i];
        }
        else if (sel[i] == ",") {
          sels.push(sel.substring(lastStart, i).trim());
          lastStart = i + 1;
        }
      }
      else {
        if (sel[i] == quoted) {
          quoted = "";
        }
      }
    }
    sels.push(sel.substr(lastStart).trim());
    return sels;
  }

  // Properties listed here http://www.w3.org/TR/CSS21/propidx.html that are both 'visual' and inherited. This is used
  // to handle inheritance into generated content blocks properly. Note that this is a list from CSS 2.1 and may miss
  // items that were added in CSS3.
  var inheritableCSSProperties = {
    'border-collapse': true,
    'border-spacing': true,
    'caption-side': true,
    'color': true,
    'cursor': true,
    'direction': true,
    'empty-cells': true,
    'font-family': true,
    'font-size': true,
    'font-style': true,
    'font-variant': true,
    'font-weight': true,
    'font': true,
    'letter-spacing': true,
    'line-height': true,
    'list-style-image': true,
    'list-style-position': true,
    'list-style-type': true,
    'list-style': true,
    'orphans': true,
    'quotes': true,
    'text-align': true,
    'text-indent': true,
    'text-transform': true,
    'visibility': true,
    'white-space': true,
    'widows': true,
    'word-spacing': true
  };
  function cssPropertyIsInheritable(property) {
    if (inheritableCSSProperties[property.toLowerCase()]) {
      return true;
    }
    return false;
  }

  function fixQuirksModeTableInheritance(el, map) {
    var nodeName = el.nodeName.toLowerCase();
    if (nodeName == "table" || nodeName == "caption") {
      if (document.compatMode == "CSS1Compat") {
        // console.log("standards mode document, forcing table inheritance.");
        map["font-size"] = {value: "inherit", score: 0};
        map["font-weight"] = {value: "inherit", score: 0};
        map["font-style"] = {value: "inherit", score: 0};
        map["font-variant"] = {value: "inherit", score: 0};
      }
    }
  }

  // @TODO: there are almost certainly more to add here.
  function clearOverridden(name, map) {
    if (name == "padding") {
      delete map["padding-top"];
      delete map["padding-bottom"];
      delete map["padding-left"];
      delete map["padding-right"];
    }

    else if (name == "margin") {
      delete map["margintop"];
      delete map["margin-bottom"];
      delete map["margin-left"];
      delete map["margin-right"];
    }
  }

  // ================================================================================================================
  // And the following block does "fast" CSS resolution, where we can call getMatchedCSSRules, which is currently (and
  // maybe always will be) Webkit-only.
  function resolveStyle(el, stripStyleList) {

    // getMatchedCSSRules doesn't work if the page has a BASE tag. In chrome, this can be resolved by temporarily
    // detaching the BASE tag. In Safari, that won't fix it at all.
    base = document.querySelector("base");
    if (!SAFARI && base) {
      base.parentNode.removeChild(base);
    }

    var style = "";
    var originalStyle = null;
    var before = {};
    var after = {};
    if (el.attributes && el.attributes.style) {
      originalStyle = parseCssText(el.attributes.style.value);
    }

    var styleMap = {};

    fixQuirksModeTableInheritance(el, styleMap);

    var rules;
    if (window.getMatchedCSSRules && !(SAFARI && base)) {
      rules = getMatchedCSSRules(el);
    }
    else {
      rules = getMatchedCSSRulesSlow(el);
    }
    if (rules && rules.length) {
      for (var i = 0; i < rules.length; i++) {

        var specScore = 0;
        var ignoreVisited = false;
        if (rules[i].selectorText.match(/:visited/i)) {
          ignoreVisited = true;
        }

        var selectors = splitSelectorList(rules[i].selectorText);
        for (var j = 0; j < selectors.length; j++) {
          var matches;
          try {
            matches = el.webkitMatchesSelector(selectors[j]);
          }
          catch (e){
            console.warn("Couldn't match against selector " + selectors[j] + " in: " + rules[i].selectorText);
            console.error(e);
          }
          if (matches) {
            ignoreVisited = false; // If we match anything, then we'll ignore whether we matched a visited rule, as
                                   // matchesSelector will always return 'false' for these rules.
            var possibleSpec = getSelectorSpecificity(selectors[j]);
            if (possibleSpec >= specScore) {
              specScore = possibleSpec;
            }
          }
        }

        if (ignoreVisited) {
          // console.log("should ignore visited selector: " + rules[i].selectorText);
          continue;
        }

        var ruleObj = objectifyCssRule(rules[i]);
        for (var k in ruleObj) {

          // Skip invalid properties.
          var jsPropName = k.replace(/^-/, "").replace(/-[a-z]/g, function(str){ return str[1].toUpperCase(); });

          if (!rules[i].style[jsPropName]) {
            continue;
          }

          // See if there was a pre=existing score for this property.
          var oldScore = 0;
          if (styleMap[k]) {
            oldScore = styleMap[k].score;
          }

          // Adjusts scores for !important rules.
          var ruleScore = specScore;
          if (ruleObj[k].match(/!important\s*$/i)) {
            ruleScore += (256 * 256 * 256);
            ruleObj[k] = ruleObj[k].replace(/\s*!important\s*$/i, "");
          }
          // Replace if greater or equal.
          if (ruleScore >= oldScore) {
            clearOverridden(k, styleMap);
            styleMap[k] = {value: ruleObj[k], score: ruleScore};
          }
        }
      }
    }

    // For handling "before" and "after" pseudo-elements.
    for (var i = 0; i < pseudoElementRules.length; i++) {
      var rule = pseudoElementRules[i];
      var match;
      if (el.webkitMatchesSelector) {
        // Because we don't have a real CSS engine, sometimes the following heuristic regex replacement leaves us with
        // invalid CSS selectors, which will throw "DOM Exception 12" errors when we try and match against them, so we
        // just catch that and ignore it to keep ourselves from failing out entirely.
        try {
          match = el.webkitMatchesSelector(rule.selectorText.replace(/(:?:before)|(:?:after)/g, ""));
        }
        catch (e) {
          // DOM Exception 12.
        }
      }
      if (match) {

        var matchBefore = false;
        var matchAfter = false;
        if (rule.selectorText.match(/:?:before/)) {
          matchBefore = true;
        }
        if (rule.selectorText.match(/:?:after/)) {
          matchAfter = true;
        }

        // Inherit as per: http://www.w3.org/TR/CSS21/generate.html;
        // @TODO: Implement specificity here.
        for (var k in styleMap) {
          if (matchBefore && cssPropertyIsInheritable(k)) {
            before[k] = styleMap[k].value;
          }
          if (matchAfter && cssPropertyIsInheritable(k)) {
            after[k] = styleMap[k].value;
          }
        }
        var generated = objectifyCssRule(rule);
        for (var k in generated) {
          if (matchBefore) {
            before[k] = generated[k];
          }
          if (matchAfter) {
            after[k] = generated[k];
          }
        }
      }
    }

    var sections = [before, after];
    for (var entry = 0; entry < sections.length; entry++) {
      var map = sections[entry];
      var pseudoStyle = "";
      var content = "";
      var count = 0;
      for (var j in map) {
        if (j != "content") {
          pseudoStyle += j + ":" + map[j] + ";";
        }
        else {
          // Ghetto-parses quoted strings, mostly.
          var content = map[j];
          content = content.trim();
          content = content.replace(/\s+!important$/, "");
          if (content == "none") content = "\"\"";
          if (content.match(/^'/)) {
            content = content.replace(/^'(.*?)'.*/, "$1");
          }
          else if (content.match(/^"/)) {
            content = content.replace(/^"(.*?)".*/, "$1");
          }

          if (content.match(/^url\((.*)\)/)) {
            var contentUrl = content.match(/^url\((.*)\)/)[1];
            content = "<img src='" + contentUrl + "'/>";
          }
        }
        count++;
      }
      if (count) {
        pseudoStyle = "<span style=\"" + pseudoStyle + "\">" + content + "</span>";
        if (entry == 0) {
          before = pseudoStyle;
        }
        else {
          after = pseudoStyle;
        }
      }
    }

    // Clear out anything tyhat didn't get set.
    if (typeof before != "string") before = null;
    if (typeof after != "string") after = null;

    // el == element is a special hack to remove padding and such from the main element, so that it doesn't get
    // positioned strangely in our note view.
    if (el == element) {
      stripStyleList = strippableProperties;
    }
    if (stripStyleList) {
      for (var i = 0; i < stripStyleList.length; i++) {
        if (styleMap[stripStyleList[i]]) {
          delete styleMap[stripStyleList[i]];
        }
      }
    }

    // Hacks and adjustments.
    // ================================================================================
    fixHeight(el, styleMap);
    fixUserSelect(styleMap);
    // ================================================================================

    if (originalStyle) {
      var matcher = /url\((.*)\)/i;
      for (var k in originalStyle) {

        // If our style tag contains attrbiutes with URLs, we may need to canonicalize them,
        if (matcher.test(originalStyle[k])) {
          var url = matcher.exec(originalStyle[k])[1];
          var linkBase = document.location.href;
          if (base && base.href) {
            linkBase = base.href;
          }
          var fixed = reconstituteUrl(linkBase, match, url);
          originalStyle[k] = fixed;
        }

        styleMap[k] = {value: originalStyle[k]};
      }
    }

    for (var i in styleMap) {
      style += i + ":" + styleMap[i].value + ";";
    }

    if (style) {
      style = " style=\"" + escapeAttr(style) + "\"";
    }
    else {
      style = "";
    }

    if (!SAFARI && base) {
      document.head.insertBefore(base, document.head.firstChild);
    }
    base = null;

    return {style: style, before: before, after: after, map: styleMap};
  }

  // ================================================================================================================


  // Height percentage adjustment to auto, as per here: 
  // https://developer.mozilla.org/en/CSS/height
  function fixHeight(el, styleMap) {
    if (styleMap["height"] && styleMap["height"].value.match(/%$/)) {
      var fixed = styleMap["height"].value;
      try {
        var containingHeight = el.parentNode.style.height;
        if (!containingHeight) {
          fixed = "auto";
        }
      }
      catch(e) { /*in case we can't resolve the parent's style chain. */ }
      styleMap["height"].value = fixed;
    }
  }

  // This keeps notes modifiable.
  function fixUserSelect(styleMap) {
    var selectProps = [
      "-webkit-user-select",
      "-moz-user-select",
      "-ms-user-select",
      "user-select",
      "-webkit-user-modify",
      "-moz-user-modify",
      "-ms-user-modify",
      "user-modify"
    ];
    for (var i = 0; i < selectProps; i++) {
      if (styleMap[selectProps[i]]) {
        delete styleMap[selectProps[i]];
      }
    }
  }

  function transformAttribute(element, attrObj) {
    var val = null;
    if (attrObj.name.toLowerCase() == "href") {
      // The following magic returns a fully-qualified path for 'href' instead of whatever the DOM says in the 'href'
      // attribute.
      var href = element.href;
      if (href && href.match(/^javascript/i)) href = "#";
      val = escapeAttr(href);
    }
    else if (attrObj.name.toLowerCase() == "src") {
      var src = element.src;
      if (src && src.match(/^javascript/i)) src = "#";
      val = escapeAttr(src);
    }
    
    if (!val) {
      val = escapeAttr(attrObj.value);
    }

    return attrObj.name + "=\"" + val + "\"";
  }

  function restoreAncestors() {
    var front = "";
    var back = "";
    var current = element.parentNode;
    while (current && current.parentNode) {
      var style = resolveStyle(current, strippableProperties).style;
      var type = transformNode(current);

      if (nodeAllowed(type)) {
        front = "<" + type + style + ">" + front;
        back = back + "</" + type + ">";
      }
      current = current.parentNode;
    }

    // Last one, set the base font size
    front = "<div style=\"font-size: 16px\">" + front;
    back = back + "</div>";

    return {front: front, back: back};
  }

  function doneRecursing(str) {
    blocked = false;
    timerEnd = new Date();

    var ancestors = {front: "", back: ""};
    if (keepStyle) {
      ancestors = restoreAncestors();
    }
    str = ancestors.front + str + ancestors.back;

    for (var i = 0; i < stylesToRemove.length; i++) {
      stylesToRemove[i].parentNode.removeChild(stylesToRemove[i]);
    }
    stylesToRemove = [];

    // Testing only.
    var clipTime = (Math.round(((timerEnd.valueOf() - timerStart.valueOf()) / 100)) / 10) + "s";

    for (var i = 0; i < callbacks.length; i++) {
      try {
        callbacks[i](str, clipTime);
      }
      catch (e) {
        console.warn("Couldn't run 'serialize' callback: " + JSON.stringify(e));
      }
    }
    callbacks = [];
  }

  function escapeAttr(str) {
    if (!str) return "";
    return str.replace(/"/g, "\\\"");
  }

  this.serialize = serialize; 
  this.startRecurse = startRecurse;
  this.addCallback = function(fnCallback){
    callbacks.push(fnCallback);
  };

  Object.preventExtensions(this);
}

Object.preventExtensions(HtmlSerializer);

function callback(str){
    console.log(str);
};
var serializer = new HtmlSerializer();
serializer.addCallback(callback);
serializer.startRecurse(document.body);
