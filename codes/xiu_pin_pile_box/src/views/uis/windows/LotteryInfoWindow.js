var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LotteryInfoWindow = (function (_super) {
    __extends(LotteryInfoWindow, _super);
    function LotteryInfoWindow() {
        _super.call(this);
        this.skinName = skins.windows.LotteryInfoWindowSkin;
    }
    return LotteryInfoWindow;
})(egret.gui.SkinnableComponent);
