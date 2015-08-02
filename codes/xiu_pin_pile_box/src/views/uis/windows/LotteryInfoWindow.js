var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LotteryInfoWindow = (function (_super) {
    __extends(LotteryInfoWindow, _super);
    function LotteryInfoWindow() {
        _super.call(this);
        this._isCreated = false;
        this.skinName = skins.windows.LotteryInfoWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    LotteryInfoWindow.show = function (type, key) {
        if (null == LotteryInfoWindow.ins) {
            LotteryInfoWindow.ins = new LotteryInfoWindow();
        }
        egret.gui.PopUpManager.addPopUp(LotteryInfoWindow.ins, true, true);
        LotteryInfoWindow.ins.addListeners();
        LotteryInfoWindow.ins.update(type, key);
    };
    LotteryInfoWindow.close = function () {
        egret.gui.PopUpManager.removePopUp(LotteryInfoWindow.ins);
        LotteryInfoWindow.ins.removeListeners();
    };
    LotteryInfoWindow.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this._isCreated = true;
        this.addListeners();
        this.refresh();
    };
    LotteryInfoWindow.prototype.addListeners = function () {
        if (this._isCreated == false) {
            return;
        }
        this.btnSumbit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnSumbit_touchBeginHandler, this);
        this.btnEx.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnEx_touchBeginHandler, this);
    };
    LotteryInfoWindow.prototype.removeListeners = function () {
        this.btnSumbit.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnSumbit_touchBeginHandler, this);
        this.btnEx.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnEx_touchBeginHandler, this);
    };
    LotteryInfoWindow.prototype.btnEx_touchBeginHandler = function (e) {
        LotteryInfoWindow.close();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new ExHelp());
    };
    LotteryInfoWindow.prototype.btnSumbit_touchBeginHandler = function (e) {
        LotteryInfoWindow.close();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    };
    LotteryInfoWindow.prototype.update = function (type, key) {
        this._type = type;
        this._key = key;
        this.refresh();
    };
    LotteryInfoWindow.prototype.refresh = function () {
        if (this.initialized == false || this._type == null) {
            return;
        }
        this.imgTitle.source = "r_title_" + this._type + "_png";
        this.imgIcon.source = "r_icon_" + this._type + "_png";
        this.txtKey.text = this._key;
    };
    LotteryInfoWindow.ins = null;
    return LotteryInfoWindow;
})(egret.gui.SkinnableComponent);
