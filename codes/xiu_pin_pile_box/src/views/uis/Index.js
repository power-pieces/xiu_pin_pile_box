var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        _super.call(this);
        this.skinName = skins.scene.IndexSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Index.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Index.prototype.onTouchTap = function (e) {
        Alert.show("hello world");
    };
    return Index;
})(egret.gui.SkinnableComponent);
