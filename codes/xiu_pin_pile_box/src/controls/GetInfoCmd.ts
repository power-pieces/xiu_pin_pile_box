class GetInfoCmd extends ACmd
{
    public run(id: string): void
    {
        var args: any = {};
        args.id = id;
        NetManager.call("get_info", args, this.onResponse, this);
    }

    private onResponse(data: any): void
    {
        DataCenter.inviterName = data.name;
        DataCenter.inviterPic = data.pic;
        DataCenter.inviterTotalScore = +data.total_score;
        DataCenter.inviterRewards = data.rewards;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GOT_INVITER_INFO))
    }
}