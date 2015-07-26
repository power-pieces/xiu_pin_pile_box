var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        _super.call(this);
        this.skinName = skins.windows.AlertSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Alert.show = function (content) {
        var alert = new Alert();
        egret.gui.PopUpManager.addPopUp(alert, true, true);
    };
    Alert.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Alert.prototype.setContent = function (content) {
        this.txtContent.text = content;
    };
    Alert.prototype.onTouchTap = function (e) {
        egret.gui.PopUpManager.removePopUp(this);
    };
    return Alert;
})(egret.gui.SkinnableComponent);
