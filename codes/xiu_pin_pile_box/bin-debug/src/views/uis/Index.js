/**
 *
 * @author
 *
 */
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        _super.call(this);
        this.skinName = "skins.scene.IndexSkin";
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    var __egretProto__ = Index.prototype;
    __egretProto__.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.onTouchTap = function (e) {
        Global.UI_LAYER.removeElement(this);
        Global.GAME_LAYER.addChild(new Game());
    };
    return Index;
})(egret.gui.SkinnableComponent);
Index.prototype.__class__ = "Index";
