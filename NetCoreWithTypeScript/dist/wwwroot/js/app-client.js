/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var MYAPP;
/******/ (function () {
    /******/ "use strict";
    /******/ var __webpack_modules__ = ({
        /***/ "./scripts/hello.ts": 
        /*!**************************!*\
          !*** ./scripts/hello.ts ***!
          \**************************/
        /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"funcs\": () => (/* binding */ funcs)\n/* harmony export */ });\nvar funcs;\r\n(function (funcs) {\r\n    function hello() {\r\n        var message = \"Hello World!\";\r\n        alert(message);\r\n    }\r\n    funcs.hello = hello;\r\n})(funcs || (funcs = {}));\r\n\n\n//# sourceURL=webpack://MYAPP/./scripts/hello.ts?");
            /***/ 
        }),
        /***/ "./scripts/index.ts": 
        /*!**************************!*\
          !*** ./scripts/index.ts ***!
          \**************************/
        /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"funcs\": () => (/* reexport safe */ _hello__WEBPACK_IMPORTED_MODULE_0__.funcs)\n/* harmony export */ });\n/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hello */ \"./scripts/hello.ts\");\n\r\n\n\n//# sourceURL=webpack://MYAPP/./scripts/index.ts?");
            /***/ 
        })
        /******/ 
    });
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = __webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (function () {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = function (exports, definition) {
            /******/ for (var key in definition) {
                /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/ }
                /******/ }
            /******/ 
        };
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (function () {
        /******/ __webpack_require__.o = function (obj, prop) { return (Object.prototype.hasOwnProperty.call(obj, prop)); };
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (function () {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = function (exports) {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ }
            /******/ Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 
        };
        /******/ 
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module can't be inlined because the eval devtool is used.
    /******/ var __webpack_exports__ = __webpack_require__("./scripts/index.ts");
    /******/ MYAPP = __webpack_exports__;
    /******/
    /******/ 
})();
