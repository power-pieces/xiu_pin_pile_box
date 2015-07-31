var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.createTime = 0;
        this._score = 0;
        this._info = new GameInfo();
        this._box = new Box(true);
        this._boxLine = null;
        this._boxVX = 10;
        this._boxs = [];
        this.init();
        this.addListeners();
    }
    Game.prototype.init = function () {
        this.touchEnabled = true;
        this.p2 = new PWorld();
        this.p2.createGround();
        this.bg = Texture.createBitmap("game_bg_png");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;
        this.scrollRect = new egret.Rectangle(0, 0, Global.stage.stageWidth, Global.stage.stageHeight);
        Global.UI_LAYER.addElement(this._info);
        this._info.setInfo(this._score, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);
        this._boxLine = Texture.createBitmap("box_line_png");
        this._boxLine.anchorY = 0.5;
        this.addChild(this._boxLine);
        this.addChild(this._box);
        this._boxLine.y = this._box.y = 150;
        this._box.x = 100;
    };
    Game.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        egret.Ticker.getInstance().register(this.onTick, this);
    };
    Game.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        egret.Ticker.getInstance().unregister(this.onTick, this);
    };
    Game.prototype.touchBegionHandler = function (e) {
        if (egret.getTimer() < this.createTime) {
            return;
        }
        this.createTime = egret.getTimer() + DataCenter.cfg.createBoxInterval;
        this.createBox(e.localX, e.localY);
        var boxAmount = this.p2.world.bodies.length;
        if (boxAmount > DataCenter.cfg.scrollBoxAmount) {
            this.scrollMap();
        }
    };
    Game.prototype.scrollMap = function () {
        var scrollHeight = DataCenter.cfg.scrollHeight;
        var scrollDuration = DataCenter.cfg.scrollDuration;
        egret.Tween.get(this._box).to({ y: this._box.y -= scrollHeight }, scrollDuration);
        egret.Tween.get(this._boxLine).to({ y: this._boxLine.y -= scrollHeight }, scrollDuration);
        egret.Tween.get(this.scrollRect).to({ y: this.scrollRect.y - scrollHeight }, scrollDuration);
    };
    Game.prototype.onTick = function (dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.moveBox();
        this.p2.step(dt);
        this.checkScore();
        this.checkGameOver();
    };
    Game.prototype.moveBox = function () {
        var left = 100;
        var right = Global.stage.stageWidth - left;
        this._box.visible = egret.getTimer() >= this.createTime ? true : false;
        this._box.x += this._boxVX;
        if (this._box.x > right) {
            this._box.x = right;
            this._boxVX *= -1;
        }
        else if (this._box.x < left) {
            this._box.x = left;
            this._boxVX *= -1;
        }
    };
    Game.prototype.createBox = function (x, y) {
        var box = new Box();
        this._boxs.push(box);
        box.x = this._box.x;
        box.y = this._box.y;
        this.addChild(box);
        this.p2.mappingObject(box);
    };
    Game.prototype.checkScore = function () {
        var len = this._boxs.length;
        var box = null;
        while (--len > -1) {
            box = this._boxs[len];
            if (box.isDrop) {
                this._score = DataCenter.cfg.eachBoxScore * (len + 1);
                break;
            }
        }
        this._info.setInfo(this._score, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);
    };
    Game.prototype.checkGameOver = function () {
        var len = this._boxs.length;
        var box = null;
        while (--len > 0) {
            box = this._boxs[len];
            var downBox = this._boxs[len - 1];
            if (box.y >= downBox.y) {
                this.gameOver();
                break;
            }
        }
    };
    Game.prototype.gameOver = function () {
        this.removeListeners();
        this.onSureOver();
    };
    Game.prototype.onSureOver = function () {
        new GameResultCmd().run(DataCenter.id, this._score);
        DataCenter.totalScore += this._score;
        if (this._score > DataCenter.bestScore) {
            DataCenter.bestScore = this._score;
        }
        DataCenter.power -= 1;
        var lotteryScore = DataCenter.cfg.lotteryScore;
        var len = lotteryScore.length;
        while (--len > -1) {
            if (this._score >= lotteryScore[len]) {
                this.dispose();
                Global.UI_LAYER.addElement(new Lottery(len));
                return;
            }
        }
        GameFailWindow.show(this._score);
    };
    Game.prototype.dispose = function () {
        this.parent.removeChild(this);
        Global.UI_LAYER.removeElement(this._info);
    };
    return Game;
})(egret.Sprite);
