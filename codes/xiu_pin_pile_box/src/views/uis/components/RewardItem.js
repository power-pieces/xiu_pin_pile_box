var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RewardItem = (function (_super) {
    __extends(RewardItem, _super);
    function RewardItem(data) {
        _super.call(this);
        this._data = null;
        this.skinName = skins.components.RewardItemSkin;
        this._data = data;
    }
    RewardItem.prototype.childrenCreated = function () {
        this.imgIcon.source = "r_icon_" + this._data.type + "_png";
    };
    return RewardItem;
})(egret.gui.SkinnableComponent);
