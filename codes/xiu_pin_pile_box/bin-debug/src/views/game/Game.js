//游戏主体
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.init();
    }
    var __egretProto__ = Game.prototype;
    __egretProto__.init = function () {
        this.p2 = new PWorld();
        this.bg = Texture.createBitmap("tower_jpg");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;
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
    };
    __egretProto__.onTick = function (dt) {
        this.p2.step(dt);
    };
    return Game;
})(egret.Sprite);
Game.prototype.__class__ = "Game";
//# sourceMappingURL=Game.js.map