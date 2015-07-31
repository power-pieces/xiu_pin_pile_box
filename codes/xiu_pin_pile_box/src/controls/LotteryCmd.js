var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LotteryCmd = (function (_super) {
    __extends(LotteryCmd, _super);
    function LotteryCmd() {
        _super.apply(this, arguments);
    }
    LotteryCmd.prototype.run = function (id, phone, name, address) {
        var args = {};
        args.id = id;
        args.phone = phone;
        args.name = name;
        args.address = address;
        NetManager.call("lottery", args, this.onResponse, this);
    };
    LotteryCmd.prototype.onResponse = function (jsonStr) {
        var data = JSON.parse(jsonStr);
        if (data.error) {
        }
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    };
    return LotteryCmd;
})(ACmd);
