var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameFailWindow = (function (_super) {
    __extends(GameFailWindow, _super);
    function GameFailWindow(score) {
        _super.call(this);
        this._score = 0;
        this._score = score;
        this.skinName = skins.windows.GameFailWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    GameFailWindow.show = function (score) {
        var w = new GameFailWindow(score);
        egret.gui.PopUpManager.addPopUp(w, true, true);
        AudioDevice.playEffect(AudioName.GAME_RESULT);
    };
    GameFailWindow.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.txtScore.text = this._score.toString();
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.imgLight.anchorX = this.imgLight.anchorY = 0.5;
        this.imgLight.x += this.imgLight.width / 2;
        this.imgLight.y += this.imgLight.height / 2;
    };
    GameFailWindow.prototype.enterFrameHandler = function (e) {
        this.imgLight.rotation += 1;
    };
    GameFailWindow.prototype.onTouchTap = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
        Global.GAME_LAYER.removeChildren();
        Global.UI_LAYER.removeAllElements();
        var lotteryScore = DataCenter.cfg.lotteryScore;
        var len = lotteryScore.length;
        while (--len > -1) {
            if (this._score >= lotteryScore[len]) {
                Global.UI_LAYER.addElement(new Lottery(len));
                return;
            }
        }
        Global.UI_LAYER.addElement(new Share());
    };
    return GameFailWindow;
})(egret.gui.SkinnableComponent);
