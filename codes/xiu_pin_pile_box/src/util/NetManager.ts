/**
* 网络通信类
* 示例：NetManager.call("login", { id: 1 }, this.onNetBack, this);      
*/
class NetManager
{

    private static _proxy: NetProxy;
    private static _callBack: Function;
    private static _params: any;

    //隐藏的网络调用，不会触发界面
    public static implicitCall(action: string, params: any, callBack: Function, thisObject: any): void
    {
        this._params = params;

        var np: NetProxy = new NetProxy();
        var url: string = DataCenter.cfg.server;

        var args: any = {};
        args.mod = "user";
        args.action = action;
        args.params = JSON.stringify(params);

        np.request(url, callBack, thisObject, args);
    }
    

    public static call(action: string, params: any, callBack: Function, thisObject: any, label:string = "网络通信中"): void
    {
        LockWindow.show(label);        
        if (null != this._proxy)
        {
            LockWindow.show("网络断开，请刷新重试!");
            return;
        }

        this._callBack = callBack.bind(thisObject);
        this._params = params;

        var np: NetProxy = new NetProxy();
        var url: string = DataCenter.cfg.server;

        var args: any = {};
        args.mod = "user";
        args.action = action;
        args.params = JSON.stringify(params);

        //alert("传递的参数：" + args.params);

        np.request(url, this.onCallBack, this, args, egret.URLRequestMethod.GET, egret.URLLoaderDataFormat.TEXT);
        this._proxy = np;
    }

    private static onCallBack(jsonStr: string): void
    {
        console.log(jsonStr);
        LockWindow.close();
        this._proxy = null;

        try {
            var data: any = JSON.parse(jsonStr);
            if (data.error > 0)
            {
                LockWindow.show("错误：" + data.msg);                
            }
            else
            {
                this._callBack(data.data, this._params);
            }
        }
        catch (e)
        {            
            alert("程序崩溃：" + e.message);
            alert("程序崩溃：" + jsonStr);
            //ViewManager.instance.showPanel(new MessagePanel("程序崩溃：" + jsonStr), true, true);
        }
    }
    
}