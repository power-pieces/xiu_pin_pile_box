var views;
(function (views) {
    var MainSkin = (function (_super) {
        __extends(MainSkin, _super);
        function MainSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [300, 400]);
            this.elementsContent = [this.__3_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = MainSkin.prototype;
        __egretProto__.__3_i = function () {
            var t = new egret.gui.Button();
            this.__s(t, ["label", "skinName", "x", "y"], ["按钮", new egret.gui.ButtonSkin("egretIcon", "egretIcon", "egretIcon"), 84, -1]);
            return t;
        };
        return MainSkin;
    })(egret.gui.Skin);
    views.MainSkin = MainSkin;
    MainSkin.prototype.__class__ = "views.MainSkin";
})(views || (views = {}));
