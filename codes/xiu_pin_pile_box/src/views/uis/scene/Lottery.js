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
                this.imgTitle.source = "lottery_300m_png";
                break;
            case 2:
                this.imgTitle.source = "lottery_500m_png";
                break;
        }
        var lottery = this.imgLottery;
        lottery.anchorX = 0.5;
        lottery.anchorY = 250 / this.imgLottery.height;
        lottery.x += lottery.width / 2;
        lottery.y += this.imgLottery.height * this.imgLottery.anchorY;
    };
    Lottery.prototype.lottery_touchBeginHandler = function (e) {
        var lottery = this.imgLottery;
        egret.Tween.get(lottery).to({ rotation: 900 }, 1000).call(this.onActionOver, this);
    };
    Lottery.prototype.btnRecord_touchBeginHandler = function (e) {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Share());
    };
    Lottery.prototype.onActionOver = function () {
        LotteryFailWindow.show();
    };
    return Lottery;
})(egret.gui.SkinnableComponent);
