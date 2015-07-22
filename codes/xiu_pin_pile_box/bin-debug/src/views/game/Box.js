var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        _super.call(this);
        this.init();
    }
    var __egretProto__ = Box.prototype;
    __egretProto__.init = function () {
        var bmd = Texture.createBitmap("box_jpg");
        this.addChild(bmd);
    };
    return Box;
})(egret.Sprite);
Box.prototype.__class__ = "Box";
