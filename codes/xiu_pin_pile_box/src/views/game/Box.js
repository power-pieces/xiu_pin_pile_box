var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(isT) {
        if (isT === void 0) { isT = false; }
        _super.call(this);
        this.isDrop = false;
        this._checkPos = new egret.Point(0, 0);
        this._checkTime = 0;
        this._isT = false;
        this._isT = isT;
        this.init();
    }
    Box.getBoxEffectSheet = function () {
        var sheet = [];
        var ss = RES.getRes("effect_json");
        for (var i = 1; i <= 9; i++) {
            sheet.push(ss.getTexture("a1000" + i));
        }
        for (var i = 10; i <= 34; i++) {
            sheet.push(ss.getTexture("a100" + i));
        }
        return sheet;
    };
    Box.prototype.init = function () {
        var bmd = Texture.createBitmap(this._isT ? "box_t_png" : "box_png");
        this.addChild(bmd);
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    };
    Box.prototype.setPosition = function (x, y) {
        if (false == this.isDrop) {
            var tolerance = DataCenter.cfg.tolerance;
            var checkInterval = DataCenter.cfg.stopCheckInterval;
            var dx = Math.abs(x - this._checkPos.x);
            var dy = Math.abs(y - this._checkPos.y);
            var now = egret.getTimer();
            if (dx < tolerance && dy < tolerance) {
                var interval = now - this._checkTime;
                if (interval >= checkInterval) {
                    this.isDrop = true;
                    var strip = new Strip(Box.getBoxEffectSheet(), 24);
                    strip.x = this.x;
                    strip.y = this.y;
                    this.parent.addChild(strip);
                }
            }
            else {
                this._checkPos.x = x;
                this._checkPos.y = y;
                this._checkTime = now;
            }
        }
        this.x = x;
        this.y = y;
    };
    return Box;
})(egret.Sprite);
