var skins;
(function (skins) {
    var windows;
    (function (windows) {
        var AlertSkin = (function (_super) {
            __extends(AlertSkin, _super);
            function AlertSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [450, 450]);
                this.elementsContent = [this.__3_i(), this.txtContent_i(), this.btnOK_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = AlertSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return AlertSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.btnOK_i = function () {
                var t = new egret.gui.Button();
                this.btnOK = t;
                this.__s(t, ["label", "x", "y"], ["确定", 147, 301]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0xCA5959, 100, 100]);
                return t;
            };
            __egretProto__.txtContent_i = function () {
                var t = new egret.gui.Label();
                this.txtContent = t;
                this.__s(t, ["text", "x", "y"], ["撒旦法撒旦法", 120, 138]);
                return t;
            };
            AlertSkin._skinParts = ["txtContent", "btnOK"];
            return AlertSkin;
        })(egret.gui.Skin);
        windows.AlertSkin = AlertSkin;
        AlertSkin.prototype.__class__ = "skins.windows.AlertSkin";
    })(windows = skins.windows || (skins.windows = {}));
})(skins || (skins = {}));
//# sourceMappingURL=AlertSkin.js.map