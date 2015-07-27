/**
 *
 * @author Jing
 *
 */
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        _super.call(this);
        this.skinName = skins.scene.IntroSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    var __egretProto__ = Intro.prototype;
    __egretProto__.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    __egretProto__.onTouchMove = function (e) {
        //Alert.show("hello world");
        Global.UI_LAYER.addElementAt(new Rule(), 0);
        egret.Tween.get(this).to({ y: -Global.stage.stageHeight }, 500);
        //  Global.UI_LAYER.removeElement( this );
        // Global.GAME_LAYER.addChild( new Game());
    };
    return Intro;
})(egret.gui.SkinnableComponent);
Intro.prototype.__class__ = "Intro";
//# sourceMappingURL=Intro.js.map