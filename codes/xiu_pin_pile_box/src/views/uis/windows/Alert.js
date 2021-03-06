var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(closeFun, thisObj) {
        if (closeFun === void 0) { closeFun = null; }
        if (thisObj === void 0) { thisObj = null; }
        _super.call(this);
        this._content = "";
        if (closeFun) {
            this._closeFun = closeFun.bind(thisObj);
        }
        this.skinName = skins.windows.AlertSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Alert.show = function (content, closeFun, thisObj) {
        if (closeFun === void 0) { closeFun = null; }
        if (thisObj === void 0) { thisObj = null; }
        var alert = new Alert(closeFun, thisObj);
        alert.setContent(content);
        egret.gui.PopUpManager.addPopUp(alert, true, true);
    };
    Alert.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this._content == "alert_tip_0" || this._content == "alert_tip_1" || this._content == "alert_tip_2") {
            this.imgTip.source = this._content + "_png";
            this.txtContent.visible = false;
        }
        else {
            this.txtContent.text = this._content;
            this.imgTip.visible = false;
        }
    };
    Alert.prototype.setContent = function (content) {
        this._content = content;
    };
    Alert.prototype.onTouchTap = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
        if (this._closeFun) {
            this._closeFun();
        }
    };
    return Alert;
})(egret.gui.SkinnableComponent);
