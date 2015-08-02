var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KeysItem = (function (_super) {
    __extends(KeysItem, _super);
    function KeysItem(datas) {
        this._datas = datas;
        _super.call(this);
        this.skinName = skins.components.KeysItemSkin;
    }
    KeysItem.prototype.childrenCreated = function () {
        if (this._datas.length > 0) {
            this.imgIcon.source = "r_icon_" + this._datas[0].type + "_png";
            var addH = 0;
            for (var i = 0; i < this._datas.length; i++) {
                var data = this._datas[i];
                var text = new egret.gui.TextInput();
                text.text = data.key;
                text.width = this.listKeys.width;
                this.listKeys.addElement(text);
                addH += 40 + 6;
            }
            this.bg.height += addH;
            this.height = this.bg.height;
        }
    };
    return KeysItem;
})(egret.gui.SkinnableComponent);
