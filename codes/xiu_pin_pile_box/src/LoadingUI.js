var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.textAlign = "center";
        this.textField.width = 600;
        this.textField.height = 300;
        this.textField.x = (Global.stage.stageWidth - this.textField.width) / 2;
        this.textField.y = (Global.stage.stageHeight - this.textField.height) / 2;
        RES.getResByUrl("./resource/images/logo.png", function (data) {
            var logo = new egret.Bitmap(data);
            logo.anchorX = 0.5;
            logo.anchorY = 1;
            logo.x = Global.stage.stageWidth >> 1;
            logo.y = this.textField.y - 10;
            this.addChild(logo);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
})(egret.Sprite);
