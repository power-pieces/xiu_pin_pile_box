var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
    Intro.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    Intro.prototype.onTouchMove = function (e) {
        Alert.show("hello world");
        //  Global.UI_LAYER.removeElement( this );
        // Global.GAME_LAYER.addChild( new Game());
    };
    return Intro;
})(egret.gui.SkinnableComponent);
//# sourceMappingURL=Intro.js.map