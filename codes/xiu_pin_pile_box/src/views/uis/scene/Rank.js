var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        _super.call(this);
        this.skinName = skins.scene.RankSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Rank.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.rank0.init(1, null, "", 0);
        this.rank1.init(2, null, "", 0);
        this.rank2.init(3, null, "", 0);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        NoticeManager.addNoticeAction(GameNotice.GOT_RANK, this.gotRankNotice.bind(this));
        new GetRankCmd().run(DataCenter.id);
    };
    Rank.prototype.btnBack_touchTapHandler = function (e) {
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Share());
    };
    Rank.prototype.gotRankNotice = function (n) {
        for (var i = 0; i < DataCenter.rankList.length; i++) {
            if (i >= 20) {
                break;
            }
            var info = DataCenter.rankList[i];
            var rankItem = this["rank" + i];
            if (null == rankItem) {
                rankItem = new RankItem();
                this.listRank.addElement(rankItem);
            }
            rankItem.init(i + 1, info.pic, info.name, +info.total_score);
        }
    };
    return Rank;
})(egret.gui.SkinnableComponent);
