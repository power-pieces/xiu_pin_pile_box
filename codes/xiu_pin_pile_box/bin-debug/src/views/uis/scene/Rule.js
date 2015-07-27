/**
*
* @author Jing
*
*/
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.call(this);
        this.skinName = skins.scene.RuleSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    var __egretProto__ = Rule.prototype;
    __egretProto__.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addListeners();
    };
    __egretProto__.addListeners = function () {
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
    };
    __egretProto__.removeListeners = function () {
        this.btnGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
    };
    __egretProto__.btnGame_touchTapHandler = function (e) {
        Global.GAME_LAYER.addChild(new Game());
        Global.UI_LAYER.removeAllElements();
    };
    return Rule;
})(egret.gui.SkinnableComponent);
Rule.prototype.__class__ = "Rule";
//# sourceMappingURL=Rule.js.map