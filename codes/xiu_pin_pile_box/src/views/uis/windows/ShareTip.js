var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShareTip = (function (_super) {
    __extends(ShareTip, _super);
    function ShareTip() {
        _super.call(this);
        this.skinName = skins.windows.ShareTipSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    ShareTip.show = function () {
        Extend.callReadyShare();
        egret.gui.PopUpManager.addPopUp(ShareTip.ins, true, false);
        this.ins.addListeners();
    };
    ShareTip.close = function () {
        egret.gui.PopUpManager.removePopUp(ShareTip.ins);
        this.ins.removeListeners();
    };
    ShareTip.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    };
    ShareTip.prototype.addListeners = function () {
        Global.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShareTip.prototype.removeListeners = function () {
        Global.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShareTip.prototype.onTouchTap = function (e) {
        ShareTip.close();
    };
    ShareTip.ins = new ShareTip();
    return ShareTip;
})(egret.gui.SkinnableComponent);
