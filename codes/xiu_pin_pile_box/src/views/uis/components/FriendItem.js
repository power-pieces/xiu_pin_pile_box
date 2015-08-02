var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FriendItem = (function (_super) {
    __extends(FriendItem, _super);
    function FriendItem(data) {
        _super.call(this);
        this._data = null;
        this.skinName = skins.components.FriendItemSkin;
        this._data = data;
    }
    FriendItem.prototype.childrenCreated = function () {
        this.imgPic.source = this._data.pic;
        this.txtName.text = this._data.name;
    };
    return FriendItem;
})(egret.gui.SkinnableComponent);
