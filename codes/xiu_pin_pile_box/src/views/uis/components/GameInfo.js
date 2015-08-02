var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameInfo = (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        _super.call(this);
        this._info = "";
        this.skinName = skins.components.GameInfoSkin;
        this.setInfo(0, 0, 0, 0);
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    GameInfo.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        for (var i = 0; i < DataCenter.power; i++) {
            if (i > 10) {
                break;
            }
            this.groupPower.addElement(new egret.gui.UIAsset("power_png"));
        }
        this.refresh();
    };
    GameInfo.prototype.setInfo = function (score, best, total, power) {
        this._info = StringUtil.format("本轮高度：{0}      历史高度：{1}    总高度：{2}", score, best, total);
        for (var i = 0; i < power; i++) {
        }
        this.refresh();
    };
    GameInfo.prototype.refresh = function () {
        if (this.initialized) {
            this.txtInfo.text = this._info;
        }
    };
    return GameInfo;
})(egret.gui.SkinnableComponent);
