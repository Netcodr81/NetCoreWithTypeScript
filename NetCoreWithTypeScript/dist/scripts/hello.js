export var funcs;
(function (funcs) {
    function hello() {
        var message = "Hello World!";
        alert(message);
    }
    funcs.hello = hello;
})(funcs || (funcs = {}));
