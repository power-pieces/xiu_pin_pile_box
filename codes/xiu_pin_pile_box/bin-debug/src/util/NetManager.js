var NetManager = (function () {
    function NetManager() {
    }
    NetManager.implicitCall = function (action, params, callBack, thisObject) {
        this._params = params;
        var np = new NetProxy();
        var url = DataCenter.cfg.server;
        var args = {};
        args.mod = "user";
        args.action = action;
        args.params = JSON.stringify(params);
        np.request(url, callBack, thisObject, args);
    };
    return NetManager;
})();
