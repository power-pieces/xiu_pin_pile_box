var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        _super.call(this);
        this.init();
    }
    Box.prototype.init = function () {
        var bmd = Texture.createBitmap("box_jpg");
        this.addChild(bmd);
    };
    return Box;
})(egret.Sprite);
//# sourceMappingURL=Box.js.map