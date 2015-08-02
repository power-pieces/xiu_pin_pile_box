var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameResultCmd = (function (_super) {
    __extends(GameResultCmd, _super);
    function GameResultCmd() {
        _super.apply(this, arguments);
    }
    GameResultCmd.prototype.run = function (id, score) {
        var args = {};
        args.id = id;
        args.score = score;
        NetManager.call("game_result", args, this.onResponse, this);
    };
    GameResultCmd.prototype.onResponse = function (data) {
        DataCenter.rewardKey = data.reward_key;
        DataCenter.rewardType = +data.reward_type;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    };
    return GameResultCmd;
})(ACmd);
