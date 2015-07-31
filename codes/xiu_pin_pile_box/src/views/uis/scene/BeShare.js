var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BeShare = (function (_super) {
    __extends(BeShare, _super);
    function BeShare() {
        _super.call(this);
        this.skinName = skins.scene.BeShareSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    BeShare.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        NoticeManager.addNoticeAction(GameNotice.GOT_INVITER_INFO, this.gotInviterInfoHandler.bind(this));
        new GetInfoCmd().run(DataCenter.inviter);
        this.btnGivePower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGivePower_touchBeginHandler, this);
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBeginHandler, this);
    };
    BeShare.prototype.gotInviterInfoHandler = function (n) {
        this.imgPic.source = DataCenter.inviterPic;
        this.txtName.text = DataCenter.inviterName;
        this.txtScore.text = DataCenter.inviterTotalScore + "";
        this.txtTitle.text = DataCenter.inviterName + "，已获得秀品好礼";
    };
    BeShare.prototype.btnGivePower_touchBeginHandler = function (e) {
        new GivePowerCmd().run(DataCenter.id, DataCenter.inviter);
    };
    BeShare.prototype.btnGame_touchBeginHandler = function (e) {
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Intro());
    };
    return BeShare;
})(egret.gui.SkinnableComponent);
