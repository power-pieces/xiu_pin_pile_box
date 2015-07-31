class GameResultCmd extends ACmd
{
    public run(id: string, score: number): void
    {
        var args: any = {};
        args.id = id;
        args.score = score;
        NetManager.call("game_result", args, this.onResponse, this);
    }

    private onResponse(data:any): void
    {
        DataCenter.rewardKey = data.reward_key;
        DataCenter.rewardType = +data.reward_type;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    }
}