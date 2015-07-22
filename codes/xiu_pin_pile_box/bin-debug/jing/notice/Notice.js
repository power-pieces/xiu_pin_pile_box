var Notice = (function () {
    function Notice(type, data, args) {
        if (data === void 0) { data = null; }
        if (args === void 0) { args = null; }
        this._type = type;
        this._data = data;
        this._args = args;
    }
    Object.defineProperty(Notice.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notice.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notice.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    //�л�����
    Notice.CHANGE_VIEW = "change_view";
    return Notice;
})();
//# sourceMappingURL=Notice.js.map