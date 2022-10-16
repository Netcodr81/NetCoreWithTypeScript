var MYAPP;
(function () {
    "use strict";
    var e, o = { d: function (e, r) { for (var t in r)
            o.o(r, t) && !o.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: r[t] }); }, o: function (e, o) { return Object.prototype.hasOwnProperty.call(e, o); }, r: function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); } }, r = {};
    o.r(r), o.d(r, { funcs: function () { return e; } }), function (e) { e.hello = function () { alert("Hello World!"); }; }(e || (e = {})), MYAPP = r;
})();
