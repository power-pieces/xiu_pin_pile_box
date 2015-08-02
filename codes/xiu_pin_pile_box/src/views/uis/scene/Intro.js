var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        _super.call(this);
        this.skinName = skins.scene.IntroSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Intro.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchMove, this);
    };
    Intro.prototype.onTouchMove = function (e) {
        AudioDevice.playEffect(AudioName.CLICK);
        Global.UI_LAYER.addElementAt(new Rule(), 0);
        egret.Tween.get(this).to({ y: -Global.stage.stageHeight }, 500);
    };
    return Intro;
})(egret.gui.SkinnableComponent);
