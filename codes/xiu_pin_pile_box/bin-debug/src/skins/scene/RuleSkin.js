var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var RuleSkin = (function (_super) {
            __extends(RuleSkin, _super);
            function RuleSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [1008, 640]);
                this.elementsContent = [this.__3_i(), this.btnGame_i(), this.btnLottery_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RuleSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RuleSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.btnGame_i = function () {
                var t = new egret.gui.Button();
                this.btnGame = t;
                this.__s(t, ["label", "x", "y"], ["进入游戏", 260, 765]);
                return t;
            };
            __egretProto__.btnLottery_i = function () {
                var t = new egret.gui.Button();
                this.btnLottery = t;
                this.__s(t, ["label", "x", "y"], ["查看秀品好礼", 252, 886]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth", "x", "y"], [100, "bgImage", 100, 0, 0]);
                return t;
            };
            RuleSkin._skinParts = ["btnGame", "btnLottery"];
            return RuleSkin;
        })(egret.gui.Skin);
        scene.RuleSkin = RuleSkin;
        RuleSkin.prototype.__class__ = "skins.scene.RuleSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=RuleSkin.js.map