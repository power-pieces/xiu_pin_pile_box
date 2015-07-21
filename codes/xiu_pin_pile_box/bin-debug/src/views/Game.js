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
    }
    Game.prototype.init = function () {
        this.p2 = new PWorld();
        this.bg = Texture.createBitmap("tower_jpg");
        this.addChild(this.bg);
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
    };
    Game.prototype.onTick = function (dt) {
        this.p2.step(dt);
    };
    return Game;
})(egret.Sprite);
