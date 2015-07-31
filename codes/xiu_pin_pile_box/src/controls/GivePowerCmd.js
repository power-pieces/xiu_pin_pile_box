var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GivePowerCmd = (function (_super) {
    __extends(GivePowerCmd, _super);
    function GivePowerCmd() {
        _super.apply(this, arguments);
    }
    GivePowerCmd.prototype.run = function (id, targetId) {
        var args = {};
        args.id = id;
        args.target_id = targetId;
        NetManager.call("give_power", args, this.onResponse, this);
    };
    GivePowerCmd.prototype.onResponse = function (data) {
        if (data.success == 1) {
            Alert.show("助力成功！");
        }
        else {
            Alert.show("无法重复助力！");
        }
    };
    return GivePowerCmd;
})(ACmd);
