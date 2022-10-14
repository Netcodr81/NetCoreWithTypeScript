var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/*!
  * Bootstrap v5.1.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
        typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
}(this, (function (Popper) {
    'use strict';
    var _a;
    function _interopNamespace(e) {
        if (e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }
    var Popper__namespace = /*#__PURE__*/ _interopNamespace(Popper);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000;
    var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)
    var toType = function (obj) {
        if (obj === null || obj === undefined) {
            return "" + obj;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */
    var getUID = function (prefix) {
        do {
            prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
    };
    var getSelector = function (element) {
        var selector = element.getAttribute('data-bs-target');
        if (!selector || selector === '#') {
            var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
            // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
            // `document.querySelector` will rightfully complain it is invalid.
            // See https://github.com/twbs/bootstrap/issues/32273
            if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
                return null;
            } // Just in case some CMS puts out a full URL with the anchor appended
            if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
                hrefAttr = "#" + hrefAttr.split('#')[1];
            }
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
        }
        return selector;
    };
    var getSelectorFromElement = function (element) {
        var selector = getSelector(element);
        if (selector) {
            return document.querySelector(selector) ? selector : null;
        }
        return null;
    };
    var getElementFromSelector = function (element) {
        var selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
    };
    var getTransitionDurationFromElement = function (element) {
        if (!element) {
            return 0;
        } // Get transition-duration of the element
        var _a = window.getComputedStyle(element), transitionDuration = _a.transitionDuration, transitionDelay = _a.transitionDelay;
        var floatTransitionDuration = Number.parseFloat(transitionDuration);
        var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found
        if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
        } // If multiple durations are defined, take the first
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    };
    var triggerTransitionEnd = function (element) {
        element.dispatchEvent(new Event(TRANSITION_END));
    };
    var isElement = function (obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        if (typeof obj.jquery !== 'undefined') {
            obj = obj[0];
        }
        return typeof obj.nodeType !== 'undefined';
    };
    var getElement = function (obj) {
        if (isElement(obj)) {
            // it's a jQuery object or a node element
            return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === 'string' && obj.length > 0) {
            return document.querySelector(obj);
        }
        return null;
    };
    var typeCheckConfig = function (componentName, config, configTypes) {
        Object.keys(configTypes).forEach(function (property) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && isElement(value) ? 'element' : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
                throw new TypeError(componentName.toUpperCase() + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\".");
            }
        });
    };
    var isVisible = function (element) {
        if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
        }
        return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    };
    var isDisabled = function (element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        if (element.classList.contains('disabled')) {
            return true;
        }
        if (typeof element.disabled !== 'undefined') {
            return element.disabled;
        }
        return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    };
    var findShadowRoot = function (element) {
        if (!document.documentElement.attachShadow) {
            return null;
        } // Can find the shadow root otherwise it'll return the document
        if (typeof element.getRootNode === 'function') {
            var root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) {
            return element;
        } // when we don't find a shadow root
        if (!element.parentNode) {
            return null;
        }
        return findShadowRoot(element.parentNode);
    };
    var noop = function () { };
    /**
     * Trick to restart an element's animation
     *
     * @param {HTMLElement} element
     * @return void
     *
     * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
     */
    var reflow = function (element) {
        // eslint-disable-next-line no-unused-expressions
        element.offsetHeight;
    };
    var getjQuery = function () {
        var jQuery = window.jQuery;
        if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
            return jQuery;
        }
        return null;
    };
    var DOMContentLoadedCallbacks = [];
    var onDOMContentLoaded = function (callback) {
        if (document.readyState === 'loading') {
            // add listener on the first call when the document is in loading state
            if (!DOMContentLoadedCallbacks.length) {
                document.addEventListener('DOMContentLoaded', function () {
                    DOMContentLoadedCallbacks.forEach(function (callback) { return callback(); });
                });
            }
            DOMContentLoadedCallbacks.push(callback);
        }
        else {
            callback();
        }
    };
    var isRTL = function () { return document.documentElement.dir === 'rtl'; };
    var defineJQueryPlugin = function (plugin) {
        onDOMContentLoaded(function () {
            var $ = getjQuery();
            /* istanbul ignore if */
            if ($) {
                var name_1 = plugin.NAME;
                var JQUERY_NO_CONFLICT_1 = $.fn[name_1];
                $.fn[name_1] = plugin.jQueryInterface;
                $.fn[name_1].Constructor = plugin;
                $.fn[name_1].noConflict = function () {
                    $.fn[name_1] = JQUERY_NO_CONFLICT_1;
                    return plugin.jQueryInterface;
                };
            }
        });
    };
    var execute = function (callback) {
        if (typeof callback === 'function') {
            callback();
        }
    };
    var executeAfterTransition = function (callback, transitionElement, waitForTransition) {
        if (waitForTransition === void 0) { waitForTransition = true; }
        if (!waitForTransition) {
            execute(callback);
            return;
        }
        var durationPadding = 5;
        var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        var called = false;
        var handler = function (_a) {
            var target = _a.target;
            if (target !== transitionElement) {
                return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(function () {
            if (!called) {
                triggerTransitionEnd(transitionElement);
            }
        }, emulatedDuration);
    };
    /**
     * Return the previous/next element of a list.
     *
     * @param {array} list    The list of elements
     * @param activeElement   The active element
     * @param shouldGetNext   Choose to get next or previous element
     * @param isCycleAllowed
     * @return {Element|elem} The proper element
     */
    var getNextActiveElement = function (list, activeElement, shouldGetNext, isCycleAllowed) {
        var index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed
        if (index === -1) {
            return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
        }
        var listLength = list.length;
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
            index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): dom/event-handler.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    var stripNameRegex = /\..*/;
    var stripUidRegex = /::\d+$/;
    var eventRegistry = {}; // Events storage
    var uidEvent = 1;
    var customEvents = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    };
    var customEventsRegex = /^(mouseenter|mouseleave)/i;
    var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
    /**
     * ------------------------------------------------------------------------
     * Private methods
     * ------------------------------------------------------------------------
     */
    function getUidEvent(element, uid) {
        return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
    }
    function getEvent(element) {
        var uid = getUidEvent(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
        return function handler(event) {
            event.delegateTarget = element;
            if (handler.oneOff) {
                EventHandler.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
        };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
            var domElements = element.querySelectorAll(selector);
            for (var target = event.target; target && target !== this; target = target.parentNode) {
                for (var i = domElements.length; i--;) {
                    if (domElements[i] === target) {
                        event.delegateTarget = target;
                        if (handler.oneOff) {
                            // eslint-disable-next-line unicorn/consistent-destructuring
                            EventHandler.off(element, event.type, selector, fn);
                        }
                        return fn.apply(target, [event]);
                    }
                }
            } // To please ESLint
            return null;
        };
    }
    function findHandler(events, handler, delegationSelector) {
        if (delegationSelector === void 0) { delegationSelector = null; }
        var uidEventList = Object.keys(events);
        for (var i = 0, len = uidEventList.length; i < len; i++) {
            var event_1 = events[uidEventList[i]];
            if (event_1.originalHandler === handler && event_1.delegationSelector === delegationSelector) {
                return event_1;
            }
        }
        return null;
    }
    function normalizeParams(originalTypeEvent, handler, delegationFn) {
        var delegation = typeof handler === 'string';
        var originalHandler = delegation ? delegationFn : handler;
        var typeEvent = getTypeEvent(originalTypeEvent);
        var isNative = nativeEvents.has(typeEvent);
        if (!isNative) {
            typeEvent = originalTypeEvent;
        }
        return [delegation, originalHandler, typeEvent];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
        if (typeof originalTypeEvent !== 'string' || !element) {
            return;
        }
        if (!handler) {
            handler = delegationFn;
            delegationFn = null;
        } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
        // this prevents the handler from being dispatched the same way as mouseover or mouseout does
        if (customEventsRegex.test(originalTypeEvent)) {
            var wrapFn = function (fn) {
                return function (event) {
                    if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                        return fn.call(this, event);
                    }
                };
            };
            if (delegationFn) {
                delegationFn = wrapFn(delegationFn);
            }
            else {
                handler = wrapFn(handler);
            }
        }
        var _a = normalizeParams(originalTypeEvent, handler, delegationFn), delegation = _a[0], originalHandler = _a[1], typeEvent = _a[2];
        var events = getEvent(element);
        var handlers = events[typeEvent] || (events[typeEvent] = {});
        var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
        if (previousFn) {
            previousFn.oneOff = previousFn.oneOff && oneOff;
            return;
        }
        var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
        var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
        fn.delegationSelector = delegation ? handler : null;
        fn.originalHandler = originalHandler;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, delegation);
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        var fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) {
            return;
        }
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        var storeElementEvent = events[typeEvent] || {};
        Object.keys(storeElementEvent).forEach(function (handlerKey) {
            if (handlerKey.includes(namespace)) {
                var event_2 = storeElementEvent[handlerKey];
                removeHandler(element, events, typeEvent, event_2.originalHandler, event_2.delegationSelector);
            }
        });
    }
    function getTypeEvent(event) {
        // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
        event = event.replace(stripNameRegex, '');
        return customEvents[event] || event;
    }
    var EventHandler = {
        on: function (element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, false);
        },
        one: function (element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, true);
        },
        off: function (element, originalTypeEvent, handler, delegationFn) {
            if (typeof originalTypeEvent !== 'string' || !element) {
                return;
            }
            var _a = normalizeParams(originalTypeEvent, handler, delegationFn), delegation = _a[0], originalHandler = _a[1], typeEvent = _a[2];
            var inNamespace = typeEvent !== originalTypeEvent;
            var events = getEvent(element);
            var isNamespace = originalTypeEvent.startsWith('.');
            if (typeof originalHandler !== 'undefined') {
                // Simplest case: handler is passed, remove that listener ONLY.
                if (!events || !events[typeEvent]) {
                    return;
                }
                removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
                return;
            }
            if (isNamespace) {
                Object.keys(events).forEach(function (elementEvent) {
                    removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
                });
            }
            var storeElementEvent = events[typeEvent] || {};
            Object.keys(storeElementEvent).forEach(function (keyHandlers) {
                var handlerKey = keyHandlers.replace(stripUidRegex, '');
                if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                    var event_3 = storeElementEvent[keyHandlers];
                    removeHandler(element, events, typeEvent, event_3.originalHandler, event_3.delegationSelector);
                }
            });
        },
        trigger: function (element, event, args) {
            if (typeof event !== 'string' || !element) {
                return null;
            }
            var $ = getjQuery();
            var typeEvent = getTypeEvent(event);
            var inNamespace = event !== typeEvent;
            var isNative = nativeEvents.has(typeEvent);
            var jQueryEvent;
            var bubbles = true;
            var nativeDispatch = true;
            var defaultPrevented = false;
            var evt = null;
            if (inNamespace && $) {
                jQueryEvent = $.Event(event, args);
                $(element).trigger(jQueryEvent);
                bubbles = !jQueryEvent.isPropagationStopped();
                nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
                defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            if (isNative) {
                evt = document.createEvent('HTMLEvents');
                evt.initEvent(typeEvent, bubbles, true);
            }
            else {
                evt = new CustomEvent(event, {
                    bubbles: bubbles,
                    cancelable: true
                });
            } // merge custom information in our event
            if (typeof args !== 'undefined') {
                Object.keys(args).forEach(function (key) {
                    Object.defineProperty(evt, key, {
                        get: function () {
                            return args[key];
                        }
                    });
                });
            }
            if (defaultPrevented) {
                evt.preventDefault();
            }
            if (nativeDispatch) {
                element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
                jQueryEvent.preventDefault();
            }
            return evt;
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): dom/data.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var elementMap = new Map();
    var Data = {
        set: function (element, key, instance) {
            if (!elementMap.has(element)) {
                elementMap.set(element, new Map());
            }
            var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
            // can be removed later when multiple key/instances are fine to be used
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
                // eslint-disable-next-line no-console
                console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: " + Array.from(instanceMap.keys())[0] + ".");
                return;
            }
            instanceMap.set(key, instance);
        },
        get: function (element, key) {
            if (elementMap.has(element)) {
                return elementMap.get(element).get(key) || null;
            }
            return null;
        },
        remove: function (element, key) {
            if (!elementMap.has(element)) {
                return;
            }
            var instanceMap = elementMap.get(element);
            instanceMap.delete(key); // free up element references if there are no instances left for an element
            if (instanceMap.size === 0) {
                elementMap.delete(element);
            }
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): base-component.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var VERSION = '5.1.0';
    var BaseComponent = /** @class */ (function () {
        function BaseComponent(element) {
            element = getElement(element);
            if (!element) {
                return;
            }
            this._element = element;
            Data.set(this._element, this.constructor.DATA_KEY, this);
        }
        BaseComponent.prototype.dispose = function () {
            var _this = this;
            Data.remove(this._element, this.constructor.DATA_KEY);
            EventHandler.off(this._element, this.constructor.EVENT_KEY);
            Object.getOwnPropertyNames(this).forEach(function (propertyName) {
                _this[propertyName] = null;
            });
        };
        BaseComponent.prototype._queueCallback = function (callback, element, isAnimated) {
            if (isAnimated === void 0) { isAnimated = true; }
            executeAfterTransition(callback, element, isAnimated);
        };
        /** Static */
        BaseComponent.getInstance = function (element) {
            return Data.get(getElement(element), this.DATA_KEY);
        };
        BaseComponent.getOrCreateInstance = function (element, config) {
            if (config === void 0) { config = {}; }
            return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
        };
        Object.defineProperty(BaseComponent, "VERSION", {
            get: function () {
                return VERSION;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseComponent, "NAME", {
            get: function () {
                throw new Error('You have to implement the static method "NAME", for each component!');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseComponent, "DATA_KEY", {
            get: function () {
                return "bs." + this.NAME;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseComponent, "EVENT_KEY", {
            get: function () {
                return "." + this.DATA_KEY;
            },
            enumerable: false,
            configurable: true
        });
        return BaseComponent;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/component-functions.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var enableDismissTrigger = function (component, method) {
        if (method === void 0) { method = 'hide'; }
        var clickEvent = "click.dismiss" + component.EVENT_KEY;
        var name = component.NAME;
        EventHandler.on(document, clickEvent, "[data-bs-dismiss=\"" + name + "\"]", function (event) {
            if (['A', 'AREA'].includes(this.tagName)) {
                event.preventDefault();
            }
            if (isDisabled(this)) {
                return;
            }
            var target = getElementFromSelector(this) || this.closest("." + name);
            var instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
            instance[method]();
        });
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$d = 'alert';
    var DATA_KEY$c = 'bs.alert';
    var EVENT_KEY$c = "." + DATA_KEY$c;
    var EVENT_CLOSE = "close" + EVENT_KEY$c;
    var EVENT_CLOSED = "closed" + EVENT_KEY$c;
    var CLASS_NAME_FADE$5 = 'fade';
    var CLASS_NAME_SHOW$8 = 'show';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Alert = /** @class */ (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Alert, "NAME", {
            // Getters
            get: function () {
                return NAME$d;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Alert.prototype.close = function () {
            var _this = this;
            var closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
            if (closeEvent.defaultPrevented) {
                return;
            }
            this._element.classList.remove(CLASS_NAME_SHOW$8);
            var isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
            this._queueCallback(function () { return _this._destroyElement(); }, this._element, isAnimated);
        }; // Private
        Alert.prototype._destroyElement = function () {
            this._element.remove();
            EventHandler.trigger(this._element, EVENT_CLOSED);
            this.dispose();
        }; // Static
        Alert.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Alert.getOrCreateInstance(this);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config](this);
            });
        };
        return Alert;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    enableDismissTrigger(Alert, 'close');
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Alert to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Alert);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$c = 'button';
    var DATA_KEY$b = 'bs.button';
    var EVENT_KEY$b = "." + DATA_KEY$b;
    var DATA_API_KEY$7 = '.data-api';
    var CLASS_NAME_ACTIVE$3 = 'active';
    var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
    var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$b + DATA_API_KEY$7;
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Button, "NAME", {
            // Getters
            get: function () {
                return NAME$c;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Button.prototype.toggle = function () {
            // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
            this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
        }; // Static
        Button.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Button.getOrCreateInstance(this);
                if (config === 'toggle') {
                    data[config]();
                }
            });
        };
        return Button;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
        event.preventDefault();
        var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
        var data = Button.getOrCreateInstance(button);
        data.toggle();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Button to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Button);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): dom/manipulator.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    function normalizeData(val) {
        if (val === 'true') {
            return true;
        }
        if (val === 'false') {
            return false;
        }
        if (val === Number(val).toString()) {
            return Number(val);
        }
        if (val === '' || val === 'null') {
            return null;
        }
        return val;
    }
    function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, function (chr) { return "-" + chr.toLowerCase(); });
    }
    var Manipulator = {
        setDataAttribute: function (element, key, value) {
            element.setAttribute("data-bs-" + normalizeDataKey(key), value);
        },
        removeDataAttribute: function (element, key) {
            element.removeAttribute("data-bs-" + normalizeDataKey(key));
        },
        getDataAttributes: function (element) {
            if (!element) {
                return {};
            }
            var attributes = {};
            Object.keys(element.dataset).filter(function (key) { return key.startsWith('bs'); }).forEach(function (key) {
                var pureKey = key.replace(/^bs/, '');
                pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                attributes[pureKey] = normalizeData(element.dataset[key]);
            });
            return attributes;
        },
        getDataAttribute: function (element, key) {
            return normalizeData(element.getAttribute("data-bs-" + normalizeDataKey(key)));
        },
        offset: function (element) {
            var rect = element.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset
            };
        },
        position: function (element) {
            return {
                top: element.offsetTop,
                left: element.offsetLeft
            };
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): dom/selector-engine.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var NODE_TEXT = 3;
    var SelectorEngine = {
        find: function (selector, element) {
            if (element === void 0) { element = document.documentElement; }
            return [].concat.apply([], Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne: function (selector, element) {
            if (element === void 0) { element = document.documentElement; }
            return Element.prototype.querySelector.call(element, selector);
        },
        children: function (element, selector) {
            return [].concat.apply([], element.children).filter(function (child) { return child.matches(selector); });
        },
        parents: function (element, selector) {
            var parents = [];
            var ancestor = element.parentNode;
            while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
                if (ancestor.matches(selector)) {
                    parents.push(ancestor);
                }
                ancestor = ancestor.parentNode;
            }
            return parents;
        },
        prev: function (element, selector) {
            var previous = element.previousElementSibling;
            while (previous) {
                if (previous.matches(selector)) {
                    return [previous];
                }
                previous = previous.previousElementSibling;
            }
            return [];
        },
        next: function (element, selector) {
            var next = element.nextElementSibling;
            while (next) {
                if (next.matches(selector)) {
                    return [next];
                }
                next = next.nextElementSibling;
            }
            return [];
        },
        focusableChildren: function (element) {
            var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) { return selector + ":not([tabindex^=\"-\"])"; }).join(', ');
            return this.find(focusables, element).filter(function (el) { return !isDisabled(el) && isVisible(el); });
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$b = 'carousel';
    var DATA_KEY$a = 'bs.carousel';
    var EVENT_KEY$a = "." + DATA_KEY$a;
    var DATA_API_KEY$6 = '.data-api';
    var ARROW_LEFT_KEY = 'ArrowLeft';
    var ARROW_RIGHT_KEY = 'ArrowRight';
    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
    var SWIPE_THRESHOLD = 40;
    var Default$a = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true,
        touch: true
    };
    var DefaultType$a = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean',
        touch: 'boolean'
    };
    var ORDER_NEXT = 'next';
    var ORDER_PREV = 'prev';
    var DIRECTION_LEFT = 'left';
    var DIRECTION_RIGHT = 'right';
    var KEY_TO_DIRECTION = (_a = {},
        _a[ARROW_LEFT_KEY] = DIRECTION_RIGHT,
        _a[ARROW_RIGHT_KEY] = DIRECTION_LEFT,
        _a);
    var EVENT_SLIDE = "slide" + EVENT_KEY$a;
    var EVENT_SLID = "slid" + EVENT_KEY$a;
    var EVENT_KEYDOWN = "keydown" + EVENT_KEY$a;
    var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$a;
    var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$a;
    var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$a;
    var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$a;
    var EVENT_TOUCHEND = "touchend" + EVENT_KEY$a;
    var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$a;
    var EVENT_POINTERUP = "pointerup" + EVENT_KEY$a;
    var EVENT_DRAG_START = "dragstart" + EVENT_KEY$a;
    var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$a + DATA_API_KEY$6;
    var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$a + DATA_API_KEY$6;
    var CLASS_NAME_CAROUSEL = 'carousel';
    var CLASS_NAME_ACTIVE$2 = 'active';
    var CLASS_NAME_SLIDE = 'slide';
    var CLASS_NAME_END = 'carousel-item-end';
    var CLASS_NAME_START = 'carousel-item-start';
    var CLASS_NAME_NEXT = 'carousel-item-next';
    var CLASS_NAME_PREV = 'carousel-item-prev';
    var CLASS_NAME_POINTER_EVENT = 'pointer-event';
    var SELECTOR_ACTIVE$1 = '.active';
    var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
    var SELECTOR_ITEM = '.carousel-item';
    var SELECTOR_ITEM_IMG = '.carousel-item img';
    var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
    var SELECTOR_INDICATORS = '.carousel-indicators';
    var SELECTOR_INDICATOR = '[data-bs-target]';
    var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
    var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    var POINTER_TYPE_TOUCH = 'touch';
    var POINTER_TYPE_PEN = 'pen';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Carousel = /** @class */ (function (_super) {
        __extends(Carousel, _super);
        function Carousel(element, config) {
            var _this = _super.call(this, element) || this;
            _this._items = null;
            _this._interval = null;
            _this._activeElement = null;
            _this._isPaused = false;
            _this._isSliding = false;
            _this.touchTimeout = null;
            _this.touchStartX = 0;
            _this.touchDeltaX = 0;
            _this._config = _this._getConfig(config);
            _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
            _this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            _this._pointerEvent = Boolean(window.PointerEvent);
            _this._addEventListeners();
            return _this;
        } // Getters
        Object.defineProperty(Carousel, "Default", {
            get: function () {
                return Default$a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel, "NAME", {
            get: function () {
                return NAME$b;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Carousel.prototype.next = function () {
            this._slide(ORDER_NEXT);
        };
        Carousel.prototype.nextWhenVisible = function () {
            // Don't call next when the page isn't visible
            // or the carousel or its parent isn't visible
            if (!document.hidden && isVisible(this._element)) {
                this.next();
            }
        };
        Carousel.prototype.prev = function () {
            this._slide(ORDER_PREV);
        };
        Carousel.prototype.pause = function (event) {
            if (!event) {
                this._isPaused = true;
            }
            if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
                triggerTransitionEnd(this._element);
                this.cycle(true);
            }
            clearInterval(this._interval);
            this._interval = null;
        };
        Carousel.prototype.cycle = function (event) {
            if (!event) {
                this._isPaused = false;
            }
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }
            if (this._config && this._config.interval && !this._isPaused) {
                this._updateInterval();
                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
        };
        Carousel.prototype.to = function (index) {
            var _this = this;
            this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            var activeIndex = this._getItemIndex(this._activeElement);
            if (index > this._items.length - 1 || index < 0) {
                return;
            }
            if (this._isSliding) {
                EventHandler.one(this._element, EVENT_SLID, function () { return _this.to(index); });
                return;
            }
            if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
            }
            var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, this._items[index]);
        }; // Private
        Carousel.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default$a), Manipulator.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
            typeCheckConfig(NAME$b, config, DefaultType$a);
            return config;
        };
        Carousel.prototype._handleSwipe = function () {
            var absDeltax = Math.abs(this.touchDeltaX);
            if (absDeltax <= SWIPE_THRESHOLD) {
                return;
            }
            var direction = absDeltax / this.touchDeltaX;
            this.touchDeltaX = 0;
            if (!direction) {
                return;
            }
            this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
        };
        Carousel.prototype._addEventListeners = function () {
            var _this = this;
            if (this._config.keyboard) {
                EventHandler.on(this._element, EVENT_KEYDOWN, function (event) { return _this._keydown(event); });
            }
            if (this._config.pause === 'hover') {
                EventHandler.on(this._element, EVENT_MOUSEENTER, function (event) { return _this.pause(event); });
                EventHandler.on(this._element, EVENT_MOUSELEAVE, function (event) { return _this.cycle(event); });
            }
            if (this._config.touch && this._touchSupported) {
                this._addTouchEventListeners();
            }
        };
        Carousel.prototype._addTouchEventListeners = function () {
            var _this = this;
            var start = function (event) {
                if (_this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
                    _this.touchStartX = event.clientX;
                }
                else if (!_this._pointerEvent) {
                    _this.touchStartX = event.touches[0].clientX;
                }
            };
            var move = function (event) {
                // ensure swiping with one touch and not pinching
                _this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - _this.touchStartX;
            };
            var end = function (event) {
                if (_this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
                    _this.touchDeltaX = event.clientX - _this.touchStartX;
                }
                _this._handleSwipe();
                if (_this._config.pause === 'hover') {
                    // If it's a touch-enabled device, mouseenter/leave are fired as
                    // part of the mouse compatibility events on first tap - the carousel
                    // would stop cycling until user tapped out of it;
                    // here, we listen for touchend, explicitly pause the carousel
                    // (as if it's the second time we tap on it, mouseenter compat event
                    // is NOT fired) and after a timeout (to allow for mouse compatibility
                    // events to fire) we explicitly restart cycling
                    _this.pause();
                    if (_this.touchTimeout) {
                        clearTimeout(_this.touchTimeout);
                    }
                    _this.touchTimeout = setTimeout(function (event) { return _this.cycle(event); }, TOUCHEVENT_COMPAT_WAIT + _this._config.interval);
                }
            };
            SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
                EventHandler.on(itemImg, EVENT_DRAG_START, function (e) { return e.preventDefault(); });
            });
            if (this._pointerEvent) {
                EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) { return start(event); });
                EventHandler.on(this._element, EVENT_POINTERUP, function (event) { return end(event); });
                this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            }
            else {
                EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) { return start(event); });
                EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) { return move(event); });
                EventHandler.on(this._element, EVENT_TOUCHEND, function (event) { return end(event); });
            }
        };
        Carousel.prototype._keydown = function (event) {
            if (/input|textarea/i.test(event.target.tagName)) {
                return;
            }
            var direction = KEY_TO_DIRECTION[event.key];
            if (direction) {
                event.preventDefault();
                this._slide(direction);
            }
        };
        Carousel.prototype._getItemIndex = function (element) {
            this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
            return this._items.indexOf(element);
        };
        Carousel.prototype._getItemByOrder = function (order, activeElement) {
            var isNext = order === ORDER_NEXT;
            return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
        };
        Carousel.prototype._triggerSlideEvent = function (relatedTarget, eventDirectionName) {
            var targetIndex = this._getItemIndex(relatedTarget);
            var fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
            return EventHandler.trigger(this._element, EVENT_SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
            });
        };
        Carousel.prototype._setActiveIndicatorElement = function (element) {
            if (this._indicatorsElement) {
                var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
                activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
                activeIndicator.removeAttribute('aria-current');
                var indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);
                for (var i = 0; i < indicators.length; i++) {
                    if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
                        indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
                        indicators[i].setAttribute('aria-current', 'true');
                        break;
                    }
                }
            }
        };
        Carousel.prototype._updateInterval = function () {
            var element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            if (!element) {
                return;
            }
            var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
            if (elementInterval) {
                this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                this._config.interval = elementInterval;
            }
            else {
                this._config.interval = this._config.defaultInterval || this._config.interval;
            }
        };
        Carousel.prototype._slide = function (directionOrOrder, element) {
            var _this = this;
            var order = this._directionToOrder(directionOrOrder);
            var activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            var activeElementIndex = this._getItemIndex(activeElement);
            var nextElement = element || this._getItemByOrder(order, activeElement);
            var nextElementIndex = this._getItemIndex(nextElement);
            var isCycling = Boolean(this._interval);
            var isNext = order === ORDER_NEXT;
            var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            var eventDirectionName = this._orderToDirection(order);
            if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
                this._isSliding = false;
                return;
            }
            if (this._isSliding) {
                return;
            }
            var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (slideEvent.defaultPrevented) {
                return;
            }
            if (!activeElement || !nextElement) {
                // Some weirdness is happening, so we bail
                return;
            }
            this._isSliding = true;
            if (isCycling) {
                this.pause();
            }
            this._setActiveIndicatorElement(nextElement);
            this._activeElement = nextElement;
            var triggerSlidEvent = function () {
                EventHandler.trigger(_this._element, EVENT_SLID, {
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                });
            };
            if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
                nextElement.classList.add(orderClassName);
                reflow(nextElement);
                activeElement.classList.add(directionalClassName);
                nextElement.classList.add(directionalClassName);
                var completeCallBack = function () {
                    nextElement.classList.remove(directionalClassName, orderClassName);
                    nextElement.classList.add(CLASS_NAME_ACTIVE$2);
                    activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
                    _this._isSliding = false;
                    setTimeout(triggerSlidEvent, 0);
                };
                this._queueCallback(completeCallBack, activeElement, true);
            }
            else {
                activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
                nextElement.classList.add(CLASS_NAME_ACTIVE$2);
                this._isSliding = false;
                triggerSlidEvent();
            }
            if (isCycling) {
                this.cycle();
            }
        };
        Carousel.prototype._directionToOrder = function (direction) {
            if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
                return direction;
            }
            if (isRTL()) {
                return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            }
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        };
        Carousel.prototype._orderToDirection = function (order) {
            if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
                return order;
            }
            if (isRTL()) {
                return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }; // Static
        Carousel.carouselInterface = function (element, config) {
            var data = Carousel.getOrCreateInstance(element, config);
            var _config = data._config;
            if (typeof config === 'object') {
                _config = __assign(__assign({}, _config), config);
            }
            var action = typeof config === 'string' ? config : _config.slide;
            if (typeof config === 'number') {
                data.to(config);
            }
            else if (typeof action === 'string') {
                if (typeof data[action] === 'undefined') {
                    throw new TypeError("No method named \"" + action + "\"");
                }
                data[action]();
            }
            else if (_config.interval && _config.ride) {
                data.pause();
                data.cycle();
            }
        };
        Carousel.jQueryInterface = function (config) {
            return this.each(function () {
                Carousel.carouselInterface(this, config);
            });
        };
        Carousel.dataApiClickHandler = function (event) {
            var target = getElementFromSelector(this);
            if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
                return;
            }
            var config = __assign(__assign({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));
            var slideIndex = this.getAttribute('data-bs-slide-to');
            if (slideIndex) {
                config.interval = false;
            }
            Carousel.carouselInterface(target, config);
            if (slideIndex) {
                Carousel.getInstance(target).to(slideIndex);
            }
            event.preventDefault();
        };
        return Carousel;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
    EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
        var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
        for (var i = 0, len = carousels.length; i < len; i++) {
            Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
        }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Carousel to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Carousel);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$a = 'collapse';
    var DATA_KEY$9 = 'bs.collapse';
    var EVENT_KEY$9 = "." + DATA_KEY$9;
    var DATA_API_KEY$5 = '.data-api';
    var Default$9 = {
        toggle: true,
        parent: null
    };
    var DefaultType$9 = {
        toggle: 'boolean',
        parent: '(null|element)'
    };
    var EVENT_SHOW$5 = "show" + EVENT_KEY$9;
    var EVENT_SHOWN$5 = "shown" + EVENT_KEY$9;
    var EVENT_HIDE$5 = "hide" + EVENT_KEY$9;
    var EVENT_HIDDEN$5 = "hidden" + EVENT_KEY$9;
    var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$9 + DATA_API_KEY$5;
    var CLASS_NAME_SHOW$7 = 'show';
    var CLASS_NAME_COLLAPSE = 'collapse';
    var CLASS_NAME_COLLAPSING = 'collapsing';
    var CLASS_NAME_COLLAPSED = 'collapsed';
    var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
    var WIDTH = 'width';
    var HEIGHT = 'height';
    var SELECTOR_ACTIVES = '.show, .collapsing';
    var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Collapse = /** @class */ (function (_super) {
        __extends(Collapse, _super);
        function Collapse(element, config) {
            var _this = _super.call(this, element) || this;
            _this._isTransitioning = false;
            _this._config = _this._getConfig(config);
            _this._triggerArray = [];
            var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
            for (var i = 0, len = toggleList.length; i < len; i++) {
                var elem = toggleList[i];
                var selector = getSelectorFromElement(elem);
                var filterElement = SelectorEngine.find(selector).filter(function (foundElem) { return foundElem === _this._element; });
                if (selector !== null && filterElement.length) {
                    _this._selector = selector;
                    _this._triggerArray.push(elem);
                }
            }
            _this._initializeChildren();
            if (!_this._config.parent) {
                _this._addAriaAndCollapsedClass(_this._triggerArray, _this._isShown());
            }
            if (_this._config.toggle) {
                _this.toggle();
            }
            return _this;
        } // Getters
        Object.defineProperty(Collapse, "Default", {
            get: function () {
                return Default$9;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collapse, "NAME", {
            get: function () {
                return NAME$a;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Collapse.prototype.toggle = function () {
            if (this._isShown()) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        Collapse.prototype.show = function () {
            var _this = this;
            if (this._isTransitioning || this._isShown()) {
                return;
            }
            var actives = [];
            var activesData;
            if (this._config.parent) {
                var children_1 = SelectorEngine.find("." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE, this._config.parent);
                actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(function (elem) { return !children_1.includes(elem); }); // remove children if greater depth
            }
            var container = SelectorEngine.findOne(this._selector);
            if (actives.length) {
                var tempActiveData = actives.find(function (elem) { return container !== elem; });
                activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;
                if (activesData && activesData._isTransitioning) {
                    return;
                }
            }
            var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);
            if (startEvent.defaultPrevented) {
                return;
            }
            actives.forEach(function (elemActive) {
                if (container !== elemActive) {
                    Collapse.getOrCreateInstance(elemActive, {
                        toggle: false
                    }).hide();
                }
                if (!activesData) {
                    Data.set(elemActive, DATA_KEY$9, null);
                }
            });
            var dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            var complete = function () {
                _this._isTransitioning = false;
                _this._element.classList.remove(CLASS_NAME_COLLAPSING);
                _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
                _this._element.style[dimension] = '';
                EventHandler.trigger(_this._element, EVENT_SHOWN$5);
            };
            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll" + capitalizedDimension;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = this._element[scrollSize] + "px";
        };
        Collapse.prototype.hide = function () {
            var _this = this;
            if (this._isTransitioning || !this._isShown()) {
                return;
            }
            var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);
            if (startEvent.defaultPrevented) {
                return;
            }
            var dimension = this._getDimension();
            this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
            var triggerArrayLength = this._triggerArray.length;
            for (var i = 0; i < triggerArrayLength; i++) {
                var trigger = this._triggerArray[i];
                var elem = getElementFromSelector(trigger);
                if (elem && !this._isShown(elem)) {
                    this._addAriaAndCollapsedClass([trigger], false);
                }
            }
            this._isTransitioning = true;
            var complete = function () {
                _this._isTransitioning = false;
                _this._element.classList.remove(CLASS_NAME_COLLAPSING);
                _this._element.classList.add(CLASS_NAME_COLLAPSE);
                EventHandler.trigger(_this._element, EVENT_HIDDEN$5);
            };
            this._element.style[dimension] = '';
            this._queueCallback(complete, this._element, true);
        };
        Collapse.prototype._isShown = function (element) {
            if (element === void 0) { element = this._element; }
            return element.classList.contains(CLASS_NAME_SHOW$7);
        }; // Private
        Collapse.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default$9), Manipulator.getDataAttributes(this._element)), config);
            config.toggle = Boolean(config.toggle); // Coerce string values
            config.parent = getElement(config.parent);
            typeCheckConfig(NAME$a, config, DefaultType$9);
            return config;
        };
        Collapse.prototype._getDimension = function () {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        };
        Collapse.prototype._initializeChildren = function () {
            var _this = this;
            if (!this._config.parent) {
                return;
            }
            var children = SelectorEngine.find("." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE, this._config.parent);
            SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(function (elem) { return !children.includes(elem); }).forEach(function (element) {
                var selected = getElementFromSelector(element);
                if (selected) {
                    _this._addAriaAndCollapsedClass([element], _this._isShown(selected));
                }
            });
        };
        Collapse.prototype._addAriaAndCollapsedClass = function (triggerArray, isOpen) {
            if (!triggerArray.length) {
                return;
            }
            triggerArray.forEach(function (elem) {
                if (isOpen) {
                    elem.classList.remove(CLASS_NAME_COLLAPSED);
                }
                else {
                    elem.classList.add(CLASS_NAME_COLLAPSED);
                }
                elem.setAttribute('aria-expanded', isOpen);
            });
        }; // Static
        Collapse.jQueryInterface = function (config) {
            return this.each(function () {
                var _config = {};
                if (typeof config === 'string' && /show|hide/.test(config)) {
                    _config.toggle = false;
                }
                var data = Collapse.getOrCreateInstance(this, _config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        return Collapse;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
        if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
            event.preventDefault();
        }
        var selector = getSelectorFromElement(this);
        var selectorElements = SelectorEngine.find(selector);
        selectorElements.forEach(function (element) {
            Collapse.getOrCreateInstance(element, {
                toggle: false
            }).toggle();
        });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Collapse to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Collapse);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$9 = 'dropdown';
    var DATA_KEY$8 = 'bs.dropdown';
    var EVENT_KEY$8 = "." + DATA_KEY$8;
    var DATA_API_KEY$4 = '.data-api';
    var ESCAPE_KEY$2 = 'Escape';
    var SPACE_KEY = 'Space';
    var TAB_KEY$1 = 'Tab';
    var ARROW_UP_KEY = 'ArrowUp';
    var ARROW_DOWN_KEY = 'ArrowDown';
    var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY$2);
    var EVENT_HIDE$4 = "hide" + EVENT_KEY$8;
    var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$8;
    var EVENT_SHOW$4 = "show" + EVENT_KEY$8;
    var EVENT_SHOWN$4 = "shown" + EVENT_KEY$8;
    var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$8 + DATA_API_KEY$4;
    var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$8 + DATA_API_KEY$4;
    var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$8 + DATA_API_KEY$4;
    var CLASS_NAME_SHOW$6 = 'show';
    var CLASS_NAME_DROPUP = 'dropup';
    var CLASS_NAME_DROPEND = 'dropend';
    var CLASS_NAME_DROPSTART = 'dropstart';
    var CLASS_NAME_NAVBAR = 'navbar';
    var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
    var SELECTOR_MENU = '.dropdown-menu';
    var SELECTOR_NAVBAR_NAV = '.navbar-nav';
    var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
    var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
    var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
    var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
    var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
    var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
    var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
    var Default$8 = {
        offset: [0, 2],
        boundary: 'clippingParents',
        reference: 'toggle',
        display: 'dynamic',
        popperConfig: null,
        autoClose: true
    };
    var DefaultType$8 = {
        offset: '(array|string|function)',
        boundary: '(string|element)',
        reference: '(string|element|object)',
        display: 'string',
        popperConfig: '(null|object|function)',
        autoClose: '(boolean|string)'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Dropdown = /** @class */ (function (_super) {
        __extends(Dropdown, _super);
        function Dropdown(element, config) {
            var _this = _super.call(this, element) || this;
            _this._popper = null;
            _this._config = _this._getConfig(config);
            _this._menu = _this._getMenuElement();
            _this._inNavbar = _this._detectNavbar();
            return _this;
        } // Getters
        Object.defineProperty(Dropdown, "Default", {
            get: function () {
                return Default$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown, "DefaultType", {
            get: function () {
                return DefaultType$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown, "NAME", {
            get: function () {
                return NAME$9;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Dropdown.prototype.toggle = function () {
            return this._isShown() ? this.hide() : this.show();
        };
        Dropdown.prototype.show = function () {
            if (isDisabled(this._element) || this._isShown(this._menu)) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);
            if (showEvent.defaultPrevented) {
                return;
            }
            var parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar
            if (this._inNavbar) {
                Manipulator.setDataAttribute(this._menu, 'popper', 'none');
            }
            else {
                this._createPopper(parent);
            } // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
                [].concat.apply([], document.body.children).forEach(function (elem) { return EventHandler.on(elem, 'mouseover', noop); });
            }
            this._element.focus();
            this._element.setAttribute('aria-expanded', true);
            this._menu.classList.add(CLASS_NAME_SHOW$6);
            this._element.classList.add(CLASS_NAME_SHOW$6);
            EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
        };
        Dropdown.prototype.hide = function () {
            if (isDisabled(this._element) || !this._isShown(this._menu)) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
        };
        Dropdown.prototype.dispose = function () {
            if (this._popper) {
                this._popper.destroy();
            }
            _super.prototype.dispose.call(this);
        };
        Dropdown.prototype.update = function () {
            this._inNavbar = this._detectNavbar();
            if (this._popper) {
                this._popper.update();
            }
        }; // Private
        Dropdown.prototype._completeHide = function (relatedTarget) {
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);
            if (hideEvent.defaultPrevented) {
                return;
            } // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                [].concat.apply([], document.body.children).forEach(function (elem) { return EventHandler.off(elem, 'mouseover', noop); });
            }
            if (this._popper) {
                this._popper.destroy();
            }
            this._menu.classList.remove(CLASS_NAME_SHOW$6);
            this._element.classList.remove(CLASS_NAME_SHOW$6);
            this._element.setAttribute('aria-expanded', 'false');
            Manipulator.removeDataAttribute(this._menu, 'popper');
            EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
        };
        Dropdown.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config);
            typeCheckConfig(NAME$9, config, this.constructor.DefaultType);
            if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
                // Popper virtual elements require a getBoundingClientRect method
                throw new TypeError(NAME$9.toUpperCase() + ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method.");
            }
            return config;
        };
        Dropdown.prototype._createPopper = function (parent) {
            if (typeof Popper__namespace === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
            }
            var referenceElement = this._element;
            if (this._config.reference === 'parent') {
                referenceElement = parent;
            }
            else if (isElement(this._config.reference)) {
                referenceElement = getElement(this._config.reference);
            }
            else if (typeof this._config.reference === 'object') {
                referenceElement = this._config.reference;
            }
            var popperConfig = this._getPopperConfig();
            var isDisplayStatic = popperConfig.modifiers.find(function (modifier) { return modifier.name === 'applyStyles' && modifier.enabled === false; });
            this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
            if (isDisplayStatic) {
                Manipulator.setDataAttribute(this._menu, 'popper', 'static');
            }
        };
        Dropdown.prototype._isShown = function (element) {
            if (element === void 0) { element = this._element; }
            return element.classList.contains(CLASS_NAME_SHOW$6);
        };
        Dropdown.prototype._getMenuElement = function () {
            return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
        };
        Dropdown.prototype._getPlacement = function () {
            var parentDropdown = this._element.parentNode;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
                return PLACEMENT_RIGHT;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
                return PLACEMENT_LEFT;
            } // We need to trim the value because custom properties can also include spaces
            var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
                return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            }
            return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
        };
        Dropdown.prototype._detectNavbar = function () {
            return this._element.closest("." + CLASS_NAME_NAVBAR) !== null;
        };
        Dropdown.prototype._getOffset = function () {
            var _this = this;
            var offset = this._config.offset;
            if (typeof offset === 'string') {
                return offset.split(',').map(function (val) { return Number.parseInt(val, 10); });
            }
            if (typeof offset === 'function') {
                return function (popperData) { return offset(popperData, _this._element); };
            }
            return offset;
        };
        Dropdown.prototype._getPopperConfig = function () {
            var defaultBsPopperConfig = {
                placement: this._getPlacement(),
                modifiers: [{
                        name: 'preventOverflow',
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: 'offset',
                        options: {
                            offset: this._getOffset()
                        }
                    }]
            }; // Disable Popper if we have a static display
            if (this._config.display === 'static') {
                defaultBsPopperConfig.modifiers = [{
                        name: 'applyStyles',
                        enabled: false
                    }];
            }
            return __assign(__assign({}, defaultBsPopperConfig), (typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig));
        };
        Dropdown.prototype._selectMenuItem = function (_a) {
            var key = _a.key, target = _a.target;
            var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
            if (!items.length) {
                return;
            } // if target isn't included in items (e.g. when expanding the dropdown)
            // allow cycling to get the last item in case key equals ARROW_UP_KEY
            getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
        }; // Static
        Dropdown.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Dropdown.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config]();
            });
        };
        Dropdown.clearMenus = function (event) {
            if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
                return;
            }
            var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);
            for (var i = 0, len = toggles.length; i < len; i++) {
                var context = Dropdown.getInstance(toggles[i]);
                if (!context || context._config.autoClose === false) {
                    continue;
                }
                if (!context._isShown()) {
                    continue;
                }
                var relatedTarget = {
                    relatedTarget: context._element
                };
                if (event) {
                    var composedPath = event.composedPath();
                    var isMenuTarget = composedPath.includes(context._menu);
                    if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
                        continue;
                    } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
                    if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                        continue;
                    }
                    if (event.type === 'click') {
                        relatedTarget.clickEvent = event;
                    }
                }
                context._completeHide(relatedTarget);
            }
        };
        Dropdown.getParentFromElement = function (element) {
            return getElementFromSelector(element) || element.parentNode;
        };
        Dropdown.dataApiKeydownHandler = function (event) {
            // If not input/textarea:
            //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
            // If input/textarea:
            //  - If space key => not a dropdown command
            //  - If key is other than escape
            //    - If key is not up or down => not a dropdown command
            //    - If trigger inside the menu => not a dropdown command
            if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
                return;
            }
            var isActive = this.classList.contains(CLASS_NAME_SHOW$6);
            if (!isActive && event.key === ESCAPE_KEY$2) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (isDisabled(this)) {
                return;
            }
            var getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
            var instance = Dropdown.getOrCreateInstance(getToggleButton);
            if (event.key === ESCAPE_KEY$2) {
                instance.hide();
                return;
            }
            if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
                if (!isActive) {
                    instance.show();
                }
                instance._selectMenuItem(event);
                return;
            }
            if (!isActive || event.key === SPACE_KEY) {
                Dropdown.clearMenus();
            }
        };
        return Dropdown;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
        event.preventDefault();
        Dropdown.getOrCreateInstance(this).toggle();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Dropdown to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Dropdown);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/scrollBar.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
    var SELECTOR_STICKY_CONTENT = '.sticky-top';
    var ScrollBarHelper = /** @class */ (function () {
        function ScrollBarHelper() {
            this._element = document.body;
        }
        ScrollBarHelper.prototype.getWidth = function () {
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
            var documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
        };
        ScrollBarHelper.prototype.hide = function () {
            var width = this.getWidth();
            this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width
            this._setElementAttributes(this._element, 'paddingRight', function (calculatedValue) { return calculatedValue + width; }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function (calculatedValue) { return calculatedValue + width; });
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function (calculatedValue) { return calculatedValue - width; });
        };
        ScrollBarHelper.prototype._disableOverFlow = function () {
            this._saveInitialAttribute(this._element, 'overflow');
            this._element.style.overflow = 'hidden';
        };
        ScrollBarHelper.prototype._setElementAttributes = function (selector, styleProp, callback) {
            var _this = this;
            var scrollbarWidth = this.getWidth();
            var manipulationCallBack = function (element) {
                if (element !== _this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                    return;
                }
                _this._saveInitialAttribute(element, styleProp);
                var calculatedValue = window.getComputedStyle(element)[styleProp];
                element.style[styleProp] = callback(Number.parseFloat(calculatedValue)) + "px";
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        };
        ScrollBarHelper.prototype.reset = function () {
            this._resetElementAttributes(this._element, 'overflow');
            this._resetElementAttributes(this._element, 'paddingRight');
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
        };
        ScrollBarHelper.prototype._saveInitialAttribute = function (element, styleProp) {
            var actualValue = element.style[styleProp];
            if (actualValue) {
                Manipulator.setDataAttribute(element, styleProp, actualValue);
            }
        };
        ScrollBarHelper.prototype._resetElementAttributes = function (selector, styleProp) {
            var manipulationCallBack = function (element) {
                var value = Manipulator.getDataAttribute(element, styleProp);
                if (typeof value === 'undefined') {
                    element.style.removeProperty(styleProp);
                }
                else {
                    Manipulator.removeDataAttribute(element, styleProp);
                    element.style[styleProp] = value;
                }
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        };
        ScrollBarHelper.prototype._applyManipulationCallback = function (selector, callBack) {
            if (isElement(selector)) {
                callBack(selector);
            }
            else {
                SelectorEngine.find(selector, this._element).forEach(callBack);
            }
        };
        ScrollBarHelper.prototype.isOverflowing = function () {
            return this.getWidth() > 0;
        };
        return ScrollBarHelper;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/backdrop.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    var Default$7 = {
        className: 'modal-backdrop',
        isVisible: true,
        // if false, we use the backdrop helper without adding any element to the dom
        isAnimated: false,
        rootElement: 'body',
        // give the choice to place backdrop under different elements
        clickCallback: null
    };
    var DefaultType$7 = {
        className: 'string',
        isVisible: 'boolean',
        isAnimated: 'boolean',
        rootElement: '(element|string)',
        clickCallback: '(function|null)'
    };
    var NAME$8 = 'backdrop';
    var CLASS_NAME_FADE$4 = 'fade';
    var CLASS_NAME_SHOW$5 = 'show';
    var EVENT_MOUSEDOWN = "mousedown.bs." + NAME$8;
    var Backdrop = /** @class */ (function () {
        function Backdrop(config) {
            this._config = this._getConfig(config);
            this._isAppended = false;
            this._element = null;
        }
        Backdrop.prototype.show = function (callback) {
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._append();
            if (this._config.isAnimated) {
                reflow(this._getElement());
            }
            this._getElement().classList.add(CLASS_NAME_SHOW$5);
            this._emulateAnimation(function () {
                execute(callback);
            });
        };
        Backdrop.prototype.hide = function (callback) {
            var _this = this;
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$5);
            this._emulateAnimation(function () {
                _this.dispose();
                execute(callback);
            });
        }; // Private
        Backdrop.prototype._getElement = function () {
            if (!this._element) {
                var backdrop = document.createElement('div');
                backdrop.className = this._config.className;
                if (this._config.isAnimated) {
                    backdrop.classList.add(CLASS_NAME_FADE$4);
                }
                this._element = backdrop;
            }
            return this._element;
        };
        Backdrop.prototype._getConfig = function (config) {
            config = __assign(__assign({}, Default$7), (typeof config === 'object' ? config : {})); // use getElement() with the default "body" to get a fresh Element on each instantiation
            config.rootElement = getElement(config.rootElement);
            typeCheckConfig(NAME$8, config, DefaultType$7);
            return config;
        };
        Backdrop.prototype._append = function () {
            var _this = this;
            if (this._isAppended) {
                return;
            }
            this._config.rootElement.append(this._getElement());
            EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, function () {
                execute(_this._config.clickCallback);
            });
            this._isAppended = true;
        };
        Backdrop.prototype.dispose = function () {
            if (!this._isAppended) {
                return;
            }
            EventHandler.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
        };
        Backdrop.prototype._emulateAnimation = function (callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        };
        return Backdrop;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/focustrap.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    var Default$6 = {
        trapElement: null,
        // The element to trap focus inside of
        autofocus: true
    };
    var DefaultType$6 = {
        trapElement: 'element',
        autofocus: 'boolean'
    };
    var NAME$7 = 'focustrap';
    var DATA_KEY$7 = 'bs.focustrap';
    var EVENT_KEY$7 = "." + DATA_KEY$7;
    var EVENT_FOCUSIN$1 = "focusin" + EVENT_KEY$7;
    var EVENT_KEYDOWN_TAB = "keydown.tab" + EVENT_KEY$7;
    var TAB_KEY = 'Tab';
    var TAB_NAV_FORWARD = 'forward';
    var TAB_NAV_BACKWARD = 'backward';
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(config) {
            this._config = this._getConfig(config);
            this._isActive = false;
            this._lastTabNavDirection = null;
        }
        FocusTrap.prototype.activate = function () {
            var _this = this;
            var _a = this._config, trapElement = _a.trapElement, autofocus = _a.autofocus;
            if (this._isActive) {
                return;
            }
            if (autofocus) {
                trapElement.focus();
            }
            EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop
            EventHandler.on(document, EVENT_FOCUSIN$1, function (event) { return _this._handleFocusin(event); });
            EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) { return _this._handleKeydown(event); });
            this._isActive = true;
        };
        FocusTrap.prototype.deactivate = function () {
            if (!this._isActive) {
                return;
            }
            this._isActive = false;
            EventHandler.off(document, EVENT_KEY$7);
        }; // Private
        FocusTrap.prototype._handleFocusin = function (event) {
            var target = event.target;
            var trapElement = this._config.trapElement;
            if (target === document || target === trapElement || trapElement.contains(target)) {
                return;
            }
            var elements = SelectorEngine.focusableChildren(trapElement);
            if (elements.length === 0) {
                trapElement.focus();
            }
            else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
                elements[elements.length - 1].focus();
            }
            else {
                elements[0].focus();
            }
        };
        FocusTrap.prototype._handleKeydown = function (event) {
            if (event.key !== TAB_KEY) {
                return;
            }
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        };
        FocusTrap.prototype._getConfig = function (config) {
            config = __assign(__assign({}, Default$6), (typeof config === 'object' ? config : {}));
            typeCheckConfig(NAME$7, config, DefaultType$6);
            return config;
        };
        return FocusTrap;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$6 = 'modal';
    var DATA_KEY$6 = 'bs.modal';
    var EVENT_KEY$6 = "." + DATA_KEY$6;
    var DATA_API_KEY$3 = '.data-api';
    var ESCAPE_KEY$1 = 'Escape';
    var Default$5 = {
        backdrop: true,
        keyboard: true,
        focus: true
    };
    var DefaultType$5 = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean'
    };
    var EVENT_HIDE$3 = "hide" + EVENT_KEY$6;
    var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$6;
    var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$6;
    var EVENT_SHOW$3 = "show" + EVENT_KEY$6;
    var EVENT_SHOWN$3 = "shown" + EVENT_KEY$6;
    var EVENT_RESIZE = "resize" + EVENT_KEY$6;
    var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$6;
    var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss" + EVENT_KEY$6;
    var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$6;
    var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$6;
    var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$6 + DATA_API_KEY$3;
    var CLASS_NAME_OPEN = 'modal-open';
    var CLASS_NAME_FADE$3 = 'fade';
    var CLASS_NAME_SHOW$4 = 'show';
    var CLASS_NAME_STATIC = 'modal-static';
    var SELECTOR_DIALOG = '.modal-dialog';
    var SELECTOR_MODAL_BODY = '.modal-body';
    var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(element, config) {
            var _this = _super.call(this, element) || this;
            _this._config = _this._getConfig(config);
            _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this._element);
            _this._backdrop = _this._initializeBackDrop();
            _this._focustrap = _this._initializeFocusTrap();
            _this._isShown = false;
            _this._ignoreBackdropClick = false;
            _this._isTransitioning = false;
            _this._scrollBar = new ScrollBarHelper();
            return _this;
        } // Getters
        Object.defineProperty(Modal, "Default", {
            get: function () {
                return Default$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal, "NAME", {
            get: function () {
                return NAME$6;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Modal.prototype.toggle = function (relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        Modal.prototype.show = function (relatedTarget) {
            var _this = this;
            if (this._isShown || this._isTransitioning) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
                relatedTarget: relatedTarget
            });
            if (showEvent.defaultPrevented) {
                return;
            }
            this._isShown = true;
            if (this._isAnimated()) {
                this._isTransitioning = true;
            }
            this._scrollBar.hide();
            document.body.classList.add(CLASS_NAME_OPEN);
            this._adjustDialog();
            this._setEscapeEvent();
            this._setResizeEvent();
            EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function () {
                EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function (event) {
                    if (event.target === _this._element) {
                        _this._ignoreBackdropClick = true;
                    }
                });
            });
            this._showBackdrop(function () { return _this._showElement(relatedTarget); });
        };
        Modal.prototype.hide = function () {
            var _this = this;
            if (!this._isShown || this._isTransitioning) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
            if (hideEvent.defaultPrevented) {
                return;
            }
            this._isShown = false;
            var isAnimated = this._isAnimated();
            if (isAnimated) {
                this._isTransitioning = true;
            }
            this._setEscapeEvent();
            this._setResizeEvent();
            this._focustrap.deactivate();
            this._element.classList.remove(CLASS_NAME_SHOW$4);
            EventHandler.off(this._element, EVENT_CLICK_DISMISS);
            EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
            this._queueCallback(function () { return _this._hideModal(); }, this._element, isAnimated);
        };
        Modal.prototype.dispose = function () {
            [window, this._dialog].forEach(function (htmlElement) { return EventHandler.off(htmlElement, EVENT_KEY$6); });
            this._backdrop.dispose();
            this._focustrap.deactivate();
            _super.prototype.dispose.call(this);
        };
        Modal.prototype.handleUpdate = function () {
            this._adjustDialog();
        }; // Private
        Modal.prototype._initializeBackDrop = function () {
            return new Backdrop({
                isVisible: Boolean(this._config.backdrop),
                // 'static' option will be translated to true, and booleans will keep their value
                isAnimated: this._isAnimated()
            });
        };
        Modal.prototype._initializeFocusTrap = function () {
            return new FocusTrap({
                trapElement: this._element
            });
        };
        Modal.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default$5), Manipulator.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
            typeCheckConfig(NAME$6, config, DefaultType$5);
            return config;
        };
        Modal.prototype._showElement = function (relatedTarget) {
            var _this = this;
            var isAnimated = this._isAnimated();
            var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                // Don't move modal's DOM position
                document.body.append(this._element);
            }
            this._element.style.display = 'block';
            this._element.removeAttribute('aria-hidden');
            this._element.setAttribute('aria-modal', true);
            this._element.setAttribute('role', 'dialog');
            this._element.scrollTop = 0;
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            if (isAnimated) {
                reflow(this._element);
            }
            this._element.classList.add(CLASS_NAME_SHOW$4);
            var transitionComplete = function () {
                if (_this._config.focus) {
                    _this._focustrap.activate();
                }
                _this._isTransitioning = false;
                EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
                    relatedTarget: relatedTarget
                });
            };
            this._queueCallback(transitionComplete, this._dialog, isAnimated);
        };
        Modal.prototype._setEscapeEvent = function () {
            var _this = this;
            if (this._isShown) {
                EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
                    if (_this._config.keyboard && event.key === ESCAPE_KEY$1) {
                        event.preventDefault();
                        _this.hide();
                    }
                    else if (!_this._config.keyboard && event.key === ESCAPE_KEY$1) {
                        _this._triggerBackdropTransition();
                    }
                });
            }
            else {
                EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
            }
        };
        Modal.prototype._setResizeEvent = function () {
            var _this = this;
            if (this._isShown) {
                EventHandler.on(window, EVENT_RESIZE, function () { return _this._adjustDialog(); });
            }
            else {
                EventHandler.off(window, EVENT_RESIZE);
            }
        };
        Modal.prototype._hideModal = function () {
            var _this = this;
            this._element.style.display = 'none';
            this._element.setAttribute('aria-hidden', true);
            this._element.removeAttribute('aria-modal');
            this._element.removeAttribute('role');
            this._isTransitioning = false;
            this._backdrop.hide(function () {
                document.body.classList.remove(CLASS_NAME_OPEN);
                _this._resetAdjustments();
                _this._scrollBar.reset();
                EventHandler.trigger(_this._element, EVENT_HIDDEN$3);
            });
        };
        Modal.prototype._showBackdrop = function (callback) {
            var _this = this;
            EventHandler.on(this._element, EVENT_CLICK_DISMISS, function (event) {
                if (_this._ignoreBackdropClick) {
                    _this._ignoreBackdropClick = false;
                    return;
                }
                if (event.target !== event.currentTarget) {
                    return;
                }
                if (_this._config.backdrop === true) {
                    _this.hide();
                }
                else if (_this._config.backdrop === 'static') {
                    _this._triggerBackdropTransition();
                }
            });
            this._backdrop.show(callback);
        };
        Modal.prototype._isAnimated = function () {
            return this._element.classList.contains(CLASS_NAME_FADE$3);
        };
        Modal.prototype._triggerBackdropTransition = function () {
            var _this = this;
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
            if (hideEvent.defaultPrevented) {
                return;
            }
            var _a = this._element, classList = _a.classList, scrollHeight = _a.scrollHeight, style = _a.style;
            var isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed
            if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
                return;
            }
            if (!isModalOverflowing) {
                style.overflowY = 'hidden';
            }
            classList.add(CLASS_NAME_STATIC);
            this._queueCallback(function () {
                classList.remove(CLASS_NAME_STATIC);
                if (!isModalOverflowing) {
                    _this._queueCallback(function () {
                        style.overflowY = '';
                    }, _this._dialog);
                }
            }, this._dialog);
            this._element.focus();
        }; // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // ----------------------------------------------------------------------
        Modal.prototype._adjustDialog = function () {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            var scrollbarWidth = this._scrollBar.getWidth();
            var isBodyOverflowing = scrollbarWidth > 0;
            if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
                this._element.style.paddingLeft = scrollbarWidth + "px";
            }
            if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
                this._element.style.paddingRight = scrollbarWidth + "px";
            }
        };
        Modal.prototype._resetAdjustments = function () {
            this._element.style.paddingLeft = '';
            this._element.style.paddingRight = '';
        }; // Static
        Modal.jQueryInterface = function (config, relatedTarget) {
            return this.each(function () {
                var data = Modal.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config](relatedTarget);
            });
        };
        return Modal;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
        var _this = this;
        var target = getElementFromSelector(this);
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        EventHandler.one(target, EVENT_SHOW$3, function (showEvent) {
            if (showEvent.defaultPrevented) {
                // only register focus restorer if modal will actually get shown
                return;
            }
            EventHandler.one(target, EVENT_HIDDEN$3, function () {
                if (isVisible(_this)) {
                    _this.focus();
                }
            });
        });
        var data = Modal.getOrCreateInstance(target);
        data.toggle(this);
    });
    enableDismissTrigger(Modal);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Modal to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Modal);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): offcanvas.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$5 = 'offcanvas';
    var DATA_KEY$5 = 'bs.offcanvas';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$2 = '.data-api';
    var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$5 + DATA_API_KEY$2;
    var ESCAPE_KEY = 'Escape';
    var Default$4 = {
        backdrop: true,
        keyboard: true,
        scroll: false
    };
    var DefaultType$4 = {
        backdrop: 'boolean',
        keyboard: 'boolean',
        scroll: 'boolean'
    };
    var CLASS_NAME_SHOW$3 = 'show';
    var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
    var OPEN_SELECTOR = '.offcanvas.show';
    var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
    var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
    var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
    var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
    var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$5 + DATA_API_KEY$2;
    var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
    var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Offcanvas = /** @class */ (function (_super) {
        __extends(Offcanvas, _super);
        function Offcanvas(element, config) {
            var _this = _super.call(this, element) || this;
            _this._config = _this._getConfig(config);
            _this._isShown = false;
            _this._backdrop = _this._initializeBackDrop();
            _this._focustrap = _this._initializeFocusTrap();
            _this._addEventListeners();
            return _this;
        } // Getters
        Object.defineProperty(Offcanvas, "NAME", {
            get: function () {
                return NAME$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Offcanvas, "Default", {
            get: function () {
                return Default$4;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Offcanvas.prototype.toggle = function (relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        Offcanvas.prototype.show = function (relatedTarget) {
            var _this = this;
            if (this._isShown) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
                relatedTarget: relatedTarget
            });
            if (showEvent.defaultPrevented) {
                return;
            }
            this._isShown = true;
            this._element.style.visibility = 'visible';
            this._backdrop.show();
            if (!this._config.scroll) {
                new ScrollBarHelper().hide();
            }
            this._element.removeAttribute('aria-hidden');
            this._element.setAttribute('aria-modal', true);
            this._element.setAttribute('role', 'dialog');
            this._element.classList.add(CLASS_NAME_SHOW$3);
            var completeCallBack = function () {
                if (!_this._config.scroll) {
                    _this._focustrap.activate();
                }
                EventHandler.trigger(_this._element, EVENT_SHOWN$2, {
                    relatedTarget: relatedTarget
                });
            };
            this._queueCallback(completeCallBack, this._element, true);
        };
        Offcanvas.prototype.hide = function () {
            var _this = this;
            if (!this._isShown) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
            if (hideEvent.defaultPrevented) {
                return;
            }
            this._focustrap.deactivate();
            this._element.blur();
            this._isShown = false;
            this._element.classList.remove(CLASS_NAME_SHOW$3);
            this._backdrop.hide();
            var completeCallback = function () {
                _this._element.setAttribute('aria-hidden', true);
                _this._element.removeAttribute('aria-modal');
                _this._element.removeAttribute('role');
                _this._element.style.visibility = 'hidden';
                if (!_this._config.scroll) {
                    new ScrollBarHelper().reset();
                }
                EventHandler.trigger(_this._element, EVENT_HIDDEN$2);
            };
            this._queueCallback(completeCallback, this._element, true);
        };
        Offcanvas.prototype.dispose = function () {
            this._backdrop.dispose();
            this._focustrap.deactivate();
            _super.prototype.dispose.call(this);
        }; // Private
        Offcanvas.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default$4), Manipulator.getDataAttributes(this._element)), (typeof config === 'object' ? config : {}));
            typeCheckConfig(NAME$5, config, DefaultType$4);
            return config;
        };
        Offcanvas.prototype._initializeBackDrop = function () {
            var _this = this;
            return new Backdrop({
                className: CLASS_NAME_BACKDROP,
                isVisible: this._config.backdrop,
                isAnimated: true,
                rootElement: this._element.parentNode,
                clickCallback: function () { return _this.hide(); }
            });
        };
        Offcanvas.prototype._initializeFocusTrap = function () {
            return new FocusTrap({
                trapElement: this._element
            });
        };
        Offcanvas.prototype._addEventListeners = function () {
            var _this = this;
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
                if (_this._config.keyboard && event.key === ESCAPE_KEY) {
                    _this.hide();
                }
            });
        }; // Static
        Offcanvas.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Offcanvas.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config](this);
            });
        };
        return Offcanvas;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
        var _this = this;
        var target = getElementFromSelector(this);
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        if (isDisabled(this)) {
            return;
        }
        EventHandler.one(target, EVENT_HIDDEN$2, function () {
            // focus on trigger when it is closed
            if (isVisible(_this)) {
                _this.focus();
            }
        }); // avoid conflict when clicking a toggler of an offcanvas, while another is open
        var allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
        if (allReadyOpen && allReadyOpen !== target) {
            Offcanvas.getInstance(allReadyOpen).hide();
        }
        var data = Offcanvas.getOrCreateInstance(target);
        data.toggle(this);
    });
    EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () { return SelectorEngine.find(OPEN_SELECTOR).forEach(function (el) { return Offcanvas.getOrCreateInstance(el).show(); }); });
    enableDismissTrigger(Offcanvas);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    defineJQueryPlugin(Offcanvas);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): util/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */
    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    var allowedAttribute = function (attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();
        if (allowedAttributeList.includes(attrName)) {
            if (uriAttrs.has(attrName)) {
                return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
            }
            return true;
        }
        var regExp = allowedAttributeList.filter(function (attrRegex) { return attrRegex instanceof RegExp; }); // Check if a regular expression validates the attribute.
        for (var i = 0, len = regExp.length; i < len; i++) {
            if (regExp[i].test(attrName)) {
                return true;
            }
        }
        return false;
    };
    var DefaultAllowlist = {
        // Global attributes allowed on any supplied element below.
        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };
    function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
        if (!unsafeHtml.length) {
            return unsafeHtml;
        }
        if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml);
        }
        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
        var allowlistKeys = Object.keys(allowList);
        var elements = [].concat.apply([], createdDocument.body.querySelectorAll('*'));
        var _loop_1 = function (i, len) {
            var el = elements[i];
            var elName = el.nodeName.toLowerCase();
            if (!allowlistKeys.includes(elName)) {
                el.remove();
                return "continue";
            }
            var attributeList = [].concat.apply([], el.attributes);
            var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
            attributeList.forEach(function (attr) {
                if (!allowedAttribute(attr, allowedAttributes)) {
                    el.removeAttribute(attr.nodeName);
                }
            });
        };
        for (var i = 0, len = elements.length; i < len; i++) {
            _loop_1(i, len);
        }
        return createdDocument.body.innerHTML;
    }
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$4 = 'tooltip';
    var DATA_KEY$4 = 'bs.tooltip';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var CLASS_PREFIX$1 = 'bs-tooltip';
    var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
    var DefaultType$3 = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(array|string|function)',
        container: '(string|element|boolean)',
        fallbackPlacements: 'array',
        boundary: '(string|element)',
        customClass: '(string|function)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        allowList: 'object',
        popperConfig: '(null|object|function)'
    };
    var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: isRTL() ? 'left' : 'right',
        BOTTOM: 'bottom',
        LEFT: isRTL() ? 'right' : 'left'
    };
    var Default$3 = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: [0, 0],
        container: false,
        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        boundary: 'clippingParents',
        customClass: '',
        sanitize: true,
        sanitizeFn: null,
        allowList: DefaultAllowlist,
        popperConfig: null
    };
    var Event$2 = {
        HIDE: "hide" + EVENT_KEY$4,
        HIDDEN: "hidden" + EVENT_KEY$4,
        SHOW: "show" + EVENT_KEY$4,
        SHOWN: "shown" + EVENT_KEY$4,
        INSERTED: "inserted" + EVENT_KEY$4,
        CLICK: "click" + EVENT_KEY$4,
        FOCUSIN: "focusin" + EVENT_KEY$4,
        FOCUSOUT: "focusout" + EVENT_KEY$4,
        MOUSEENTER: "mouseenter" + EVENT_KEY$4,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$4
    };
    var CLASS_NAME_FADE$2 = 'fade';
    var CLASS_NAME_MODAL = 'modal';
    var CLASS_NAME_SHOW$2 = 'show';
    var HOVER_STATE_SHOW = 'show';
    var HOVER_STATE_OUT = 'out';
    var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    var SELECTOR_MODAL = "." + CLASS_NAME_MODAL;
    var EVENT_MODAL_HIDE = 'hide.bs.modal';
    var TRIGGER_HOVER = 'hover';
    var TRIGGER_FOCUS = 'focus';
    var TRIGGER_CLICK = 'click';
    var TRIGGER_MANUAL = 'manual';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Tooltip = /** @class */ (function (_super) {
        __extends(Tooltip, _super);
        function Tooltip(element, config) {
            var _this = this;
            if (typeof Popper__namespace === 'undefined') {
                throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
            }
            _this = _super.call(this, element) || this; // private
            _this._isEnabled = true;
            _this._timeout = 0;
            _this._hoverState = '';
            _this._activeTrigger = {};
            _this._popper = null; // Protected
            _this._config = _this._getConfig(config);
            _this.tip = null;
            _this._setListeners();
            return _this;
        } // Getters
        Object.defineProperty(Tooltip, "Default", {
            get: function () {
                return Default$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tooltip, "NAME", {
            get: function () {
                return NAME$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tooltip, "Event", {
            get: function () {
                return Event$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tooltip, "DefaultType", {
            get: function () {
                return DefaultType$3;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Tooltip.prototype.enable = function () {
            this._isEnabled = true;
        };
        Tooltip.prototype.disable = function () {
            this._isEnabled = false;
        };
        Tooltip.prototype.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
        };
        Tooltip.prototype.toggle = function (event) {
            if (!this._isEnabled) {
                return;
            }
            if (event) {
                var context = this._initializeOnDelegatedTarget(event);
                context._activeTrigger.click = !context._activeTrigger.click;
                if (context._isWithActiveTrigger()) {
                    context._enter(null, context);
                }
                else {
                    context._leave(null, context);
                }
            }
            else {
                if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
                    this._leave(null, this);
                    return;
                }
                this._enter(null, this);
            }
        };
        Tooltip.prototype.dispose = function () {
            clearTimeout(this._timeout);
            EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this.tip) {
                this.tip.remove();
            }
            if (this._popper) {
                this._popper.destroy();
            }
            _super.prototype.dispose.call(this);
        };
        Tooltip.prototype.show = function () {
            var _a;
            var _this = this;
            if (this._element.style.display === 'none') {
                throw new Error('Please use show on visible elements');
            }
            if (!(this.isWithContent() && this._isEnabled)) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
            var shadowRoot = findShadowRoot(this._element);
            var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
            if (showEvent.defaultPrevented || !isInTheDom) {
                return;
            }
            var tip = this.getTipElement();
            var tipId = getUID(this.constructor.NAME);
            tip.setAttribute('id', tipId);
            this._element.setAttribute('aria-describedby', tipId);
            if (this._config.animation) {
                tip.classList.add(CLASS_NAME_FADE$2);
            }
            var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
            var attachment = this._getAttachment(placement);
            this._addAttachmentClass(attachment);
            var container = this._config.container;
            Data.set(tip, this.constructor.DATA_KEY, this);
            if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
                container.append(tip);
                EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
            }
            if (this._popper) {
                this._popper.update();
            }
            else {
                this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
            }
            tip.classList.add(CLASS_NAME_SHOW$2);
            var customClass = this._resolvePossibleFunction(this._config.customClass);
            if (customClass) {
                (_a = tip.classList).add.apply(_a, customClass.split(' '));
            } // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement) {
                [].concat.apply([], document.body.children).forEach(function (element) {
                    EventHandler.on(element, 'mouseover', noop);
                });
            }
            var complete = function () {
                var prevHoverState = _this._hoverState;
                _this._hoverState = null;
                EventHandler.trigger(_this._element, _this.constructor.Event.SHOWN);
                if (prevHoverState === HOVER_STATE_OUT) {
                    _this._leave(null, _this);
                }
            };
            var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
            this._queueCallback(complete, this.tip, isAnimated);
        };
        Tooltip.prototype.hide = function () {
            var _this = this;
            if (!this._popper) {
                return;
            }
            var tip = this.getTipElement();
            var complete = function () {
                if (_this._isWithActiveTrigger()) {
                    return;
                }
                if (_this._hoverState !== HOVER_STATE_SHOW) {
                    tip.remove();
                }
                _this._cleanTipClass();
                _this._element.removeAttribute('aria-describedby');
                EventHandler.trigger(_this._element, _this.constructor.Event.HIDDEN);
                if (_this._popper) {
                    _this._popper.destroy();
                    _this._popper = null;
                }
            };
            var hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);
            if (hideEvent.defaultPrevented) {
                return;
            }
            tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                [].concat.apply([], document.body.children).forEach(function (element) { return EventHandler.off(element, 'mouseover', noop); });
            }
            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;
            var isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);
            this._queueCallback(complete, this.tip, isAnimated);
            this._hoverState = '';
        };
        Tooltip.prototype.update = function () {
            if (this._popper !== null) {
                this._popper.update();
            }
        }; // Protected
        Tooltip.prototype.isWithContent = function () {
            return Boolean(this.getTitle());
        };
        Tooltip.prototype.getTipElement = function () {
            if (this.tip) {
                return this.tip;
            }
            var element = document.createElement('div');
            element.innerHTML = this._config.template;
            var tip = element.children[0];
            this.setContent(tip);
            tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
            this.tip = tip;
            return this.tip;
        };
        Tooltip.prototype.setContent = function (tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
        };
        Tooltip.prototype._sanitizeAndSetContent = function (template, content, selector) {
            var templateElement = SelectorEngine.findOne(selector, template);
            if (!content && templateElement) {
                templateElement.remove();
                return;
            } // we use append for html objects to maintain js events
            this.setElementContent(templateElement, content);
        };
        Tooltip.prototype.setElementContent = function (element, content) {
            if (element === null) {
                return;
            }
            if (isElement(content)) {
                content = getElement(content); // content is a DOM node or a jQuery
                if (this._config.html) {
                    if (content.parentNode !== element) {
                        element.innerHTML = '';
                        element.append(content);
                    }
                }
                else {
                    element.textContent = content.textContent;
                }
                return;
            }
            if (this._config.html) {
                if (this._config.sanitize) {
                    content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
                }
                element.innerHTML = content;
            }
            else {
                element.textContent = content;
            }
        };
        Tooltip.prototype.getTitle = function () {
            var title = this._element.getAttribute('data-bs-original-title') || this._config.title;
            return this._resolvePossibleFunction(title);
        };
        Tooltip.prototype.updateAttachment = function (attachment) {
            if (attachment === 'right') {
                return 'end';
            }
            if (attachment === 'left') {
                return 'start';
            }
            return attachment;
        }; // Private
        Tooltip.prototype._initializeOnDelegatedTarget = function (event, context) {
            return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
        };
        Tooltip.prototype._getOffset = function () {
            var _this = this;
            var offset = this._config.offset;
            if (typeof offset === 'string') {
                return offset.split(',').map(function (val) { return Number.parseInt(val, 10); });
            }
            if (typeof offset === 'function') {
                return function (popperData) { return offset(popperData, _this._element); };
            }
            return offset;
        };
        Tooltip.prototype._resolvePossibleFunction = function (content) {
            return typeof content === 'function' ? content.call(this._element) : content;
        };
        Tooltip.prototype._getPopperConfig = function (attachment) {
            var _this = this;
            var defaultBsPopperConfig = {
                placement: attachment,
                modifiers: [{
                        name: 'flip',
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements
                        }
                    }, {
                        name: 'offset',
                        options: {
                            offset: this._getOffset()
                        }
                    }, {
                        name: 'preventOverflow',
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: 'arrow',
                        options: {
                            element: "." + this.constructor.NAME + "-arrow"
                        }
                    }, {
                        name: 'onChange',
                        enabled: true,
                        phase: 'afterWrite',
                        fn: function (data) { return _this._handlePopperPlacementChange(data); }
                    }],
                onFirstUpdate: function (data) {
                    if (data.options.placement !== data.placement) {
                        _this._handlePopperPlacementChange(data);
                    }
                }
            };
            return __assign(__assign({}, defaultBsPopperConfig), (typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig));
        };
        Tooltip.prototype._addAttachmentClass = function (attachment) {
            this.getTipElement().classList.add(this._getBasicClassPrefix() + "-" + this.updateAttachment(attachment));
        };
        Tooltip.prototype._getAttachment = function (placement) {
            return AttachmentMap[placement.toUpperCase()];
        };
        Tooltip.prototype._setListeners = function () {
            var _this = this;
            var triggers = this._config.trigger.split(' ');
            triggers.forEach(function (trigger) {
                if (trigger === 'click') {
                    EventHandler.on(_this._element, _this.constructor.Event.CLICK, _this._config.selector, function (event) { return _this.toggle(event); });
                }
                else if (trigger !== TRIGGER_MANUAL) {
                    var eventIn = trigger === TRIGGER_HOVER ? _this.constructor.Event.MOUSEENTER : _this.constructor.Event.FOCUSIN;
                    var eventOut = trigger === TRIGGER_HOVER ? _this.constructor.Event.MOUSELEAVE : _this.constructor.Event.FOCUSOUT;
                    EventHandler.on(_this._element, eventIn, _this._config.selector, function (event) { return _this._enter(event); });
                    EventHandler.on(_this._element, eventOut, _this._config.selector, function (event) { return _this._leave(event); });
                }
            });
            this._hideModalHandler = function () {
                if (_this._element) {
                    _this.hide();
                }
            };
            EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this._config.selector) {
                this._config = __assign(__assign({}, this._config), { trigger: 'manual', selector: '' });
            }
            else {
                this._fixTitle();
            }
        };
        Tooltip.prototype._fixTitle = function () {
            var title = this._element.getAttribute('title');
            var originalTitleType = typeof this._element.getAttribute('data-bs-original-title');
            if (title || originalTitleType !== 'string') {
                this._element.setAttribute('data-bs-original-title', title || '');
                if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
                    this._element.setAttribute('aria-label', title);
                }
                this._element.setAttribute('title', '');
            }
        };
        Tooltip.prototype._enter = function (event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
                context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            }
            if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
                context._hoverState = HOVER_STATE_SHOW;
                return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_SHOW;
            if (!context._config.delay || !context._config.delay.show) {
                context.show();
                return;
            }
            context._timeout = setTimeout(function () {
                if (context._hoverState === HOVER_STATE_SHOW) {
                    context.show();
                }
            }, context._config.delay.show);
        };
        Tooltip.prototype._leave = function (event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
                context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            }
            if (context._isWithActiveTrigger()) {
                return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_OUT;
            if (!context._config.delay || !context._config.delay.hide) {
                context.hide();
                return;
            }
            context._timeout = setTimeout(function () {
                if (context._hoverState === HOVER_STATE_OUT) {
                    context.hide();
                }
            }, context._config.delay.hide);
        };
        Tooltip.prototype._isWithActiveTrigger = function () {
            for (var trigger in this._activeTrigger) {
                if (this._activeTrigger[trigger]) {
                    return true;
                }
            }
            return false;
        };
        Tooltip.prototype._getConfig = function (config) {
            var dataAttributes = Manipulator.getDataAttributes(this._element);
            Object.keys(dataAttributes).forEach(function (dataAttr) {
                if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
                    delete dataAttributes[dataAttr];
                }
            });
            config = __assign(__assign(__assign({}, this.constructor.Default), dataAttributes), (typeof config === 'object' && config ? config : {}));
            config.container = config.container === false ? document.body : getElement(config.container);
            if (typeof config.delay === 'number') {
                config.delay = {
                    show: config.delay,
                    hide: config.delay
                };
            }
            if (typeof config.title === 'number') {
                config.title = config.title.toString();
            }
            if (typeof config.content === 'number') {
                config.content = config.content.toString();
            }
            typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
            if (config.sanitize) {
                config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
            }
            return config;
        };
        Tooltip.prototype._getDelegateConfig = function () {
            var config = {};
            for (var key in this._config) {
                if (this.constructor.Default[key] !== this._config[key]) {
                    config[key] = this._config[key];
                }
            } // In the future can be replaced with:
            // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
            // `Object.fromEntries(keysWithDifferentValues)`
            return config;
        };
        Tooltip.prototype._cleanTipClass = function () {
            var tip = this.getTipElement();
            var basicClassPrefixRegex = new RegExp("(^|\\s)" + this._getBasicClassPrefix() + "\\S+", 'g');
            var tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);
            if (tabClass !== null && tabClass.length > 0) {
                tabClass.map(function (token) { return token.trim(); }).forEach(function (tClass) { return tip.classList.remove(tClass); });
            }
        };
        Tooltip.prototype._getBasicClassPrefix = function () {
            return CLASS_PREFIX$1;
        };
        Tooltip.prototype._handlePopperPlacementChange = function (popperData) {
            var state = popperData.state;
            if (!state) {
                return;
            }
            this.tip = state.elements.popper;
            this._cleanTipClass();
            this._addAttachmentClass(this._getAttachment(state.placement));
        }; // Static
        Tooltip.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Tooltip.getOrCreateInstance(this, config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        return Tooltip;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Tooltip to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Tooltip);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$3 = 'popover';
    var DATA_KEY$3 = 'bs.popover';
    var EVENT_KEY$3 = "." + DATA_KEY$3;
    var CLASS_PREFIX = 'bs-popover';
    var Default$2 = __assign(__assign({}, Tooltip.Default), { placement: 'right', offset: [0, 8], trigger: 'click', content: '', template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>' });
    var DefaultType$2 = __assign(__assign({}, Tooltip.DefaultType), { content: '(string|element|function)' });
    var Event$1 = {
        HIDE: "hide" + EVENT_KEY$3,
        HIDDEN: "hidden" + EVENT_KEY$3,
        SHOW: "show" + EVENT_KEY$3,
        SHOWN: "shown" + EVENT_KEY$3,
        INSERTED: "inserted" + EVENT_KEY$3,
        CLICK: "click" + EVENT_KEY$3,
        FOCUSIN: "focusin" + EVENT_KEY$3,
        FOCUSOUT: "focusout" + EVENT_KEY$3,
        MOUSEENTER: "mouseenter" + EVENT_KEY$3,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$3
    };
    var SELECTOR_TITLE = '.popover-header';
    var SELECTOR_CONTENT = '.popover-body';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Popover = /** @class */ (function (_super) {
        __extends(Popover, _super);
        function Popover() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Popover, "Default", {
            // Getters
            get: function () {
                return Default$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Popover, "NAME", {
            get: function () {
                return NAME$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Popover, "Event", {
            get: function () {
                return Event$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Popover, "DefaultType", {
            get: function () {
                return DefaultType$2;
            } // Overrides
            ,
            enumerable: false,
            configurable: true
        });
        Popover.prototype.isWithContent = function () {
            return this.getTitle() || this._getContent();
        };
        Popover.prototype.setContent = function (tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
            this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
        }; // Private
        Popover.prototype._getContent = function () {
            return this._resolvePossibleFunction(this._config.content);
        };
        Popover.prototype._getBasicClassPrefix = function () {
            return CLASS_PREFIX;
        }; // Static
        Popover.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Popover.getOrCreateInstance(this, config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        return Popover;
    }(Tooltip));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Popover to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Popover);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$2 = 'scrollspy';
    var DATA_KEY$2 = 'bs.scrollspy';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$1 = '.data-api';
    var Default$1 = {
        offset: 10,
        method: 'auto',
        target: ''
    };
    var DefaultType$1 = {
        offset: 'number',
        method: 'string',
        target: '(string|element)'
    };
    var EVENT_ACTIVATE = "activate" + EVENT_KEY$2;
    var EVENT_SCROLL = "scroll" + EVENT_KEY$2;
    var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$1;
    var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
    var CLASS_NAME_ACTIVE$1 = 'active';
    var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
    var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
    var SELECTOR_NAV_LINKS = '.nav-link';
    var SELECTOR_NAV_ITEMS = '.nav-item';
    var SELECTOR_LIST_ITEMS = '.list-group-item';
    var SELECTOR_LINK_ITEMS = SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS + ", ." + CLASS_NAME_DROPDOWN_ITEM;
    var SELECTOR_DROPDOWN$1 = '.dropdown';
    var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
    var METHOD_OFFSET = 'offset';
    var METHOD_POSITION = 'position';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var ScrollSpy = /** @class */ (function (_super) {
        __extends(ScrollSpy, _super);
        function ScrollSpy(element, config) {
            var _this = _super.call(this, element) || this;
            _this._scrollElement = _this._element.tagName === 'BODY' ? window : _this._element;
            _this._config = _this._getConfig(config);
            _this._offsets = [];
            _this._targets = [];
            _this._activeTarget = null;
            _this._scrollHeight = 0;
            EventHandler.on(_this._scrollElement, EVENT_SCROLL, function () { return _this._process(); });
            _this.refresh();
            _this._process();
            return _this;
        } // Getters
        Object.defineProperty(ScrollSpy, "Default", {
            get: function () {
                return Default$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScrollSpy, "NAME", {
            get: function () {
                return NAME$2;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        ScrollSpy.prototype.refresh = function () {
            var _this = this;
            var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
            var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
            var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = this._getScrollHeight();
            var targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
            targets.map(function (element) {
                var targetSelector = getSelectorFromElement(element);
                var target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;
                if (target) {
                    var targetBCR = target.getBoundingClientRect();
                    if (targetBCR.width || targetBCR.height) {
                        return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
                    }
                }
                return null;
            }).filter(function (item) { return item; }).sort(function (a, b) { return a[0] - b[0]; }).forEach(function (item) {
                _this._offsets.push(item[0]);
                _this._targets.push(item[1]);
            });
        };
        ScrollSpy.prototype.dispose = function () {
            EventHandler.off(this._scrollElement, EVENT_KEY$2);
            _super.prototype.dispose.call(this);
        }; // Private
        ScrollSpy.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default$1), Manipulator.getDataAttributes(this._element)), (typeof config === 'object' && config ? config : {}));
            config.target = getElement(config.target) || document.documentElement;
            typeCheckConfig(NAME$2, config, DefaultType$1);
            return config;
        };
        ScrollSpy.prototype._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        };
        ScrollSpy.prototype._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };
        ScrollSpy.prototype._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        };
        ScrollSpy.prototype._process = function () {
            var scrollTop = this._getScrollTop() + this._config.offset;
            var scrollHeight = this._getScrollHeight();
            var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
            if (this._scrollHeight !== scrollHeight) {
                this.refresh();
            }
            if (scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];
                if (this._activeTarget !== target) {
                    this._activate(target);
                }
                return;
            }
            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                this._activeTarget = null;
                this._clear();
                return;
            }
            for (var i = this._offsets.length; i--;) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
                if (isActiveTarget) {
                    this._activate(this._targets[i]);
                }
            }
        };
        ScrollSpy.prototype._activate = function (target) {
            this._activeTarget = target;
            this._clear();
            var queries = SELECTOR_LINK_ITEMS.split(',').map(function (selector) { return selector + "[data-bs-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]"; });
            var link = SelectorEngine.findOne(queries.join(','), this._config.target);
            link.classList.add(CLASS_NAME_ACTIVE$1);
            if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
                SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
            }
            else {
                SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(function (listGroup) {
                    // Set triggered links parents as active
                    // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
                    SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function (item) { return item.classList.add(CLASS_NAME_ACTIVE$1); }); // Handle special case when .nav-link is inside .nav-item
                    SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function (navItem) {
                        SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function (item) { return item.classList.add(CLASS_NAME_ACTIVE$1); });
                    });
                });
            }
            EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
                relatedTarget: target
            });
        };
        ScrollSpy.prototype._clear = function () {
            SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(function (node) { return node.classList.contains(CLASS_NAME_ACTIVE$1); }).forEach(function (node) { return node.classList.remove(CLASS_NAME_ACTIVE$1); });
        }; // Static
        ScrollSpy.jQueryInterface = function (config) {
            return this.each(function () {
                var data = ScrollSpy.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config]();
            });
        };
        return ScrollSpy;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
        SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function (spy) { return new ScrollSpy(spy); });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .ScrollSpy to jQuery only if jQuery is present
     */
    defineJQueryPlugin(ScrollSpy);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME$1 = 'tab';
    var DATA_KEY$1 = 'bs.tab';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY = '.data-api';
    var EVENT_HIDE$1 = "hide" + EVENT_KEY$1;
    var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$1;
    var EVENT_SHOW$1 = "show" + EVENT_KEY$1;
    var EVENT_SHOWN$1 = "shown" + EVENT_KEY$1;
    var EVENT_CLICK_DATA_API = "click" + EVENT_KEY$1 + DATA_API_KEY;
    var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
    var CLASS_NAME_ACTIVE = 'active';
    var CLASS_NAME_FADE$1 = 'fade';
    var CLASS_NAME_SHOW$1 = 'show';
    var SELECTOR_DROPDOWN = '.dropdown';
    var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
    var SELECTOR_ACTIVE = '.active';
    var SELECTOR_ACTIVE_UL = ':scope > li > .active';
    var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
    var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
    var SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Tab = /** @class */ (function (_super) {
        __extends(Tab, _super);
        function Tab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Tab, "NAME", {
            // Getters
            get: function () {
                return NAME$1;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Tab.prototype.show = function () {
            var _this = this;
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
                return;
            }
            var previous;
            var target = getElementFromSelector(this._element);
            var listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
            if (listElement) {
                var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
                previous = SelectorEngine.find(itemSelector, listElement);
                previous = previous[previous.length - 1];
            }
            var hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
                relatedTarget: this._element
            }) : null;
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
                relatedTarget: previous
            });
            if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
                return;
            }
            this._activate(this._element, listElement);
            var complete = function () {
                EventHandler.trigger(previous, EVENT_HIDDEN$1, {
                    relatedTarget: _this._element
                });
                EventHandler.trigger(_this._element, EVENT_SHOWN$1, {
                    relatedTarget: previous
                });
            };
            if (target) {
                this._activate(target, target.parentNode, complete);
            }
            else {
                complete();
            }
        }; // Private
        Tab.prototype._activate = function (element, container, callback) {
            var _this = this;
            var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
            var active = activeElements[0];
            var isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);
            var complete = function () { return _this._transitionComplete(element, active, callback); };
            if (active && isTransitioning) {
                active.classList.remove(CLASS_NAME_SHOW$1);
                this._queueCallback(complete, element, true);
            }
            else {
                complete();
            }
        };
        Tab.prototype._transitionComplete = function (element, active, callback) {
            if (active) {
                active.classList.remove(CLASS_NAME_ACTIVE);
                var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
                if (dropdownChild) {
                    dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
                }
                if (active.getAttribute('role') === 'tab') {
                    active.setAttribute('aria-selected', false);
                }
            }
            element.classList.add(CLASS_NAME_ACTIVE);
            if (element.getAttribute('role') === 'tab') {
                element.setAttribute('aria-selected', true);
            }
            reflow(element);
            if (element.classList.contains(CLASS_NAME_FADE$1)) {
                element.classList.add(CLASS_NAME_SHOW$1);
            }
            var parent = element.parentNode;
            if (parent && parent.nodeName === 'LI') {
                parent = parent.parentNode;
            }
            if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
                var dropdownElement = element.closest(SELECTOR_DROPDOWN);
                if (dropdownElement) {
                    SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(function (dropdown) { return dropdown.classList.add(CLASS_NAME_ACTIVE); });
                }
                element.setAttribute('aria-expanded', true);
            }
            if (callback) {
                callback();
            }
        }; // Static
        Tab.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Tab.getOrCreateInstance(this);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        return Tab;
    }(BaseComponent));
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        if (isDisabled(this)) {
            return;
        }
        var data = Tab.getOrCreateInstance(this);
        data.show();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Tab to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Tab);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): toast.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'toast';
    var DATA_KEY = 'bs.toast';
    var EVENT_KEY = "." + DATA_KEY;
    var EVENT_MOUSEOVER = "mouseover" + EVENT_KEY;
    var EVENT_MOUSEOUT = "mouseout" + EVENT_KEY;
    var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
    var EVENT_FOCUSOUT = "focusout" + EVENT_KEY;
    var EVENT_HIDE = "hide" + EVENT_KEY;
    var EVENT_HIDDEN = "hidden" + EVENT_KEY;
    var EVENT_SHOW = "show" + EVENT_KEY;
    var EVENT_SHOWN = "shown" + EVENT_KEY;
    var CLASS_NAME_FADE = 'fade';
    var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
    var CLASS_NAME_SHOW = 'show';
    var CLASS_NAME_SHOWING = 'showing';
    var DefaultType = {
        animation: 'boolean',
        autohide: 'boolean',
        delay: 'number'
    };
    var Default = {
        animation: true,
        autohide: true,
        delay: 5000
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Toast = /** @class */ (function (_super) {
        __extends(Toast, _super);
        function Toast(element, config) {
            var _this = _super.call(this, element) || this;
            _this._config = _this._getConfig(config);
            _this._timeout = null;
            _this._hasMouseInteraction = false;
            _this._hasKeyboardInteraction = false;
            _this._setListeners();
            return _this;
        } // Getters
        Object.defineProperty(Toast, "DefaultType", {
            get: function () {
                return DefaultType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Toast, "Default", {
            get: function () {
                return Default;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Toast, "NAME", {
            get: function () {
                return NAME;
            } // Public
            ,
            enumerable: false,
            configurable: true
        });
        Toast.prototype.show = function () {
            var _this = this;
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
            if (showEvent.defaultPrevented) {
                return;
            }
            this._clearTimeout();
            if (this._config.animation) {
                this._element.classList.add(CLASS_NAME_FADE);
            }
            var complete = function () {
                _this._element.classList.remove(CLASS_NAME_SHOWING);
                EventHandler.trigger(_this._element, EVENT_SHOWN);
                _this._maybeScheduleHide();
            };
            this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW);
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        };
        Toast.prototype.hide = function () {
            var _this = this;
            if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
                return;
            }
            var complete = function () {
                _this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
                _this._element.classList.remove(CLASS_NAME_SHOWING);
                _this._element.classList.remove(CLASS_NAME_SHOW);
                EventHandler.trigger(_this._element, EVENT_HIDDEN);
            };
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        };
        Toast.prototype.dispose = function () {
            this._clearTimeout();
            if (this._element.classList.contains(CLASS_NAME_SHOW)) {
                this._element.classList.remove(CLASS_NAME_SHOW);
            }
            _super.prototype.dispose.call(this);
        }; // Private
        Toast.prototype._getConfig = function (config) {
            config = __assign(__assign(__assign({}, Default), Manipulator.getDataAttributes(this._element)), (typeof config === 'object' && config ? config : {}));
            typeCheckConfig(NAME, config, this.constructor.DefaultType);
            return config;
        };
        Toast.prototype._maybeScheduleHide = function () {
            var _this = this;
            if (!this._config.autohide) {
                return;
            }
            if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
                return;
            }
            this._timeout = setTimeout(function () {
                _this.hide();
            }, this._config.delay);
        };
        Toast.prototype._onInteraction = function (event, isInteracting) {
            switch (event.type) {
                case 'mouseover':
                case 'mouseout':
                    this._hasMouseInteraction = isInteracting;
                    break;
                case 'focusin':
                case 'focusout':
                    this._hasKeyboardInteraction = isInteracting;
                    break;
            }
            if (isInteracting) {
                this._clearTimeout();
                return;
            }
            var nextElement = event.relatedTarget;
            if (this._element === nextElement || this._element.contains(nextElement)) {
                return;
            }
            this._maybeScheduleHide();
        };
        Toast.prototype._setListeners = function () {
            var _this = this;
            EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) { return _this._onInteraction(event, true); });
            EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) { return _this._onInteraction(event, false); });
            EventHandler.on(this._element, EVENT_FOCUSIN, function (event) { return _this._onInteraction(event, true); });
            EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) { return _this._onInteraction(event, false); });
        };
        Toast.prototype._clearTimeout = function () {
            clearTimeout(this._timeout);
            this._timeout = null;
        }; // Static
        Toast.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Toast.getOrCreateInstance(this, config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config](this);
                }
            });
        };
        return Toast;
    }(BaseComponent));
    enableDismissTrigger(Toast);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     * add .Toast to jQuery only if jQuery is present
     */
    defineJQueryPlugin(Toast);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v5.1.0): index.umd.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var index_umd = {
        Alert: Alert,
        Button: Button,
        Carousel: Carousel,
        Collapse: Collapse,
        Dropdown: Dropdown,
        Modal: Modal,
        Offcanvas: Offcanvas,
        Popover: Popover,
        ScrollSpy: ScrollSpy,
        Tab: Tab,
        Toast: Toast,
        Tooltip: Tooltip
    };
    return index_umd;
})));
//# sourceMappingURL=bootstrap.js.map
