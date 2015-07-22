//游戏主体
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.createTime = 0;
        this.init();
        this.addListeners();
    }
    var __egretProto__ = Game.prototype;
    __egretProto__.init = function () {
        this.touchEnabled = true;
        this.p2 = new PWorld();
        this.p2.createGround();
        this.bg = Texture.createBitmap("tower_jpg");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;
        this.scrollRect = new egret.Rectangle(0, 0, Global.stage.stageWidth, Global.stage.stageHeight);
    };
    __egretProto__.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        egret.Ticker.getInstance().register(this.onTick, this);
    };
    __egretProto__.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        egret.Ticker.getInstance().unregister(this.onTick, this);
    };
    __egretProto__.touchBegionHandler = function (e) {
        if (egret.getTimer() < this.createTime) {
            return;
        }
        this.createTime = egret.getTimer() + DataCenter.cfg.createBoxInterval;
        var boxAmount = this.p2.world.bodies.length;
        if (boxAmount > DataCenter.cfg.scrollBoxAmount) {
            this.scrollMap();
        }
        this.createBox(e.localX, e.localY);
    };
    //滚动地图
    __egretProto__.scrollMap = function () {
        var scrollHeight = DataCenter.cfg.scrollHeight;
        var scrollDuration = DataCenter.cfg.scrollDuration;
        egret.Tween.get(this.scrollRect).to({ y: this.scrollRect.y - scrollHeight }, scrollDuration);
    };
    __egretProto__.onTick = function (dt) {
        this.p2.step(dt);
    };
    __egretProto__.createBox = function (x, y) {
        var box = new Box();
        box.anchorX = 0.5;
        box.anchorY = 0.5;
        box.x = x;
        box.y = y;
        this.addChild(box);
        this.p2.mappingObject(box);
    };
    return Game;
})(egret.Sprite);
Game.prototype.__class__ = "Game";
