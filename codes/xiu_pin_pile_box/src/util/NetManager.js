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
    NetManager.call = function (action, params, callBack, thisObject, label) {
        if (label === void 0) { label = "网络通信中"; }
        LockWindow.show(label);
        if (null != this._proxy) {
            LockWindow.show("网络断开，请刷新重试!");
            return;
        }
        this._callBack = callBack.bind(thisObject);
        this._params = params;
        var np = new NetProxy();
        var url = DataCenter.cfg.server;
        var args = {};
        args.mod = "user";
        args.action = action;
        args.params = JSON.stringify(params);
        np.request(url, this.onCallBack, this, args, egret.URLRequestMethod.GET, egret.URLLoaderDataFormat.TEXT);
        this._proxy = np;
    };
    NetManager.onCallBack = function (jsonStr) {
        console.log(jsonStr);
        LockWindow.close();
        this._proxy = null;
        try {
            var data = JSON.parse(jsonStr);
            if (data.error > 0) {
                LockWindow.show("错误：" + data.msg);
            }
            else {
                this._callBack(data.data, this._params);
            }
        }
        catch (e) {
            alert("程序崩溃：" + e.message);
            alert("程序崩溃：" + jsonStr);
        }
    };
    return NetManager;
})();
