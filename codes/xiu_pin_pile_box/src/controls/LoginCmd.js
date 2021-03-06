var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LoginCmd = (function (_super) {
    __extends(LoginCmd, _super);
    function LoginCmd() {
        _super.apply(this, arguments);
    }
    LoginCmd.prototype.run = function (id, nickname, pic) {
        var args = {};
        args.id = id;
        args.name = nickname;
        args.pic = pic;
        NetManager.call("login", args, this.onLogin, this, "登陆游戏中...");
    };
    LoginCmd.prototype.onLogin = function (data) {
        DataCenter.power = +data.power;
        DataCenter.totalScore = +data.total_score;
        DataCenter.bestScore = +data.best_score;
        DataCenter.bestScoreTime = data.best_score_time;
        DataCenter.receives = data.receives;
        DataCenter.rewards = data.rewards;
        DataCenter.userAmount = +data.user_amount;
        NoticeManager.sendNotice(new GameNotice(GameNotice.LOGIN_SUCCESS));
    };
    return LoginCmd;
})(ACmd);
