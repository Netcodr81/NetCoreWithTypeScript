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
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
}(this, (function () {
    'use strict';
    var _a;
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
    var isElement$1 = function (obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        if (typeof obj.jquery !== 'undefined') {
            obj = obj[0];
        }
        return typeof obj.nodeType !== 'undefined';
    };
    var getElement = function (obj) {
        if (isElement$1(obj)) {
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
            var valueType = value && isElement$1(value) ? 'element' : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
                throw new TypeError(componentName.toUpperCase() + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\".");
            }
        });
    };
    var isVisible = function (element) {
        if (!isElement$1(element) || element.getClientRects().length === 0) {
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
    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function (acc, placement) {
        return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/ [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
        return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM
    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers
    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)
    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
    function getNodeName(element) {
        return element ? (element.nodeName || '').toLowerCase() : null;
    }
    function getWindow(node) {
        if (node == null) {
            return window;
        }
        if (node.toString() !== '[object Window]') {
            var ownerDocument = node.ownerDocument;
            return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
    }
    function isElement(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
    }
    function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
    }
    function isShadowRoot(node) {
        // IE 11 has no ShadowRoot
        if (typeof ShadowRoot === 'undefined') {
            return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    // and applies them to the HTMLElements such as popper and arrow
    function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function (name) {
            var style = state.styles[name] || {};
            var attributes = state.attributes[name] || {};
            var element = state.elements[name]; // arrow is optional + virtual elements
            if (!isHTMLElement(element) || !getNodeName(element)) {
                return;
            } // Flow doesn't support to extend this property, but it's the most
            // effective way to apply styles to an HTMLElement
            // $FlowFixMe[cannot-write]
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function (name) {
                var value = attributes[name];
                if (value === false) {
                    element.removeAttribute(name);
                }
                else {
                    element.setAttribute(name, value === true ? '' : value);
                }
            });
        });
    }
    function effect$2(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
            popper: {
                position: state.options.strategy,
                left: '0',
                top: '0',
                margin: '0'
            },
            arrow: {
                position: 'absolute'
            },
            reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
            Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function () {
            Object.keys(state.elements).forEach(function (name) {
                var element = state.elements[name];
                var attributes = state.attributes[name] || {};
                var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them
                var style = styleProperties.reduce(function (style, property) {
                    style[property] = '';
                    return style;
                }, {}); // arrow is optional + virtual elements
                if (!isHTMLElement(element) || !getNodeName(element)) {
                    return;
                }
                Object.assign(element.style, style);
                Object.keys(attributes).forEach(function (attribute) {
                    element.removeAttribute(attribute);
                });
            });
        };
    } // eslint-disable-next-line import/no-unused-modules
    var applyStyles$1 = {
        name: 'applyStyles',
        enabled: true,
        phase: 'write',
        fn: applyStyles,
        effect: effect$2,
        requires: ['computeStyles']
    };
    function getBasePlacement(placement) {
        return placement.split('-')[0];
    }
    var round$1 = Math.round;
    function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
            includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
            // Fallback to 1 in case both values are `0`
            scaleX = rect.width / element.offsetWidth || 1;
            scaleY = rect.height / element.offsetHeight || 1;
        }
        return {
            width: round$1(rect.width / scaleX),
            height: round$1(rect.height / scaleY),
            top: round$1(rect.top / scaleY),
            right: round$1(rect.right / scaleX),
            bottom: round$1(rect.bottom / scaleY),
            left: round$1(rect.left / scaleX),
            x: round$1(rect.left / scaleX),
            y: round$1(rect.top / scaleY)
        };
    }
    // means it doesn't take into account transforms.
    function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
        // Fixes https://github.com/popperjs/popper-core/issues/1223
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
            width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
            height = clientRect.height;
        }
        return {
            x: element.offsetLeft,
            y: element.offsetTop,
            width: width,
            height: height
        };
    }
    function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method
        if (parent.contains(child)) {
            return true;
        } // then fallback to custom implementation with Shadow DOM support
        else if (rootNode && isShadowRoot(rootNode)) {
            var next = child;
            do {
                if (next && parent.isSameNode(next)) {
                    return true;
                } // $FlowFixMe[prop-missing]: need a better way to handle this...
                next = next.parentNode || next.host;
            } while (next);
        } // Give up, the result is false
        return false;
    }
    function getComputedStyle$1(element) {
        return getWindow(element).getComputedStyle(element);
    }
    function isTableElement(element) {
        return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }
    function getDocumentElement(element) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
            element.document) || window.document).documentElement;
    }
    function getParentNode(element) {
        if (getNodeName(element) === 'html') {
            return element;
        }
        return ( // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
            element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
            // $FlowFixMe[incompatible-call]: HTMLElement is a Node
            getDocumentElement(element) // fallback
        );
    }
    function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
            getComputedStyle$1(element).position === 'fixed') {
            return null;
        }
        return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block
    function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        var isIE = navigator.userAgent.indexOf('Trident') !== -1;
        if (isIE && isHTMLElement(element)) {
            // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
            var elementCss = getComputedStyle$1(element);
            if (elementCss.position === 'fixed') {
                return null;
            }
        }
        var currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
            var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
            // create a containing block.
            // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
            if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
                return currentNode;
            }
            else {
                currentNode = currentNode.parentNode;
            }
        }
        return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.
    function getOffsetParent(element) {
        var window = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
            offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
            return window;
        }
        return offsetParent || getContainingBlock(element) || window;
    }
    function getMainAxisFromPlacement(placement) {
        return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }
    var max = Math.max;
    var min = Math.min;
    var round = Math.round;
    function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
    }
    function getFreshSideObject() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    }
    function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
        return keys.reduce(function (hashMap, key) {
            hashMap[key] = value;
            return hashMap;
        }, {});
    }
    var toPaddingObject = function toPaddingObject(padding, state) {
        padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
            placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? 'height' : 'width';
        if (!arrowElement || !popperOffsets) {
            return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === 'y' ? top : left;
        var maxProp = axis === 'y' ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
        var startDiff = popperOffsets[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
        // outside of the popper bounds
        var min = paddingObject[minProp];
        var max = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset = within(min, center, max); // Prevents breaking syntax highlighting...
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }
    function effect$1(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
        if (arrowElement == null) {
            return;
        } // CSS selector
        if (typeof arrowElement === 'string') {
            arrowElement = state.elements.popper.querySelector(arrowElement);
            if (!arrowElement) {
                return;
            }
        }
        if (!contains(state.elements.popper, arrowElement)) {
            return;
        }
        state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules
    var arrow$1 = {
        name: 'arrow',
        enabled: true,
        phase: 'main',
        fn: arrow,
        effect: effect$1,
        requires: ['popperOffsets'],
        requiresIfExists: ['preventOverflow']
    };
    var unsetSides = {
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.
    function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
            x: round(round(x * dpr) / dpr) || 0,
            y: round(round(y * dpr) / dpr) || 0
        };
    }
    function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
        var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
        var hasX = offsets.hasOwnProperty('x');
        var hasY = offsets.hasOwnProperty('y');
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
            var offsetParent = getOffsetParent(popper);
            var heightProp = 'clientHeight';
            var widthProp = 'clientWidth';
            if (offsetParent === getWindow(popper)) {
                offsetParent = getDocumentElement(popper);
                if (getComputedStyle$1(offsetParent).position !== 'static') {
                    heightProp = 'scrollHeight';
                    widthProp = 'scrollWidth';
                }
            } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it
            offsetParent = offsetParent;
            if (placement === top) {
                sideY = bottom; // $FlowFixMe[prop-missing]
                y -= offsetParent[heightProp] - popperRect.height;
                y *= gpuAcceleration ? 1 : -1;
            }
            if (placement === left) {
                sideX = right; // $FlowFixMe[prop-missing]
                x -= offsetParent[widthProp] - popperRect.width;
                x *= gpuAcceleration ? 1 : -1;
            }
        }
        var commonStyles = Object.assign({
            position: position
        }, adaptive && unsetSides);
        if (gpuAcceleration) {
            var _Object$assign;
            return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }
    function computeStyles(_ref4) {
        var state = _ref4.state, options = _ref4.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        var commonStyles = {
            placement: getBasePlacement(state.placement),
            popper: state.elements.popper,
            popperRect: state.rects.popper,
            gpuAcceleration: gpuAcceleration
        };
        if (state.modifiersData.popperOffsets != null) {
            state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.popperOffsets,
                position: state.options.strategy,
                adaptive: adaptive,
                roundOffsets: roundOffsets
            })));
        }
        if (state.modifiersData.arrow != null) {
            state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.arrow,
                position: 'absolute',
                adaptive: false,
                roundOffsets: roundOffsets
            })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            'data-popper-placement': state.placement
        });
    } // eslint-disable-next-line import/no-unused-modules
    var computeStyles$1 = {
        name: 'computeStyles',
        enabled: true,
        phase: 'beforeWrite',
        fn: computeStyles,
        data: {}
    };
    var passive = {
        passive: true
    };
    function effect(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
            scrollParents.forEach(function (scrollParent) {
                scrollParent.addEventListener('scroll', instance.update, passive);
            });
        }
        if (resize) {
            window.addEventListener('resize', instance.update, passive);
        }
        return function () {
            if (scroll) {
                scrollParents.forEach(function (scrollParent) {
                    scrollParent.removeEventListener('scroll', instance.update, passive);
                });
            }
            if (resize) {
                window.removeEventListener('resize', instance.update, passive);
            }
        };
    } // eslint-disable-next-line import/no-unused-modules
    var eventListeners = {
        name: 'eventListeners',
        enabled: true,
        phase: 'write',
        fn: function fn() { },
        effect: effect,
        data: {}
    };
    var hash$1 = {
        left: 'right',
        right: 'left',
        bottom: 'top',
        top: 'bottom'
    };
    function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function (matched) {
            return hash$1[matched];
        });
    }
    var hash = {
        start: 'end',
        end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function (matched) {
            return hash[matched];
        });
    }
    function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
        };
    }
    function getWindowScrollBarX(element) {
        // If <html> has a CSS width greater than the viewport, then this will be
        // incorrect for RTL.
        // Popper 1 is broken in this case and never had a bug report so let's assume
        // it's not an issue. I don't think anyone ever specifies width on <html>
        // anyway.
        // Browsers where the left scrollbar doesn't cause an issue report `0` for
        // this (e.g. Edge 2019, IE11, Safari)
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
    function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
        // can be obscured underneath it.
        // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
        // if it isn't open, so if this isn't available, the popper will be detected
        // to overflow the bottom of the screen too early.
        if (visualViewport) {
            width = visualViewport.width;
            height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
            // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
            // errors due to floating point numbers, so we need to check precision.
            // Safari returns a number <= 0, usually < -1 when pinch-zoomed
            // Feature detection fails in mobile emulation mode in Chrome.
            // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
            // 0.001
            // Fallback here: "Not Safari" userAgent
            if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                x = visualViewport.offsetLeft;
                y = visualViewport.offsetTop;
            }
        }
        return {
            width: width,
            height: height,
            x: x + getWindowScrollBarX(element),
            y: y
        };
    }
    // of the `<html>` and `<body>` rect bounds if horizontally scrollable
    function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle$1(body || html).direction === 'rtl') {
            x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
            width: width,
            height: height,
            x: x,
            y: y
        };
    }
    function isScrollParent(element) {
        // Firefox wants us to check `-x` and `-y` variations as well
        var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function getScrollParent(node) {
        if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
            // $FlowFixMe[incompatible-return]: assume body is always available
            return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
            return node;
        }
        return getScrollParent(getParentNode(node));
    }
    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */
    function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
            list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
            updatedList.concat(listScrollParents(getParentNode(target)));
    }
    function rectToClientRect(rect) {
        return Object.assign({}, rect, {
            left: rect.x,
            top: rect.y,
            right: rect.x + rect.width,
            bottom: rect.y + rect.height
        });
    }
    function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
    }
    function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`
    function getClippingParents(element) {
        var clippingParents = listScrollParents(getParentNode(element));
        var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement(clipperElement)) {
            return [];
        } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414
        return clippingParents.filter(function (clippingParent) {
            return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
        });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents
    function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
        var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents[0];
        var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
            var rect = getClientRectFromMixedType(element, clippingParent);
            accRect.top = max(rect.top, accRect.top);
            accRect.right = min(rect.right, accRect.right);
            accRect.bottom = min(rect.bottom, accRect.bottom);
            accRect.left = max(rect.left, accRect.left);
            return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
    }
    function getVariation(placement) {
        return placement.split('-')[1];
    }
    function computeOffsets(_ref) {
        var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference.x + reference.width / 2 - element.width / 2;
        var commonY = reference.y + reference.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
            case top:
                offsets = {
                    x: commonX,
                    y: reference.y - element.height
                };
                break;
            case bottom:
                offsets = {
                    x: commonX,
                    y: reference.y + reference.height
                };
                break;
            case right:
                offsets = {
                    x: reference.x + reference.width,
                    y: commonY
                };
                break;
            case left:
                offsets = {
                    x: reference.x - element.width,
                    y: commonY
                };
                break;
            default:
                offsets = {
                    x: reference.x,
                    y: reference.y
                };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
            var len = mainAxis === 'y' ? 'height' : 'width';
            switch (variation) {
                case start:
                    offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                    break;
                case end:
                    offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                    break;
            }
        }
        return offsets;
    }
    function detectOverflow(state, options) {
        if (options === void 0) {
            options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var referenceElement = state.elements.reference;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(referenceElement);
        var popperOffsets = computeOffsets({
            reference: referenceClientRect,
            element: popperRect,
            strategy: 'absolute',
            placement: placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
        // 0 or negative = within the clipping rect
        var overflowOffsets = {
            top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
            bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
            left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
            right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element
        if (elementContext === popper && offsetData) {
            var offset = offsetData[placement];
            Object.keys(overflowOffsets).forEach(function (key) {
                var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
                var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
                overflowOffsets[key] += offset[axis] * multiply;
            });
        }
        return overflowOffsets;
    }
    function computeAutoPlacement(state, options) {
        if (options === void 0) {
            options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
            return getVariation(placement) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function (placement) {
            return allowedAutoPlacements.indexOf(placement) >= 0;
        });
        if (allowedPlacements.length === 0) {
            allowedPlacements = placements$1;
        } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...
        var overflows = allowedPlacements.reduce(function (acc, placement) {
            acc[placement] = detectOverflow(state, {
                placement: placement,
                boundary: boundary,
                rootBoundary: rootBoundary,
                padding: padding
            })[getBasePlacement(placement)];
            return acc;
        }, {});
        return Object.keys(overflows).sort(function (a, b) {
            return overflows[a] - overflows[b];
        });
    }
    function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
            return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }
    function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
            return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
            return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
                placement: placement,
                boundary: boundary,
                rootBoundary: rootBoundary,
                padding: padding,
                flipVariations: flipVariations,
                allowedAutoPlacements: allowedAutoPlacements
            }) : placement);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements[0];
        for (var i = 0; i < placements.length; i++) {
            var placement = placements[i];
            var _basePlacement = getBasePlacement(placement);
            var isStartVariation = getVariation(placement) === start;
            var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
            var len = isVertical ? 'width' : 'height';
            var overflow = detectOverflow(state, {
                placement: placement,
                boundary: boundary,
                rootBoundary: rootBoundary,
                altBoundary: altBoundary,
                padding: padding
            });
            var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
            if (referenceRect[len] > popperRect[len]) {
                mainVariationSide = getOppositePlacement(mainVariationSide);
            }
            var altVariationSide = getOppositePlacement(mainVariationSide);
            var checks = [];
            if (checkMainAxis) {
                checks.push(overflow[_basePlacement] <= 0);
            }
            if (checkAltAxis) {
                checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
            }
            if (checks.every(function (check) {
                return check;
            })) {
                firstFittingPlacement = placement;
                makeFallbackChecks = false;
                break;
            }
            checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
            // `2` may be desired in some cases – research later
            var numberOfChecks = flipVariations ? 3 : 1;
            var _loop = function _loop(_i) {
                var fittingPlacement = placements.find(function (placement) {
                    var checks = checksMap.get(placement);
                    if (checks) {
                        return checks.slice(0, _i).every(function (check) {
                            return check;
                        });
                    }
                });
                if (fittingPlacement) {
                    firstFittingPlacement = fittingPlacement;
                    return "break";
                }
            };
            for (var _i = numberOfChecks; _i > 0; _i--) {
                var _ret = _loop(_i);
                if (_ret === "break")
                    break;
            }
        }
        if (state.placement !== firstFittingPlacement) {
            state.modifiersData[name]._skip = true;
            state.placement = firstFittingPlacement;
            state.reset = true;
        }
    } // eslint-disable-next-line import/no-unused-modules
    var flip$1 = {
        name: 'flip',
        enabled: true,
        phase: 'main',
        fn: flip,
        requiresIfExists: ['offset'],
        data: {
            _skip: false
        }
    };
    function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
            preventedOffsets = {
                x: 0,
                y: 0
            };
        }
        return {
            top: overflow.top - rect.height - preventedOffsets.y,
            right: overflow.right - rect.width + preventedOffsets.x,
            bottom: overflow.bottom - rect.height + preventedOffsets.y,
            left: overflow.left - rect.width - preventedOffsets.x
        };
    }
    function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function (side) {
            return overflow[side] >= 0;
        });
    }
    function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
            elementContext: 'reference'
        });
        var popperAltOverflow = detectOverflow(state, {
            altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
            referenceClippingOffsets: referenceClippingOffsets,
            popperEscapeOffsets: popperEscapeOffsets,
            isReferenceHidden: isReferenceHidden,
            hasPopperEscaped: hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
            'data-popper-reference-hidden': isReferenceHidden,
            'data-popper-escaped': hasPopperEscaped
        });
    } // eslint-disable-next-line import/no-unused-modules
    var hide$1 = {
        name: 'hide',
        enabled: true,
        phase: 'main',
        requiresIfExists: ['preventOverflow'],
        fn: hide
    };
    function distanceAndSkiddingToXY(placement, rects, offset) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
            placement: placement
        })) : offset, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
            x: distance,
            y: skidding
        } : {
            x: skidding,
            y: distance
        };
    }
    function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function (acc, placement) {
            acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
            return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
            state.modifiersData.popperOffsets.x += x;
            state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules
    var offset$1 = {
        name: 'offset',
        enabled: true,
        phase: 'main',
        requires: ['popperOffsets'],
        fn: offset
    };
    function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        // Offsets are the actual position the popper needs to have to be
        // properly positioned near its reference element
        // This is the most basic placement, and will be adjusted by
        // the modifiers in the next step
        state.modifiersData[name] = computeOffsets({
            reference: state.rects.reference,
            element: state.rects.popper,
            strategy: 'absolute',
            placement: state.placement
        });
    } // eslint-disable-next-line import/no-unused-modules
    var popperOffsets$1 = {
        name: 'popperOffsets',
        enabled: true,
        phase: 'read',
        fn: popperOffsets,
        data: {}
    };
    function getAltAxis(axis) {
        return axis === 'x' ? 'y' : 'x';
    }
    function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
            boundary: boundary,
            rootBoundary: rootBoundary,
            padding: padding,
            altBoundary: altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
            placement: state.placement
        })) : tetherOffset;
        var data = {
            x: 0,
            y: 0
        };
        if (!popperOffsets) {
            return;
        }
        if (checkMainAxis || checkAltAxis) {
            var mainSide = mainAxis === 'y' ? top : left;
            var altSide = mainAxis === 'y' ? bottom : right;
            var len = mainAxis === 'y' ? 'height' : 'width';
            var offset = popperOffsets[mainAxis];
            var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
            var max$1 = popperOffsets[mainAxis] - overflow[altSide];
            var additive = tether ? -popperRect[len] / 2 : 0;
            var minLen = variation === start ? referenceRect[len] : popperRect[len];
            var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
            // outside the reference bounds
            var arrowElement = state.elements.arrow;
            var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
                width: 0,
                height: 0
            };
            var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
            var arrowPaddingMin = arrowPaddingObject[mainSide];
            var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
            // to include its full size in the calculation. If the reference is small
            // and near the edge of a boundary, the popper can overflow even if the
            // reference is not overflowing as well (e.g. virtual elements with no
            // width or height)
            var arrowLen = within(0, referenceRect[len], arrowRect[len]);
            var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
            var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
            var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
            var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
            var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
            var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
            var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
            if (checkMainAxis) {
                var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
                popperOffsets[mainAxis] = preventedOffset;
                data[mainAxis] = preventedOffset - offset;
            }
            if (checkAltAxis) {
                var _mainSide = mainAxis === 'x' ? top : left;
                var _altSide = mainAxis === 'x' ? bottom : right;
                var _offset = popperOffsets[altAxis];
                var _min = _offset + overflow[_mainSide];
                var _max = _offset - overflow[_altSide];
                var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
                popperOffsets[altAxis] = _preventedOffset;
                data[altAxis] = _preventedOffset - _offset;
            }
        }
        state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules
    var preventOverflow$1 = {
        name: 'preventOverflow',
        enabled: true,
        phase: 'main',
        fn: preventOverflow,
        requiresIfExists: ['offset']
    };
    function getHTMLElementScroll(element) {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
    }
    function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
            return getWindowScroll(node);
        }
        else {
            return getHTMLElementScroll(node);
        }
    }
    function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = rect.width / element.offsetWidth || 1;
        var scaleY = rect.height / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
            isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
            scrollLeft: 0,
            scrollTop: 0
        };
        var offsets = {
            x: 0,
            y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
            if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
                isScrollParent(documentElement)) {
                scroll = getNodeScroll(offsetParent);
            }
            if (isHTMLElement(offsetParent)) {
                offsets = getBoundingClientRect(offsetParent, true);
                offsets.x += offsetParent.clientLeft;
                offsets.y += offsetParent.clientTop;
            }
            else if (documentElement) {
                offsets.x = getWindowScrollBarX(documentElement);
            }
        }
        return {
            x: rect.left + scroll.scrollLeft - offsets.x,
            y: rect.top + scroll.scrollTop - offsets.y,
            width: rect.width,
            height: rect.height
        };
    }
    function order(modifiers) {
        var map = new Map();
        var visited = new Set();
        var result = [];
        modifiers.forEach(function (modifier) {
            map.set(modifier.name, modifier);
        }); // On visiting object, check for its dependencies and visit them recursively
        function sort(modifier) {
            visited.add(modifier.name);
            var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
            requires.forEach(function (dep) {
                if (!visited.has(dep)) {
                    var depModifier = map.get(dep);
                    if (depModifier) {
                        sort(depModifier);
                    }
                }
            });
            result.push(modifier);
        }
        modifiers.forEach(function (modifier) {
            if (!visited.has(modifier.name)) {
                // check for visited object
                sort(modifier);
            }
        });
        return result;
    }
    function orderModifiers(modifiers) {
        // order based on dependencies
        var orderedModifiers = order(modifiers); // order based on phase
        return modifierPhases.reduce(function (acc, phase) {
            return acc.concat(orderedModifiers.filter(function (modifier) {
                return modifier.phase === phase;
            }));
        }, []);
    }
    function debounce(fn) {
        var pending;
        return function () {
            if (!pending) {
                pending = new Promise(function (resolve) {
                    Promise.resolve().then(function () {
                        pending = undefined;
                        resolve(fn());
                    });
                });
            }
            return pending;
        };
    }
    function mergeByName(modifiers) {
        var merged = modifiers.reduce(function (merged, current) {
            var existing = merged[current.name];
            merged[current.name] = existing ? Object.assign({}, existing, current, {
                options: Object.assign({}, existing.options, current.options),
                data: Object.assign({}, existing.data, current.data)
            }) : current;
            return merged;
        }, {}); // IE11 does not support Object.values
        return Object.keys(merged).map(function (key) {
            return merged[key];
        });
    }
    var DEFAULT_OPTIONS = {
        placement: 'bottom',
        modifiers: [],
        strategy: 'absolute'
    };
    function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return !args.some(function (element) {
            return !(element && typeof element.getBoundingClientRect === 'function');
        });
    }
    function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
            generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper(reference, popper, options) {
            if (options === void 0) {
                options = defaultOptions;
            }
            var state = {
                placement: 'bottom',
                orderedModifiers: [],
                options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                modifiersData: {},
                elements: {
                    reference: reference,
                    popper: popper
                },
                attributes: {},
                styles: {}
            };
            var effectCleanupFns = [];
            var isDestroyed = false;
            var instance = {
                state: state,
                setOptions: function setOptions(options) {
                    cleanupModifierEffects();
                    state.options = Object.assign({}, defaultOptions, state.options, options);
                    state.scrollParents = {
                        reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
                        popper: listScrollParents(popper)
                    }; // Orders the modifiers based on their dependencies and `phase`
                    // properties
                    var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers
                    state.orderedModifiers = orderedModifiers.filter(function (m) {
                        return m.enabled;
                    }); // Validate the provided modifiers so that the consumer will get warned
                    runModifierEffects();
                    return instance.update();
                },
                // Sync update – it will always be executed, even if not necessary. This
                // is useful for low frequency updates where sync behavior simplifies the
                // logic.
                // For high frequency updates (e.g. `resize` and `scroll` events), always
                // prefer the async Popper#update method
                forceUpdate: function forceUpdate() {
                    if (isDestroyed) {
                        return;
                    }
                    var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
                    // anymore
                    if (!areValidElements(reference, popper)) {
                        return;
                    } // Store the reference and popper rects to be read by modifiers
                    state.rects = {
                        reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
                        popper: getLayoutRect(popper)
                    }; // Modifiers have the ability to reset the current update cycle. The
                    // most common use case for this is the `flip` modifier changing the
                    // placement, which then needs to re-run all the modifiers, because the
                    // logic was previously ran for the previous placement and is therefore
                    // stale/incorrect
                    state.reset = false;
                    state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
                    // is filled with the initial data specified by the modifier. This means
                    // it doesn't persist and is fresh on each update.
                    // To ensure persistent data, use `${name}#persistent`
                    state.orderedModifiers.forEach(function (modifier) {
                        return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                    });
                    for (var index = 0; index < state.orderedModifiers.length; index++) {
                        if (state.reset === true) {
                            state.reset = false;
                            index = -1;
                            continue;
                        }
                        var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                        if (typeof fn === 'function') {
                            state = fn({
                                state: state,
                                options: _options,
                                name: name,
                                instance: instance
                            }) || state;
                        }
                    }
                },
                // Async and optimistically optimized update – it will not be executed if
                // not necessary (debounced to run at most once-per-tick)
                update: debounce(function () {
                    return new Promise(function (resolve) {
                        instance.forceUpdate();
                        resolve(state);
                    });
                }),
                destroy: function destroy() {
                    cleanupModifierEffects();
                    isDestroyed = true;
                }
            };
            if (!areValidElements(reference, popper)) {
                return instance;
            }
            instance.setOptions(options).then(function (state) {
                if (!isDestroyed && options.onFirstUpdate) {
                    options.onFirstUpdate(state);
                }
            }); // Modifiers have the ability to execute arbitrary code before the first
            // update cycle runs. They will be executed in the same order as the update
            // cycle. This is useful when a modifier adds some persistent data that
            // other modifiers need to use, but the modifier is run after the dependent
            // one.
            function runModifierEffects() {
                state.orderedModifiers.forEach(function (_ref3) {
                    var name = _ref3.name, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {} : _ref3$options, effect = _ref3.effect;
                    if (typeof effect === 'function') {
                        var cleanupFn = effect({
                            state: state,
                            name: name,
                            instance: instance,
                            options: options
                        });
                        var noopFn = function noopFn() { };
                        effectCleanupFns.push(cleanupFn || noopFn);
                    }
                });
            }
            function cleanupModifierEffects() {
                effectCleanupFns.forEach(function (fn) {
                    return fn();
                });
                effectCleanupFns = [];
            }
            return instance;
        };
    }
    var createPopper$2 = /*#__PURE__*/ popperGenerator(); // eslint-disable-next-line import/no-unused-modules
    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /*#__PURE__*/ popperGenerator({
        defaultModifiers: defaultModifiers$1
    }); // eslint-disable-next-line import/no-unused-modules
    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/ popperGenerator({
        defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules
    var Popper = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        popperGenerator: popperGenerator,
        detectOverflow: detectOverflow,
        createPopperBase: createPopper$2,
        createPopper: createPopper,
        createPopperLite: createPopper$1,
        top: top,
        bottom: bottom,
        right: right,
        left: left,
        auto: auto,
        basePlacements: basePlacements,
        start: start,
        end: end,
        clippingParents: clippingParents,
        viewport: viewport,
        popper: popper,
        reference: reference,
        variationPlacements: variationPlacements,
        placements: placements,
        beforeRead: beforeRead,
        read: read,
        afterRead: afterRead,
        beforeMain: beforeMain,
        main: main,
        afterMain: afterMain,
        beforeWrite: beforeWrite,
        write: write,
        afterWrite: afterWrite,
        modifierPhases: modifierPhases,
        applyStyles: applyStyles$1,
        arrow: arrow$1,
        computeStyles: computeStyles$1,
        eventListeners: eventListeners,
        flip: flip$1,
        hide: hide$1,
        offset: offset$1,
        popperOffsets: popperOffsets$1,
        preventOverflow: preventOverflow$1
    });
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
            if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
                // Popper virtual elements require a getBoundingClientRect method
                throw new TypeError(NAME$9.toUpperCase() + ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method.");
            }
            return config;
        };
        Dropdown.prototype._createPopper = function (parent) {
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
            }
            var referenceElement = this._element;
            if (this._config.reference === 'parent') {
                referenceElement = parent;
            }
            else if (isElement$1(this._config.reference)) {
                referenceElement = getElement(this._config.reference);
            }
            else if (typeof this._config.reference === 'object') {
                referenceElement = this._config.reference;
            }
            var popperConfig = this._getPopperConfig();
            var isDisplayStatic = popperConfig.modifiers.find(function (modifier) { return modifier.name === 'applyStyles' && modifier.enabled === false; });
            this._popper = createPopper(referenceElement, this._menu, popperConfig);
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
            if (isElement$1(selector)) {
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
            if (typeof Popper === 'undefined') {
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
                this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
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
            if (isElement$1(content)) {
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
//# sourceMappingURL=bootstrap.bundle.js.map
