var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var IntroSkin = (function (_super) {
            __extends(IntroSkin, _super);
            function IntroSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1008, 640]);
                this.elementsContent = [this.imgBg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = IntroSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return IntroSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                this.__s(t, ["percentHeight", "source", "percentWidth", "x", "y"], [100, "bgImage", 100, 0, 0]);
                return t;
            };
            IntroSkin._skinParts = ["imgBg"];
            return IntroSkin;
        })(egret.gui.Skin);
        scene.IntroSkin = IntroSkin;
        IntroSkin.prototype.__class__ = "skins.scene.IntroSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=IntroSkin.js.map