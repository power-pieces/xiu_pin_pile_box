var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GetRankCmd = (function (_super) {
    __extends(GetRankCmd, _super);
    function GetRankCmd() {
        _super.apply(this, arguments);
    }
    GetRankCmd.prototype.run = function (id) {
        var args = {};
        args.id = id;
        NetManager.implicitCall("get_rank", args, this.onResponse, this);
    };
    GetRankCmd.prototype.onResponse = function (jsonStr) {
        var data = JSON.parse(jsonStr);
        if (data.error) {
        }
        DataCenter.selfRank = data.self;
        DataCenter.rankList = data.list;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GOT_RANK));
    };
    return GetRankCmd;
})(ACmd);
