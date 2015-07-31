var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Strip = (function (_super) {
    __extends(Strip, _super);
    function Strip(sheet, fps) {
        _super.call(this);
        this._sheet = null;
        this._interval = 0;
        this._changeTime = 0;
        this._index = 0;
        this._sheet = sheet;
        this._interval = (1000 / fps) >> 0;
        egret.Ticker.getInstance().register(this.onTick, this);
        this.anchorX = this.anchorY = 0.5;
    }
    Strip.prototype.onTick = function (dt) {
        var now = egret.getTimer();
        if (now > this._changeTime) {
            if (this._index == this._sheet.length) {
                egret.Ticker.getInstance().unregister(this.onTick, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                return;
            }
            this._changeTime = now + this._interval;
            this.texture = this._sheet[this._index++];
        }
    };
    return Strip;
})(egret.Bitmap);
