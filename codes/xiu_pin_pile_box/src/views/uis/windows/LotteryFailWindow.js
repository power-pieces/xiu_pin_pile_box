var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LotteryFailWindow = (function (_super) {
    __extends(LotteryFailWindow, _super);
    function LotteryFailWindow() {
        _super.call(this);
        this.skinName = skins.windows.LotteryFailWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    LotteryFailWindow.show = function () {
        var w = new LotteryFailWindow();
        egret.gui.PopUpManager.addPopUp(w, true, true);
    };
    LotteryFailWindow.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    LotteryFailWindow.prototype.onTouchTap = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    };
    return LotteryFailWindow;
})(egret.gui.SkinnableComponent);
