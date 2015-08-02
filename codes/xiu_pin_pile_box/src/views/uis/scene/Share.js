var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Share = (function (_super) {
    __extends(Share, _super);
    function Share() {
        _super.call(this);
        this.skinName = skins.scene.ShareSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Share.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addListeners();
        this.txtPower.text = DataCenter.power.toString();
        this.imgPic.source = DataCenter.pic;
        this.txtName.text = DataCenter.nickname;
        this.txtScore.text = DataCenter.totalScore + "";
        for (var k in DataCenter.receives) {
            var friendItem = new FriendItem(DataCenter.receives[k]);
            this.listFriends.addElement(friendItem);
        }
    };
    Share.prototype.addListeners = function () {
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBegionHandler, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRank_touchBegionHandler, this);
        this.btnShare.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnShare_touchBegionHandler, this);
    };
    Share.prototype.removeListeners = function () {
        this.btnGame.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBegionHandler, this);
        this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRank_touchBegionHandler, this);
        this.btnShare.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnShare_touchBegionHandler, this);
    };
    Share.prototype.btnGame_touchBegionHandler = function (e) {
        AudioDevice.playEffect(AudioName.CLICK);
        if (DataCenter.power <= 0) {
            Alert.show("alert_tip_1");
            return;
        }
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Game());
    };
    Share.prototype.btnRank_touchBegionHandler = function (e) {
        AudioDevice.playEffect(AudioName.CLICK);
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Rank());
    };
    Share.prototype.btnShare_touchBegionHandler = function (e) {
        AudioDevice.playEffect(AudioName.CLICK);
        ShareTip.show();
    };
    return Share;
})(egret.gui.SkinnableComponent);
