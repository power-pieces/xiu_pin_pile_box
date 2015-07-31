var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.call(this);
        this.skinName = skins.scene.RuleSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Rule.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addListeners();
    };
    Rule.prototype.addListeners = function () {
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
        this.btnLottery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLottery_touchTapHandler, this);
    };
    Rule.prototype.removeListeners = function () {
        this.btnGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
        this.btnLottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLottery_touchTapHandler, this);
    };
    Rule.prototype.btnGame_touchTapHandler = function (e) {
        if (DataCenter.power <= 0) {
            Alert.show("能量不足！");
            return;
        }
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Game());
    };
    Rule.prototype.btnLottery_touchTapHandler = function (e) {
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    };
    return Rule;
})(egret.gui.SkinnableComponent);
