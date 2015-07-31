var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameFailWindow = (function (_super) {
    __extends(GameFailWindow, _super);
    function GameFailWindow(score) {
        _super.call(this);
        this._score = 0;
        this._score = score;
        this.skinName = skins.windows.GameFailWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    GameFailWindow.show = function (score) {
        var w = new GameFailWindow(score);
        egret.gui.PopUpManager.addPopUp(w, true, true);
    };
    GameFailWindow.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.txtScore.text = "本轮获得高度：" + this._score;
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    GameFailWindow.prototype.onTouchTap = function (e) {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
        Global.GAME_LAYER.removeChildren();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    };
    return GameFailWindow;
})(egret.gui.SkinnableComponent);
