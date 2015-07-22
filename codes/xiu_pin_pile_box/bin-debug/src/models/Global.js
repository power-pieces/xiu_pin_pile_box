var Global = (function () {
    function Global() {
    }
    var __egretProto__ = Global.prototype;
    //舞台
    Global.stage = null;
    //游戏图层
    Global.GAME_LAYER = new egret.DisplayObjectContainer();
    //UI图层
    Global.UI_LAYER = new egret.gui.UIStage();
    return Global;
})();
Global.prototype.__class__ = "Global";
