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
        DataCenter.isLottery = +data.is_lottery;
        DataCenter.rewardScore = +data.reward_score;
        DataCenter.rewardKey = data.reward_key;
        DataCenter.rewardType = +data.reward_type;
        if (DataCenter.rewardType > 0)
        {
            DataCenter.rewards.push({ key: DataCenter.rewardKey, type: DataCenter.rewardType });
        }

        switch (DataCenter.rewardType)
        {
            case 1:
                new StatisticCmd().run("抽奖_本来生活");
                break;
            case 2:
                new StatisticCmd().run("抽奖_考拉海购");
                break;
            case 3:
                new StatisticCmd().run("抽奖_e袋洗");
                break;
            case 4:
                new StatisticCmd().run("抽奖_网易火车票");
                break;
            case 5:
                new StatisticCmd().run("抽奖_秀品");
                break;
            case 6:
                new StatisticCmd().run("抽奖_河狸家");
                break;
            case 7:
                new StatisticCmd().run("抽奖_推推熊");
                break;
            case 8:
                new StatisticCmd().run("抽奖_优步");
                break;
            case 9:
                new StatisticCmd().run("抽奖_新氧");
                break;
            case 10:
                new StatisticCmd().run("抽奖_花田");
                break;
            case 11:
                new StatisticCmd().run("抽奖_途牛旅游网");
                break;
        }
        //alert(data.useRate);
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    }
}