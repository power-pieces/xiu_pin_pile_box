class LoginCmd extends ACmd
{
    public run(id: string, name: string, pic: string): void
    {
        var args: any = {};
        args.id = id;
        args.name = name;
        args.pic = pic;
        NetManager.call("login", args, this.onLogin, this, "登陆游戏中...");
    }

    private onLogin(jsonStr: string): void
    {
        var data: any = JSON.parse(jsonStr);
        DataCenter.power = data.power;
        DataCenter.totalScore = data.total_score;
        DataCenter.bestScore = data.best_score;
        DataCenter.bestScoreTime = data.best_score_time;
        DataCenter.receives = data.receives;
        DataCenter.rewards = data.rewards;
        NoticeManager.sendNotice(new GameNotice(GameNotice.LOGIN_SUCCESS))
    }
}