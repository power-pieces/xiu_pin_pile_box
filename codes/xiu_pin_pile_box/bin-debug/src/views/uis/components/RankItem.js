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
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        _super.call(this);
        this.skinName = skins.components.RankItemSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    RankItem.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    };
    return RankItem;
})(egret.gui.SkinnableComponent);
//# sourceMappingURL=RankItem.js.map