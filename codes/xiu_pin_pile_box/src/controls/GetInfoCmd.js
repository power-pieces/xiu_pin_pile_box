var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GetInfoCmd = (function (_super) {
    __extends(GetInfoCmd, _super);
    function GetInfoCmd() {
        _super.apply(this, arguments);
    }
    GetInfoCmd.prototype.run = function (id) {
        var args = {};
        args.id = id;
        NetManager.call("get_info", args, this.onResponse, this);
    };
    GetInfoCmd.prototype.onResponse = function (data) {
        DataCenter.inviterName = data.name;
        DataCenter.inviterPic = data.pic;
        DataCenter.inviterTotalScore = +data.total_score;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GOT_INVITER_INFO));
    };
    return GetInfoCmd;
})(ACmd);
