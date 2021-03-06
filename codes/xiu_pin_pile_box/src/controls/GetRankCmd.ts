﻿class GetRankCmd extends ACmd
{
    public run(id: string): void
    {
        var args: any = {};
        args.id = id;
        NetManager.call("get_rank", args, this.onResponse, this);
    }

    private onResponse(data:any): void
    {
        DataCenter.selfRank = +data.self;
        DataCenter.rankList = data.list;
        NoticeManager.sendNotice(new GameNotice(GameNotice.GOT_RANK));
    }
}