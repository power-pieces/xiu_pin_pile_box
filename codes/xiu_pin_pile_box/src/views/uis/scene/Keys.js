var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Keys = (function (_super) {
    __extends(Keys, _super);
    function Keys() {
        _super.call(this);
        this.skinName = skins.scene.KeysSkin;
    }
    Keys.prototype.childrenCreated = function () {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        var rewardDic = {};
        for (var i = 0; i < DataCenter.rewards.length; i++) {
            var reward = DataCenter.rewards[i];
            if (null == rewardDic[reward.type]) {
                rewardDic[reward.type] = [];
            }
            var array = rewardDic[reward.type];
            array.push(reward);
        }
        for (var k in rewardDic) {
            var item = new KeysItem(rewardDic[k]);
            this.list.addElement(item);
        }
        this.invalidateDisplayList();
    };
    Keys.prototype.btnBack_touchTapHandler = function (e) {
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Share());
    };
    return Keys;
})(egret.gui.SkinnableComponent);
