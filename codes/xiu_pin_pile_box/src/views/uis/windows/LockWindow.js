var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LockWindow = (function (_super) {
    __extends(LockWindow, _super);
    function LockWindow(content) {
        _super.call(this);
        this.txtContent = null;
        this.skinName = skins.windows.LockWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this._content = content;
    }
    LockWindow.show = function (content) {
        if (null == LockWindow.instance) {
            LockWindow.instance = new LockWindow(content);
        }
        else {
            LockWindow.instance.setContent(content);
        }
        LockWindow.instance.addListeners();
        egret.gui.PopUpManager.addPopUp(LockWindow.instance, true, true);
    };
    LockWindow.close = function () {
        if (LockWindow.instance) {
            egret.gui.PopUpManager.removePopUp(LockWindow.instance);
            LockWindow.instance.removeListeners();
        }
    };
    LockWindow.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.txtContent.text = this._content;
    };
    LockWindow.prototype.addListeners = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    LockWindow.prototype.removeListeners = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    LockWindow.prototype.enterFrameHandler = function (e) {
        if (this.stage) {
            egret.gui.PopUpManager.addPopUp(this, true, true);
        }
    };
    LockWindow.prototype.setContent = function (content) {
        this._content = content;
        this.txtContent.text = content;
    };
    LockWindow.instance = null;
    return LockWindow;
})(egret.gui.SkinnableComponent);
