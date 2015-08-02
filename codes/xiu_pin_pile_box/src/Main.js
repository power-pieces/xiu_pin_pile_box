var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        var openInfo = Extend.callWindow("getInfo");
        if (null == openInfo) {
            openInfo = {};
            openInfo.inviter = "test_id";
            openInfo.id = "test_id";
            openInfo.name = "test_name";
            openInfo.pic = "";
        }
        DataCenter.inviter = openInfo.inviter;
        DataCenter.id = openInfo.id;
        DataCenter.nickname = openInfo.name;
        DataCenter.pic = openInfo.pic;
        DataCenter.openInfo = openInfo;
        Extend.callReadyShare();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        Global.stage = this.stage;
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.gui.Theme.load("resource/theme.thm");
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    };
    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.createScene = function () {
        this.stage.frameRate = 60;
        AudioDevice.prep([AudioName.CLICK, AudioName.HIT_BOX, AudioName.LOTTERY, AudioName.BGM, AudioName.BGM_GAME, AudioName.BOX_HEIGHT_ENOUGH, AudioName.DROP_BOX, AudioName.GAME_RESULT, AudioName.LOTTERY_FAIL, AudioName.LOTTERY_SUCCESS], this.stage, function () {
            AudioDevice.playBGM(AudioName.BGM);
        });
        DataCenter.cfg = RES.getRes("config_json");
        this.addChild(Global.GAME_LAYER);
        this.addChild(Global.UI_LAYER);
        NoticeManager.addNoticeAction(GameNotice.LOGIN_SUCCESS, this.onLoginSuccess);
        new LoginCmd().run(DataCenter.id, DataCenter.nickname, DataCenter.pic);
    };
    Main.prototype.onLoginSuccess = function (n) {
        if (null == DataCenter.inviter) {
            Global.UI_LAYER.addElement(new Intro());
        }
        else {
            Global.UI_LAYER.addElement(new BeShare());
        }
    };
    return Main;
})(egret.DisplayObjectContainer);
