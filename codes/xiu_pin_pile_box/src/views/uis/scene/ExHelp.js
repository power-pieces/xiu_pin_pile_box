var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExHelp = (function (_super) {
    __extends(ExHelp, _super);
    function ExHelp() {
        _super.call(this);
        this.skinName = skins.scene.ExHelpSkin;
    }
    ExHelp.prototype.childrenCreated = function () {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
    };
    ExHelp.prototype.btnBack_touchTapHandler = function (e) {
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Share());
    };
    return ExHelp;
})(egret.gui.SkinnableComponent);
