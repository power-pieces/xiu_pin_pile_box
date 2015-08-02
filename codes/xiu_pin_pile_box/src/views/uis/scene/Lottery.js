var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Lottery = (function (_super) {
    __extends(Lottery, _super);
    function Lottery(t) {
        _super.call(this);
        this._type = -1;
        this._type = t;
        this.skinName = skins.scene.LotterySkin;
        this.touchChildren = false;
        this.touchEnabled = true;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    Lottery.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.lottery_touchBeginHandler, this);
        this.refresh();
    };
    Lottery.prototype.refresh = function () {
        switch (this._type) {
            case 0:
                this.imgTitle.source = "lottery_100m_png";
                break;
            case 1:
                this.imgTitle.source = "lottery_200m_png";
                break;
            case 2:
                this.imgTitle.source = "lottery_340m_png";
                break;
        }
        var lottery = this.imgLottery;
        lottery.anchorX = 0.5;
        lottery.anchorY = 0.5;
        lottery.x += lottery.width / 2;
        lottery.y += lottery.height / 2;
    };
    Lottery.prototype.lottery_touchBeginHandler = function (e) {
        AudioDevice.playEffect(AudioName.LOTTERY);
        var angle = 360 * 10;
        var index = parseInt((Math.random() * 3).toString());
        if (DataCenter.rewardType == 0) {
            angle += Lottery.NO_REWARD_ANGLE[index];
        }
        else {
            angle += Lottery.REWARD_ANGLE[index];
        }
        var lottery = this.imgLottery;
        egret.Tween.get(lottery).to({ rotation: angle }, 5000, egret.Ease.quadOut).call(this.onActionOver, this);
    };
    Lottery.prototype.btnRecord_touchBeginHandler = function (e) {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Share());
    };
    Lottery.prototype.onActionOver = function () {
        if (DataCenter.rewardType == 0) {
            AudioDevice.playEffect(AudioName.LOTTERY_FAIL);
            LotteryFailWindow.show();
        }
        else {
            AudioDevice.playEffect(AudioName.LOTTERY_SUCCESS);
            LotteryInfoWindow.show(DataCenter.rewardType, DataCenter.rewardKey);
        }
    };
    Lottery.NO_REWARD_ANGLE = [0, 120, 240];
    Lottery.REWARD_ANGLE = [60, 180, 300];
    return Lottery;
})(egret.gui.SkinnableComponent);
