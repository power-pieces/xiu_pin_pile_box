class LoginCmd extends ACmd
{
    public run(id: string, nickname: string, pic: string): void
    {
        var args: any = {};
        args.id = id;
        args.name = nickname;
        args.pic = pic;
        NetManager.call("login", args, this.onLogin, this, "登陆游戏中...");
    }

    private onLogin(data:any): void
    {        
        DataCenter.power = +data.power;
        DataCenter.totalScore = +data.total_score;
        DataCenter.bestScore = +data.best_score;
        DataCenter.bestScoreTime = data.best_score_time;
        DataCenter.receives = data.receives;
        DataCenter.rewards = data.rewards;
        DataCenter.userAmount = +data.user_amount;
        DataCenter.lotteryPoint = +data.lottery_point;
        DataCenter.lotteryCount = +data.lottery_count;
        NoticeManager.sendNotice(new GameNotice(GameNotice.LOGIN_SUCCESS));
    }
}