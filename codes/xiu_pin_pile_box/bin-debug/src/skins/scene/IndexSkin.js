var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var IndexSkin = (function (_super) {
            __extends(IndexSkin, _super);
            function IndexSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [360, 640]);
                this.elementsContent = [this.btnStart_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = IndexSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return IndexSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.btnStart_i = function () {
                var t = new egret.gui.Button();
                this.btnStart = t;
                this.__s(t, ["label", "x", "y"], ["开始游戏", 143, 143]);
                return t;
            };
            IndexSkin._skinParts = ["btnStart"];
            return IndexSkin;
        })(egret.gui.Skin);
        scene.IndexSkin = IndexSkin;
        IndexSkin.prototype.__class__ = "skins.scene.IndexSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
