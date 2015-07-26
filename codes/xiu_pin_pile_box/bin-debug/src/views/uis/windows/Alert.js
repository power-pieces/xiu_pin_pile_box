/**
 * 弹出提示框
 * @author Jing
 *
 */
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        _super.call(this);
        this.skinName = skins.windows.AlertSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    var __egretProto__ = Alert.prototype;
    Alert.show = function (content) {
        var alert = new Alert();
        egret.gui.PopUpManager.addPopUp(alert, true, true);
    };
    __egretProto__.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.setContent = function (content) {
        this.txtContent.text = content;
    };
    __egretProto__.onTouchTap = function (e) {
        egret.gui.PopUpManager.removePopUp(this);
    };
    return Alert;
})(egret.gui.SkinnableComponent);
Alert.prototype.__class__ = "Alert";
//# sourceMappingURL=Alert.js.map