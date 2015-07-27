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
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        _super.call(this);
        this.top3 = new RankItem[3];
        this.skinName = skins.scene.RankSkin;
    }
    return Rank;
})(egret.gui.SkinnableComponent);
//# sourceMappingURL=Rank.js.map