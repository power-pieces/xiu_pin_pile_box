var Extend = (function () {
    function Extend() {
    }
    var __egretProto__ = Extend.prototype;
    /**
     * 调用外部方法
     */
    Extend.callWindow = function (funName) {
        if (null == window[funName]) {
            return null;
        }
        var result = window[funName]();
        return result;
    };
    Extend.callReadyShare = function () {
        return Extend.callWindow("readyShare");
    };
    return Extend;
})();
Extend.prototype.__class__ = "Extend";
//# sourceMappingURL=Extend.js.map