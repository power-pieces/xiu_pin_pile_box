var Global = (function () {
    function Global() {
    }
    Global.stage = null;
    Global.GAME_LAYER = new egret.DisplayObjectContainer();
    Global.UI_LAYER = new egret.gui.UIStage();
    return Global;
})();
